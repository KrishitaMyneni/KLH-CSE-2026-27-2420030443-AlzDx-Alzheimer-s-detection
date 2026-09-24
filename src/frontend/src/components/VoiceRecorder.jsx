import { useEffect, useRef, useState } from "react";
import { Mic, Square, Upload, Play, Pause, FileAudio } from "lucide-react";
import { transcribeAudio } from "../services/transcription";

function VoiceRecorder({ onTranscriptReady }) {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioURL, setAudioURL] = useState("");
  const [audioName, setAudioName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
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
    if (!file.type.startsWith("audio/") && !/\.(webm|wav|mp3|m4a|ogg|flac|mp4|mpeg|mpga)$/i.test(file.name)) {
      setTranscriptionError("Unsupported file. Please choose a supported audio file.");
      return;
    }
    console.log("🎯 Calling transcribe API...", file);

    try {
      setIsTranscribing(true);

      const result = await transcribeAudio(file);

      console.log("✅ Transcript received:", result);

      if (onTranscriptReady) {
        onTranscriptReady(result.text || "");
      }
    } catch (err) {
      console.error("❌ Transcription failed:", err);
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
        console.log("📦 Chunk:", e.data.size);

        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        console.log("🛑 MediaRecorder onstop fired");

        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        console.log("🎵 Blob size:", blob.size);

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

      console.log("🎙️ Recording started");

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
    console.log("⏹️ Stop button clicked");

    recorderRef.current?.stop();
    clearInterval(timerRef.current);
    setIsRecording(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log("📁 Uploaded:", file.name);

    if (audioURL) URL.revokeObjectURL(audioURL);

    setAudioURL(URL.createObjectURL(file));
    setAudioName(file.name);

    await transcribeFile(file);
  };

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      await audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnd);
    };
  }, [audioURL]);

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
    <div className="card" style={{ padding: 24, marginTop: 24 }}>
      <h3 style={{ marginBottom: 20 }}>Audio Recording</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: isRecording
              ? "rgba(195,90,90,.12)"
              : "rgba(88,169,166,.12)",
            border: `3px solid ${
              isRecording ? "var(--danger)" : "var(--primary)"
            }`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Mic
            size={42}
            color={isRecording ? "var(--danger)" : "var(--primary)"}
          />
        </div>

        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: isRecording ? "var(--danger)" : "var(--text)",
          }}
        >
          {formatTime(seconds)}
        </div>

        <div
          style={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            height: 54,
          }}
        >
          {Array.from({ length: 26 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => (barsRef.current[i] = el)}
              style={{
                width: 5,
                height: 8,
                borderRadius: 999,
                background: isRecording
                  ? "var(--danger)"
                  : "var(--secondary)",
                transition: "height 60ms linear",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {!isRecording ? (
            <button
              onClick={startRecording}
              style={{
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: 999,
                padding: "12px 22px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <Mic size={18} />
              Record
            </button>
          ) : (
            <button
              onClick={stopRecording}
              style={{
                background: "var(--danger)",
                color: "white",
                border: "none",
                borderRadius: 999,
                padding: "12px 22px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <Square size={18} />
              Stop
            </button>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 999,
              padding: "12px 22px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
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

        {isTranscribing && (
          <div
            style={{
              color: "var(--primary)",
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Transcribing audio...
          </div>
        )}

        {transcriptionError && (
          <div role="alert" style={{ color: "var(--danger)", fontWeight: 600, marginTop: 8 }}>
            {transcriptionError}
          </div>
        )}

        {audioURL && (
          <div
            style={{
              width: "100%",
              background: "#F6F9F8",
              border: "1px solid var(--border)",
              borderRadius: 18,
              padding: 18,
            }}
          >
            <audio ref={audioRef} src={audioURL} hidden />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <button
                onClick={togglePlayback}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  border: "none",
                  background: "var(--primary)",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} />}
              </button>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <FileAudio size={18} />
                  <strong>{audioName}</strong>
                </div>

                <div
                  style={{
                    height: 6,
                    background: "#DDEAE6",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: isPlaying ? "100%" : "0%",
                      height: "100%",
                      background: "var(--primary)",
                      transition: "width .25s linear",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoiceRecorder;
