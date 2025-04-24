import { useParams } from "wouter";
import { useBible } from "@/hooks/useBible";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ChapterVerses = () => {
  const params = useParams<{ bookName: string; chapterNum: string }>();
  const { getChapterVerses, copyVerse, fontSize, isLoading, getTamilBookName } = useBible();
  
  const bookName = decodeURIComponent(params.bookName);
  const tamilBookName = getTamilBookName(bookName);
  const chapterNum = parseInt(params.chapterNum, 10);
  
  const verses = getChapterVerses(bookName, chapterNum);

  if (isLoading) {
    return (
      <div className="min-h-screen pb-24">
        <Header title="Tamil KJV" tagline="foodfornewcreature.com" />
        <main className="container mx-auto px-4 py-6">
          <Skeleton className="h-8 w-64 mb-4 mx-auto" />
          <Card>
            <CardContent className="pt-6 space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex">
                  <Skeleton className="w-10 h-6 mr-3" />
                  <Skeleton className="flex-1 h-6" />
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
        <FooterNav />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-24">
      <Header title="Tamil KJV" tagline="foodfornewcreature.com" />
      
      <main className="w-full py-6 px-2">
        <h2 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
          {tamilBookName} {chapterNum}
        </h2>
        
        <div className="space-y-3">
          {verses.map((verse) => (
            <Card key={verse.verse} className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="flex">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold min-w-8 text-right pr-3 pt-1">
                    {verse.verse}
                  </span>
                  <div className="relative flex-1">
                    <div 
                      style={{ fontSize: `${fontSize}px` }} 
                      className="pr-8"
                    >
                      {verse.text}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyVerse(verse)}
                      className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-primary dark:hover:text-primary"
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy verse</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <FooterNav />
    </div>
  );
};

export default ChapterVerses;
