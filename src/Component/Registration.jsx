import React from 'react';
import { Form, Field, FormElement, FieldWrapper } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = value => emailRegex.test(value) ? "" : "Please enter a valid email.";
const requiredValidator = value => value ? "" : "This field is required.";

const EmailInput = fieldRenderProps => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div className="flex flex-col">
      <Input {...others} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const Registration = () => {
  const handleSubmit = dataItem => alert(JSON.stringify(dataItem, null, 2));

  return (
    <Form onSubmit={handleSubmit} render={formRenderProps => (
      <FormElement className="max-w-xl mx-auto p-8 bg-white rounded-md shadow-md">
        <fieldset className="space-y-4">
          <legend className="text-2xl font-bold text-gray-700 mb-4">Please fill in the fields:</legend>

          <FieldWrapper>
            <label className="block text-gray-600 mb-2" htmlFor="firstName">First name:</label>
            <Field name="firstName" component={Input} id="firstName" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" validator={requiredValidator} />
          </FieldWrapper>

          <FieldWrapper>
            <label className="block text-gray-600 mb-2" htmlFor="lastName">Last name:</label>
            <Field name="lastName" component={Input} id="lastName" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" validator={requiredValidator} />
          </FieldWrapper>

          <FieldWrapper>
            <label className="block text-gray-600 mb-2" htmlFor="email">Email:</label>
            <Field name="email" type="email" component={EmailInput} id="email" validator={[requiredValidator, emailValidator]} />
          </FieldWrapper>

          <FieldWrapper>
            <label className="block text-gray-600 mb-2" htmlFor="phone">Phone:</label>
            <Field name="phone" component={Input} id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" validator={requiredValidator} />
          </FieldWrapper>

          <FieldWrapper>
            <label className="block text-gray-600 mb-2" htmlFor="password">Password:</label>
            <Field name="password" type="password" component={Input} id="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" validator={requiredValidator} />
          </FieldWrapper>
        </fieldset>

        <div className="mt-6 flex justify-between items-center">
          <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600" disabled={!formRenderProps.allowSubmit}>
            Register
          </button>
        </div>
      </FormElement>
    )} />
  );
};

export default Registration;
