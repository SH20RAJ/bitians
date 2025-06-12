"use client";

import { Button } from "@/components/ui/Button";
import { 
  Home, 
  TrendingUp, 
  Plus, 
  Play, 
  User, 
  Users,
  Calendar,
  Search
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function BottomNavigation({ currentPage = "home" }) {
  const router = useRouter();

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      id: "feeds",
      label: "Feeds",
      icon: TrendingUp,
      href: "/feeds",
    },
    {
      id: "create",
      label: "Create",
      icon: Plus,
      href: "/create",
      isSpecial: true,
    },
    {
      id: "watch",
      label: "Watch",
      icon: Play,
      href: "/watch",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            className={`flex-col space-y-1 h-auto py-2 transition-all ${
              item.isSpecial
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-12 h-12 hover:from-blue-600 hover:to-purple-600"
                : currentPage === item.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => router.push(item.href)}
          >
            {item.isSpecial ? (
              <item.icon className="w-6 h-6" />
            ) : (
              <>
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
