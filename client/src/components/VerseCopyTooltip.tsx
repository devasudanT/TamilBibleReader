import { useBible } from "@/hooks/useBible";

const VerseCopyTooltip = () => {
  const { isCopied } = useBible();

  if (!isCopied) return null;

  return (
    <div 
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
    >
      Verse Copied
    </div>
  );
};

export default VerseCopyTooltip;
