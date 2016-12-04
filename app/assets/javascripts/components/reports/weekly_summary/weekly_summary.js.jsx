var WeeklySummary = React.createClass({


  getInitialState: function() {
    return { data: [], dimensions: {}};
  },

  componentDidMount: function() {
    this.getData();
  },

  getData: function() {
    var url = '/week_summaries.json';
    window.appContext.apiRequest(
      url,
      'GET',
      null,
      this.onGetSuccess,
      this.onGetError
    );
  },

  onGetSuccess: function(data) {
    this.setState({data: data});
  },

  onGetError: function(data, errors) {
    PubSub.publish("alert-error",  'Graph could not be rendered. ');
  },

  onMeasure: function(dimensions) {
    this.setState({dimensions: dimensions});
  },


  render: function() {
    return (
      <Measure onMeasure={this.onMeasure}>
        <div>
          <h1>Weekly Average Speed</h1>
          
          <Recharts.LineChart width={this.state.dimensions.width} height={300} data={this.state.data}
              margin={{top: 40, right: 20, left: -20, bottom: 5}}>
            <Recharts.XAxis dataKey="date"/>
            <Recharts.YAxis/>
            <Recharts.CartesianGrid strokeDasharray="3 3"/>
            <Recharts.Tooltip/>
            <Recharts.Legend />
            <Recharts.Line type="monotone" dataKey="avg_speed" stroke="#8884d8"/>
          </Recharts.LineChart>

          <ListView
            title='Week By Week Summary'
            path='week_summaries'
            columns={['week', 'total time', 'total distance', 'average speed']}
            rowClass={WeeklySummaryRow}
          />
       </div>
    </Measure>
    );
  }
});
