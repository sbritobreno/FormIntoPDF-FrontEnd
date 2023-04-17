import { useState, useContext } from "react";
import styles from "./Profile.module.css";
import Input from "../../form/Input";
import user_img from "../../../assets/profile_img_default.png";
import { UserContext } from "../../../context/UserContext";

function Profile() {
  const { deleteUserAccount, currentUser, setCurrentUser, updateProfile } =
    useContext(UserContext);
  const [preview, setPreview] = useState("");

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.files[0] });
  }

  function handleChange(e) {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    updateProfile(currentUser);
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Profile</h1>
        <div className={styles.preview_image}>
          {(currentUser.image || preview || user_img) && (
            <img
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/images/users/${currentUser.image}`
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
          value={currentUser.name || ""}
          placeholder="Type user name"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          value={currentUser.email || ""}
          autoComplete={"email"}
          placeholder="Type user email"
          readOnly={"readonly"}
        />
        <Input
          text="Role"
          type="text"
          name="role"
          value={currentUser.role || ""}
          autoComplete={"role"}
          handleOnChange={handleChange}
          placeholder="Type user role"
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          value={currentUser.phone || ""}
          placeholder="Type user phone number"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Type new password"
          autoComplete={"new-password"}
          handleOnChange={handleChange}
        />
        <Input
          text="Password Confirmation"
          type="password"
          name="confirmpassword"
          placeholder="Type new password again"
          autoComplete={"new-password"}
          handleOnChange={handleChange}
        />
        <input type="submit" value="Edit" />
        <button
          type="button"
          className={styles.btn2}
          onClick={deleteUserAccount}
        >
          Delete Account
        </button>
      </form>
    </section>
  );
}

export default Profile;
