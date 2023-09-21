import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
// import { createUserWithEmailAndPassword } from "firebase/auth"
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "/src/styles/auth.module.css";
import { useRouter } from "next/router";

export default function Auth (){


  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [isSuccessful, setIsSuccessful] = useState(null);
  const [isError, setIsError] = useState(null);

  // handle Onchange
  const handleOnChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  useEffect(() => {
    const isStateChange = onAuthStateChanged(auth, (user) => {
      user ? router.push("/gallery"): ""
    })
    return () => isStateChange();

  }, [router]);

  
  const handleSignUp = async () => {

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      setIsSuccessful("You've successfully Signup!");
      setIsError(null)
      setForm({ email: "", password: "" });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setIsError("Email already exist. Try another one!");
      } else if (error.code === "auth/weak-password") {
        setIsError("Weak Password. Password Length >= 6 ");
      } else if (error.code === "auth/invalid-email") {
        setIsError("invalid email. Try Again!");
      } else {
        console.error(error);
      }

      setIsSuccessful(null)
    }


  };

  const handleSignIn = async () => {

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      console.log("User Available", userCredentials.user)

      setIsSuccessful(`Login successful!`);
      setIsError(null)
      setForm({ email: "", password: "" });
      // router.push("/gallery");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-login-credentials") {
        setIsError("Invalid data. Try again!");
      } else {
        console.log("Error:", error);
      }

      setIsSuccessful(null)
    }

  };



  console.log(form);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      {isSuccessful && <span className={styles.message}>{isSuccessful}</span>}
      {/* {isError && <p>{isError}</p>} */}
      {isError && <span className={styles.errMessage}>{isError}</span>}
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div>
          <label htmlFor="username" className={styles.label_block}>
            Username
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="user@example.com ..."
            onChange={handleOnChange}
            id="username"
            className={styles.email}
          />
        </div>

        <div>
          <label htmlFor="password" className={styles.label_block}>
            Password
          </label>
          <input
            type="password"
            value={form.password}
            name="password"
            id="password"
            placeholder="Password..."
            onChange={handleOnChange}
            className={styles.password}
          />
        </div>

        <section className={styles.btn_wrapper}>
          <button onClick={handleSignUp}> Sign up</button>
          <button onClick={handleSignIn}> Sign In</button>
        </section>
      </form>
    </div>
  );
};
