import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

import { HistorySchema, History } from "../../../types/history";

export async function getHistoryList(): Promise<History[]> {
    const querySnapshot = await getDocs(collection(db, "history"));
  
    const historyList: History[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const parsed = HistorySchema.safeParse(data);
  
      if (!parsed.success) {
        console.error(`Invalid document in history: ${doc.id}`, parsed.error);
        throw new Error(`Invalid data in document ${doc.id}`);
      }
  
      return parsed.data;
    });
  
    return historyList;
  }