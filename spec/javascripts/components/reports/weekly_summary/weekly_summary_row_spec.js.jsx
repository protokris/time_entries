//= require browserify

describe('WeeklySummaryRow', function() {
  it('can render without error', function() {

    var data = {};
    var element = (
      <table><tbody><WeeklySummaryRow data={data}/></tbody></table>
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
