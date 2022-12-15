import React from 'react';
import { Field, reduxForm } from 'redux-form';

//When using redux form, there will be many handler and properties in the class props
//that we should use to handle form set up and interaction

class StreamForm extends React.Component {
  //when hooked up with reduxForm, the props has a "input" property that contains all the important properties
  //such as "value" or "onChange" that we need to use to wire it up with the Field component.
  //all properties are important so we will reassign to <input /> using a spread operator
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //get passed only values from <Field /> by reduxForm instead of an "event".
  //The handleSubmit handler will prevent page from refreshing. so we do not need to call
  //event.preventDefault()
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//An empty error object signifies no error to reduxForm. Error with the same property as the
//Field component name will get passed into that Field components as props.
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

//hook up redux form to the component. Any values captured by the Field component will show
//up in the 'form -> streamForm' parameter of the redux store. We also wired up our validate
//function to the validate property of the reduxForm which automatically gets called when
//upon first rendering or whenever input changes
export default reduxForm({
  form: 'streamForm',
  validate: validate
})(StreamForm);
