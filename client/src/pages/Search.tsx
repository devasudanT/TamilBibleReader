import { useEffect } from "react";
import { useBible } from "@/hooks/useBible";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Copy, XCircle } from "lucide-react";
import { useLocation } from "wouter";
import { BibleVerse } from "@/types/bible";

const Search = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    performSearch, 
    fontSize, 
    copyVerse,
    getTamilBookName
  } = useBible();
  
  const [location, navigate] = useLocation();

  // Perform search when page loads if there's a query
  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    }
  }, []);

  const handleSearch = () => {
    performSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleCopyVerse = (result: any) => {
    const verse: BibleVerse = {
      book_name: result.book_name,
      chapter: result.chapter,
      verse: result.verse,
      text: result.text,
      translation_id: 'TAKJV',
      book_id: '' // This is not needed for copying
    };
    
    copyVerse(verse);
  };

  return (
    <div className="min-h-screen pb-24">
      <Header title="Tamil KJV" tagline="foodfornewcreature.com" />
      
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
          Search
        </h2>
        
        <div className="relative mb-6">
          <Input 
            type="text"
            placeholder="வசனங்களைத் தேட..."
            className="w-full px-4 py-3 rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary pr-20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              onClick={clearSearch}
            >
              <XCircle className="h-5 w-5" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            onClick={handleSearch}
          >
            <SearchIcon className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        {searchResults.length > 0 ? (
          <>
            <div className="text-slate-600 dark:text-slate-400 mb-4 text-center">
              {searchResults.length} முடிவுகள் "{searchQuery}"
            </div>
            
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <Card key={index} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm group">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                        {getTamilBookName(result.book_name)} {result.chapter}:{result.verse}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyVerse(result)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-primary dark:hover:text-primary"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy verse</span>
                      </Button>
                    </div>
                    <p 
                      style={{ fontSize: `${fontSize}px` }} 
                      className="mt-2 text-slate-700 dark:text-slate-300"
                      dangerouslySetInnerHTML={{ __html: result.highlighted }}
                    ></p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          searchQuery ? (
            <div className="text-center py-8">
              <div className="flex justify-center">
                <SearchIcon className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="mt-3 text-slate-600 dark:text-slate-400">
                "{searchQuery}" க்கு பொருத்தமான முடிவுகள் இல்லை
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center">
                <SearchIcon className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="mt-3 text-slate-600 dark:text-slate-400">
                வசனங்களைக் கண்டறிய தேடல் சொற்றொடரை உள்ளிடவும்
              </p>
            </div>
          )
        )}
      </main>
      
      <FooterNav />
    </div>
  );
};

export default Search;
