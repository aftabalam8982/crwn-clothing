import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  signInWithGooglePopup,
  CreateUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./auth.styles.scss";

const Authentication = () => {
  const logWithGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
     await CreateUserDocumentFromAuth(user);
  };
  return (
    <div className="form-group">
      <SignInForm logWithGoogleUser={logWithGoogleUser} />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
