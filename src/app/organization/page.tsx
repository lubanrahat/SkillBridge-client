"use client";

import { useEffect, useState, Suspense } from "react";
import { Loader2, Users, BookOpen, DollarSign, BarChart3, TrendingUp, Calendar, ArrowRight, Building2, LayoutDashboard, Target } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";
import api from "@/lib/api";
import { OrganizationBookingsTable } from "@/components/dashboard/organization-bookings-table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

interface Tutor {
  id: string;
  userId: string;
  isVerified: boolean;
  hourlyRate: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function OrganizationDashboard() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "overview";
  
  const setActiveTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
  };

  const [hasOrg, setHasOrg] = useState<boolean | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orgData, setOrgData] = useState<any>(null);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [analytics, setAnalytics] = useState({ 
    totalBookings: 0, 
    completedBookings: 0, 
    revenue: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chartData: [] as any[]
  });
  const [loading, setLoading] = useState(true);
  const [newTutorId, setNewTutorId] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgDesc, setOrgDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const orgRes = await api.get<any>("/organization/me");
      if (!orgRes.success) {
        setHasOrg(false);
        setLoading(false);
        return;
      }

      setHasOrg(true);
      setOrgData(orgRes.data);

      const [tutorsRes, analyticsRes] = await Promise.all([
        api.get<Tutor[]>("/organization/tutors"),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api.get<any>("/organization/analytics")
      ]);

      if (tutorsRes.success && tutorsRes.data) {
        setTutors(tutorsRes.data);
      }
      if (analyticsRes.success && analyticsRes.data) {
        setAnalytics(analyticsRes.data);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message?.includes("not found")) {
        setHasOrg(false);
      } else {
        toast.error(error instanceof Error ? error.message : "Failed to load organization data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await api.post("/organization", { name: orgName, description: orgDesc });
      if (response.success) {
        toast.success("Organization created successfully");
        fetchData();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create organization");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTutorId) return;
    
    setSubmitting(true);
    try {
      const response = await api.post("/organization/add-tutor", { tutorId: newTutorId });
      if (response.success) {
        toast.success("Tutor added successfully");
        setNewTutorId("");
        fetchData();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add tutor");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
  };

  // If no organization, we guide them but allow tab navigation
  const renderSetupWizard = () => (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold dark:text-white leading-tight">
            Welcome to the <span className="text-blue-600">Institute Manager</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Unlock powerful B2B tools to manage multiple tutors, track bulk bookings, and scale your academic business.
          </p>
          <ul className="space-y-4">
            {[
              { title: "Team Management", desc: "Add and monitor tutor performance in one place." },
              { title: "Revenue Insights", desc: "Detailed analytics for your entire organization." },
              { title: "Bulk Bookings", desc: "Oversee all student sessions across your team." }
            ].map((item, id) => (
              <li key={id} className="flex items-start gap-4">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <Target className="h-3 w-3 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-neutral-800"
        >
          <h2 className="text-2xl font-bold dark:text-white mb-6">Setup Your Profile</h2>
          
          <form onSubmit={handleCreateOrg} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
                Institute Name
              </label>
              <input
                type="text"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full rounded-2xl border dark:border-neutral-700 bg-transparent px-4 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                placeholder="e.g. SkillBridge Academy"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
                Description
              </label>
              <textarea
                value={orgDesc}
                onChange={(e) => setOrgDesc(e.target.value)}
                className="w-full h-32 rounded-2xl border dark:border-neutral-700 bg-transparent px-4 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm resize-none text-sm leading-relaxed"
                placeholder="Describe your goals and vision..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !orgName}
              className="group relative w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 overflow-hidden"
            >
              <span className="relative z-10">
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Complete Setup"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );

  const renderLockedState = (title: string) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="bg-gray-100 dark:bg-neutral-800 p-8 rounded-full">
        <Building2 className="h-16 w-16 text-gray-400" />
      </div>
      <div className="max-w-md">
        <h2 className="text-2xl font-bold dark:text-white mb-2">{title} Restricted</h2>
        <p className="text-gray-500 dark:text-gray-400">
          To manage your team and monitor bookings, you must first complete your Institute Setup on the Overview tab.
        </p>
      </div>
      <button 
        onClick={() => setActiveTab("overview")}
        className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all"
      >
        Go to Setup
      </button>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold dark:text-white tracking-tight">
              {orgData?.name || "Institute Dashboard"}
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Strategic Performance & Team Oversight
          </p>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {hasOrg === false ? (
              renderSetupWizard()
            ) : (
              <>
                {/* Contextual Role Guide */}
                <motion.div variants={itemVariants} className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-white dark:bg-blue-900/30 p-4 rounded-full shadow-sm text-blue-600">
                    <LayoutDashboard className="h-8 w-8" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-1">Welcome back, Manager!</h2>
                    <p className="text-blue-700/80 dark:text-blue-400/80 text-sm max-w-2xl leading-relaxed">
                      You are viewing the consolidated analytics for all tutors affiliated with your institute. Use the <strong>Team Management</strong> link in the sidebar to add more experts or monitor individuals.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab("tutors")}
                    className="whitespace-nowrap bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                  >
                    Add Your First Tutor
                  </button>
                </motion.div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Total Bookings", value: analytics.totalBookings, icon: BookOpen, color: "blue" },
                    { label: "Completed Sessions", value: analytics.completedBookings, icon: Users, color: "green" },
                    { label: "Total Revenue", value: `$${analytics.revenue}`, icon: DollarSign, color: "purple" }
                  ].map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      variants={itemVariants}
                      className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 hover:border-blue-500/30 transition-all group cursor-default"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-50 dark:bg-neutral-800 p-3 rounded-xl group-hover:scale-110 transition-transform">
                          <stat.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 tracking-tight">{stat.value}</h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-xl font-bold dark:text-white">Revenue Performance</h2>
                      <p className="text-sm text-gray-500">Real-time earnings tracking across your entire team</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  
                  <div className="h-[350px] w-full">
                    <ChartContainer config={chartConfig}>
                      <AreaChart data={analytics.chartData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-100 dark:stroke-neutral-800" />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fontSize: 12, fill: '#6b7280'}}
                          tickFormatter={(str) => format(new Date(str), "MMM d")}
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#2563eb" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorRevenue)" 
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        )}

        {activeTab === "bookings" && (
          <motion.div
            key="bookings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {hasOrg === false ? (
              renderLockedState("Global Bookings")
            ) : (
              <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold dark:text-white">Global Booking Log</h2>
                    <p className="text-sm text-gray-500">Active monitoring of all sessions across your affiliated tutors</p>
                  </div>
                </div>
                <OrganizationBookingsTable />
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "tutors" && (
          <motion.div
            key="tutors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {hasOrg === false ? (
              <div className="lg:col-span-3">
                {renderLockedState("Team Management")}
              </div>
            ) : (
              <>
                <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden">
                  <div className="px-8 py-6 border-b dark:border-neutral-800 flex items-center justify-between">
                    <h2 className="text-xl font-bold dark:text-white">Professional Roster</h2>
                    <Badge variant="secondary" className="rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-0">
                      {tutors.length} Active Tutors
                    </Badge>
                  </div>
                  <div className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50/50 dark:bg-neutral-800/50 border-b dark:border-neutral-700">
                          <tr>
                            <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Tutor Details</th>
                            <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Pricing</th>
                            <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Verify Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                          {tutors.map((tutor) => (
                            <tr key={tutor.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/20 transition-colors">
                              <td className="px-8 py-5 whitespace-nowrap">
                                <div className="flex flex-col">
                                  <span className="font-bold text-gray-900 dark:text-white text-base">{tutor.user?.name}</span>
                                  <span className="text-xs text-gray-500 font-medium">{tutor.user?.email}</span>
                                </div>
                              </td>
                              <td className="px-8 py-5 whitespace-nowrap">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">${tutor.hourlyRate}</span>
                                <span className="text-xs text-gray-500 ml-1">/hr</span>
                              </td>
                              <td className="px-8 py-5 whitespace-nowrap">
                                <span className={`px-3 py-1 inline-flex text-[10px] font-bold tracking-widest rounded-full border ${
                                  tutor.isVerified 
                                    ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30" 
                                    : "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30"
                                }`}>
                                  {tutor.isVerified ? "MASTERED" : "PENDING"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-neutral-800 h-fit space-y-6">
                  <h2 className="text-xl font-bold dark:text-white">Affiliate New Tutor</h2>
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-5 rounded-2xl">
                    <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed font-medium">
                      Connection requires a unique <strong>Account ID</strong>. Ask your tutor to find this in their dashboard settings to secure the linkage.
                    </p>
                  </div>
                  <form onSubmit={handleAddTutor} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Tutor Account ID</label>
                      <input
                        type="text"
                        required
                        value={newTutorId}
                        onChange={(e) => setNewTutorId(e.target.value)}
                        className="w-full rounded-2xl border dark:border-neutral-700 bg-transparent px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                        placeholder="e.g. user_2n..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting || !newTutorId}
                      className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                      {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Link Advocate"}
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
