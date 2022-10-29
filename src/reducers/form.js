// constanst
import { CLEAR, ERROR, SUBMIT } from '../constants';

// Source: https://emailregex.com/
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const initialState = {
  fullName: '',
  fullNameError: null,
  email: '',
  emailError: null,
  confirmEmail: '',
  confirmEmailError: null,
  isSending: false,
  serverError: null,
  isLoading: null,
};

const form = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case SUBMIT: {
      const fullName = payload.fullName;
      const email = payload.email;
      const confirmEmail = payload.confirmEmail;
      const fullNameError =
        payload.fullName.trim().length >= 3
          ? null
          : 'Must be at least 3 characters long';
      const emailError = emailRegex.test(payload.email.trim())
        ? null
        : 'Must be a valid email format';
      const confirmEmailError =
        payload.confirmEmail.trim() === payload.email.trim()
          ? null
          : 'Must match the email above';
      const isSending = !fullNameError && !emailError && !confirmEmailError;

      return {
        ...state,
        fullName,
        email,
        confirmEmail,
        fullNameError,
        emailError,
        confirmEmailError,
        serverError: null,
        isSending,
      };
    }

    case CLEAR: {
      return initialState;
    }

    case ERROR: {
      return {
        ...state,
        isSending: false,
        serverError: payload.serverError,
      };
    }

    default: {
      return state;
    }
  }
};

export default form;
