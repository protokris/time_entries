var CreateForm  = React.createClass({

  getInitialState: function () {
    return {
      data: {},
      errors: {}
    };
  },

  onSubmitForm: function () {
    this.setState(this.props.readForm(), this.sendData);
  },

  sendData: function() {
    var ajax = window.appContext.isAuthenticated() ? window.appContext.apiRequest : window.appContext.apiRequestNoAuth;
    ajax(
      this.props.url,
      'POST',
      this.state.data,
      this.onCreateSuccess,
      this.onCreateError
    );
  },

  onCreateSuccess: function (data) {
    this.setState(this.getInitialState());
    if (this.props.onSuccess) this.props.onSuccess();
    PubSub.publish("alert-success", "Saved.");
  },

  onCreateError: function (data, errors) {
    if (errors) {
      this.setState({errors: errors});
      this.props.validateForm(errors);
    }
    PubSub.publish("alert-error", 'Failed to create record. ');
  },

  render: function() {
    return (
      <SimpleForm
        title={this.props.title}
        onSubmit={this.onSubmitForm}
        onValidate={this.props.validateForm} >

        {this.props.children}

      </SimpleForm>
    );
  }
});
