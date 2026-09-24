import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Brain,
  ClipboardList,
  FileDown,
  History,
  ShieldCheck,
} from "lucide-react";
import Layout from "../components/Layout";

function AnalysisReport() {
  const navigate = useNavigate();
  const prediction = "Alzheimer's";
  const confidence = 89.33;
  const confidenceCircumference = 2 * Math.PI * 49;

  return (
    <Layout
      title="Analysis Report"
      subtitle="Cookie Theft speech assessment results"
    >
      <section className="result-summary" aria-labelledby="report-prediction">
        <div>
          <span className="status-pill"><ShieldCheck size={15} /> Screening Result</span>
          <h2 id="report-prediction" className="result-title">{prediction}</h2>
          <p className="result-copy">Your speech assessment screening outcome</p>
        </div>
        <svg
          className="confidence-ring"
          viewBox="0 0 120 120"
          role="img"
          aria-label={`Confidence ${confidence}%`}
        >
          <circle cx="60" cy="60" r="49" fill="none" stroke="#e6efec" strokeWidth="9" />
          <circle
            cx="60" cy="60" r="49" fill="none" stroke="var(--primary)" strokeWidth="9"
            strokeLinecap="round" strokeDasharray={confidenceCircumference}
            strokeDashoffset={confidenceCircumference * (1 - confidence / 100)}
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="57" textAnchor="middle" fill="var(--text)" fontSize="23" fontWeight="750">
            {confidence}%
          </text>
          <text x="60" y="75" textAnchor="middle" fill="var(--text-light)" fontSize="10">
            confidence
          </text>
        </svg>
      </section>

      <section className="report-stat-grid" aria-label="Assessment details">
        <article className="card report-stat">
          <span className="metric-icon"><Brain size={19} /></span>
          <div><p>Model Used</p><h3>EXP8</h3></div>
        </article>
        <article className="card report-stat">
          <span className="metric-icon"><ClipboardList size={19} /></span>
          <div><p>Assessment</p><h3>Cookie Theft</h3></div>
        </article>
        <article className="card report-stat">
          <span className="metric-icon"><ShieldCheck size={19} /></span>
          <div><p>Status</p><h3>Completed</h3></div>
        </article>
      </section>

      <section className="card report-explanation" aria-labelledby="report-analysis-heading">
        <div className="report-section-heading">
          <span className="metric-icon"><Brain size={19} /></span>
          <div>
            <h2 id="report-analysis-heading">Linguistic Analysis</h2>
            <p>Speech patterns associated with this assessment</p>
          </div>
        </div>
        <p className="report-explanation-copy">
          Linguistic metrics and model explanations will appear here after the final EXP8 analysis integration.
        </p>
        <div className="report-insight-list">
          <div><span className="insight-dot" />Speech fluency metrics</div>
          <div><span className="insight-dot" />Semantic coherence</div>
          <div><span className="insight-dot" />Attention insights</div>
        </div>
      </section>

      <div className="report-action-grid">
        <button type="button" className="button button-primary">
          <FileDown size={18} /> Download PDF Report
        </button>
        <button type="button" className="button button-secondary" onClick={() => navigate("/history")}>
          <History size={18} /> View Previous Analyses
        </button>
        <button type="button" className="button button-secondary" onClick={() => navigate("/assessment")}>
          <ArrowRight size={18} /> New Assessment
        </button>
      </div>

      <aside className="assistant-teaser">
        <span className="metric-icon"><Bot size={20} /></span>
        <div>
          <h3>AI Assistant</h3>
          <p>Explanations and questions about your report will be available in a future update.</p>
        </div>
        <span className="status-pill">Coming Soon</span>
      </aside>

      <p className="medical-disclaimer">
        This result is for educational screening only and is not a diagnosis. Please discuss health concerns with a qualified healthcare professional.
      </p>
    </Layout>
  );
}

export default AnalysisReport;
