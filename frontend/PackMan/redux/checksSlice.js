import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const checksSlice = createSlice({
  name: "checks",
  initialState: {
    checks: [],
    dataBoolean: false,
  },
  reducers: {
    setExploreChecks(state, action) {
      const { payload } = action;
      if (payload.page === 1) {
        state.explore.checks = payload.checks;
        state.explore.page = 1;
      } else {
        state.explore.rooms = [...state.explore.checks, ...payload.checks];
      }
    },
    increasePage(state, action) {
      state.explore.page += 1;
    },
    setFavs(state, action) {
      state.favs = action.payload;
    },
    setFav(state, action) {
      const {
        payload: { checkId },
      } = action;
      const check = state.explore.checks.find(
        (checks) => checks.id === checkId
      );
      if (check) {
        if (check.is_fav) {
          check.is_fav = false;
          state.favs = state.favs.filter((check) => check.id !== checkId);
        } else {
          check.is_fav = true;
          state.favs.push(check);
        }
      }
    },
    setCheckLists(state, action) {
      state.checks = action.payload;
    },
    setCheckList(state, action) {
      const {
        payload: { checkId },
      } = action;
      const check = state.explore.checks.find((check) => check.id === checkId);
      if (check) {
        state.checkLists.push(check);
      }
    },
  },
});

export const {
  setExploreChecks,
  increasePage,
  setFavs,
  setFav,
  setCheckLists,
} = checksSlice.actions;

export const getRooms = (page) => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();
  try {
    const {
      data: { results },
    } = await api.rooms(page, token);
    dispatch(
      setExploreChecks({
        checks: results,
        page,
      })
    );
  } catch (e) {
    console.warn(e);
  }
};

export const createCheckList = (form) => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState();
  try {
    const { data } = await api.createSupplies(id, token, form);
  } catch (e) {
    console.warn(e);
  }
};

export const checkListShow = () => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState();
  try {
    const { data } = await api.myChecklist(id, token);
    dispatch(setCheckLists(data));
  } catch (e) {
    console.warn(e);
  }
};

export default checksSlice.reducer;
