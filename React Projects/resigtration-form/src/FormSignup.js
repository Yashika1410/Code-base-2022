import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <div className='form-inputs'>
          <label className='form-label'>Name</label>
          <input
            className='form-input'
            type='text'
            name='name'
            placeholder='Enter Name'
            autoComplete='off'
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='text'
            name='email'
            placeholder='Enter email'
            autoComplete='off'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Gender</label>
          <input
            className='form-input'
            type='text'
            name='gender'
            placeholder='Enter Gender'
            autoComplete='off'
            value={values.gender}
            onChange={handleChange}
          />
          {errors.gender && <p>{errors.gender}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default FormSignup;
