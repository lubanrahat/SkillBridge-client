import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
            <div className="max-w-2xl w-full text-center space-y-8">
               
                <div className="relative">
                    <h1 className="text-9xl md:text-[200px] font-bold bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-primary to-purple-500" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        Oops! The page you're looking for seems to have wandered off.
                        Let's get you back on track.
                    </p>
                </div>

                <div className="flex justify-center py-6">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center animate-pulse">
                            <Search className="h-12 w-12 text-primary" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-500 opacity-20 blur-xl animate-pulse" />
                    </div>
                </div>                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Link href="/">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2 min-w-[200px] cursor-pointer"
                        >
                            <Home className="h-5 w-5" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/tutors">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 gap-2 min-w-[200px] cursor-pointer"
                        >
                            <Search className="h-5 w-5" />
                            Browse Tutors
                        </Button>
                    </Link>
                </div>

                <div className="pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                        Need help? Visit our{" "}
                        <Link
                            href="/"
                            className="text-primary hover:underline font-medium transition-colors"
                        >
                            homepage
                        </Link>{" "}
                        or{" "}
                        <Link
                            href="/contact"
                            className="text-primary hover:underline font-medium transition-colors"
                        >
                            contact support
                        </Link>
                        .
                    </p>
                </div>

                <div className="absolute top-1/4 left-1/4 h-64 w-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-1/4 right-1/4 h-64 w-64 bg-purple-500/5 rounded-full blur-3xl -z-10" />
            </div>
        </div>
    );
}
