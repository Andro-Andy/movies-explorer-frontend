import { useState, useCallback, useReducer } from 'react';

const initialState = {
  values: {},
  errors: {},
  isValid: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUES':
      return {
        ...state,
        values: { ...state.values, ...action.payload },
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };

    case 'SET_VALID':
      return {
        ...state,
        isValid: action.payload,
      };

    case 'RESET_FORM':
      return {
        ...state,
        values: action.payload.values || {},
        errors: action.payload.errors || {},
        isValid: action.payload.isValid || false,
      };

    default:
      return state;
  }
};

const useFormAndValidation = (initialValues = {}, initialErrors = {}, initialValid = false) => {
  const [state, dispatch] = useReducer(reducer, {
    values: initialValues,
    errors: initialErrors,
    isValid: initialValid,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch({ type: 'SET_VALUES', payload: { [name]: value } });
    dispatch({ type: 'SET_ERRORS', payload: { [name]: evt.target.validationMessage } });
    dispatch({ type: 'SET_VALID', payload: evt.target.closest('form').checkValidity() });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      dispatch({
        type: 'RESET_FORM',
        payload: { values: newValues, errors: newErrors, isValid: newIsValid },
      });
    },
    [dispatch]
  );

  return { ...state, handleChange, resetForm };
};

export default useFormAndValidation;
