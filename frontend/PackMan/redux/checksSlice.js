import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const checksSlice = createSlice({
  name: "checks",
  initialState: {
    explore: {
      page: 1,
      rooms: [],
    },
    favs: [],
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
      const check = state.explore.checks.find((check) => checks.id === checkId);
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
  },
});

export const {
  setExploreChecks,
  increasePage,
  setFavs,
  setFav,
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
    // dispatch(setFavs(data));
  } catch (e) {
    console.warn(e);
  }
};

export default checksSlice.reducer;
