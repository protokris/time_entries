var Documentation = React.createClass({

  url: function() {
    return window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  },

  token: function() {
    if (window.appContext.isAuthenticated()) {
      var token = window.sessionStorage.getItem('jwt');
      if (token) {
        return token;
      }
    }
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0ODA0NzA4OTIsInN1YiI6MX0.IllGaYcqSFwQlGTxYYIvIBQwTmCkhZ7h5ws4ulSLFRI";
  },

  render: function() {
    return (
      <div className="docs">
        <h1>REST API</h1>
        <p>Below you will find documenation for the complete REST API for this application.</p>
        <br/><br/>
        <DocumentationUserTokens url={this.url()} token={this.token()} />
        <DocumentationTimeEntries url={this.url()} token={this.token()} />
        <DocumentationUsers url={this.url()} token={this.token()} />
        <DocumentationReports url={this.url()} token={this.token()} />
        <br/><br/><br/><br/><br/>
      </div>
    );
  }

});
