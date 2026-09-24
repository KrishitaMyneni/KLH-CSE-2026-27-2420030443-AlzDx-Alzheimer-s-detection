const API_URL = "http://127.0.0.1:8000";

export async function transcribeAudio(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/transcribe`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Transcription failed");
  }

  return response.json();
}