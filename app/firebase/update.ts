import { FIREBASE_DB } from '@/firebaseConfig';
import { getFirestore, collection, doc, updateDoc } from 'firebase/firestore';
const transCollection = collection(FIREBASE_DB, 'todos');

export async function updateTransaction(docId: string, dataEdit: any) {
  const docRef = doc(transCollection, docId);
  return await updateDoc(docRef, { ...dataEdit });
}