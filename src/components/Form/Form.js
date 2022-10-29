import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

// shared components
import Button from '../Button/Button';

// styles
import './styles.css';

// constanst
import { CLEAR, ERROR, SUBMIT } from '../../constants';

function Form({ isOpen, closeForm, onSuccess }) {
  const dispatch = useDispatch();
  const stateInfo = useSelector((state) => state.form);
  const [success, setSuccess] = useState(false);

  const [info, setInfo] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
  });

  // clear info after posting
  const clearInfo = () => {
    setInfo({
      fullName: '',
      email: '',
      confirmEmail: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: SUBMIT,
      payload: info,
    });
  };

  // post form data
  useEffect(() => {
    if (stateInfo.isSending) {
      const formData = {
        name: stateInfo.fullName,
        email: stateInfo.email,
      };
      axios
        .post(process.env.REACT_APP_URL, formData)
        .then((response) => {
          // clear state
          dispatch({ type: CLEAR });
          clearInfo();
          onSuccess();
          setSuccess(true);
        })
        .catch((error) => {
          dispatch({
            type: ERROR,
            payload: { serverError: error.response.data.errorMessage },
          });
        });
    }
  }, [
    stateInfo.email,
    stateInfo.fullName,
    stateInfo.isSending,
    onSuccess,
    dispatch,
  ]);

  return (
    isOpen && (
      <>
        <form
          className={`${!success ? 'form' : 'confirm-form'}`}
          onSubmit={handleSubmit}
          noValidate
        >
          <div
            className="close"
            onClick={() => {
              closeForm();
              clearInfo();
              // clear state
              dispatch({ type: CLEAR });
              setSuccess(false);
            }}
          >
            x
          </div>

          <>
            {!success ? (
              <>
                <div className="request">
                  Request an invite <br />
                  ____
                </div>

                {/* name */}
                <div
                  className={`${
                    !stateInfo.fullNameError ? 'fullname' : 'warning'
                  }`}
                >
                  <input
                    type="text"
                    value={info.fullName}
                    onChange={(e) =>
                      setInfo({ ...info, fullName: e.target.value })
                    }
                    placeholder="Full name"
                  />
                </div>
                {/* fullname error */}
                {stateInfo.fullNameError && (
                  <div className="error">{stateInfo.fullNameError}</div>
                )}

                {/* email */}
                <div
                  className={`${!stateInfo.emailError ? 'email' : 'warning'}`}
                >
                  <input
                    type="email"
                    value={info.email}
                    onChange={(e) =>
                      setInfo({ ...info, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </div>
                {/* email error */}
                {stateInfo.emailError && (
                  <div className="error">{stateInfo.emailError}</div>
                )}

                {/* confirm email */}
                <div
                  className={`${
                    !stateInfo.confirmEmailError ? 'confirm-email' : 'warning'
                  }`}
                >
                  <input
                    type="email"
                    value={info.confirmEmail}
                    onChange={(e) =>
                      setInfo({ ...info, confirmEmail: e.target.value })
                    }
                    placeholder="Confirm email"
                  />
                </div>

                {/* confirmEmail error */}
                {stateInfo.confirmEmailError && (
                  <div className="error">{stateInfo.confirmEmailError}</div>
                )}

                {/* is sending */}
                <Button
                  text={`${
                    stateInfo.isSending ? 'Sending, please wait...' : 'Send'
                  }`}
                  type="submit"
                  disabled={stateInfo.isSending}
                />
              </>
            ) : (
              <>
                {/* done! */}
                <div className="request">
                  All done! <br />
                  ____
                </div>
                <div className="done">
                  You will be one of the first to experience Broccoli & Co. when
                  we launch.
                </div>
                <Button
                  text="OK"
                  type="submit"
                  disabled={stateInfo.isSending}
                  onClick={() => {
                    closeForm();
                    setSuccess(false);
                  }}
                />
              </>
            )}
          </>

          {/* bad request :( */}
          {stateInfo.serverError ? (
            <div className="warning-user">{stateInfo.serverError}</div>
          ) : (
            ''
          )}
        </form>
      </>
    )
  );
}

export default Form;
