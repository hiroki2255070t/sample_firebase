import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

import { BookSchema, Book } from "../../../types/book";

export async function getBookList(): Promise<Book[]> {
    const querySnapshot = await getDocs(collection(db, "books"));
  
    const bookList: Book[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const parsed = BookSchema.safeParse(data);
  
      if (!parsed.success) {
        console.error(`Invalid document in bookList: ${doc.id}`, parsed.error);
        throw new Error(`Invalid data in document ${doc.id}`);
      }
  
      return parsed.data;
    });
  
    return bookList;
  }