//= require browserify

describe('ListView', function() {
  it('can render without error', function() {

    var element = (
      <ListView title="Test Form" columns={[]}/>
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

    var renderedNode = ReactDOM.findDOMNode(component);

    var renderedTestNode = renderedNode.querySelectorAll("h1");
    expect(renderedTestNode.length).toEqual(1);
    expect(renderedTestNode[0].textContent).toEqual("Test Form");

  });
});
