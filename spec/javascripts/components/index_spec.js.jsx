//= require browserify

describe('Index', function() {
  it('can render without error', function() {

    var element = (
      <Index />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

  });
});
