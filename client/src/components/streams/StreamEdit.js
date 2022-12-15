import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    //initial values to display in the form.
    this.initialValues = {
      title: this.props.stream.title,
      description: this.props.stream.description
    };

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          //initialValues is a special prop of redux form for displaying initial values
          initialValues={this.initialValues}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

//ownProps contains the props passed into StreamEdit
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
