import { createContext, useState, useEffect, ReactNode } from 'react';
import { BibleVerse, BookData, SearchResult } from '@/types/bible';
import { bibleCategories } from '@/data/categories';
import { apiRequest } from '@/lib/queryClient';
import { tamilBookNames } from '../data/tamilBooks';

interface BibleContextType {
  bibleData: BibleVerse[];
  booksList: BookData[];
  isLoading: boolean;
  error: string | null;
  categories: typeof bibleCategories;
  fontSize: number;
  setFontSize: (size: number) => void;
  copyVerse: (verse: BibleVerse) => void;
  isCopied: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  performSearch: () => void;
  getBookChapterCount: (bookName: string) => number;
  getChapterVerses: (bookName: string, chapter: number) => BibleVerse[];
  highlightText: (text: string, query: string) => string;
  getTamilBookName: (englishName: string) => string;
}

export const BibleContext = createContext<BibleContextType | undefined>(undefined);

export const BibleProvider = ({ children }: { children: ReactNode }) => {
  const [bibleData, setBibleData] = useState<BibleVerse[]>([]);
  const [booksList, setBooksList] = useState<BookData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? parseInt(saved, 10) : 18;
  });
  const [isCopied, setIsCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Load Bible data
  useEffect(() => {
    const fetchBibleData = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest('GET', '/api/bible/verses', undefined);
        const data = await response.json();
        setBibleData(data);
        
        // Calculate book chapter counts
        const bookChapters: { [key: string]: number } = {};
        const booksSet = new Set<string>();
        
        data.forEach((verse: BibleVerse) => {
          booksSet.add(verse.book_name);
          
          if (!bookChapters[verse.book_name]) {
            bookChapters[verse.book_name] = verse.chapter;
          } else if (verse.chapter > bookChapters[verse.book_name]) {
            bookChapters[verse.book_name] = verse.chapter;
          }
        });
        
        const books = Array.from(booksSet).map(bookName => ({
          bookName,
          chapters: bookChapters[bookName]
        }));
        
        setBooksList(books);
      } catch (err) {
        setError((err as Error).message || 'Failed to load Bible data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBibleData();
  }, []);

  // Save font size to localStorage
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  // Copy verse to clipboard
  const copyVerse = (verse: BibleVerse) => {
    const tamilBookName = getTamilBookName(verse.book_name);
    const text = `${tamilBookName} ${verse.chapter}:${verse.verse}\n${verse.text}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Get chapter count for a book
  const getBookChapterCount = (bookName: string) => {
    const book = booksList.find(b => b.bookName === bookName);
    return book ? book.chapters : 0;
  };

  // Get verses for a chapter
  const getChapterVerses = (bookName: string, chapter: number) => {
    return bibleData.filter(
      verse => verse.book_name === bookName && verse.chapter === chapter
    );
  };

  // Highlight text for search results
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="verse-highlight">$1</span>');
  };

  // Search functionality
  const performSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = bibleData
      .filter(verse => verse.text.toLowerCase().includes(query))
      .map(verse => ({
        book_name: verse.book_name,
        chapter: verse.chapter,
        verse: verse.verse,
        text: verse.text,
        highlighted: highlightText(verse.text, query)
      }));

    setSearchResults(results);
  };

  // Get Tamil book name
  const getTamilBookName = (englishName: string) => {
    return tamilBookNames[englishName] || englishName;
  };

  const value = {
    bibleData,
    booksList,
    isLoading,
    error,
    categories: bibleCategories,
    fontSize,
    setFontSize,
    copyVerse,
    isCopied,
    searchQuery,
    setSearchQuery,
    searchResults,
    performSearch,
    getBookChapterCount,
    getChapterVerses,
    highlightText,
    getTamilBookName
  };

  return <BibleContext.Provider value={value}>{children}</BibleContext.Provider>;
};
