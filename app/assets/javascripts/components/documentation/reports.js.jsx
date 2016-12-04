var DocumentationReports = React.createClass({

  render: function() {
    return (
      <div>
        <hr/><a name="reports" />
        <h2>Reports</h2>
          <p>Report data can be fetched via REST API as well.</p>

        <h3>GET /week_summaries.json</h3>
        <p>Gets time entry data with each data row representing 1 week.</p>
        <p>Only available for the authenticated user.</p>

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
http://`}{this.props.url}{`/week_summaries.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 200 OK</p>

        <pre>{`
[ {"id":201648,"date":"2016-11-28","time":4148,"distance":614,"avg_speed":0.15},
  {"id":201647,"date":"2016-11-21","time":17368,"distance":2324,"avg_speed":0.13},
  {"id":201646,"date":"2016-11-14","time":20331,"distance":1954,"avg_speed":0.1} ]
        `}</pre>


        <h3>GET /day_summaries.json</h3>
        <p>Gets time entry data with each data row representing 1 day.</p>
        <p>Only available for the authenticated user.</p>

        <h4>Request Parameters</h4>
        <table className="table-parameters">
          <thead><tr><td>Parameter</td><td>Description</td><td>Example</td></tr></thead>
          <tbody>
          <tr><td className="table-parameters-name">page</td>
            <td>Page number for paginated data retrieval.</td>
            <td>1</td></tr>
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
http://`}{this.props.url}{`/day_summaries.json \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer `}{this.props.token}{`'
        `}</pre>

        <h4>Example Response</h4>
        <p>HTTP/1.1 200 OK</p>

        <pre>{`
[ {"id":2016339,"date":"2016-12-04","time":22,"distance":33,"avg_speed":1.5,"count":1},
  {"id":2016337,"date":"2016-12-02","time":11,"distance":11,"avg_speed":1.0,"count":1},
  {"id":2016334,"date":"2016-11-29","time":614,"distance":253,"avg_speed":0.41,"count":1} ]
        `}</pre>

     </div>
   );
  }

});
