import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailFn = (state, action) => {
  switch (action.type) {
    case 'EMAIL_INPUT':
      return { value: action.value, isValid: action.value.includes('@') }
    case 'EMAIL_BLUR':
      return { value: state.value, isValid: state.value.includes('@') }
    default:
      return { value: '', isValid: false }
  }
}

const passwordFn = (state, action) => {
  switch (action.type) {
    case 'PASSWORD_INPUT':
      return { value: action.value, isValid: action.value.trim().length > 6 }
    case 'PASSWORD_BLUR':
      return { value: state.value, isValid: state.value.trim().length > 6 }
    default:
      return { value: '', isValid: false }
  }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, emailDispatch] = useReducer(emailFn, { value: '', isValid: null });
  const [passwordState, passwordDispatch] = useReducer(passwordFn, { value: '', isValid: null });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      )
    }, 500);

    return () => {
      clearTimeout(identifier);
    }
  }, [emailState, passwordState])

  const emailChangeHandler = (event) => {
    emailDispatch({ type: 'EMAIL_INPUT', value: event.target.value })
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({ type: 'PASSWORD_INPUT', value: event.target.value })
  };

  const validateEmailHandler = () => {
    emailDispatch({ type: 'EMAIL_BLUR' });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: 'PASSWORD_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
