import React, { useState } from "react";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Header from "./components/Header";
import RoomEnter from "./components/RoomEnter";
import Logout from "./components/Logout";
import Chat from "./components/Chat";
const cookie = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(false || cookie.get("auth-token"));
  const [room, setRoom] = useState("");
  const [inChat, setInChat] = useState(false);

  if (!isAuth) {
    return (
      <div className="bg-gradient-to-r from-bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Header />
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  } else {
    return (
      <div>
        <div className="bg-gradient-to-r from-bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen">
          <Header />

          {inChat ? (
            <div>
              <Chat setInChat={setInChat} room={room} />
              
            </div>
          ) : (
            <div>
              <RoomEnter room={room} setRoom={setRoom} setInChat={setInChat} />
              <Logout setIsAuth={setIsAuth} />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default App;
