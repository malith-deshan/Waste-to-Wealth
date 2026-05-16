import { useCallback, useEffect, useState } from "react";
import {
  createReport,
  deleteReport,
  getAllReports,
  updateReport,
} from "../api/wasteApi.js";

const WASTE_TYPES = ["Plastic", "Metal", "Paper", "Glass", "Organic", "E-waste", "Other"];

const emptyForm = { description: "", location: "", wasteType: WASTE_TYPES[0] };

export default function WasteLog() {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const loadReports = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await getAllReports();
      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message ?? "Could not connect to the server.");
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const startEdit = (report) => {
    setEditingId(report._id);
    setForm({
      description: report.description,
      location: report.location,
      wasteType: report.wasteType,
    });
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (editingId) {
        const updated = await updateReport(editingId, form);
        setReports((prev) =>
          prev.map((r) => (r._id === editingId ? updated : r))
        );
        cancelEdit();
      } else {
        const created = await createReport(form);
        setReports((prev) => [created, ...prev]);
        setForm(emptyForm);
      }
    } catch (err) {
      setError(err.message ?? "Could not save report.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this waste report?")) return;
    setDeletingId(id);
    setError(null);
    try {
      await deleteReport(id);
      setReports((prev) => prev.filter((r) => r._id !== id));
      if (editingId === id) cancelEdit();
    } catch (err) {
      setError(err.message ?? "Could not delete report.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 text-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Community
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Waste-to-Wealth Log
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Log recyclable waste in your area so collectors and recyclers can turn it into value.
          </p>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {error}
          </div>
        )}

        <section className="mb-10 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm shadow-emerald-100/50">
          <h2 className="text-lg font-semibold text-slate-900">
            {editingId ? "Edit report" : "New report"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Describe the waste, where it is, and what type it is.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="e.g. Bags of clean plastic bottles near the market"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Location</span>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="Neighborhood, landmark, or address"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Waste type</span>
              <select
                name="wasteType"
                value={form.wasteType}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {WASTE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Saving…"
                  : editingId
                    ? "Save changes"
                    : "Submit report"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={submitting}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Reports</h2>
            <button
              type="button"
              onClick={loadReports}
              disabled={loading}
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800 disabled:opacity-50"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-center text-sm text-slate-500">Loading reports…</p>
          ) : reports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-12 text-center">
              <p className="text-slate-600">No reports yet. Be the first to log waste in your community.</p>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {reports.map((report) => (
                <li
                  key={report._id}
                  className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                      {report.wasteType}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        report.status === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {report.status ?? "Pending"}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                    {report.description}
                  </p>
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
                    <svg
                      className="h-4 w-4 shrink-0 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {report.location}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(report)}
                      disabled={deletingId === report._id}
                      className="flex-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100 disabled:opacity-60"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(report._id)}
                      disabled={deletingId === report._id}
                      className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === report._id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
