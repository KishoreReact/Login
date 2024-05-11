// LoginButton.js
import React from 'react';
import { Button as BsButton } from 'react-bootstrap';
import { PiShieldCheckeredFill } from "react-icons/pi";
import './Button.css';
import { useNavigate } from 'react-router-dom';

const LoginButton = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/employee');
  }

  return (
    <BsButton 
      type={props.type}
      className='button' 
      onClick={handleClick}
    >
      {props.signup ? (
        <>
          <PiShieldCheckeredFill  icon={PiShieldCheckeredFill} className='icon' />
          <h4 className='login'>Signup</h4>
        </>
      ) : (
        <>
          <PiShieldCheckeredFill  icon={PiShieldCheckeredFill} className='icon' />
          <h3 className='login'>LOGIN</h3>
        </>
      )}
    </BsButton>
  );
}

export default LoginButton;
