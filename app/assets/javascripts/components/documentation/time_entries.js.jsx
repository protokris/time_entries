var DocumentationTimeEntries = React.createClass({

  render: function() {
    return (
      <div>

        <hr/><a name="time_entries" />
        <h2>Time Entries</h2>
        <p>Time Entries allow the a user to track the time, distance, and date for a trip. </p>
        <p>Each trip belongs to a single user.</p>

        <h3>GET /time_entries.json</h3>
        <p>Lists all time entries.</p>
        <h4>Request Parameters</h4>
        <table className="table-parameters">
          <thead><tr><td>Parameter</td><td>Description</td><td>Example</td></tr></thead>
          <tbody>
          <tr><td className="table-parameters-name">page</td>
            <td>Page number for paginated data retrieval.</td>
            <td>1</td></tr>
              <tr><td className="table-parameters-name">user_id</td>
                <td>Retrieve entries belonging to this user.<br/>
                    By default fetches for all allowed users.</td>
                <td>4</td></tr>
          <tr><td className="table-parameters-name">fromDate</td>
            <td>Filter to show time entries on or after this date.</td>
            <td>1991-12-31</td></tr>
          <tr><td className="table-parameters-name">toDate</td>
            <td>Filter to show time entries on or before this date.</td>
            <td>2016-01-01</td></tr>
          </tbody>
        </table>

        <h4>Example Request</h4>
        <pre>{`
curl -v -X GET \\
http://`}{this.props.url}{`/time_entries.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 200 OK</p>

        <pre>{`
[ {"id":1,"date":"2016-11-27","time":1888,"distance":194,"avg_speed":0.1,"url":"http://`}{this.props.url}{`/time_entries/1.json"},
  {"id":2,"date":"2016-11-26","time":4205,"distance":497,"avg_speed":0.12,"url":"http://`}{this.props.url}{`/time_entries/2.json"} ]
        `}</pre>

        <h3>GET /time_entries/:id.json</h3>
        <p>Gets one time entry.</p>

        <h4>Example Request</h4>
        <pre>{`
curl -v -X GET \\
http://`}{this.props.url}{`/time_entries/1.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 200 OK</p>


          <pre>{`
{"id":1,"date":"2016-11-27","time":1888,"distance":194,"avg_speed":0.1,"url":"http://`}{this.props.url}{`/time_entries/1.json"}
          `}</pre>

        <h3>POST /time_entries.json</h3>
        <p>Creates a new Time Entry.</p>

        <h4>Example Request</h4>
        <pre>{`
curl -v -X POST \\
http://`}{this.props.url}{`/time_entries.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`' \\
-d '{
  "date": "2015-12-31",
  "time": "300",
  "distance": "54" }'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 201 Created</p>

        <pre>{`
{"id":92,"date":"2015-12-31","time":300,"distance":54,"avg_speed":0.18,"url":"http://`}{this.props.url}{`/time_entries/92.json"}
        `}</pre>

        <h3>PUT /time_entries/:id.json</h3>
        <p>Updates a Time Entry.</p>

        <h4>Example Request</h4>
        <pre>{`
curl -v -X PUT \\
http://`}{this.props.url}{`/time_entries/92.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`' \\
-d '{
  "date": "2015-12-31",
  "time": "666",
  "distance": "111" }'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 200 OK</p>

        <pre>{`
{"id":92,"date":"2015-12-31","time":666,"distance":111,"avg_speed":0.17,"url":"http://`}{this.props.url}{`/time_entries/92.json"}
        `}</pre>

        <h3>DELETE /time_entries/:id.json</h3>
        <p>Deletes a Time Entry.</p>

        <h4>Example Request</h4>
        <pre>{`
curl -v -X DELETE \\
http://`}{this.props.url}{`/time_entries/92.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 204 No Content</p>
     </div>
   );
  }

});
