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
        <div className={styles.preview_image}>
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
          placeholder="Type user name"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          autoComplete={"email"}
          placeholder="Type user email"
        />
        <Input
          text="Role"
          type="text"
          name="role"
          autoComplete={"role"}
          placeholder="Type user role"
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          placeholder="Type user phone number"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Type temporary password"
          autoComplete={"new-password"}
          handleOnChange={handleChange}
        />
        <Input
          text="Password Confirmation"
          type="password"
          name="confirmpassword"
          placeholder="Type temporary password again"
          autoComplete={"new-password"}
          handleOnChange={handleChange}
        />
        <input type="submit" value="Edit" />
        <button type="button" className={styles.btn2} onClick={() => {}}>
          Delete Account
        </button>
      </form>
    </section>
  );
}

export default Profile;
