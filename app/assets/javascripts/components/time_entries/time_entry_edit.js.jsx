var TimeEntryEdit  = React.createClass({

  getInitialState: function () {
    return({ errors: {} });
  },

  fillForm: function(data) {
    this.refs.date.value = data.date;
    this.refs.time.value = data.time;
    this.refs.distance.value = data.distance;
    this.refs.id.value = data.id;
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
    return {data: data};
  },

  render: function() {
    return (
      <EditForm
        title='Edit Time Entry'
        url={'/time_entries/' + this.props.params.id + '.json'}
        validateForm={this.validateForm}
        fillForm={this.fillForm}
        readForm={this.readForm}
        >

        <FormField error={this.state.errors.id}>
          <label className="control-label" htmlFor="id"> ID </label>
          <input name="id" ref="id" type="integer" className="form-control"
            id="id" disabled="disabled" value={this.state.id} />
        </FormField>

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
          <label className="control-label" htmlFor="distance"> Distance (Meters)</label>
          <input name="distance" ref="distance" type="integer" className="form-control"
            id="distance" placeholder="Distance" />
        </FormField>

      </EditForm>
    );
  }
});
