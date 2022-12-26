import React from 'react';
import { Form, Field } from 'react-final-form';

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  //when hooked up with react-final-form, the props has a "input" property that contains all
  //the important properties such as "value" or "onChange" that we need to use to wire it up
  //with the Field component. all properties are important so we will reassign to <input />
  //using a spread operator
  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  //An empty error object signifies no error to react-final-form. Error with the same property
  // name as the Field component name will get passed into that Field components as props.
  const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
      errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
      errors.description = 'You must enter a description';
    }
    return errors;
  };

  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="ui form error">
          <Field name="title" component={renderInput} label="Enter Title" />
          <Field
            name="description"
            component={renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      )}
    />
  );
};

export default StreamForm;
