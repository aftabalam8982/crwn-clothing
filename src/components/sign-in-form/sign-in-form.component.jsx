import { useState } from "react";
import InputField from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";
import {
  CreateUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const defaultInputValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [inputValues, setInputValues] = useState(defaultInputValues);
  const { email, password } = inputValues;

  // console.log(inputValues);

  const formReset = () => {
    setInputValues(defaultInputValues);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await CreateUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(email, password);
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      formReset();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("this user email not found");
          break;
        case "auth/wrong-password":
          alert("wrong password");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-in-form-group">
      <h2>Already have an account</h2>
      <span>Sign In with email and Password</span>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email || ""}
        />
        <InputField
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password || ""}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            google SignIn
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
