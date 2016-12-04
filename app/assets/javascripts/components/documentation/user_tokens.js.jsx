var DocumentationUserTokens = React.createClass({

  render: function() {
    return (
      <div>
        <a name="user_tokens" />
        <h2>User Tokens </h2>
        <p>This application uses JSON Web Tokens as an authentication solution. </p>
        <p>JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.</p>
        <p>A client can request a token by supplying the username and password for a user.  The returned token will be valid for one (1) day for future API requests.</p>

        <h3>POST /user_tokens.json</h3>
        <p>Creates a Token</p>

        <h4>Example Request</h4>
        <pre>{`
curl -X POST \\
'http://`}{this.props.url}{`/user_tokens.json' \\
-H 'Content-Type: application/json' \\
-d '{ "auth": { "email": "kris.read@gmail.com", "password": "password123" } }'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 200 OK</p>

        <pre>{`
{"jwt":"`}{this.props.token}{`"}
        `}</pre>

     </div>
   );
  }

});
