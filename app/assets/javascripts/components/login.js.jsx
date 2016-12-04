var Login  = React.createClass({

    getInitialState: function () {
      var cookieEmail = Cookies.get('email') || "";
      return({ data: {auth: {email: cookieEmail, password: ""}}, errors: {} });
    },

    onSubmitForm: function () {
      this.setState(this.readForm(), this.sendData);
    },

    readForm: function() {
      var auth = {};
      auth.email = this.refs.email.value;
      auth.password = this.refs.password.value;
      return {data: {auth: auth}};
    },

    sendData: function() {
      window.appContext.apiRequestNoAuth(
        '/user_tokens',
        'POST',
        this.state.data,
        this.onLoginSuccess,
        this.onLoginError
      );
    },

    onLoginSuccess: function (data) {
      Cookies.set('email', this.state.data.auth.email);
      sessionStorage.setItem('user', this.state.data.auth.email);
      sessionStorage.setItem('jwt', data.jwt);
      sessionStorage.setItem('role', data.role);

      this.setState(this.getInitialState());
      History.push('reports/dashboard');
    },

    onLoginError: function (data, errors) {
      if (errors) this.setState({errors: errors});
      PubSub.publish("alert-error", 'Failed to login.');
    },

    validateForm: function () {
      var errors = {};
      if(this.refs.email.value === "") {
        errors.email = "An email is required";
      }
      if(this.refs.password.value === "") {
        errors.password = "A password is required";
      }
      this.setState({errors: errors});
      return errors;
    },

    componentDidMount: function() {
      sessionStorage.clear();
    },

    render: function() {
      return (
        <SimpleForm
          title='Login'
          onSubmit={this.onSubmitForm}
          onValidate={this.validateForm} >

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

        </SimpleForm>
      );
    }

});
