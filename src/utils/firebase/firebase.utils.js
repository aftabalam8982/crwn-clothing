import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvNSdrG9r_kIAgB4OYlbyfKg-B-bv54yk",
  authDomain: "crown-clothing-22f8d.firebaseapp.com",
  projectId: "crown-clothing-22f8d",
  storageBucket: "crown-clothing-22f8d.appspot.com",
  messagingSenderId: "43329276666",
  appId: "1:43329276666:web:1bfa922f5b5e6baacc5743"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
  
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

const db = getFirestore();

export const addCollectionAndDocument = async(collectionKey, objectToAdd) =>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectToAdd.forEach(object=>{
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async() =>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap =  querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{})
   return categoryMap;
}

export const CreateUserDocumentFromAuth = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

// export const  createAuthUserWithEmailAndPassword = async(email, password) => {
//   if(!email || !password) return;

//   return await createUserWithEmailAndPassword(auth, email, password);
// };
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
  } catch (error) {
    throw error; // Re-throw the error for further handling in the calling code
  }
};

export const  signInAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);