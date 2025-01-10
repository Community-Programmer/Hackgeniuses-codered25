import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/interview", label: "Mock Interview" },
  { href: "/ai-tutor", label: "Prepare" },
  { href: "/resume", label: "Resume Evaluator" },
  { href: "/feedback", label: "FeedBack" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="w-full font-sans">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-4 py-4 sm:py-3 text-foreground md:px-8 border-b border-gray-200">
        <Link className="flex-shrink-0 mb-2 sm:mb-0" to="/">
          <img
            src="https://i.ibb.co/G9NbtxG/placement-img.png"
            alt="PlacementPilot"
            width={200}
            height={60}
          />
        </Link>
        <div className="w-full px-2 sm:px-4 md:px-8 overflow-hidden">
          <div className="relative overflow-hidden group">
            <div className="animate-marquee whitespace-nowrap group-hover:pause">
              <span className="inline-block mx-4">
                Hi, Welcome to Our Project! Revolutionizing Placement
                Preparation with AI-Powered Personalized Training, Tailored
                Roadmaps, and Realistic Simulations for Your Success.
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm mt-2 sm:mt-0">
          <div className="ml-auto flex-1 sm:flex-initial">
            <div className="flex gap-3 relative">
              <Link to="/signup">
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto gap-1.5 text-sm"
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto gap-1.5 text-sm"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Main Navigation */}
      <nav className="bg-background px-4 py-3 md:px-6 lg:px-8 shadow-[0_4px_6px_-1px_rgba(0,0,255,0.1)]">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button className="md:hidden mr-2" variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-2 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    className="block rounded-lg px-3 py-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground"
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <div className="hidden w-full justify-center items-center space-x-4 md:flex lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="text-base font-medium text-foreground transition-colors hover:text-primary"
                to={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .group:hover .group-hover\\:pause {
          animation-play-state: paused;
        }
      `}</style>
    </header>
  );
}
