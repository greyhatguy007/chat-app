import React from "react";
import { auth } from "./../firebase-config";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";


const cookies = new Cookies();

const Logout = ({setIsAuth}) => {

    const logOut = async()=>{
        try {
            await signOut(auth);
            setIsAuth(false);
            cookies.remove("auth-token");
          } catch (e) {
            alert(e);
          }
    }
  return (
    <div className="flex flex-col items-center">
      <button onClick={logOut} className=" bg-red-500 text-black rounded-lg hover:bg-red-400 px-1.5 py-0.5">
        Sign Out
      </button>
    </div>
  )
}

export default Logout
