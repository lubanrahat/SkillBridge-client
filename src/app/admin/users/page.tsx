"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  adminService,
  type AdminUserSummary,
} from "@/lib/services/admin.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [roleFilter, setRoleFilter] = useState<
    "ALL" | "STUDENT" | "TUTOR" | "ADMIN"
  >("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await adminService.getUsers({
        role: roleFilter === "ALL" ? undefined : roleFilter,
        search: search || undefined,
        page,
        limit: 9,
      });
      setUsers(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Failed to load users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleFilter, page]);

  const handleSearch = () => {
    setPage(1);
    void loadUsers();
  };

  const handleStatusUpdate = async (
    userId: string,
    status: "ACTIVE" | "BAN",
  ) => {
    setUpdatingId(userId);
    try {
      const res = await adminService.updateUserStatus(userId, status);
      toast.success(res.message);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">View and moderate all platform users</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-64"
          />
          <Button variant="outline" onClick={handleSearch}>
            Search
          </Button>
          <Select
            value={roleFilter}
            onValueChange={(val) =>
              setRoleFilter(val as "ALL" | "STUDENT" | "TUTOR" | "ADMIN")
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All roles</SelectItem>
              <SelectItem value="STUDENT">Students</SelectItem>
              <SelectItem value="TUTOR">Tutors</SelectItem>
              <SelectItem value="ADMIN">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          ) : users.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-12">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800 text-left text-gray-700 dark:text-gray-300">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b dark:border-neutral-800 last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors text-gray-900 dark:text-gray-300">
                      <td className="px-4 py-3 font-medium dark:text-gray-100">{user.name}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-gray-700 dark:text-gray-300">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 space-x-2">
                        {user.role !== "ADMIN" && (
                          <>
                            {user.status === "BAN" ? (
                              <Button
                                variant="outline"
                                className=" cursor-pointer"
                                size="sm"
                                disabled={updatingId === user.id}
                                onClick={() =>
                                  handleStatusUpdate(user.id, "ACTIVE")
                                }
                              >
                                Unban
                              </Button>
                            ) : (
                              <Button
                                variant="destructive"
                                className=" cursor-pointer"
                                size="sm"
                                disabled={updatingId === user.id}
                                onClick={() =>
                                  handleStatusUpdate(user.id, "BAN")
                                }
                              >
                                Ban
                              </Button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="sm"
                    className="w-9 h-9 p-0"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
