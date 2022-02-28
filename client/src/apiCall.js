import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN-START" });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      userCredential
    );

    dispatch({ type: "LOGIN-SUCCESS", payload: res.data });
  } catch (e) {
    dispatch({ type: "LOGIN-FAILURE", payload: e });
  }
};
