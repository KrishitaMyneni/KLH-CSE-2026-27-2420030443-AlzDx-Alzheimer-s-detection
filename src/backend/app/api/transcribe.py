import asyncio
import os
import tempfile
from pathlib import Path
from threading import Lock

from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter(prefix="/api", tags=["transcription"])

MODEL_NAME = "base.en"
SUPPORTED_EXTENSIONS = {".webm", ".wav", ".mp3", ".m4a", ".ogg", ".flac", ".mp4", ".mpeg", ".mpga"}
_model = None
_model_lock = Lock()


def _get_model():
    global _model
    if _model is None:
        with _model_lock:
            if _model is None:
                from faster_whisper import WhisperModel

                _model = WhisperModel(MODEL_NAME, device="cpu", compute_type="int8")
    return _model


@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in SUPPORTED_EXTENSIONS:
        raise HTTPException(status_code=415, detail="Unsupported audio file. Upload WebM, WAV, MP3, M4A, OGG, or FLAC audio.")

    temporary_path = None
    try:
        content = await file.read()
        if not content:
            raise HTTPException(status_code=400, detail="The uploaded audio file is empty.")

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temporary_file:
            temporary_file.write(content)
            temporary_path = temporary_file.name

        model = await asyncio.to_thread(_get_model)
        segments, _ = await asyncio.to_thread(
            lambda: model.transcribe(temporary_path, language="en", vad_filter=False)
        )
        segment_results = [
            {"start": float(segment.start), "end": float(segment.end), "text": segment.text}
            for segment in segments
        ]
        return {
            "text": "".join(segment["text"] for segment in segment_results).strip(),
            "segments": segment_results,
        }
    except HTTPException:
        raise
    except ImportError as error:
        raise HTTPException(status_code=500, detail="Faster-Whisper dependencies are missing. Install the backend requirements and restart the server.") from error
    except Exception as error:
        message = str(error)
        if any(word in message.lower() for word in ("model", "download", "snapshot")):
            detail = "The Faster-Whisper base.en model is unavailable. Check that it has been downloaded and try again."
        else:
            detail = "Audio transcription failed. Check that the file contains valid audio and try again."
        raise HTTPException(status_code=500, detail=detail) from error
    finally:
        if temporary_path:
            try:
                os.remove(temporary_path)
            except OSError:
                pass
        await file.close()
