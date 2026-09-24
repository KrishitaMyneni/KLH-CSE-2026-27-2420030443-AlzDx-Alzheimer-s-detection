import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
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
          👤
        </div>
      </div>

      {analyses.map((analysis) => (
        <div
          key={analysis.id}
          onClick={() => navigate("/report")}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "16px",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 6px" }}>{analysis.date}</h3>

              <p style={{ margin: 0, color: "#666" }}>
                Cookie Theft Assessment
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <strong>{analysis.confidence}</strong>

              <p style={{ margin: "6px 0 0", color: "#2563eb" }}>
                {analysis.prediction}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;