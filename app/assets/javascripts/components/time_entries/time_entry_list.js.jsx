var TimeEntryList = React.createClass({

  render: function() {
    return (
      <ListView
        title='Time Entries'
        path='time_entries'
        columns={['ID', 'Date', 'Time (sec)', 'Distance (m)', 'Avg Speed', 'Owner', '']}
        controlsClass={TimeEntryFilter}
        rowClass={TimeEntryRow}
        filterParams={window.appContext.query}
      />
    );
  }

});
