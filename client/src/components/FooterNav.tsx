import { useLocation } from "wouter";
import { Home, ArrowLeft, Search, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useBible } from "@/hooks/useBible";

const FooterNav = () => {
  const [location, navigate] = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);
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

  const goToSearch = () => {
    if (searchQuery.trim()) {
      navigate('/search');
    } else {
      setShowSearchBar(!showSearchBar);
    }
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
      {showSearchBar && (
        <div className="container mx-auto px-4 py-2 border-b border-slate-200 dark:border-slate-700">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search verse"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-3 pr-10 py-2 rounded-lg"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearchBar(false)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
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
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={goToSearch}
            className="p-3 text-primary dark:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Search className="h-6 w-6" />
            <span className="sr-only">Search</span>
          </Button>
          
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
