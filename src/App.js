import { useEffect } from "react";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { CreateUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.reducer";
import {useDispatch} from 'react-redux'

import Home from "./routes/home/home-component";
import { Routes,Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation-component";
import Authentication from "./routes/auth/auth.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        CreateUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);
  return (
    <Routes>
      <Route path="/"  element={<Navigation/>}>
        <Route index element={<Home />}/>
        <Route path="shop/*" element={<Shop />}/>
        <Route path="auth" element={<Authentication />}/>
        <Route path="checkout" element={<Checkout />}/>
      </Route>
    </Routes>
  );
};

export default App;
