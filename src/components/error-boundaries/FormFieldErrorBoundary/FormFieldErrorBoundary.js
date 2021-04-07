import React from 'react';

class FormFieldErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div>
          <span>
            <h3>Something went wrong.</h3>
            <p>{error.toString()}</p>
          </span>
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}

FormFieldErrorBoundary.propTypes = {};

FormFieldErrorBoundary.defaultProps = {};

export default FormFieldErrorBoundary;
