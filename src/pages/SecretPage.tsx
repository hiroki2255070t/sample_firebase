import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const SecretPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "2255070t@gsuite.kobe-u.ac.jp") {
        alert("You are unauthorized!")
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">秘密のページへようこそ🎉</h1>
    </div>
  );
};

