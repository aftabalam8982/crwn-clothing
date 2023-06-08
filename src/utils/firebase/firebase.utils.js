import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh3jisSh1Rvs_RDw9mH_IqzmvGKsJw5rU",
  authDomain: "crwn-clothing-shoping.firebaseapp.com",
  projectId: "crwn-clothing-shoping",
  storageBucket: "crwn-clothing-shoping.appspot.com",
  messagingSenderId: "1077233972496",
  appId: "1:1077233972496:web:7498f3332b0c5b1341a195",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const CreateUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userDocRef;
};
