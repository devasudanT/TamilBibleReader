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
        <Header title={`${tamilBookName} ${chapterNum}`} />
        <main className="container mx-auto px-4 py-6">
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
      <Header title={`${tamilBookName} ${chapterNum}`} />
      
      <main className="container mx-auto px-4 py-6">
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
          <CardContent className="pt-6 space-y-4">
            {verses.map((verse) => (
              <div key={verse.verse} className="group relative">
                <div className="flex">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold w-10 text-right pr-3">
                    {verse.verse}
                  </span>
                  <div 
                    style={{ fontSize: `${fontSize}px` }} 
                    className="flex-1"
                  >
                    {verse.text}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyVerse(verse)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-400 hover:text-primary dark:hover:text-primary"
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy verse</span>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
      
      <FooterNav />
    </div>
  );
};

export default ChapterVerses;
