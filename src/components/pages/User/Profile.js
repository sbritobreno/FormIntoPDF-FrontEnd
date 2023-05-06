import { useState, useContext } from "react";
import styles from "./Profile.module.css";
import Input from "../../form/Input";
import user_img from "../../../assets/profile_img_default.png";
import { UserContext } from "../../../context/UserContext";
import ConfirmWindow from "../Extras/ConfirmWindow";

function Profile() {
  const { currentUser, setCurrentUser, updateProfile, deleteUserAccount } =
    useContext(UserContext);
  const [preview, setPreview] = useState("");
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const btnText = "Delete Account";
  const message = "Are you sure you want to delete your account ?";

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

  async function confirmAction(confirmed = false) {
    setConfirmWindowOpen(false);
    if (confirmed) {
      await deleteUserAccount();
    }
  }

  return (
    <section>
      {confirmWindowOpen && (
        <ConfirmWindow
          message={message}
          btnText={btnText}
          actionResponse={confirmAction}
        />
      )}
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
          accept=".png,.jpg"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="Name"
          type="text"
          name="name"
          maxlength={"50"}
          value={currentUser.name || ""}
          placeholder="Type user name"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          maxlength={"70"}
          value={currentUser.email || ""}
          autoComplete={"email"}
          placeholder="Type user email"
          readOnly={"readonly"}
        />
        <Input
          text="Role"
          type="text"
          name="role"
          maxlength={"50"}
          value={currentUser.role || ""}
          autoComplete={"role"}
          handleOnChange={handleChange}
          placeholder="Type user role"
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          maxlength={"20"}
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
          onClick={() => setConfirmWindowOpen(true)}
        >
          Delete Account
        </button>
      </form>
    </section>
  );
}

export default Profile;
