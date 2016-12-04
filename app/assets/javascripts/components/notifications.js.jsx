var Notifications  = React.createClass({

  getInitialState: function () {
    return({
      showSuccess: false,
      successMsg: '',
      showError: false,
      errorMsg: ''
    });
  },

  componentDidMount: function() {
    PubSub.subscribe("alert-success", this.onSuccess);
    PubSub.subscribe("alert-error", this.onError);
  },

  onSuccess: function(msg, data) {
    this.setState({ showSuccess: true, successMsg: data});
    this.state = this.getInitialState();
  },

  onError: function(msg, data) {
    this.setState({ showError: true, errorMsg: data});
    this.state = this.getInitialState();
  },

  hideClass: function(show) {
    return show ? '' : 'hidden';
  },

  render: function() {
    var successClass = "alert alert-success " +
    this.hideClass(this.state.showSuccess);

    var errorClass = "alert alert-danger " +
    this.hideClass(this.state.showError);

    return (
      <div>
        <div className={successClass} role="alert">
          {this.state.successMsg}
        </div>

        <div className={errorClass} role="alert">
          {this.state.errorMsg}
        </div>

      </div>
    );
  }

});
