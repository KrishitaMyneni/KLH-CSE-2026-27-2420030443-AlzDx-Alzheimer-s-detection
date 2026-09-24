function ImageCard({ src, title = "Cookie Theft Picture" }) {
  return (
    <div
      className="card"
      style={{
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <p
        style={{
          color: "var(--text-light)",
          marginBottom: "16px",
          fontWeight: "600",
        }}
      >
        {title}
      </p>

      <div
        style={{
          borderRadius: "18px",
          overflow: "hidden",
          background: "#EEF5F3",
          border: "1px solid var(--border)",
        }}
      >
        <img
          src={src}
          alt={title}
          style={{
            width: "100%",
            display: "block",
            objectFit: "contain",
            maxHeight: "520px",
          }}
        />
      </div>

      <p
        style={{
          marginTop: "12px",
          color: "var(--text-light)",
          fontSize: "14px",
        }}
      >
        Please describe everything happening in this picture as naturally as possible.
      </p>
    </div>
  );
}

export default ImageCard;