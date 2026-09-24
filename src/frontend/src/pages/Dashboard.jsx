import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout title="Hi, Username!" subtitle="Welcome back to AlzDx.">
      {/* Hero */}
      <div
        style={{
          background: "var(--primary)",
          borderRadius: "28px",
          padding: "40px",
          color: "white",
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <div style={{ maxWidth: "520px" }}>
          <p style={{ opacity: 0.9, marginBottom: "10px" }}>
            Standardized Cookie Theft Assessment
          </p>

          <h2
            style={{
              fontSize: "34px",
              lineHeight: "1.2",
              marginBottom: "14px",
            }}
          >
            Start a new cognitive speech assessment.
          </h2>

          <p style={{ opacity: 0.95, marginBottom: "24px" }}>
            Record or upload a participant's Cookie Theft description for
            analysis using our trained DiBERT model.
          </p>

          <button
            onClick={() => navigate("/assessment")}
            style={{
              background: "white",
              color: "var(--primary)",
              border: "none",
              padding: "14px 24px",
              borderRadius: "999px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Start Assessment →
          </button>
        </div>

        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "56px",
          }}
        >
          🧠
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
          marginBottom: "28px",
        }}
      >
        <div className="card" style={{ padding: "24px" }}>
          <p style={{ color: "var(--text-light)" }}>Total Analyses</p>
          <h1 style={{ color: "var(--primary)", marginTop: "10px" }}>0</h1>
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <p style={{ color: "var(--text-light)" }}>Last Result</p>
          <h2 style={{ marginTop: "10px" }}>—</h2>
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <p style={{ color: "var(--text-light)" }}>Average Confidence</p>
          <h2 style={{ marginTop: "10px", color: "var(--info)" }}>—</h2>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "22px",
        }}
      >
        {/* Recent Activity */}
        <div className="card" style={{ padding: "26px" }}>
          <h3 style={{ marginBottom: "18px" }}>Recent Activity</h3>

          <div
            style={{
              borderLeft: "3px solid var(--secondary)",
              paddingLeft: "16px",
            }}
          >
            <h4 style={{ marginBottom: "6px" }}>No recent assessments</h4>

            <p style={{ color: "var(--text-light)" }}>
              Your latest analyses will appear here.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ padding: "26px" }}>
          <h3 style={{ marginBottom: "18px" }}>Quick Actions</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <button
              onClick={() => navigate("/assessment")}
              style={{
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                cursor: "pointer",
              }}
            >
              New Assessment
            </button>

            <button
              onClick={() => navigate("/history")}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "14px",
                cursor: "pointer",
              }}
            >
              View History
            </button>

            <button
              onClick={() => navigate("/profile")}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "14px",
                cursor: "pointer",
              }}
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;