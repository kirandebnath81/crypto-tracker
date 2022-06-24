import React, { useContext, useState } from "react";

import { toast } from "react-toastify";

//mui
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";

import CoinsWatchList from "./CoinsWatchList";

//firebase
import { auth } from "../../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { db } from "../../config/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

//context
import { CryptoContext } from "../../context/Context";

const UserSidebar = () => {
  const { user, watchlist, setWatchlist } = useContext(CryptoContext);

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logoutHandler = async () => {
    setWatchlist([]);
    try {
      await signOut(auth);
      toast.success("Log out successfully !", { theme: "colored" });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteHandler = async (coinId) => {
    const newWatchlist = watchlist.filter((prev) => prev !== coinId);

    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, { coins: newWatchlist });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            alt={user.displayName?.toUpperCase() || user.email?.toUpperCase()}
            src={user?.photoURL}
            sx={{
              cursor: "pointer",
              width: "40px",
              height: "40px",
            }}
          />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="sidebar__container">
              <Avatar
                alt={
                  user.displayName?.toUpperCase() || user.email?.toUpperCase()
                }
                src={user?.photoURL}
                sx={{
                  cursor: "pointer",
                  width: "160px",
                  height: "160px",
                  fontSize: "3rem",
                }}
              />

              <h3>{user.displayName || user.email}</h3>
              <div className="sidebar__watchList">
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                  {" "}
                  Watchlist
                </div>
                {watchlist?.map((coin, index) => (
                  <CoinsWatchList
                    key={index}
                    coinId={coin}
                    handleDelete={deleteHandler}
                  />
                ))}
              </div>
              <button onClick={logoutHandler}>LOG OUT</button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserSidebar;
