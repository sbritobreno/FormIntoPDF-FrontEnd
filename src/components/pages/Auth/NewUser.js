import { useState, useContext, useRef } from "react";
import Input from "../../form/Input";
import styles from "./NewUser.module.css";
import { UserContext } from "../../../context/UserContext";

function NewUser() {
  const [newUser, setNewUser] = useState({});
  const [notAdmin, setNotAdmin] = useState(true);
  const { register } = useContext(UserContext);
  const inputs = useRef([]);

  function handleChange(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  function handleAdminToggle() {
    setNotAdmin(!notAdmin);
    setNewUser({ ...newUser, admin: notAdmin });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let successful;
    await register(newUser).then((res) => (successful = res));

    // Reset inputs if request successful
    if (successful) {
      setNotAdmin(true);
      const inputsArray = Object.keys(inputs);
      inputsArray.forEach((i) => {
        inputs[i].value = "";
      });
    }
  }

  return (
    <section className={styles.form_container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          ref={(el) => (inputs[0] = el)}
          text="Name"
          type="text"
          name="name"
          placeholder="Type user's name"
          handleOnChange={handleChange}
        />
        <Input
          ref={(el) => (inputs[1] = el)}
          text="E-mail"
          type="email"
          name="email"
          placeholder="Type user's e-mail"
          handleOnChange={handleChange}
        />
        <Input
          ref={(el) => (inputs[2] = el)}
          text="Phone"
          type="text"
          name="phone"
          placeholder="Type user's phone"
          handleOnChange={handleChange}
        />
        <Input
          ref={(el) => (inputs[3] = el)}
          text="Role"
          type="text"
          name="role"
          placeholder="Type user's role"
          handleOnChange={handleChange}
        />
        <Input
          ref={(el) => (inputs[4] = el)}
          text="Password"
          type="password"
          name="password"
          placeholder="Type user password"
          autoComplete={"password"}
          handleOnChange={handleChange}
        />
        <Input
          ref={(el) => (inputs[5] = el)}
          text="Confirm password"
          type="password"
          name="confirmpassword"
          placeholder="Type user password again"
          autoComplete={"confirmpassword"}
          handleOnChange={handleChange}
        />
        <div className={styles.toggle_switch}>
          <label>Make user admin: </label>
          <div className={styles.switch}>
            <input
              type="checkbox"
              name="isadmin"
              checked={!notAdmin}
              onChange={handleChange}
            />
            <span className={styles.slider} onClick={handleAdminToggle}></span>
          </div>
        </div>
        <input type="submit" value="Register" />
      </form>
    </section>
  );
}

export default NewUser;
