"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authService } from "@/lib/services";
import { toast } from "sonner";
import { Loader2, ChevronDown, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      toast.success("Login successful!");

      // Redirect based on user role
      const user = response.user;

      setTimeout(() => {
        let targetUrl = "/dashboard";
        if (user?.role === "ADMIN") {
          targetUrl = "/admin";
        } else if (user?.role === "TUTOR") {
          targetUrl = "/tutor/dashboard";
        }

        window.location.href = targetUrl;
      }, 500);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-background dark:via-neutral-950 dark:to-neutral-900 p-4">
      <Card className="w-full max-w-md dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link
              href="/"
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
            >
              SkillBridge
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex justify-between items-center border-dashed border-2 hover:bg-muted/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-primary" />
                      <span className="font-medium">Demo User Login</span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)] max-w-md" align="center">
                  <DropdownMenuLabel>Select Demo Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer py-3"
                    onClick={() => {
                      setValue("email", "tanvir.rahman@example.com");
                      setValue("password", "tanvir.rahman@example.com");
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">Admin Profile</span>
                      <span className="text-xs text-muted-foreground">tanvir.rahman@example.com</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer py-3"
                    onClick={() => {
                      setValue("email", "lubanrahat.dev@gmail.com");
                      setValue("password", "lubanrahat.dev@gmail.com");
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">Organizer Profile</span>
                      <span className="text-xs text-muted-foreground">lubanrahat.dev@gmail.com</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer py-3"
                    onClick={() => {
                      setValue("email", "jannat.ara@example.com");
                      setValue("password", "jannat.ara@example.com");
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">Moderator Profile</span>
                      <span className="text-xs text-muted-foreground">jannat.ara@example.com</span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer py-3"
                    onClick={() => {
                      setValue("email", "sabbir.rahman@gmail.com");
                      setValue("password", "sabbir.rahman@gmail.com");
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">Tutor Profile</span>
                      <span className="text-xs text-muted-foreground">sabbir.rahman@gmail.com</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer py-3"
                    onClick={() => {
                      setValue("email", "jnayeem.ahmed@gmail.com");
                      setValue("password", "jnayeem.ahmed@gmail.com");
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">Student Profile</span>
                      <span className="text-xs text-muted-foreground">jnayeem.ahmed@gmail.com</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 mt-5 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
