"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Camera, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar} from "@/components/photographer/Avatar";


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
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            setMounted(true);
        });

        return () => cancelAnimationFrame(id);
    }, []);


    const handleLogout = async () => {
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-background">
            <nav className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <Camera className="w-6 h-6 text-primary-foreground" />
                            </div>

                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                ImageFinder
                            </span>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-3">
                            {mounted && (
                                <button
                                    onClick={() =>
                                        setTheme(
                                            theme === "dark" ? "light" : "dark"
                                        )
                                    }
                                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                                    aria-label="Toggle theme"
                                >
                                    {theme === "dark" ? (
                                        <Sun className="w-5 h-5 text-accent" />
                                    ) : (
                                        <Moon className="w-5 h-5 text-primary" />
                                    )}
                                </button>
                            )}

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