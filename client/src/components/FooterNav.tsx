import { useLocation } from "wouter";
import { Home, ArrowLeft, Search, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBible } from "@/hooks/useBible";

const FooterNav = () => {
  const [location, navigate] = useLocation();
  const { searchQuery, setSearchQuery } = useBible();
  
  const goBack = () => {
    if (location.includes('/chapter/')) {
      // From verse view to chapter view
      const bookPath = location.split('/chapter/')[0];
      navigate(bookPath);
    } else if (location.startsWith('/book/')) {
      // From chapter view to books list
      navigate('/');
    }
  };

  const goHome = () => {
    navigate('/');
  };
  
  const goToAbout = () => {
    navigate('/about');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate('/search');
    }
  };

  const isHomePage = location === '/';
  const isSearchPage = location === '/search';
  const isAboutPage = location === '/about';
  const canGoBack = !isHomePage && !isSearchPage && !isAboutPage;

  return (
    <footer className="fixed bottom-0 w-full bg-white dark:bg-slate-800 shadow-lg border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={goBack}
            disabled={!canGoBack}
            className={`p-3 text-primary dark:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 ${!canGoBack ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Go back</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={goHome}
            className="p-3 text-primary dark:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Home className="h-6 w-6" />
            <span className="sr-only">Go home</span>
          </Button>
          
          <div className="relative flex-1 mx-2">
            <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-full">
              <Search className="h-5 w-5 ml-3 text-slate-500 dark:text-slate-400" />
              <Input
                type="text"
                placeholder="Search verse"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchQuery('')}
                  className="p-1 mr-1"
                >
                  <X className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </Button>
              )}
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={goToAbout}
            className="p-3 text-primary dark:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Info className="h-6 w-6" />
            <span className="sr-only">About App</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;
