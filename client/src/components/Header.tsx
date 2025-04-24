import { useLocation } from "wouter";
import { useBible } from "@/hooks/useBible";
import ThemeToggle from "./ThemeToggle";
import FontSizeControl from "./FontSizeControl";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [location] = useLocation();
  const { fontSize, setFontSize } = useBible();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary dark:text-primary">{title}</h1>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <FontSizeControl fontSize={fontSize} setFontSize={setFontSize} />
        </div>
      </div>
    </header>
  );
};

export default Header;
