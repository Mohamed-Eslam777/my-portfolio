import { PageHeader } from "@/components/PageHeader";
import { PERSONAL_INFO } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Resume() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Resume"
        description="A detailed overview of my qualifications and history."
      />

      <div className="container mx-auto py-16 md:py-20 flex-grow flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-4xl mb-8">
          <h2 className="text-xl font-bold hidden md:block">CV Preview</h2>
          <a href={PERSONAL_INFO.assets.cv} download className="ml-auto">
            <Button size="lg" className="shadow-lg">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </a>
        </div>

        <div className="w-full max-w-4xl h-[800px] bg-gray-100 rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          <iframe
            src="/assets/Mohamed_CV.pdf"
            className="w-full h-full"
            title="Mohamed Eslam CV"
          />
        </div>

        <Alert className="max-w-4xl mt-6 bg-muted/50">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            If the PDF doesn't load, use the Download button above.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
