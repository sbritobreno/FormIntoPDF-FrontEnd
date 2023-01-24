import { useState } from "react";
import styles from "./Profile.module.css";
import Input from "../../form/Input";

function Profile() {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState("");

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Profile</h1>
        <div className={styles.preview_images}>
          {(user.image || preview) && (
            <img
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/images/users/${user.image}`
              }
              alt="Profile img"
            />
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <Input
          text="Image"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="Name"
          type="text"
          name="name"
          placeholder="Type your name"
          handleOnChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          value={user.email || ""}
          readOnly={"readonly"}
        />
        <Input
          text="Role"
          type="text"
          name="role"
          value={user.username || ""}
          autoComplete={"username"}
          readOnly={"readonly"}
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          placeholder="Type your phone number"
          handleOnChange={handleChange}
          value={user.phone || ""}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Type your password"
          autoComplete={"new-password"}
          handleOnChange={handleChange}
        />
        <Input
          text="Password Confirmation"
          type="password"
          name="confirmpassword"
          placeholder="Type your password again"
          autoComplete={"new-password"}
          handleOnChange={handleChange}
        />
        <input type="submit" name="button_1" value="Edit" />
        <button type="button" className={styles.btn2} onClick={() => {}}>
          Delete Account
        </button>
      </form>
    </section>
  );
}

export default Profile;
