const API_URL = "http://127.0.0.1:8000";

async function readResponse(response, fallback) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.detail || fallback);
  return payload;
}

export async function analyzeAssessment(audioFile, transcript) {
  const formData = new FormData();
  formData.append("file", audioFile, audioFile.name || "recording.webm");
  formData.append("transcript", transcript ?? "");
  const response = await fetch(`${API_URL}/api/assessment/analyze`, {
    method: "POST",
    body: formData,
  });
  return readResponse(response, "Assessment analysis failed.");
}

export async function transcribeAudio(audioFile) {
  const formData = new FormData();
  formData.append("file", audioFile, audioFile.name || "recording.webm");
  const response = await fetch(`${API_URL}/api/transcribe`, {
    method: "POST",
    body: formData,
  });
  return readResponse(response, "Audio transcription failed.");
}

export async function fetchAssessments() {
  const response = await fetch(`${API_URL}/api/assessments`);
  return readResponse(response, "Could not load assessment history.");
}
