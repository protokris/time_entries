var Navbar = React.createClass({

  user: function() {
    return(sessionStorage.getItem('user'));
  },

  isLoggedIn: function() {
    return(sessionStorage.getItem('jwt') !== null);
  },

  logout: function() {
    sessionStorage.clear();
    History.push('/login');
    PubSub.publish("alert-success", "Logout succeeded.");
  },

  renderListEntries: function() {
    if (!this.isLoggedIn()) return;
    return(
      <li className="dropdown"> <a href="#" className="dropdown-toggle"
        data-toggle="dropdown" role="button" aria-haspopup="true"
        aria-expanded="false"> Time Entries <span className="caret"></span> </a>
      <ul className="dropdown-menu">
        <li> <Link to={'/reports/dashboard'}> Dashboard </Link> </li>
        <li> <Link to={'/time_entries'}>List</Link> </li>
        <li> <Link to={'/time_entries/new'}>Add</Link> </li>
        <li> <Link to={'/reports/weekly_summary'}> Week By Week Summary </Link> </li>
      </ul>
    </li>
  );
},

renderUsers: function() {
  if (!this.isLoggedIn()) return;
  if (window.appContext.isUser()) return;

  return(
    <li className="dropdown">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown"
        role="button" aria-haspopup="true" aria-expanded="false">
          Users <span className="caret"> </span>
      </a>
      <ul className="dropdown-menu">
        <li> <Link to={'/users'}>List</Link> </li>
        <li> <Link to={'/users/new'}>Add</Link> </li>
      </ul>
    </li>
  );
},

renderLoginLogout: function() {
  if (!this.isLoggedIn()) {
    return(
      <ul className="nav navbar-nav navbar-right">
        <li> <Link to={'/documentation'}>Documentation</Link> </li>
        <li> <Link to={'/register'}>Register</Link> </li>
        <li> <Link to={'/login'}>Login</Link> </li>
      </ul>
    );
  } else {
    return(
      <ul className="nav navbar-nav navbar-right">

      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown"
          role="button" aria-haspopup="true" aria-expanded="false">
          {window.appContext.isAdmin() && <span className="glyphicon glyphicon-king" aria-hidden="true"></span> }
          {window.appContext.isManager() && <span className="glyphicon glyphicon-knight" aria-hidden="true"></span> }
          {window.appContext.isUser() && <span className="glyphicon glyphicon-pawn" aria-hidden="true"></span> }

            {this.user()} <span className="caret"> </span>
        </a>
        <ul className="dropdown-menu">
          <li> <Link to={'/documentation'}>Documentation</Link> </li>
          <li> <a href="#" onClick={this.logout}>Logout</a> </li>
        </ul>
      </li>
    </ul>
    );
  }
},

render: function() {
  return(
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
            data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only"> Toggle navigation </span>
            <span className="icon-bar"></span>
            <span className="icon-bar"> </span>
            <span className="icon-bar"> </span>
          </button>
          <Link className="navbar-brand" to={'/'}>Time Entries</Link>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            {this.renderListEntries()}
            {this.renderUsers()}
          </ul>
          {this.renderLoginLogout()}
        </div>
      </div>
    </nav>
  );
}

});
