
import { Button } from "@/components/ui/button";
import { Copy, Download, FileDown, Save } from "lucide-react";

interface ActionButtonsProps {
  savePRD: () => void;
  downloadPRD: () => void;
  downloadPDF: () => void;
  copyToClipboard: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  savePRD,
  downloadPRD,
  downloadPDF,
  copyToClipboard
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Button onClick={savePRD} className="micropm-btn flex-1">
        <Save size={16} className="mr-2" /> Save PRD
      </Button>
      <Button onClick={downloadPRD} variant="outline" className="micropm-btn-outline flex-1">
        <Download size={16} className="mr-2" /> Download as Markdown
      </Button>
      <Button onClick={downloadPDF} variant="outline" className="micropm-btn-outline flex-1">
        <FileDown size={16} className="mr-2" /> Export as PDF
      </Button>
      <Button onClick={copyToClipboard} variant="outline" className="micropm-btn-outline flex-1">
        <Copy size={16} className="mr-2" /> Copy to Clipboard
      </Button>
    </div>
  );
};

export default ActionButtons;
