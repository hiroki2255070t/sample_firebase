import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export async function getSecretData(id: string) {
  const docRef = doc(db, "secrets", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("データが存在しません");
  }
}

export async function saveSecretData(id: string, data: any) {
  const docRef = doc(db, "secrets", id);
  await setDoc(docRef, data);
}

export async function getSecretList() {
    const querySnapshot = await getDocs(collection(db, "secrets"));
    const secrets = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return secrets;
  }