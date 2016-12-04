var App = React.createClass ({

  apiRequest: function(url, type, data, onSuccess, onFail) {
    $.ajax({
      url: url,
      headers: {"Authorization": "Bearer " + this.token() },
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      type: type,
      cache: false,
      statusCode: { 401: this.handleUnauthorized },
      data: data ? JSON.stringify(data) : null
    }).done(onSuccess).fail(_.bind(this.handleRequestError, this, onFail));
  },

  apiRequestNoAuth: function(url, type, data, onSuccess, onFail) {
    $.ajax({
      url: url,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      type: type,
      cache: false,
      data: data ? JSON.stringify(data) : null
    }).done(onSuccess).fail(_.bind(this.handleRequestError, this, onFail));
  },

  handleRequestError: function(onFail, data) {
    var response = data ? data.responseJSON : null;
    var errors = null;
    if (response && response.errors) {
      errors = _.mapValues(response.errors, function(v, k) {
        return _.capitalize(k) + " " + v;
      });
    }
    onFail(data, errors);
  },

  handleUnauthorized: function() {
    sessionStorage.clear();
    History.push('/login');
    PubSub.publish("alert-error", "Credentials invalid or expired. Please login.");
  },

  token: function() {
    var token = sessionStorage.getItem('jwt');
    if (token === null) {
      History.push('/login');
      PubSub.publish("alert-error", "Your login has expired.");
    }
    return token;
  },

  isAuthenticated: function() {
    return(sessionStorage.getItem('jwt') !== null);
  },

  role: function() {
    return sessionStorage.getItem('role');
  },

  isAdmin: function() {
    return (this.role() === "admin");
  },

  isManager: function() {
    return (this.role() === "manager");
  },

  isUser: function() {
    return (this.role() === "user");
  },

  appContext: function() {
    return({
      pathname: this.props.location.pathname,
      query: this.props.location.query,
      apiRequest: this.apiRequest,
      apiRequestNoAuth: this.apiRequestNoAuth,
      isAuthenticated: this.isAuthenticated,
      isAdmin: this.isAdmin,
      isManager: this.isManager,
      isUser: this.isUser
    });
  },

  render: function() {
    window.appContext = this.appContext();
    return(
      <div>
        <Navbar />
        <div className="container">
            <Notifications />
            { this.props.children }
        </div>
      </div>
    );
  }
});
