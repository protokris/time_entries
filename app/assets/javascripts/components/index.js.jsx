var Index = React.createClass ({
  render: function() {
    return(
      <div>
        <h1>Time Entries</h1>
        <p>This application can be used to track time (in seconds), distance (in meters) and average speed (in meters-per-second).</p>
        <h3>Features</h3>
          <ul>
            <li>User can create an account and log in.</li>
            <li>When logged in, user can see, edit and delete the times they entered.</li>
            <li>There are three user roles: User, Manager, Admin.</li>
            <li>Users can only work with their own time entries.</li>
            <li>Managers can also manage users.</li>
            <li>Admins can work with users and the time entries of everyone.</li>
            <li>Each time entry when entered has a date, distance,  average speed, and time.</li>
            <li>Time entries can be filtered by dates: from and to.</li>
            <li>There are reports including average speed & distance per week</li>
            <li>REST API. All actions can be performed via the API, including authentication.</li>
            <li>Single page, AJAX user interface.</li>
            <li>Test suite.</li>
          </ul>
        <h3>Instructions</h3>
        <ul>
          <li>Register a new account or be assigned an account by a Manager or Admin.</li>
          <li>Login and begin using the application.</li>
          <li>See REST API Documentation for details about API use.</li>
        </ul>
      </div>
    );
  }
});
