function ImageCard({ src, title = "Cookie Theft Picture" }) {
  return (
    <div
      className="card"
      style={{
        padding: "clamp(16px, 3vw, 26px)",
        marginBottom: "24px",
      }}
    >
      <p
        style={{
          color: "var(--text)",
          marginBottom: "13px",
          fontWeight: "700",
        }}
      >
        {title}
      </p>

      <div className="image-frame">
        <img
          src={src}
          alt={title}
        />
      </div>

      <p
          style={{ marginTop: "13px", color: "var(--text-light)", fontSize: "14px" }}
      >
        Please describe everything happening in this picture as naturally as possible.
      </p>
    </div>
  );
}

export default ImageCard;
