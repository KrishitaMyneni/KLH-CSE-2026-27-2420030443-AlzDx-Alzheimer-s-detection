import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { fetchAssessments } from "../services/api";

function History() {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetchAssessments()
      .then((records) => { if (active) setAnalyses(records); })
      .catch((err) => { if (active) setError(err.message || "Could not load assessment history."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <main className="history-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: 0 }}>Analysis History</h1>

        <div
          onClick={() => navigate("/profile")}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "2px solid #2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          <User size={20} aria-hidden="true" />
        </div>
      </div>

      {error && <p role="alert" style={{ color: "var(--danger)" }}>{error}</p>}
      {loading ? <p role="status">Loading assessment history...</p> : analyses.length === 0 ? (
        <div className="history-empty">
          <h2 style={{ marginBottom: 7, color: "var(--text)" }}>No previous assessments</h2>
          <p>Your completed screenings will appear here.</p>
        </div>
      ) : analyses.map((analysis) => (
        <button
          type="button"
          className="history-item"
          key={analysis.id}
          onClick={() => navigate("/report")}
          aria-label={`Open assessment from ${new Date(analysis.created_at).toLocaleDateString()}`}
        >
          <div className="history-item-content">
            <div>
              <h3 style={{ margin: "0 0 6px" }}>{new Date(analysis.created_at).toLocaleDateString()}</h3>
              <p style={{ margin: 0, color: "var(--text-light)" }}>Cookie Theft Assessment</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <strong>{Number(analysis.confidence).toFixed(2)}%</strong>
              <p style={{ margin: "6px 0 0", color: "var(--primary-dark)" }}>{analysis.prediction}</p>
            </div>
          </div>
        </button>
      ))}
    </main>
  );
}

export default History;
