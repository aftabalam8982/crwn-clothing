import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, CreateUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logWithGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await CreateUserDocumentFromAuth(user);

    // console.log(user);
  };
  return (
    <div>
      <h1>You are in sign-in page</h1>
      <button onClick={logWithGoogleUser}>SignIn with google</button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
