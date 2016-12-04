var TimeEntryFilter = React.createClass({

  getInitialState: function () {
    var userId = window.appContext.query ? window.appContext.query.user_id : null;
    return {userId: userId };
  },

  filter: function() {
    var data = {
      fromDate: this.refs.from.value,
      toDate: this.refs.to.value
    };
    if (this.state.userId) data.user_id = this.state.userId;
    this.props.onFilterChanged(data);
  },

  clear: function() {
    this.setState({userId: ''}, function() {
      this.refs.from.value = this.refs.to.value = "";
      this.filter();
    });
  },

  onUserChange: function(userId) {
    this.setState({userId: userId});
  },

  render: function() {
    return (
      <div className="form-container well">
          <Link className="add-btn-float btn btn-default" to={'/' + this.props.path + '/new'}>Add</Link>

          { window.appContext.isAdmin() &&
            <UserSelect selected={this.state.userId} onChange={this.onUserChange} />
          }

          <div className="row">
            <div className="col-md-5">

              <div className="form-group">
                <label className="control-label" htmlFor="from">From Date</label>
                <input name="from" ref="from" type="date" className="form-control" id="from"
                  placeholder="From Date"/>
              </div>
            </div>

            <div className="col-md-5">
              <div className="form-group">
                <label className="control-label" htmlFor="to">To Date</label>
                <input name="to" ref="to" type="date" className="form-control"
                  id="to" placeholder="To Date"/>
              </div>
            </div>

            <div className="col-md-2">
              <label className="control-label" htmlFor="refresh">&nbsp;</label><br/>
                <button name="refresh" id="refresh" className="btn btn-default" onClick={this.filter}>Submit</button>&nbsp;&nbsp;
                <button name="clear" id="clear" className="btn btn-default" onClick={this.clear}>Clear</button>
            </div>

          </div>

      </div>
    );
  }
});
