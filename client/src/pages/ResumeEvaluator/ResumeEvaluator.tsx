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
import BeatLoader from "react-spinners/BeatLoader";
import { ScrollArea } from "@/components/ui/scroll-area";

const ResumeEvaluate: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const fileInput = document.getElementById("pdffile") as HTMLInputElement;

    if (!fileInput?.files?.length) {
      alert("Please upload a file!");
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const response = await fetch("http://localhost:8000/api/v1/resume/evaluate-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process resume");
      }

      const result = await response.json();
      setEvaluation(result.normal_evaluation); // Extracting the "normal_evaluation"
    } catch (error) {
      console.error(error);
      alert("Error while evaluating resume.");
    } finally {
      setIsUploading(false);
    }
  };

  const renderEvaluation = () => {
    if (!evaluation) return <p>No Responses Yet</p>;
  
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Evaluation Report</h2>
  
        {/* Normal Evaluation */}
        <div>
          <strong>Overall Feedback:</strong>
          <ul>
            <li>
              <strong>Tone:</strong> {evaluation?.normal_evaluation?.overall_feedback?.tone || "N/A"}
            </li>
            <li>
              <strong>Grammar and Spelling:</strong> {evaluation?.normal_evaluation?.overall_feedback?.grammar_and_spelling || "N/A"}
            </li>
            <li>
              <strong>Flow and Readability:</strong> {evaluation?.normal_evaluation?.overall_feedback?.flow_and_readability || "N/A"}
            </li>
          </ul>
        </div>
  
        <div>
          <strong>Strengths:</strong>
          <ul>
            {evaluation?.normal_evaluation?.strengths?.length > 0
              ? evaluation.normal_evaluation.strengths.map((strength: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                  <li key={index}>{strength}</li>
                ))
              : "No strengths listed"}
          </ul>
        </div>
  
        <div>
          <strong>Weaknesses:</strong>
          <ul>
            {evaluation?.normal_evaluation?.weaknesses?.length > 0
              ? evaluation.normal_evaluation.weaknesses.map((weakness: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                  <li key={index}>{weakness}</li>
                ))
              : "No weaknesses listed"}
          </ul>
        </div>
  
        {/* Detailed Feedback */}
        {evaluation?.normal_evaluation?.detailed_feedback &&
          Object.keys(evaluation.normal_evaluation.detailed_feedback).map((section, index) => (
            <div key={index}>
              <strong>{section.replace("_", " ").toUpperCase()}:</strong>
              <p>{evaluation.normal_evaluation.detailed_feedback[section]?.feedback || "N/A"}</p>
              <strong>Suggestions:</strong>
              <ul>
                {evaluation.normal_evaluation.detailed_feedback[section]?.suggestions?.length > 0
                  ? evaluation.normal_evaluation.detailed_feedback[section].suggestions.map((suggestion: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, subIndex: React.Key | null | undefined) => (
                      <li key={subIndex}>{suggestion}</li>
                    ))
                  : "No suggestions provided"}
              </ul>
            </div>
          ))}
  
        {/* ATS Evaluation */}
        {evaluation.ats_evaluation && (
          <div>
            <h3 className="text-md font-semibold">ATS Evaluation</h3>
  
            <div>
              <strong>Overall Score:</strong> {evaluation.ats_evaluation.overall_score}
            </div>
  
            <div>
              <strong>Sections:</strong>
              {Object.keys(evaluation.ats_evaluation.sections).map((section, index) => (
                <div key={index}>
                  <strong>{section.replace("_", " ").toUpperCase()}:</strong>
                  <ul>
                    <li>
                      <strong>Status:</strong> {evaluation.ats_evaluation.sections[section].status}
                    </li>
                    <li>
                      <strong>Issues:</strong>
                      <ul>
                        {evaluation.ats_evaluation.sections[section].issues.length > 0
                          ? evaluation.ats_evaluation.sections[section].issues.map((issue: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, subIndex: React.Key | null | undefined) => (
                              <li key={subIndex}>{issue}</li>
                            ))
                          : "No issues listed"}
                      </ul>
                    </li>
                    <li>
                      <strong>Recommendations:</strong>
                      <ul>
                        {evaluation.ats_evaluation.sections[section].recommendations.length > 0
                          ? evaluation.ats_evaluation.sections[section].recommendations.map((rec: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, subIndex: React.Key | null | undefined) => (
                              <li key={subIndex}>{rec}</li>
                            ))
                          : "No recommendations listed"}
                      </ul>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
  
            <div>
              <strong>Keyword Analysis:</strong>
              <ul>
                <li>
                  <strong>Matched Keywords:</strong> {evaluation.ats_evaluation.keyword_analysis.matched_keywords.join(", ") || "N/A"}
                </li>
                <li>
                  <strong>Missing Keywords:</strong> {evaluation.ats_evaluation.keyword_analysis.missing_keywords.join(", ") || "N/A"}
                </li>
                <li>
                  <strong>Recommendations:</strong>
                  <ul>
                    {evaluation.ats_evaluation.keyword_analysis.recommendations.length > 0
                      ? evaluation.ats_evaluation.keyword_analysis.recommendations.map((rec: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                          <li key={index}>{rec}</li>
                        ))
                      : "No recommendations listed"}
                  </ul>
                </li>
              </ul>
            </div>
  
            <div>
              <strong>Formatting Analysis:</strong>
              <ul>
                <li>
                  <strong>Readability Score:</strong> {evaluation.ats_evaluation.formatting_analysis.readability_score || "N/A"}
                </li>
                <li>
                  <strong>Font Consistency:</strong> {evaluation.ats_evaluation.formatting_analysis.font_consistency || "N/A"}
                </li>
                <li>
                  <strong>Bullet Point Usage:</strong> {evaluation.ats_evaluation.formatting_analysis.bullet_point_usage || "N/A"}
                </li>
                <li>
                  <strong>Section Spacing:</strong> {evaluation.ats_evaluation.formatting_analysis.section_spacing || "N/A"}
                </li>
                <li>
                  <strong>Recommendations:</strong>
                  <ul>
                    {evaluation.ats_evaluation.formatting_analysis.recommendations.length > 0
                      ? evaluation.ats_evaluation.formatting_analysis.recommendations.map((rec: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                          <li key={index}>{rec}</li>
                        ))
                      : "No recommendations listed"}
                  </ul>
                </li>
              </ul>
            </div>
  
            <div>
              <strong>Final Recommendations:</strong>
              <ul>
                {evaluation.ats_evaluation.final_recommendations.length > 0
                  ? evaluation.ats_evaluation.final_recommendations.map((rec: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                      <li key={index}>{rec}</li>
                    ))
                  : "No recommendations provided"}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  

  return (
    <>
      <div className="grid h-screen w-full bg-white">
        <div className="flex flex-col">
          {/* Header Section */}
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 lg:hidden xl:hidden md:hidden">
            <h1 className="text-xl font-semibold">Resume Evaluator</h1>
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
                    <legend>Upload Resume</legend>
                    <div className="grid gap-3">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="pdffile">Resume file</Label>
                        <Input id="pdffile" type="file" onChange={handleFileChange} />
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="grid gap-6 rounded-lg border border-slate-950 p-4">
                    <legend>Preview</legend>
                    <div className="p-4">
                      {previewUrl ? (
                        <embed src={previewUrl} className="h-[30vh]" />
                      ) : (
                        <p>No File selected</p>
                      )}
                    </div>
                  </fieldset>
                  <div className="grid gap-3">
                    <Button variant="outline" onClick={handleSubmit}>
                      SUBMIT
                    </Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </header>

          {/* Main Content */}
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 bg-white">
            <div className="relative hidden flex-col items-start gap-8 md:flex">
              <div className="grid w-full items-start gap-6">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend>Upload Resume</legend>
                  <div className="grid gap-3">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="pdffile">Resume file</Label>
                      <Input id="pdffile" type="file" onChange={handleFileChange} />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend>Preview</legend>
                  <div className="p-4">
                    {previewUrl ? (
                      <embed src={previewUrl} className="h-[42vh] w-[25vw]" />
                    ) : (
                      <p>No File selected</p>
                    )}
                  </div>
                </fieldset>
                <div className="grid gap-3">
                  <Button variant="outline" onClick={handleSubmit}>
                    SUBMIT
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[80vh] flex-col rounded-xl bg-muted/50 lg:col-span-2">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend>Output</legend>
                <ScrollArea className="h-[80vh] rounded-md border p-4">
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center">
                      <BeatLoader color="#36d7b7" size={10} />
                      <span className="animate-pulse text-sm">Processing...</span>
                    </div>
                  ) : (
                    renderEvaluation()
                  )}
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
