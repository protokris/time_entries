var TimeEntryNew  = React.createClass({

  getInitialState: function () {
    return({ errors: {} });
  },

  validateForm: function (errors) {
    errors = errors ? errors : {};
    if(this.refs.date.value === "") {
      errors.date = "A date is required";
    }
    if(this.refs.time.value === "") {
      errors.time = "A time is required";
    }
    if(this.refs.distance.value === "") {
      errors.distance = "A distance is required";
    }
    this.setState({errors: errors});
    return errors;
  },

  readForm: function() {
    var data = {};
    data.date = this.refs.date.value;
    data.time = this.refs.time.value;
    data.distance = this.refs.distance.value;
    if (window.appContext.isAdmin() && this.refs.email) {
      data.email = this.refs.email.value;
    }
    return {data: data};
  },

  onSuccess: function() {
    History.push('/time_entries');
  },

  render: function() {
    return (
      <CreateForm
        title='New Time Entry'
        url='/time_entries.json'
        validateForm={this.validateForm}
        readForm={this.readForm}
        onSuccess={this.onSuccess}
        >

        {window.appContext.isAdmin() && window.appContext.query.email &&
          <FormField error={this.state.errors.email}>
            <label className="control-label" htmlFor="email"> User</label>
            <input name="email" ref="email" type="string" className="form-control"
              id="email" disabled="disabled" value={window.appContext.query.email}  />
          </FormField>
        }

        <FormField error={this.state.errors.date}>
          <label className="control-label" htmlFor="date"> Date </label>
          <input name="date" ref="date" type="date" className="form-control"
            id="date" placeholder="Date" />
        </FormField>

        <FormField error={this.state.errors.time}>
          <label className="control-label" htmlFor="time"> Time (Seconds)</label>
          <input name="time" ref="time" type="integer" className="form-control"
            id="time" placeholder="Time" />
        </FormField>

        <FormField error={this.state.errors.distance}>
          <label className="control-label" htmlFor="distance"> Distance (Meters) </label>
          <input name="distance" ref="distance" type="integer" className="form-control"
            id="distance" placeholder="Distance" />
        </FormField>

      </CreateForm>
    );
  }
});
