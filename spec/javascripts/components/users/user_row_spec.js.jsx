//= require browserify

describe('UserRow', function() {

  it('can render without error', function() {

    var data = {id: 0, email: 'test@test.com'};
    var element = (
      <table><tbody><UserRow data={data} /></tbody></table>
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

  });
});
