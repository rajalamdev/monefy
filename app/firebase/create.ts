import { FIREBASE_DB } from '@/firebaseConfig';
import {
    Timestamp,
    addDoc,
    collection,
    getFirestore,
  } from 'firebase/firestore';
  
//   interface TodoItemInterface {
//     todo: string;
//     ownerId: string;
//     isCompleted: boolean;
//   }

  interface TransactionInterface {
      amount: number;
      category: string;
      description: string;
      type: string;
      ownerId: string;
      createdAt: Timestamp;
  };
  
  const transactionCollection = collection(FIREBASE_DB, 'transaction');
  
  export async function createTransaction(data: TransactionInterface) {
    const dbData = {
        ...data,
    };
    return await addDoc(transactionCollection, dbData);
  }