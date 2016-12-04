var Register  = React.createClass({

  getInitialState: function () {
    return({ errors: {} });
  },

  validateForm: function (errors) {
    errors = errors ? errors : {};
    if(this.refs.email.value === "") {
      errors.email = "An email is required";
    }
    if(this.refs.password.value === "") {
      errors.password = "A password is required";
    }
    this.setState({errors: errors});
    return errors;
  },

  readForm: function() {
    var data = {};
    data.email = this.refs.email.value;
    data.password = this.refs.password.value;
    return {data: data};
  },

  onSuccess: function() {
    if (window.appContext.isAuthenticated()) {
      History.push('/users');
    } else {
      History.push('/login');
    }
  },

  render: function() {
    return (
      <CreateForm
        title='Register User'
        url='/users.json'
        validateForm={this.validateForm}
        readForm={this.readForm}
        onSuccess={this.onSuccess}
        >

        <FormField error={this.state.errors.email}>
          <label className="control-label" htmlFor="email"> Email </label>
          <input name="email" ref="email" type="email" className="form-control"
            id="email" placeholder="Email" />
        </FormField>

        <FormField error={this.state.errors.password}>
          <label className="control-label" htmlFor="password"> Password </label>
          <input name="password" ref="password" type="password" className="form-control"
            id="password" placeholder="Password" />
        </FormField>

        { window.appContext.isAuthenticated() &&

          <FormField error={this.state.errors.role}>
            <label className="control-label" htmlFor="time"> Role </label>
            <select value={this.state.role}  id="role" className="form-control" ref="role">
                <option value="0">User</option>
                <option value="1">Manager</option>
                <option value="2">Admin</option>
            </select>
          </FormField>
        }

      </CreateForm>
    );
  }
});
