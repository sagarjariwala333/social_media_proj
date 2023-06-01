import actions from './actions';
import menuData from '../../demoData/menu.json';

const initialState = {
  data: menuData,
  loading: false,
  error: null,
};

const {
  MENU_READ_BEGIN,
  MENU_READ_SUCCESS,
  MENU_READ_ERR
} = actions;

const menuReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case MENU_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case MENU_READ_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case MENU_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export  { menuReducer };
