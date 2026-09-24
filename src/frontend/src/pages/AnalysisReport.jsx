function AnalysisReport() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "8px" }}>Analysis Report</h1>

      <p style={{ color: "#666", marginBottom: "24px" }}>
        Cookie Theft Picture Assessment • 24 Sept 2026
      </p>

      <div
        style={{
          background: "#2563eb",
          color: "white",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Prediction</h2>

        <h1 style={{ margin: "12px 0", fontSize: "42px" }}>
          Alzheimer's
        </h1>

        <p style={{ margin: 0, fontSize: "18px" }}>
          Confidence: <strong>89.33%</strong>
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "18px",
            padding: "20px",
            minHeight: "260px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Linguistic Analysis</h3>

          <p style={{ color: "#666" }}>
            Linguistic metrics and model explanations will appear here after
            the EXP8 model integration.
          </p>

          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              borderRadius: "12px",
              background: "#f8fafc",
            }}
          >
            <p style={{ margin: 0 }}>
              • Speech fluency metrics
            </p>
            <p style={{ margin: "10px 0 0" }}>
              • Semantic coherence
            </p>
            <p style={{ margin: "10px 0 0" }}>
              • Attention insights
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <button
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
            }}
          >
            Download PDF Report
          </button>

          <button
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
            }}
          >
            View Previous Analyses
          </button>

          <div
            style={{
              marginTop: "20px",
              borderRadius: "18px",
              border: "1px dashed #94a3b8",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "36px" }}>🤖</div>

            <h3 style={{ marginBottom: "10px" }}>
              AI Assistant
            </h3>

            <p
              style={{
                color: "#666",
                fontSize: "14px",
                marginBottom: "18px",
              }}
            >
              Ask questions about this analysis and get explanations.
            </p>

            <button
              style={{
                padding: "12px 18px",
                borderRadius: "999px",
                border: "none",
                background: "#0f172a",
                color: "white",
                cursor: "pointer",
              }}
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisReport;