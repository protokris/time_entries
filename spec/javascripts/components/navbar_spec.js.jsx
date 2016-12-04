//= require browserify

describe('Navbar', function() {
  it('can render without error', function() {

    var element = (
      <Navbar />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

  });
});
