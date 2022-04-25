import s from "../styles/Login.module.scss";
import Button from "@mui/material/Button";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from "../utils/firebaseConfig";

function Login_Page() {

  const [ signInWithGoogle ] = useSignInWithGoogle(auth)

  const googleSignIn = async () => {
    await signInWithGoogle("", { prompt: "select_account" });
  };

  return (
    <div className={s.container}>
      <div className={s.LoginForm}>
        <h1>Your email is absolutelty safe with Google's Security!</h1>
        <Button variant="contained" onClick={googleSignIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login_Page;
