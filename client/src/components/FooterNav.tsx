import { useLocation } from "wouter";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterNav = () => {
  const [location, navigate] = useLocation();

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
    navigate('/search');
  };

  const isHomePage = location === '/';
  const isSearchPage = location === '/search';
  const canGoBack = !isHomePage && !isSearchPage;

  return (
    <footer className="fixed bottom-0 w-full bg-white dark:bg-slate-800 shadow-lg border-t border-slate-200 dark:border-slate-700">
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
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;
