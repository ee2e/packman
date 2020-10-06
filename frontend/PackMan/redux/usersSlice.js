import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { setFavs, setFav } from "./checksSlice";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export const userKakaoLogin = (form) => async (dispatch) => {
  try {
    console.log("트라이");
    // const {
    //   data: { token },
    // } = await api.kakaoLogin(form);
    await api.kakaoLogin(form);
    console.log(data);
    // if (id && token) {
    //   dispatch(logIn({ token, id }));
    // }
  } catch (e) {
    alert("등록 된 정보가 없습니다.");
  }
};

export const userLogin = (form) => async (dispatch) => {
  try {
    const {
      data: { id, token },
    } = await api.login(form);
    if (id && token) {
      dispatch(logIn({ token, id }));
    }
  } catch (e) {
    alert("등록 된 정보가 없습니다.");
  }
};

export const userLogout = (form) => async (dispatch) => {
  try {
    dispatch(logOut());
  } catch (e) {
    alert("실패");
  }
};

export const getFavs = () => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState();
  try {
    const { data } = await api.favs(id, token);
    dispatch(setFavs(data));
  } catch (e) {
    console.warn(e);
  }
};

export const toggleFav = (checkId) => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState();
  dispatch(setFav({ checkId }));
  try {
    await api.toggleFavs(id, checkId, token);
  } catch (e) {
    console.warn(e);
  }
};

export default userSlice.reducer;
