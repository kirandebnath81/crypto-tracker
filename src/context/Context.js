import { createContext, useEffect, useState } from "react";

//firebae
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

//create context
export const CryptoContext = createContext();

//create provider
export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else {
      setSymbol("$");
    }
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (!user) {
      console.log("No user data exists");
      return;
    }

    const coinDocRef = doc(db, "watchlist", user?.uid);
    onSnapshot(coinDocRef, (doc) => {
      setWatchlist(doc.data()?.coins);
    });
  }, [user]);

  return (
    <CryptoContext.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        open,
        setOpen,
        user,
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
