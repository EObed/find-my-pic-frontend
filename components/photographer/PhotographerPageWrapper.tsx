"use client";

import { ReactNode } from "react";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar} from "@/components/photographer/Avatar";
import { ThemeToggle } from "@/components/ThemeToggle";


type PhotographerPageWrapperProps = {
    children: ReactNode;
    user: {
        name: string;
        email: string;
    };
};

const PhotographerPageWrapper = ({
                                     children,
                                     user,
                                 }: PhotographerPageWrapperProps) => {

    const router = useRouter();



    const handleLogout = async () => {
        await fetch("/api/auth/session", { method: "DELETE" });
        router.push("/p");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-background">
            <nav className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-sm">
                                <Camera className="h-6 w-6 text-primary-foreground" />
                            </div>

                            <span className="text-xl font-bold text-foreground">
                                ImageFinder
                            </span>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-3">
                            <ThemeToggle />

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center gap-3 rounded-lg p-1 hover:bg-muted transition-colors cursor-pointer">
                                        <Avatar name={user.name} />

                                        <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-sm font-medium text-foreground">
                    {user.name}
                </span>
                                            <span className="text-xs text-muted-foreground">
                    {user.email}
                </span>
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-72">
                                    <div className="px-3 py-2">
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
};

export default PhotographerPageWrapper;