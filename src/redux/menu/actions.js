const actions = {
  MENU_READ_BEGIN: 'MENU_READ_BEGIN',
  MENU_READ_SUCCESS: 'MENU_READ_SUCCESS',
  MENU_READ_ERR: 'MENU_READ_ERR',

  menuReadBegin: () => {
    return {
      type: actions.MENU_READ_BEGIN,
    };
  },

  menuReadSuccess: (data) => {
    return {
      type: actions.MENU_READ_SUCCESS,
      data,
    };
  },

  menuReadErr: (err) => {
    return {
      type: actions.MENU_READ_ERR,
      err,
    };
  },
};

export default actions;
