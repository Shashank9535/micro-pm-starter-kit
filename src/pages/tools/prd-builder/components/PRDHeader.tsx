
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { PRDState } from "../types";

interface PRDHeaderProps {
  prdState: PRDState;
  setPrdState: React.Dispatch<React.SetStateAction<PRDState>>;
}

const PRDHeader: React.FC<PRDHeaderProps> = ({ prdState, setPrdState }) => {
  return (
    <>
      <div className="flex items-center mb-8">
        <div className="bg-micropm-soft-gray p-3 rounded-lg inline-block mr-4">
          <FileText className="h-6 w-6 text-micropm-purple" />
        </div>
        <h1 className="text-3xl font-bold">PRD Builder</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="prd-title">PRD Title</Label>
                <Input 
                  id="prd-title" 
                  placeholder="E.g., User Authentication Feature" 
                  value={prdState.title}
                  onChange={(e) => setPrdState(prev => ({...prev, title: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="prd-author">Author</Label>
                <Input 
                  id="prd-author" 
                  placeholder="Your name" 
                  value={prdState.author}
                  onChange={(e) => setPrdState(prev => ({...prev, author: e.target.value}))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="prd-date">Date</Label>
                <Input 
                  id="prd-date" 
                  type="date" 
                  value={prdState.date}
                  onChange={(e) => setPrdState(prev => ({...prev, date: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="prd-version">Version</Label>
                <Input 
                  id="prd-version" 
                  placeholder="1.0" 
                  value={prdState.version}
                  onChange={(e) => setPrdState(prev => ({...prev, version: e.target.value}))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PRDHeader;
