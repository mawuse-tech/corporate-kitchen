import { loginStart, loginSuccess, loginFailure, logout } from "./authSlice";
import admins from "../../../Data-Folder/team-members.json";
import { getItem, removeItem, saveItem } from "../../../Api/storage";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const storedAdmins = (await getItem("admins")) || admins;

    // Check credentials
    const user = storedAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (!user) {
      dispatch(loginFailure("Invalid credentials"));
      return;
    }

    // Save session to storage
    await saveItem("session", user);

    dispatch(loginSuccess(user));
  } catch (err) {
    dispatch(loginFailure("Something went wrong"));
  }
};

export const logoutUser = () => async (dispatch) => {
  await removeItem("session");
  dispatch(logout());
};
