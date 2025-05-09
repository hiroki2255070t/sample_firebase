import { auth } from "../libs/firebase/firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("ログイン成功:", result.user);
      if (result.user.email == "2255070t@gsuite.kobe-u.ac.jp") {
        navigate("/home");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("ログイン失敗:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">ログイン</h1>
      <button
        onClick={loginWithGoogle}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Googleでログイン
      </button>
    </div>
  );
};

export default Login;
