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
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* Top Navigation */}
      <header
        className="app-header"
      >
        <div className="nav-shell">
          <button
            type="button"
            className="brand-button"
            onClick={() => navigate("/")}
            aria-label="AlzDx home"
          >
            <span className="brand-mark">
              <Brain size={20} />
            </span>
            <h2 style={{ color: "var(--text)", margin: 0 }}>AlzDx</h2>
          </button>

          <div className="nav-actions">
            <nav className="nav-list" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`nav-link${location.pathname === item.path ? " is-active" : ""}`}
                  aria-current={location.pathname === item.path ? "page" : undefined}
                  aria-label={item.label}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            </nav>

            <button
              type="button"
              className="profile-button"
              onClick={() => navigate("/profile")}
              aria-label="Profile"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="page-main">
        <div className="page-heading">
          <h1>{title}</h1>

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
