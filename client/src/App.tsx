import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BookChapters from "@/pages/BookChapters";
import ChapterVerses from "@/pages/ChapterVerses";
import Search from "@/pages/Search";
import { queryClient } from "./lib/queryClient";
import { BibleProvider } from "./context/BibleContext";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/ThemeToggle";
import VerseCopyTooltip from "./components/VerseCopyTooltip";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book/:bookName" component={BookChapters} />
      <Route path="/book/:bookName/chapter/:chapterNum" component={ChapterVerses} />
      <Route path="/search" component={Search} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-pulse text-2xl font-bold">Loading Tamil KJV...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BibleProvider>
          <TooltipProvider>
            <Toaster />
            <VerseCopyTooltip />
            <Router />
          </TooltipProvider>
        </BibleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
