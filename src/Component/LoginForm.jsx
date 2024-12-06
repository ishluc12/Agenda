import React from 'react';
import { Form, Field, FormElement, FieldWrapper } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { Link } from 'react-router-dom';


const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = value => emailRegex.test(value) ? "" : "Please enter a valid email.";

const EmailInput = fieldRenderProps => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div className='input-wrapper'>
      <Input {...others} labelClassName={'form-label'} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const LoginForm = () => {
  const handleSubmit = dataItem => alert(JSON.stringify(dataItem, null, 2));

  return (
    <Form onSubmit={handleSubmit} render={formRenderProps => (
      <FormElement className="login-form">
        <fieldset className="form-fieldset">
          <legend className="form-legend">Enter your credentials</legend>
          
          <FieldWrapper>
            <Field name={'email'} type={"email"} component={Input} labelClassName={'form-label'} label={'Email'}validator={emailValidator} />
          </FieldWrapper>
          <FieldWrapper>
            <Field name={"password"}  type={"password"} component={EmailInput} label={"Password"}  />
          </FieldWrapper>
        </fieldset>
        <div className="form-buttons">
          <button type={'submit'} className="submit-button" disabled={!formRenderProps.allowSubmit}>
            Login
          </button>
          
        </div>
      </FormElement>
    )} />
  );
};

export default LoginForm;
