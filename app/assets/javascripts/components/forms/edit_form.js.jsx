var EditForm  = React.createClass({

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
    window.appContext.apiRequest(
      this.props.url,
      'PATCH',
      this.state.data,
      this.onUpdateSuccess,
      this.onUpdateError
    );
  },

  onUpdateSuccess: function (data) {
    History.push('/' + this.props.url.split('/')[1]);
    PubSub.publish("alert-success", "Saved.");
  },

  onGetSuccess: function(data) {
    this.setState(
      {data: data},   // do I need to filter?
      _.bind(this.props.fillForm, this, data)
    );
  },

  onUpdateError: function (data, errors) {
    if (errors) {
      this.setState({errors: errors});
      this.props.validateForm(errors);
    }
    PubSub.publish("alert-error", 'Failed to modify record. ');
  },

  onGetError: function(data, errors) {
    if (errors) this.setState({errors: errors});
    PubSub.publish("alert-error",  'Record could not be loaded. ');
  },

  componentDidMount: function() {
    window.appContext.apiRequest(
      this.props.url,
      'GET',
      {},
      this.onGetSuccess,
      this.onGetError
    );
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
