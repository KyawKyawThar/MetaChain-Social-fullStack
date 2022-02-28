export const LoginStart = (userCredential) => ({
  type: "LOGIN-START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN-SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN-FAILURE",
  payload: error ,
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});
export const UnFollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
