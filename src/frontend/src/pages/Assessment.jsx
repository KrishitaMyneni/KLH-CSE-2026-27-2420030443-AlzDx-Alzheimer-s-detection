import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ImageCard from "../components/ImageCard";
import VoiceRecorder from "../components/VoiceRecorder";
import { predict } from "../services/api";
import cookieTheftImage from "../assets/cookie-theft-placeholder.svg";

function Assessment() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert("Please record/upload audio or enter a transcript first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await predict(text);
      setResult(response);
    } catch (err) {
      console.error(err);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Cookie Theft Assessment"
      subtitle="Observe the image carefully and describe everything happening naturally."
    >
      {/* Cookie Theft Image */}
      <ImageCard src={cookieTheftImage} />

      {/* Voice Recorder */}
      <VoiceRecorder onTranscriptReady={setText} />

      {/* Transcript */}
      <div
        className="card"
        style={{
          padding: "24px",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <h3 style={{ margin: 0 }}>Transcript</h3>

          {text && (
            <span
              style={{
                background: "rgba(88,169,166,.12)",
                color: "var(--primary)",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Auto-transcribed
            </span>
          )}
        </div>

        <p
          style={{
            color: "var(--text-light)",
            marginBottom: "16px",
          }}
        >
          Your transcript is generated automatically after recording or uploading
          audio. You can edit it before running the analysis.
        </p>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your transcript will appear here automatically..."
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "1px solid var(--border)",
            resize: "vertical",
            fontSize: "15px",
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* Analyze */}
      <button
        onClick={handleAnalyze}
        disabled={loading || !text.trim()}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "14px",
          border: "none",
          background: loading || !text.trim()
            ? "var(--secondary)"
            : "var(--primary)",
          color: "white",
          fontSize: "16px",
          fontWeight: "600",
          cursor: loading || !text.trim()
            ? "not-allowed"
            : "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Assessment"}
      </button>

      {/* Result */}
      {result && (
        <div
          className="card"
          style={{
            marginTop: "28px",
            padding: "24px",
          }}
        >
          <h2 style={{ marginBottom: "18px" }}>Prediction Result</h2>

          <div
            style={{
              background: "var(--primary)",
              color: "white",
              borderRadius: "18px",
              padding: "24px",
              marginBottom: "20px",
            }}
          >
            <h1 style={{ marginBottom: "10px" }}>{result.prediction}</h1>

            <p>Confidence: {result.confidence}%</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "18px",
            }}
          >
            <div
              style={{
                background: "#F6F9F8",
                borderRadius: "16px",
                padding: "18px",
              }}
            >
              <h3 style={{ marginBottom: "12px" }}>Linguistic Analysis</h3>

              <p style={{ color: "var(--text-light)" }}>
                EXP8 attention insights, linguistic features, pause statistics,
                hesitation counts, and explainable AI results will appear here
                after the final model integration.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <button
                style={{
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px",
                  cursor: "pointer",
                }}
              >
                Download PDF
              </button>

              <button
                onClick={() => navigate("/history")}
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "14px",
                  cursor: "pointer",
                }}
              >
                Previous Analyses
              </button>

              <button
                style={{
                  background: "var(--info)",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  padding: "14px",
                  cursor: "pointer",
                }}
              >
                AI Assistant (Soon)
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Assessment;