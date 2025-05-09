import { useLocation } from "wouter";
import { useBible } from "@/hooks/useBible";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import { canonicalOrder } from "@/data/canonicalOrder";

const Home = () => {
  const [location, navigate] = useLocation();
  const { booksList, getBookChapterCount, getTamilBookName } = useBible();

  const handleSelectBook = (bookName: string) => {
    navigate(`/book/${encodeURIComponent(bookName)}`);
  };

  // Arrange books in canonical order
  const orderedBooks = canonicalOrder
    .map(bookName => booksList.find(book => book.bookName === bookName))
    .filter(book => book !== undefined) as typeof booksList;

  return (
    <div className="min-h-screen pb-24">
      <Header title="Tamil KJV" tagline="foodfornewcreature.com" />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {orderedBooks.map((book) => (
            <button
              key={book.bookName}
              onClick={() => handleSelectBook(book.bookName)}
              className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md hover:border-primary dark:hover:border-primary transition-all text-center flex flex-col items-center justify-center"
            >
              <span className="font-medium text-primary-700 dark:text-primary-300">
                {getTamilBookName(book.bookName)}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {getBookChapterCount(book.bookName) > 0 ? `${getBookChapterCount(book.bookName)} அதிகாரம்` : ''}
              </span>
            </button>
          ))}
        </div>
      </main>

      <FooterNav />
    </div>
  );
};

export default Home;
