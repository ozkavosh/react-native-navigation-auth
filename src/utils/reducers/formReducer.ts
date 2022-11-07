export const SIGNUP_FORM_INITIAL_VALUES = {
  avatar: null,
  displayName: '',
  email: '',
  password: '',
  hidePassword: true,
};

export const LOGIN_FORM_INITIAL_VALUES = {
  email: '',
  password: '',
  hidePassword: true,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {...state, [action.payload.field]: action.payload.value};
    case 'TOGGLE_PASSWORD_VISIBILITY':
      return {...state, hidePassword: !state.hidePassword};
    default:
      return state;
  }
};
