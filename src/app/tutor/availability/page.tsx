"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TutorProfile } from "@/types/api";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { tutorService } from "@/lib/services/tutor.service";

type AvailabilityMap = Record<string, string[]>;

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export default function TutorAvailabilityPage() {
  const [availability, setAvailability] = useState<AvailabilityMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSlot, setNewSlot] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const profile = (await tutorService
          .getTutorById("me")
          .catch(() => null)) as TutorProfile | null;

        if (
          profile &&
          profile.availability &&
          typeof profile.availability === "object"
        ) {
          setAvailability(profile.availability as AvailabilityMap);
        } else {
          setAvailability({});
        }
      } catch (error) {
        console.error("Failed to load availability:", error);
      } finally {
        setLoading(false);
      }
    };
    void loadProfile();
  }, []);

  const handleAddSlot = (day: string) => {
    const value = (newSlot[day] || "").trim();
    if (!value) {
      toast.error("Enter a time range like 09:00-12:00");
      return;
    }
    setAvailability((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), value],
    }));
    setNewSlot((prev) => ({ ...prev, [day]: "" }));
  };

  const handleRemoveSlot = (day: string, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: (prev[day] || []).filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await tutorService.updateAvailability({ availability });
      toast.success("Availability updated successfully!");
    } catch (error) {
      console.error("Failed to save availability:", error);
      toast.error("Failed to update availability");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Availability</h1>
        <p className="text-gray-600">
          Set your weekly time slots. Students can only book within these
          ranges.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>
            Use 24-hour format ranges like <code>09:00-12:00</code>,{" "}
            <code>14:00-17:00</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {DAYS.map((day) => {
            const key = day as string;
            const label = day.charAt(0).toUpperCase() + day.slice(1);
            const slots = availability[key] || [];
            return (
              <div
                key={key}
                className="flex flex-col gap-2 rounded-lg border bg-white p-4 md:flex-row md:items-center"
              >
                <div className="w-32 font-medium">{label}</div>
                <div className="flex-1 space-y-2 text-sm text-gray-600">
                  {slots.length === 0 ? (
                    <p className="text-xs text-gray-400">
                      No slots added for this day.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot, idx) => (
                        <button
                          key={`${slot}-${idx}`}
                          type="button"
                          onClick={() => handleRemoveSlot(key, idx)}
                          className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        >
                          {slot}
                          <span className="ml-1 text-blue-500">×</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 md:w-64">
                  <Input
                    placeholder="e.g. 09:00-12:00"
                    value={newSlot[key] || ""}
                    onChange={(e) =>
                      setNewSlot((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => handleAddSlot(key)}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Slot
                  </Button>
                </div>
              </div>
            );
          })}

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-violet-600"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Availability"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
