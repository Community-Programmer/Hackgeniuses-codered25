import React from "react";
import { AudioLines, LineChart, Menu, Search } from "lucide-react";
import { MdQuiz, MdAssignmentAdd } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Outlet } from "react-router-dom";

const InterviewLayout: React.FC = () => {
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link to="/" className="flex items-center gap-2 font-semibold">
                <span className="">Interview Preparation</span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  to="/Interview Helper"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <FaRobot className="h-4 w-4" />
                  Learn Something
                </Link>
                <Link
                  to="/ai-tutor/learning"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <IoBookSharp className="h-4 w-4" />
                  My Preparation
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <MdAssignmentAdd className="h-4 w-4" />
                  Self Assesments
                </Link>
                <Link
                  to="/ai-tutor/quiz"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <MdQuiz className="h-4 w-4" />
                  Quizes
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                </Link>
                <Link
                  to="/ai-tutor/voice-mentor"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <AudioLines className="h-4 w-4"/>
                  Voice-Mentor
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    to="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <span className="sr-only">AI TUTOR</span>
                  </Link>
                  <Link
                    to="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <FaRobot className="h-5 w-5" />
                    Learn Something
                  </Link>
                  <Link
                    to="/ai-tutor/learning"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <IoBookSharp className="h-4 w-4" />
                    My Learnings
                  </Link>
                  <Link
                    to="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <MdAssignmentAdd className="h-5 w-5" />
                    Self Assesments
                  </Link>
                  <Link
                    to="/ai-tutor/quiz"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <MdQuiz className="h-5 w-5" />
                    Quizes
                  </Link>
                  <Link
                    to="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Analytics
                  </Link>
                  <Link
                  to="/ai-tutor/voice-mentor"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <AudioLines className="h-4 w-4"/>
                  Voice-Mentor
                </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default InterviewLayout;