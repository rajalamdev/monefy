import { FIREBASE_DB } from '@/firebaseConfig';
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
  } from 'firebase/firestore';
  
  const transactionCollection = collection(FIREBASE_DB, 'transaction');
  
//   const mediaCollection = collection(FIREBASE_DB, 'media');
  
  export async function fetchOnlyMyTransaction(uid: string) {
    const myTransQuery = query(transactionCollection, where('ownerId', '==', uid));
    return await getDocs(myTransQuery);
  }
  
//   export async function fetchItemsBasedOnType(
//     uid: string,
//     fileType: 'image' | 'video'
//   ) {
//     const myMediaQuery = query(
//       mediaCollection,
//       where('ownerId', '==', uid),
//       where('fileType', '==', fileType)
//     );
//     return await getDocs(myMediaQuery);
//   }