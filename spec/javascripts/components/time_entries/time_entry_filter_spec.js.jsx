//= require browserify

describe('TimeEntryFilter', function() {
  it('can render without error', function() {

    var element = (
      <TimeEntryFilter />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
      var renderedNode = ReactDOM.findDOMNode(component);
    }).not.toThrow();


  });
});
