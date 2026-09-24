import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Brain, History, User } from "lucide-react";

function Layout({ title, subtitle, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Assessment", path: "/assessment", icon: Brain },
    { label: "History", path: "/history", icon: History },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
      }}
    >
      {/* Top Navigation */}
      <header
        style={{
          background: "white",
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Brain size={20} />
            </div>

            <h2 style={{ color: "var(--text)", margin: 0 }}>AlzDx</h2>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background:
                      location.pathname === item.path
                        ? "var(--primary)"
                        : "transparent",
                    color:
                      location.pathname === item.path
                        ? "white"
                        : "var(--text)",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}

            <div
              onClick={() => navigate("/profile")}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "var(--secondary)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "8px",
                color: "var(--text)",
              }}
            >
              <User size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ marginBottom: "8px", fontSize: "36px" }}>{title}</h1>

          {subtitle && (
            <p style={{ color: "var(--text-light)" }}>{subtitle}</p>
          )}
        </div>

        {children}
      </main>
    </div>
  );
}

export default Layout;