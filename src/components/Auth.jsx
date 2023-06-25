import React from "react";
import { auth, provider } from "./../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import Footer from "./Footer";


const cookies = new Cookies();
const Auth = ({setIsAuth}) => {
  const signInWithGoogle = async  () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken)
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center pt-32 h-screen">
      <p className="py-2 text-2xl font-medium">Sign In with Google to Continue</p>
      <button
          className={`my-3 bg-white hover:scale-105 transition duration-150 ease-in-out text-black flex flex-row p-2 rounded-md`}
          onClick={signInWithGoogle}
        >
          <img src="google_logo.png" alt="googleLogin" width={25} />
          <p className="px-2">Sign In Using Google</p>
        </button>
        
    </div>
    <Footer/>
    </div>
  );
};

export default Auth;
