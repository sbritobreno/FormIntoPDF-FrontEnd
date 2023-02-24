import { useState, useContext, useEffect } from "react";
import Input from "../../form/Input";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { Context } from "../../../context/UserContext";

function Login() {
  const [user, setUser] = useState({});
  const { login, resetPassword } = useContext(Context);

  useEffect(() => {
    // Anything in here is fired on component mount.
    document.body.style.overflowY = "hidden";

    return () => {
      // Anything in here is fired on component unmount.
      document.body.style.overflowY = "unset";
    };
  }, []);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }

  return (
    <section className={styles.overlay}>
      <h1 className={styles.logo}>Form Into PDF</h1>
      <div className={styles.form_container}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            text="E-mail"
            type="email"
            name="email"
            placeholder="Type your email"
            autoComplete={"user-email"}
            handleOnChange={handleChange}
          />
          <Input
            text="Password"
            type="password"
            name="password"
            placeholder="Type your password"
            autoComplete={"current-password"}
            handleOnChange={handleChange}
          />
          <input type="submit" value="Login" />
        </form>
        <p>
          Forgot your password? <Link onClick={resetPassword}>Click here.</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
