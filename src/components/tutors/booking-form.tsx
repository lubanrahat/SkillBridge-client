"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { bookingService } from "@/lib/services/booking.service";

const bookingSchema = z.object({
  startTime: z.string().min(1, "Please select a start time"),
  endTime: z.string().min(1, "Please select an end time"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  tutorId: string;
  tutorName: string;
  hourlyRate: number;
}

export function BookingForm({
  tutorId,
  tutorName,
  hourlyRate,
}: BookingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // We compute ISO datetimes on submit; keep form validation simple.
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    setValue("startTime", time);
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    setValue("endTime", time);
  };

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const start = parseInt(startTime.split(":")[0]);
    const end = parseInt(endTime.split(":")[0]);
    return Math.max(0, end - start);
  };

  const totalCost = calculateDuration() * hourlyRate;

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    try {
      if (!selectedDate) {
        toast.error("Please select a date");
        return;
      }

      // Backend expects RFC3339 datetimes; use ISO strings with timezone (Z).
      const [startH, startM] = data.startTime.split(":").map(Number);
      const [endH, endM] = data.endTime.split(":").map(Number);

      const start = new Date(selectedDate);
      start.setHours(startH, startM, 0, 0);

      const end = new Date(selectedDate);
      end.setHours(endH, endM, 0, 0);

      await bookingService.createBooking({
        tutorId,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });
      toast.success("Booking created successfully!");
      router.push("/dashboard/bookings");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create booking";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book a Session</CardTitle>
        <CardDescription>
          Book a tutoring session with {tutorName}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
            {errors.startTime && (
              <p className="text-sm text-red-500">{errors.startTime.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Select
                onValueChange={handleStartTimeChange}
                disabled={!selectedDate}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>End Time</Label>
              <Select onValueChange={handleEndTimeChange} disabled={!startTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      disabled={time <= startTime}
                    >
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.endTime && (
                <p className="text-sm text-red-500">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Selected date:{" "}
              <span className="font-medium">
                {selectedDate ? format(selectedDate, "PPP") : "—"}
              </span>
            </p>
          </div>

          {totalCost > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="font-medium">
                  {calculateDuration()} hour(s)
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">Total Cost:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${totalCost}
                </span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 mt-5 cursor-pointer"
            disabled={isLoading || !selectedDate || !startTime || !endTime}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
