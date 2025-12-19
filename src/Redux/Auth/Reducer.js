import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  LOGIN_TWO_STEP_FAILURE,
  LOGIN_TWO_STEP_SUCCESS,
  VERIFY_OTP_SUCCESS,
  ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS,
  VERIFY_OTP_FAILURE,
  ENABLE_TWO_STEP_AUTHENTICATION_FAILURE,
} from "./ActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
      return { ...state, loading: false, jwt: action.payload };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, jwt: action.payload };

    case LOGIN_TWO_STEP_SUCCESS:
      return { ...state, loading: false, jwt: action.payload };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        fetchingUser: false,
      };

    case VERIFY_OTP_SUCCESS:
    case ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload, // Update user with the response which should be the updated user object
        error: null,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_USER_FAILURE:
    case LOGIN_TWO_STEP_FAILURE:
    case VERIFY_OTP_FAILURE:
    case ENABLE_TWO_STEP_AUTHENTICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("jwt");
      return { ...state, jwt: null, user: null };
    default:
      return state;
  }
};

export default authReducer;

