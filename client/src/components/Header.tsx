import { useLocation } from "wouter";
import { useBible } from "@/hooks/useBible";
import ThemeToggle from "./ThemeToggle";
import FontSizeControl from "./FontSizeControl";

interface HeaderProps {
  title: string;
  tagline?: string;
}

const Header = ({ title, tagline }: HeaderProps) => {
  const [location] = useLocation();
  const { fontSize, setFontSize } = useBible();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
            {title}
          </h1>
          {tagline && (
            <p className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-300 dark:to-purple-300 text-transparent bg-clip-text font-medium">
              {tagline}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <FontSizeControl fontSize={fontSize} setFontSize={setFontSize} />
        </div>
      </div>
    </header>
  );
};

export default Header;
