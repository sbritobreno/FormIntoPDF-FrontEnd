import { useState, useContext } from "react";
import Input from "../../form/Input";
import styles from "./NewUser.module.css";
import { Context } from "../../../context/UserContext";

function NewUser() {
  const [newUser, setNewUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const { register } = useContext(Context);

  function handleChange(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(newUser);
  }

  return (
    <section className={styles.form_container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Name"
          type="text"
          name="name"
          placeholder="Type your name"
          handleOnChange={handleChange}
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          placeholder="Type your phone"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Type your e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Type your password"
          autoComplete={"password"}
          handleOnChange={handleChange}
        />
        <Input
          text="Confirm password"
          type="password"
          name="confirmpassword"
          placeholder="Type your password again"
          autoComplete={"confirmpassword"}
          handleOnChange={handleChange}
        />
        <div className={styles.toggle_switch}>
          <label>Make user admin: </label>
          <div className={styles.switch}>
            <input
              type="checkbox"
              name="isadmin"
              checked={isAdmin}
              handleOnChange={handleChange}
            />
            <span
              className={styles.slider}
              onClick={() => setIsAdmin(!isAdmin)}
            ></span>
          </div>
        </div>
        <input type="submit" value="Register" />
      </form>
    </section>
  );
}

export default NewUser;
