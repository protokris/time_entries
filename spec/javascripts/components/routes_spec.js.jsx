//= require browserify

describe('Routes', function() {

  it('can render without error', function() {

    var element = (
      <Routes />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

  });
});
