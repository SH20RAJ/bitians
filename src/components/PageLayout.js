"use client";

import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/ThemeProvider";
import { ArrowLeft, Sun, Moon, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

export function PageLayout({ children, title, subtitle, icon: Icon, backPath = "/" }) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => router.push(backPath)}
                className="btn-scale"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold gradient-text">{title}</h1>
                  {subtitle && (
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="btn-scale">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push("/")}
                className="hidden sm:flex btn-scale"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                BITians.org
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
