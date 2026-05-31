/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import {
  Users,
  Trash2,
  FileDown,
  Search,
  CheckCircle,
  Clock,
  XOctagon,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { Submission } from "../types";

interface SubmissionsDashboardProps {
  submissions: Submission[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: Submission["status"]) => void;
  onAddMockLeads: () => void;
}

export default function SubmissionsDashboard({
  submissions,
  onDelete,
  onUpdateStatus,
  onAddMockLeads,
}: SubmissionsDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = submissions.filter((sub) => {
    const matchesSearch =
      sub.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.phoneNumber.includes(searchTerm) ||
      sub.danceDirection.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Submission["status"]) => {
    switch (status) {
      case "new":
        return {
          label: "New Lead",
          className: "bg-emerald-50 text-emerald-800 border-emerald-300",
          icon: <Clock className="w-3 h-3" />,
        };
      case "contacted":
        return {
          label: "In Progress",
          className: "bg-blue-50 text-blue-800 border-blue-300",
          icon: <PhoneCall className="w-3 h-3" />,
        };
      case "confirmed":
        return {
          label: "Enrolled",
          className: "bg-slate-900 text-white border-slate-950",
          icon: <CheckCircle className="w-3 h-3" />,
        };
      case "cancelled":
        return {
          label: "Cancelled",
          className: "bg-slate-50 text-slate-500 border-slate-200",
          icon: <XOctagon className="w-3 h-3" />,
        };
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    const headers =
      "Date,Parent Name,Child Name,Age Group,Dance Style,Start Timeline,Phone,Contact Method,Status\n";
    const rows = submissions
      .map(
        (sub) =>
          `"${new Date(sub.createdAt).toLocaleDateString("en-US")}","${sub.parentName}","${sub.childName}","${sub.childAge}","${sub.danceDirection}","${sub.startDate}","'${sub.phoneNumber}","${sub.preferredContact}","${sub.status}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `leads_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const statusShortLabel: Record<Submission["status"], string> = {
    new: "New",
    contacted: "In Prog",
    confirmed: "Enrolled",
    cancelled: "Cancelled",
  };

  return (
    <div id="leads-dashboard-root" className="bg-white p-6 border-2 border-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-100 border border-slate-200 text-slate-900">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="font-display text-lg font-black text-slate-900 uppercase tracking-tight">
              Lead Dashboard — Mini CRM
            </h2>
          </div>
          <p className="text-slate-500 text-xs mt-1.5 font-sans">
            All quiz submissions stored locally in this browser. Use the demo button to populate sample leads.
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {submissions.length > 0 && (
            <button
              id="export-csv-btn"
              onClick={handleExportCSV}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-2 border-slate-200 text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-slate-500" />
              <span>Export CSV</span>
            </button>
          )}
          <button
            id="add-mock-leads-btn"
            onClick={onAddMockLeads}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer border-2 border-blue-700"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Load Demo Leads</span>
          </button>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div id="no-leads-placeholder" className="text-center py-10">
          <div className="inline-flex p-4 bg-slate-100 text-slate-400 mb-3 border border-slate-200">
            <Search className="w-8 h-8" />
          </div>
          <p className="text-slate-900 font-display font-bold text-sm uppercase">
            No submissions yet
          </p>
          <p className="text-slate-500 text-xs mt-1.5 max-w-md mx-auto font-sans">
            Complete the quiz above to create a lead, or click "Load Demo Leads" to populate sample data.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                id="leads-search-input"
                type="text"
                placeholder="Search by parent, child name, or dance style…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border-2 border-slate-200 bg-slate-50/50 focus:bg-white text-xs outline-none focus:border-slate-900 transition-all font-sans"
              />
            </div>
            <select
              id="leads-status-select-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 border-2 border-slate-200 bg-slate-50/50 focus:bg-white text-xs outline-none focus:border-slate-900 text-slate-700 font-mono font-bold uppercase cursor-pointer"
            >
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="contacted">In Progress</option>
              <option value="confirmed">Enrolled</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border-2 border-slate-900">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-mono font-bold uppercase tracking-wider select-none">
                  <th className="p-4 text-[10px]">Family / Child</th>
                  <th className="p-4 text-[10px]">Contact</th>
                  <th className="p-4 text-[10px]">Style / Age Group</th>
                  <th className="p-4 text-[10px]">Start Timeline</th>
                  <th className="p-4 text-[10px]">Date / Status</th>
                  <th className="p-4 text-[10px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filtered.map((sub) => {
                  const badge = getStatusBadge(sub.status);
                  return (
                    <tr
                      id={`lead-row-${sub.id}`}
                      key={sub.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{sub.parentName}</div>
                        <div className="text-slate-500 mt-0.5 text-xs flex items-center gap-1">
                          <span>Child:</span>
                          <span className="text-slate-900 font-bold">{sub.childName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900 font-mono text-xs">
                          {sub.phoneNumber}
                        </div>
                        <div className="mt-1">
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 font-bold">
                            via {sub.preferredContact}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-xs">{sub.danceDirection}</div>
                        <p className="text-slate-500 mt-0.5 font-mono text-[10px]">
                          {sub.childAge}
                        </p>
                      </td>
                      <td className="p-4 text-slate-700 font-semibold font-mono text-[11px]">
                        {sub.startDate}
                      </td>
                      <td className="p-4">
                        <span className="text-[10px] text-slate-400 font-mono block mb-1.5">
                          {new Date(sub.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 border text-[10px] font-mono font-bold ${badge.className}`}
                        >
                          {badge.icon}
                          <span>{badge.label}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="flex items-center gap-0.5 bg-slate-100 border border-slate-200 p-0.5">
                            {(["new", "contacted", "confirmed", "cancelled"] as const).map((st) => (
                              <button
                                id={`lead-status-btn-${sub.id}-${st}`}
                                key={st}
                                onClick={() => onUpdateStatus(sub.id, st)}
                                title={`Set status: ${st}`}
                                className={`px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
                                  sub.status === st
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                                }`}
                              >
                                {statusShortLabel[st]}
                              </button>
                            ))}
                          </div>
                          <button
                            id={`lead-delete-btn-${sub.id}`}
                            onClick={() => onDelete(sub.id)}
                            className="p-1 px-1.5 border border-slate-200 hover:border-red-500 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && searchTerm && (
            <p className="text-center py-6 text-slate-500 text-xs font-mono">
              No results for "{searchTerm}".
            </p>
          )}
        </div>
      )}
    </div>
  );
}
