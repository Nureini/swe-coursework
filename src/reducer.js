import {
  EMPTY_EC,
  EMPTY_ISSUE,
  SUBMIT_FOR_UPDATE_EC,
  SUBMIT_FOR_UPDATE_ISSUE,
} from "./constants";
export const initialState = {
  ec: [],
  issue: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SUBMIT_FOR_UPDATE_EC:
      return {
        ...state,
        ec: [...state.ec, action.info],
      };
    case SUBMIT_FOR_UPDATE_ISSUE:
      return {
        ...state,
        issue: [...state.issue, action.info],
      };
    case EMPTY_EC:
      return {
        ...state,
        ec: [],
      };
    case EMPTY_ISSUE:
      return {
        ...state,
        issue: [],
      };
    default:
      return state;
  }
};

export default reducer;
