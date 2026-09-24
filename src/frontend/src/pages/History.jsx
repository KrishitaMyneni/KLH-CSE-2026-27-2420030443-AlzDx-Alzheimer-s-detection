import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

function History() {
  const navigate = useNavigate();

  const analyses = [
    {
      id: 1,
      date: "24 Sept 2026",
      prediction: "Alzheimer's",
      confidence: "89.33%",
    },
    {
      id: 2,
      date: "18 Sept 2026",
      prediction: "Mild Cognitive Impairment",
      confidence: "78.20%",
    },
  ];

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

      {analyses.length === 0 ? (
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
          aria-label={`Open assessment from ${analysis.date}`}
        >
          <div className="history-item-content">
            <div>
              <h3 style={{ margin: "0 0 6px" }}>{analysis.date}</h3>
              <p style={{ margin: 0, color: "var(--text-light)" }}>Cookie Theft Assessment</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <strong>{analysis.confidence}</strong>
              <p style={{ margin: "6px 0 0", color: "var(--primary-dark)" }}>{analysis.prediction}</p>
            </div>
          </div>
        </button>
      ))}
    </main>
  );
}

export default History;
