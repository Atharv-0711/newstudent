import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  userName?: string;
  userAvatar?: string;
}

const Navbar = ({
  userName = "Sarah Johnson",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-background border-b border-border py-4 px-6 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold">SurveyInsight</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/dashboard"
            className="text-foreground hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/students"
            className="text-foreground hover:text-primary transition-colors"
          >
            Students
          </Link>
          <Link
            href="/surveys"
            className="text-foreground hover:text-primary transition-colors"
          >
            Surveys
          </Link>
          <Link
            href="/reports"
            className="text-foreground hover:text-primary transition-colors"
          >
            Reports
          </Link>
        </div>

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 pb-4">
          <Link
            href="/dashboard"
            className="block px-2 py-2 text-foreground hover:bg-muted rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/students"
            className="block px-2 py-2 text-foreground hover:bg-muted rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Students
          </Link>
          <Link
            href="/surveys"
            className="block px-2 py-2 text-foreground hover:bg-muted rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Surveys
          </Link>
          <Link
            href="/reports"
            className="block px-2 py-2 text-foreground hover:bg-muted rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Reports
          </Link>
          <div className="flex items-center space-x-4 pt-2 border-t border-border">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{userName}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
