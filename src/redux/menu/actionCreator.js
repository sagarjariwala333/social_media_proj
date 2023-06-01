import actions from './actions';
import initialState from '../../demoData/menu.json';

const { menuReadBegin, menuReadSuccess, menuReadErr } = actions;

const GetMenu = () => {
  return async (dispatch) => {
    try {
      dispatch(menuReadBegin());
      dispatch(menuReadSuccess(initialState));
    } catch (err) {
      dispatch(menuReadErr(err));
    }
  };
};

export { GetMenu  };
