import { useParams, useLocation } from "wouter";
import { useBible } from "@/hooks/useBible";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import { Skeleton } from "@/components/ui/skeleton";

const BookChapters = () => {
  const params = useParams<{ bookName: string }>();
  const [location, navigate] = useLocation();
  const { getBookChapterCount, isLoading, getTamilBookName } = useBible();
  
  const bookName = decodeURIComponent(params.bookName);
  const tamilBookName = getTamilBookName(bookName);
  const chapterCount = getBookChapterCount(bookName);
  
  const handleSelectChapter = (chapter: number) => {
    navigate(`/book/${encodeURIComponent(bookName)}/chapter/${chapter}`);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen pb-24">
        <Header title="Tamil KJV" tagline="foodfornewcreature.com" />
        <main className="container mx-auto px-4 py-6">
          <Skeleton className="h-8 w-64 mb-4 mx-auto" />
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square h-16 rounded-lg" />
            ))}
          </div>
        </main>
        <FooterNav />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-24">
      <Header title="Tamil KJV" tagline="foodfornewcreature.com" />
      
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
          {tamilBookName}
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {Array.from({ length: chapterCount }, (_, i) => i + 1).map((chapter) => (
            <button
              key={chapter}
              onClick={() => handleSelectChapter(chapter)}
              className="aspect-square flex items-center justify-center p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md hover:border-primary dark:hover:border-primary transition-all"
            >
              <span className="text-lg font-medium">{chapter}</span>
            </button>
          ))}
        </div>
      </main>
      
      <FooterNav />
    </div>
  );
};

export default BookChapters;
