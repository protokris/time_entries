var DocumentationUsers = React.createClass({

  render: function() {
    return (
      <div>
        <hr/><a name="users" />
        <h2>Users</h2>
          <p>Users of the application.</p>
          <p>Authentication is done via email and password for the user.</p>
          <p>Users have roles which determine authorization.</p>

        <h3>GET /users.json</h3>
        <p>Lists all users.</p>

        <h4>Request Parameters</h4>
        <table className="table-parameters">
          <thead><tr><td>Parameter</td><td>Description</td><td>Example</td></tr></thead>
          <tbody>
          <tr><td className="table-parameters-name">page</td>
            <td>Page number for paginated data retrieval.</td>
            <td>1</td></tr>
          </tbody>
        </table>

        <h4>Example Request</h4>
        <pre>{`
curl -v -X GET \\
http://`}{this.props.url}{`/users.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 200 OK</p>

        <pre>{`
[ {"id":1,"email":"kris.read@gmail.com","created_at":"2016-11-28T23:43:27.409Z","updated_at":"2016-11-28T23:43:27.409Z","url":"http://`}{this.props.url}{`/users/1.json"} ]
        `}</pre>

        <h3>GET /users/:id.json</h3>
        <p>Gets one user.</p>

        <h4>Example Request</h4>
        <pre>{`
curl -v -X GET \\
http://`}{this.props.url}{`/users/1.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 200 OK</p>

        <pre>{`
{"id":1,"email":"kris.read@gmail.com","created_at":"2016-11-28T23:43:27.409Z","updated_at":"2016-11-28T23:43:27.409Z","url":"http://`}{this.props.url}{`/users/1.json"}
        `}</pre>

        <h3>POST /users.json</h3>
        <p>Creates a new User.</p>

        <h4>Example Request</h4>
        <pre>{`
curl -v -X POST \\
http://`}{this.props.url}{`/users.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`' \\
-d '{
  "email": "joe@problems.com",
  "password": "s3cur3guy" }'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 201 Created</p>

        <pre>{`
{"id":2,"email":"joe@problems.com","created_at":"2016-11-29T02:49:53.822Z","updated_at":"2016-11-29T02:49:53.822Z","url":"http://`}{this.props.url}{`/users/2.json"}
        `}</pre>

        <h3>PUT /users/:id.json</h3>
        <p>Updates a User.</p>

        <h4>Example Request</h4>
        <pre>{`
curl -v -X PUT \\
http://`}{this.props.url}{`/users/2.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`' \\
-d '{ "email": "joe@theyh4ckedm3.com" }'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 200 OK</p>

        <pre>{`
{"id":2,"email":"joe@theyh4ckedm3.com","created_at":"2016-11-29T02:49:53.822Z","updated_at":"2016-11-29T02:50:45.623Z","url":"http://`}{this.props.url}{`/users/2.json"}
        `}</pre>

        <h3>DELETE /users/:id.json</h3>
        <p>Deletes a User.</p>

        <h4>Example Request</h4>
        <pre>{`
curl -v -X DELETE \\
http://`}{this.props.url}{`/users/2.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 204 No Content</p>

     </div>
   );
  }

});
