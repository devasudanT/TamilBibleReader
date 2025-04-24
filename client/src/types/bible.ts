export interface BibleVerse {
  chapter: number;
  verse: number;
  text: string;
  translation_id: string;
  book_id: string;
  book_name: string;
}

export interface Category {
  name: string;
  books: string[];
}

export interface BookData {
  bookName: string;
  chapters: number;
}

export interface SearchResult {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
  highlighted: string;
}
