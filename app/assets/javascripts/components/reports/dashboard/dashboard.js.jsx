var Dashboard = React.createClass({

  getInitialState: function() {
    var oneWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
    return {data: [], fromDate: oneWeekAgo};
  },

  componentDidMount: function() {
    var toDate = moment(this.state.fromDate).add(6, 'days').format('YYYY-MM-DD');
    var url = '/day_summaries.json' + '?fromDate=' + this.state.fromDate + '&toDate=' + toDate;
    window.appContext.apiRequest(
      url,
      'GET',
      null,
      this.onGetSuccess,
      this.onGetError
    );
  },

  onGetSuccess: function(data) {
    this.setState({data: data, totals: this.calcTotals(data)});
  },

  onGetError: function(data, errors) {
    PubSub.publish("alert-error",  'Dahsboard could not be loaded. ');
  },

  calcTotals: function(data) {
    var time = 0, distance = 0, avg_speed = 0;

    // loop over data and accumulate times, distances and average speeds.
    _.each(data, function(timeEntry) {
      time += timeEntry.time;
      distance += timeEntry.distance;
    });

    // summary reecord
    return({time: time, distance: distance, avg_speed: (distance / time).toFixed(2), days: data.length || 0});
  },

  onFilterChanged: function(fromDate) {
    this.setState({fromDate: fromDate}, this.componentDidMount);
  },

  renderDash: function() {
    if (this.state.totals) {
      return (
        <div className="row">
          <div className="col-md-3">
            <div className="dash-panel">
              <h3> Total Distance </h3>
              <h1> {this.state.totals.distance} m </h1>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dash-panel">
              <h3> Total Time </h3>
              <h1> {this.state.totals.time} sec </h1>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dash-panel">
              <h3> Days Tracked </h3>
              <h1> {this.state.totals.days} d </h1>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dash-panel">
              <h3> Average Speed </h3>
              <h1> {this.state.totals.avg_speed} m/s </h1>
            </div>
          </div>
        </div>

      );
    }
    return;
  },

  renderGraphs: function() {
    if (this.state.dimensions && this.state.dimensions.width)
    return (
      <div>

        <h2>Time (Seconds)</h2>
        <div className="graph-panel">
          <Recharts.BarChart
            width={this.state.dimensions.width}
            height={300}
            data={this.state.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <Recharts.XAxis dataKey="date"/>
            <Recharts.YAxis/>
            <Recharts.CartesianGrid strokeDasharray="3 3"/>
            <Recharts.Tooltip/>
            <Recharts.Legend />
            <Recharts.Bar dataKey="time" fill="#8888d8" />
          </Recharts.BarChart>
        </div>

        <h2>Distance (Meters)</h2>
        <div className="graph-panel">
          <Recharts.BarChart
            width={this.state.dimensions.width}
            height={300}
            data={this.state.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <Recharts.XAxis dataKey="date"/>
            <Recharts.YAxis/>
            <Recharts.CartesianGrid strokeDasharray="3 3"/>
            <Recharts.Tooltip/>
            <Recharts.Legend />
            <Recharts.Bar dataKey="distance" fill="#88d888" />
          </Recharts.BarChart>
        </div>
      </div>
    );
    else return;
  },

  onMeasure: function(dimensions) {
    this.setState({dimensions: dimensions});
  },

  render: function() {
    return(
      <Measure onMeasure={this.onMeasure}>
        <div>
          <h1>Dashboard</h1>
          <DashboardControls onFilterChanged={this.onFilterChanged} fromDate={this.state.fromDate}/>

          {this.renderDash()}
          {this.renderGraphs()}

        </div>
      </Measure>
    );
//
  }

});
