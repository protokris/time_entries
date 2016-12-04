var SimpleForm = React.createClass({

  onSubmitForm: function (e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.onSubmit();
    }
  },

  validateForm: function() {
    var errors = this.props.onValidate();
    if (Object.keys(errors).length !== 0) {
      return false;
    }
    return true;
  },

  render: function() {
    return (
      <div className="form-container half">
        <h1>{this.props.title}</h1>
        <br/>
        <form ref='app_form' onSubmit={this.onSubmitForm}>

          {this.props.children}

          <button type="submit" className="btn btn-default">
            Submit
          </button>
          &nbsp;&nbsp;
          <button type="button" className="btn btn-default" onClick={History.goBack}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

});
