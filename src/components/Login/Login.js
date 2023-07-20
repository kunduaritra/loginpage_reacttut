import React, { useState, /*{useEffect},*/ useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';


const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false}
}

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === 'INPUT_BLUR') {
    return {type: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
      value: '', 
      isValid: null
    })

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  })
  useReducer()

  const authCtx = useContext(AuthContext)
  const {isValid: emailIsValid} = emailState
  const {isValid: passwordIsValid} = passwordState
  // useEffect(() => {
  //   const timerIndetifier = setTimeout(() => {
  //     console.log('Chekcing form validity')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   },500);

  //   return ()=> {
  //     console.log('Clean Up!')
  //     clearTimeout(timerIndetifier)
  //   };
  // },[enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})
    setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6
          );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  // const validateCollegeHandler = () => {
  //   setCollegeIsValid(enteredCollege.trim().length > 0)
  // }

  // const collegeChangeHandler = (event) => {
  //   setEnteredCollege(event.target.value);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id="email" 
          label="E-mail" 
          type="email" 
          isValid={emailIsValid} 
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur= {validateEmailHandler}
          />
        <Input 
          id="password" 
          label="Password" 
          type="password" 
          isValid={passwordIsValid} 
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur= {validatePasswordHandler}
          />
        {/* <div className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}>
        <label htmlFor='college'>College</label>
          <input
            type='text'
            id='college'
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div> */}
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
