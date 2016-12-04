//= require browserify

describe('TimeEntryRow', function() {
  it('can render without error', function() {

    var data = {};
    var element = (
      <table><tbody><TimeEntryRow data={data}/></tbody></table>
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

    var renderedNode = ReactDOM.findDOMNode(component);

    var renderedTestNode = renderedNode.querySelectorAll("tr");
    expect(renderedTestNode.length).toEqual(1);

  });
});
