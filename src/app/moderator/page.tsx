"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

interface Report {
  id: string;
  reason: string;
  status: string;
  targetType: string;
  createdAt: string;
  reporter?: { id: string; name: string; email: string };
  reportedUser?: { id: string; name: string; email: string };
}

export default function ModeratorDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await api.get<any>("/moderator/reports");
      if (response.success) {
        setReports(response.data.data);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (reportId: string, status: string) => {
    setActionLoading(reportId);
    try {
      const response = await api.patch(`/moderator/reports/${reportId}`, { status });
      if (response.success) {
        toast.success("Status updated");
        fetchReports();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update report");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white tracking-tight">Safety & Support</h1>
          <p className="text-gray-500 dark:text-gray-400">Platform-wide moderation and dispute resolution</p>
        </div>
      </div>

      {/* Role Guide Card */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/10 dark:to-amber-950/10 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white dark:bg-orange-900/30 p-4 rounded-full shadow-sm text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg font-bold text-orange-900 dark:text-orange-300 mb-1">Your Role as a Moderator</h2>
          <p className="text-orange-800/80 dark:text-orange-400/80 text-sm max-w-3xl">
            You are the <strong>Guardian of SkillBridge</strong>. Your job is to review reports from students or tutors about community violations. Use the table below to &quot;Resolve&quot; disputes. Resolving a report means you&apos;ve reviewed the issue and taken necessary internal action.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border dark:border-neutral-800 overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-neutral-800">
          <h2 className="text-xl font-semibold dark:text-white">Recent Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-800 border-b dark:border-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reporter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {format(new Date(report.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    <div className="font-medium">{report.reporter?.name || "Unknown"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    <div className="font-medium">{report.targetType}</div>
                    <div className="text-xs text-gray-500">{report.reportedUser?.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                    {report.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === "PENDING" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500" :
                      report.status === "RESOLVED" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500" :
                      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {report.status === 'PENDING' && (
                      <button
                        onClick={() => updateReportStatus(report.id, 'RESOLVED')}
                        disabled={actionLoading === report.id}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
                      >
                        {actionLoading === report.id ? "Processing..." : "Mark as Resolved"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                    No reports found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
