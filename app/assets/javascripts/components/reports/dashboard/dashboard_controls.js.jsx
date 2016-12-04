var DashboardControls = React.createClass({

  onFilterChanged: function() {
    this.props.onFilterChanged(this.refs.from.value);
  },

  componentDidMount: function() {
    this.refs.from.value = this.props.fromDate;
  },

  render: function() {
    return (
      <div className="form-container well">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label" htmlFor="from">
                  Week Starting...
                </label>
                <input name="from" ref="from" type="date"
                  className="form-control" id="from" placeholder="From Date" />
              </div>
            </div>
            <div className="col-md-6">
              <label className="control-label" htmlFor="refresh">&nbsp;</label><br/>
                <button name="refresh" id="refresh" className="btn btn-default" onClick={this.onFilterChanged}>Submit</button>&nbsp;&nbsp;
            </div>
          </div>
      </div>
    );
  }

});
