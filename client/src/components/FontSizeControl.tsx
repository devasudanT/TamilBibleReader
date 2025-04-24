import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FontSizeControlProps {
  fontSize: number;
  setFontSize: (size: number) => void;
}

const FontSizeControl = ({ fontSize, setFontSize }: FontSizeControlProps) => {
  const decreaseFontSize = () => {
    setFontSize(Math.max(14, fontSize - 2));
  };

  const increaseFontSize = () => {
    setFontSize(Math.min(32, fontSize + 2));
  };

  return (
    <div className="flex items-center border dark:border-slate-600 rounded-full">
      <Button
        variant="ghost"
        size="icon"
        onClick={decreaseFontSize}
        className="h-8 w-8 rounded-l-full hover:bg-slate-100 dark:hover:bg-slate-700"
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease font size</span>
      </Button>
      <span className="px-2 text-sm">{fontSize}px</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={increaseFontSize}
        className="h-8 w-8 rounded-r-full hover:bg-slate-100 dark:hover:bg-slate-700"
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase font size</span>
      </Button>
    </div>
  );
};

export default FontSizeControl;
