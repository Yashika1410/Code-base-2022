import React, { useState, useCallback } from 'react';
import './Form.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitForm = useCallback(() => {
    setIsSubmitted(true)
  }, [setIsSubmitted])

  return (
    <>
      <div className='container'>
        <div className='form-container'>
          <div className='form-content-left'>
            <img src='img/ENIAC22.svg' alt='Eniac' className='form-img1' />
            <img className='form-img' src='img/Eniac.svg' alt='spaceship' />
          </div>
          {!isSubmitted ? (
            <FormSignup submitForm={submitForm} />
          ) : (
            <FormSuccess />
          )}
        </div>
      </div>

    </>
  );
};

export default Form;
