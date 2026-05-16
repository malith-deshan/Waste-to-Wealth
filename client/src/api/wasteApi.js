const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/waste";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!res.ok) {
    const message =
      data?.error ?? data?.message ?? `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

export function getAllReports() {
  return request("/getall");
}

export function createReport(body) {
  return request("/create", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateReport(id, body) {
  return request(`/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteReport(id) {
  return request(`/delete/${id}`, { method: "DELETE" });
}
