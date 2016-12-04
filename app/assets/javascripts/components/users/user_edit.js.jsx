var UserEdit  = React.createClass({

  getInitialState: function () {
    return({ errors: {} });
  },

  fillForm: function(data) {
    this.refs.email.value = data.email;
    this.refs.role.value = data.role;
  },

  validateForm: function (errors) {
    errors = errors ? errors : {};
    if(this.refs.email.value === "") {
      errors.email = "An email is required";
    }
    this.setState({errors: errors});
    return errors;
  },

  readForm: function() {
    var data = {};
    data.email = this.refs.email.value;
    data.role = this.refs.role.value;
    return {data: data};
  },

  render: function() {
    return (
      <EditForm
        title='User'
        url={'/users/' + this.props.params.id + '.json'}
        validateForm={this.validateForm}
        fillForm={this.fillForm}
        readForm={this.readForm}
        >

        <FormField error={this.state.errors.id}>
          <label className="control-label" htmlFor="id"> ID </label>
          <input name="id" ref="id" type="integer" className="form-control"
            id="id" placeholder="ID" disabled="disabled" value={this.props.params.id} />
        </FormField>

        <FormField error={this.state.errors.email}>
          <label className="control-label" htmlFor="email"> Email </label>
          <input name="email" ref="email" type="email" className="form-control"
            id="email" placeholder="Email" />
        </FormField>

        <FormField error={this.state.errors.role}>
          <label className="control-label" htmlFor="time"> Role </label>
          <select value={this.state.role}  id="role" className="form-control" ref="role">
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
          </select>
        </FormField>

      </EditForm>
    );
  }
});
