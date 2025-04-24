import { Category } from "@/types/bible";

export const bibleCategories: Category[] = [
  { 
    name: 'Law', 
    books: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'] 
  },
  { 
    name: 'History', 
    books: ['Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther'] 
  },
  { 
    name: 'Poetry', 
    books: ['Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon'] 
  },
  { 
    name: 'Major Prophets', 
    books: ['Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel'] 
  },
  { 
    name: 'Minor Prophets', 
    books: ['Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'] 
  },
  { 
    name: 'Gospels', 
    books: ['Matthew', 'Mark', 'Luke', 'John'] 
  },
  { 
    name: 'History (NT)', 
    books: ['Acts'] 
  },
  { 
    name: 'Pauline Epistles', 
    books: ['Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon'] 
  },
  { 
    name: 'General Epistles', 
    books: ['Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude'] 
  },
  { 
    name: 'Apocalyptic', 
    books: ['Revelation'] 
  }
];
