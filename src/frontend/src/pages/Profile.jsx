import Layout from "../components/Layout";

function Profile() {
  return (
    <Layout
      title="Profile"
      subtitle="Manage your account and assessment preferences."
    >
      <div
        className="card"
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {/* Profile Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "50%",
              background: "var(--secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
            }}
          >
            👤
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: "6px" }}>Username</h2>
            <p style={{ color: "var(--text-light)" }}>
              username@example.com
            </p>
          </div>

          <button
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "10px 18px",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
        </div>

        <div
          style={{
            height: "1px",
            background: "var(--border)",
          }}
        />

        {/* Account Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <button
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              background: "var(--primary)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            View Analysis History
          </button>

          <button
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Download Reports
          </button>

          <button
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid rgba(195,90,90,0.25)",
              background: "white",
              color: "var(--danger)",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;