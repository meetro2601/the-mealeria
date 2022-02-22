import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [favMeals, setfavMeals] = useState([]);
  const [badgeCount, setbadgeCount] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setcurrentUser(user);
        const docsRef = await collection(db, user.uid);
        const docSnaps = await getDocs(docsRef);

        setbadgeCount(docSnaps.size);
        const mealsArray = [];
        docSnaps.forEach((doc) => mealsArray.push(doc.data()));
        setfavMeals(mealsArray);
        setloading(false);
      } else {
        setcurrentUser(null);
        setbadgeCount(null);
        setloading(false);
      }
    });
  });

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, badgeCount, favMeals }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
