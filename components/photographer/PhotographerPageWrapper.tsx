"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, LogOut, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar} from "@/components/photographer/Avatar";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { logout } from "@/actions/auth";
import { cn } from "@/lib/utils";


type PhotographerPageWrapperProps = {
    children: ReactNode;
    user: {
        name: string;
        email: string;
    };
};

const NAV_ITEMS = [
    { href: "/p/my-events", label: "Events", icon: CalendarDays, exact: false },
    { href: "/p/my-events/new", label: "New event", icon: Plus, exact: true },
];

const PhotographerPageWrapper = ({
                                     children,
                                     user,
                                 }: PhotographerPageWrapperProps) => {
    const pathname = usePathname();

    const isActive = (item: (typeof NAV_ITEMS)[number]) =>
        item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href) && pathname !== "/p/my-events/new";

    return (
        <div className="min-h-screen bg-background">
            <nav className="glass sticky top-0 z-50 border-b border-border">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <Logo href="/p/my-events" />

                        <div className="hidden items-center gap-1 sm:flex">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        isActive(item)
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    className="flex items-center gap-3 rounded-xl p-1 pr-1 transition-colors hover:bg-muted md:pr-3"
                                >
                                    <Avatar name={user.name} size="sm" />
                                    <span className="hidden flex-col items-start text-left md:flex">
                                        <span className="text-sm leading-tight font-medium text-foreground">{user.name}</span>
                                        <span className="text-xs leading-tight text-muted-foreground">{user.email}</span>
                                    </span>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-64">
                                <div className="flex items-center gap-3 px-3 py-2.5">
                                    <Avatar name={user.name} size="sm" />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">{user.name}</p>
                                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>

                                <DropdownMenuSeparator />

                                {/* Mobile-only navigation */}
                                <div className="sm:hidden">
                                    {NAV_ITEMS.map((item) => (
                                        <DropdownMenuItem key={item.href} asChild>
                                            <Link href={item.href} className="cursor-pointer">
                                                <item.icon className="h-4 w-4" />
                                                {item.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                </div>

                                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-destructive focus:text-destructive">
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>

            <div>{children}</div>
        </div>
    );
};

export default PhotographerPageWrapper;
