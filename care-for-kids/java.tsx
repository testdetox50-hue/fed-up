// Standalone TypeScript example for testing; not loaded by the website.
export interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

export const books: ReadonlyArray<Book> = [
  { id: 1, title: 'The Hobbit', author: 'J. R. R. Tolkien', available: true },
  { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', available: false },
  { id: 3, title: 'A Christmas Carol', author: 'Charles Dickens', available: true },
];