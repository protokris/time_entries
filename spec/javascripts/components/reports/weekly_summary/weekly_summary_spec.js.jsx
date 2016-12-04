//= require browserify

describe('WeeklySummary', function() {
  it('can render without error', function() {

    var element = (
      <WeeklySummary />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

    var renderedNode = ReactDOM.findDOMNode(component);

    var renderedTestNode = renderedNode.querySelectorAll("h1");
    expect(renderedTestNode.length).toEqual(2);
    expect(renderedTestNode[0].textContent).toEqual("Weekly Average Speed");
    expect(renderedTestNode[1].textContent).toEqual("Week By Week Summary");

  });
});
