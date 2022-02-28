export const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN-START":
      return {
        user: null,
        isFetching: true,
        isError: false,
      };
    case "LOGIN-SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        isError: false,
      };
    case "LOGIN-FAILURE":
      return {
        user: null,
        isFetching: false,
        isError: action.payload,
      };

    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [
            state.user.followings.filter(
              (following) => following !== action.payload
            ),
          ],
        },
      };

    default:
      return state;
  }
};
