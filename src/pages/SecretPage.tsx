import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../libs/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import { useSecretData } from "../hooks/useSecretdata";

export const SecretPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "2255070t@gsuite.kobe-u.ac.jp") {
        alert("You are unauthorized!");
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const { data, loading, error } = useSecretData("k20v7gPszOfZlKb78Wci");

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">秘密のページへようこそ🎉</h1>
      </div>
      <div>
        <h1>シークレットデータ</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
};
