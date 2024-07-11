import { FIREBASE_DB } from '@/firebaseConfig';
import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore';
const transCollection = collection(FIREBASE_DB, 'transaction');

export async function deleteMyTodoItem(docId: string) {
  const docRef = doc(transCollection, docId);
  return await deleteDoc(docRef);
}