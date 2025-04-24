import { useState } from "react";
import { useLocation } from "wouter";
import { Search as SearchIcon } from "lucide-react";
import { useBible } from "@/hooks/useBible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";

const Home = () => {
  const [location, navigate] = useLocation();
  const { categories, getBookChapterCount, searchQuery, setSearchQuery, performSearch } = useBible();
  const [filter, setFilter] = useState("");

  const handleSelectBook = (bookName: string) => {
    navigate(`/book/${encodeURIComponent(bookName)}`);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      performSearch();
      navigate('/search');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Filter categories and books based on the filter
  const filteredCategories = categories.map(category => ({
    ...category,
    books: category.books.filter(book => 
      book.toLowerCase().includes(filter.toLowerCase())
    )
  })).filter(category => category.books.length > 0);

  return (
    <div className="min-h-screen pb-24">
      <Header title="Tamil KJV" />
      
      <main className="container mx-auto px-4 py-6">
        <div className="relative mb-6">
          <Input 
            type="text"
            placeholder="Search for a book or verse..."
            className="w-full px-4 py-3 rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
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

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Filter books..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg"
          />
        </div>

        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <div key={category.name} className="space-y-3">
              <h2 className="text-xl font-semibold text-primary dark:text-primary border-b pb-2 border-slate-200 dark:border-slate-700">
                {category.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {category.books.map((book) => (
                  <button
                    key={book}
                    onClick={() => handleSelectBook(book)}
                    className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center justify-center"
                  >
                    <span className="font-medium text-primary-700 dark:text-primary-300">
                      {book}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {getBookChapterCount(book) > 0 ? `${getBookChapterCount(book)} chapters` : ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <FooterNav />
    </div>
  );
};

export default Home;
