import { useEffect, useRef, useState } from "react";
import { Mic, Square, Upload, FileAudio } from "lucide-react";
import { transcribeAudio } from "../services/transcription";

function VoiceRecorder({ onTranscriptReady }) {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioURL, setAudioURL] = useState("");
  const [audioName, setAudioName] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState("");

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const barsRef = useRef([]);

  const formatTime = (value) => {
    const mins = String(Math.floor(value / 60)).padStart(2, "0");
    const secs = String(value % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const animateWaveform = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      analyser.getByteFrequencyData(data);

      barsRef.current.forEach((bar, i) => {
        if (!bar) return;

        const value =
          data[Math.floor((i / barsRef.current.length) * data.length)] || 0;

        bar.style.height = `${Math.max(8, (value / 255) * 48)}px`;
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const transcribeFile = async (file) => {
    setTranscriptionError("");
    onTranscriptReady?.("", null);
    if (!file.type.startsWith("audio/") && !/\.(webm|wav|mp3|m4a|ogg|flac|mp4|mpeg|mpga)$/i.test(file.name)) {
      setTranscriptionError("Unsupported file. Please choose a supported audio file.");
      return;
    }
    console.log(" Calling transcribe API...", file);

    try {
      setIsTranscribing(true);

      const result = await transcribeAudio(file);

      console.log(" Transcript received:", result);

      if (onTranscriptReady) {
        onTranscriptReady(result.text || "", result.metrics || null);
      }
    } catch (err) {
      console.error(" Transcription failed:", err);
      setTranscriptionError(err.message || "Transcription failed. Please try another audio file.");
    } finally {
      setIsTranscribing(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 128;

      source.connect(analyser);
      analyserRef.current = analyser;

      animateWaveform();

      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        console.log(" Chunk:", e.data.size);

        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        console.log(" MediaRecorder onstop fired");

        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        console.log(" Blob size:", blob.size);

        const file = new File([blob], "recording.webm", {
          type: blob.type,
        });

        if (audioURL) URL.revokeObjectURL(audioURL);

        setAudioURL(URL.createObjectURL(blob));
        setAudioName("Recorded Audio");

        stream.getTracks().forEach((track) => track.stop());

        await audioContext.close();
        cancelAnimationFrame(animationRef.current);

        barsRef.current.forEach((bar) => {
          if (bar) bar.style.height = "8px";
        });

        await transcribeFile(file);
      };

      recorder.start();

      console.log(" Recording started");

      setIsRecording(true);
      setSeconds(0);

      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error(err);
      alert("Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    console.log(" Stop button clicked");

    recorderRef.current?.stop();
    clearInterval(timerRef.current);
    setIsRecording(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log(" Uploaded:", file.name);

    if (audioURL) URL.revokeObjectURL(audioURL);

    setAudioURL(URL.createObjectURL(file));
    setAudioName(file.name);

    await transcribeFile(file);
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      audioContextRef.current?.close();
      cancelAnimationFrame(animationRef.current);

      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);

  return (
    <section className="card recorder-card" aria-labelledby="recorder-heading">
      <div className="transcript-meta" style={{ marginBottom: 20 }}>
        <h3 id="recorder-heading" style={{ margin: 0 }}>Audio Recording</h3>
        {isRecording && <span className="recording-badge" role="status">Recording</span>}
        {isTranscribing && <span className="status-pill" role="status"><span className="loading-spinner" style={{ borderColor: "rgba(88,169,166,.3)", borderTopColor: "var(--primary)" }} /> Transcribing audio</span>}
      </div>

      <div className="recorder-stage">
        <div className={`mic-orb${isRecording ? " is-recording" : ""}`} aria-hidden="true">
          <Mic
            size={42}
          />
        </div>

        <div className="recorder-time" style={{ color: isRecording ? "var(--danger)" : "var(--text)" }} aria-live="off">
          {formatTime(seconds)}
        </div>

        <div className={`waveform${isRecording ? " is-recording" : ""}`} aria-hidden="true">
          {Array.from({ length: 26 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => (barsRef.current[i] = el)}
              className="wave-bar"
              style={{
                height: 8,
                background: isRecording
                  ? "var(--danger)"
                  : "var(--secondary)",
                animationDelay: `${(i % 6) * 75}ms`,
              }}
            />
          ))}
        </div>

        <div className="recorder-controls">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="button button-round"
              aria-label="Start recording"
              title="Record"
            >
              <Mic size={18} />
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="button button-round is-recording"
              aria-label="Stop recording"
              title="Stop recording"
            >
              <Square size={18} />
            </button>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="button button-secondary"
          >
            <Upload size={18} />
            Upload
          </button>

          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept="audio/*,.webm,.wav,.mp3,.m4a,.ogg,.flac,.mp4,.mpeg,.mpga"
            onChange={handleUpload}
          />
        </div>

        {transcriptionError && (
          <div role="alert" style={{ color: "var(--danger)", fontWeight: 600, marginTop: 8 }}>
            {transcriptionError}
          </div>
        )}

        {audioURL ? (
          <div className="audio-player">
            <FileAudio size={20} color="var(--primary-dark)" aria-hidden="true" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ display: "block", marginBottom: 5, overflowWrap: "anywhere" }}>{audioName}</strong>
              <audio ref={audioRef} src={audioURL} controls preload="metadata" aria-label={`Play ${audioName}`} />
            </div>
          </div>
        ) : !isRecording && (
          <p className="empty-state">No recording yet. Record a description or upload an audio file.</p>
        )}
      </div>
    </section>
  );
}

export default VoiceRecorder;
