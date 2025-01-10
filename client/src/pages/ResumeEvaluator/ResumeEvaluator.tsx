import React, { useState } from "react";
import { Settings, Share, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import HashLoader from "react-spinners/HashLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { ScrollArea } from "@/components/ui/scroll-area";

const ResumeEvaluate: React.FC = () => {
  const [previewUrl] = useState("");
  const [responses] = useState<string[]>([]);
  const [isUploaded] = useState(false);

  return (
    <>
      <div className="grid h-screen w-full bg-white">
        <div className="flex flex-col">
          {/* Header Section */}
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 lg:hidden xl:hidden md:hidden">
            <h1 className="text-xl font-semibold">Resume Evaluator</h1>
            {/* Settings Drawer */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Settings className="size-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh] ">
                <DrawerHeader>
                  <DrawerTitle>Upload your Resume</DrawerTitle>
                </DrawerHeader>
                <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                  <fieldset className="grid gap-6 rounded-lg border border-slate-950 p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Upload Resume
                    </legend>
                    <div className="grid gap-3">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="pdffile">Resume file</Label>
                        <Input id="pdffile" type="file" />
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="grid gap-6 rounded-lg border border-slate-950 p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Preview
                    </legend>
                    <div className="p-4">
                      {previewUrl ? (
                        <embed src={previewUrl} className="h-[30vh]" />
                      ) : (
                        <p>No File selected</p>
                      )}
                    </div>
                  </fieldset>
                  <div className="grid gap-3">
                    <Button variant="outline">SUBMIT</Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>

            {/* Share Button */}
            <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
            >
              <Share className="size-3.5" />
              Share
            </Button>
          </header>

          {/* Main Content */}
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 bg-white">
            <div
              className="relative hidden flex-col items-start gap-8 md:flex"
              x-chunk="dashboard-03-chunk-0"
            >
              <div className="grid w-full items-start gap-6 ">
                <fieldset className="grid gap-6 rounded-lg border border-slate-950 p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Upload Resume
                  </legend>
                  <div className="grid gap-3">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="pdffile">Resume file</Label>
                      <Input id="pdffile" type="file" />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border border-slate-950 p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Preview
                  </legend>
                  <div className="p-4">
                    {previewUrl ? (
                      <embed src={previewUrl} className="h-[42vh] w-[25vw]" />
                    ) : (
                      <p>No File selected</p>
                    )}
                  </div>
                </fieldset>
                <div className="grid gap-3">
                  {isUploaded ? (
                    <Button
                      className="bg-emerald-200 text-black"
                      variant="outline"
                      disabled
                    >
                      Resume Processed Successfully
                    </Button>
                  ) : (
                    <Button variant="outline">SUBMIT</Button>
                  )}
                  <Button variant="outline">
                    <Share className="size-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[42vh] flex-col rounded-xl bg-muted/50 lg:col-span-2 bg-white">
              <fieldset className="grid gap-6 rounded-lg border border-slate-950 p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Output
                </legend>

                <ScrollArea className="h-[42vh] rounded-md border border-slate-950 p-4">
                  <div className="flex flex-col gap-3">
                    {responses.map((message, idx) => (
                      <Alert key={idx}>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Chat:</AlertTitle>
                        <AlertDescription>
                          <ReactMarkdown>{message}</ReactMarkdown>
                        </AlertDescription>
                      </Alert>
                    ))}
                    <div className="flex flex-col items-center justify-center">
                      <BeatLoader color="#36d7b7" size={10} />
                      <span className="animate-pulse text-sm">Thinking</span>
                    </div>
                  </div>
                </ScrollArea>
              </fieldset>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ResumeEvaluate;
