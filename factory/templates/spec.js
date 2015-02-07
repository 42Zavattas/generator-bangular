'use strict';

describe('Factory: <%= camelName %>', function () {

  beforeEach(module('<%= appname %>'));

  var <%= camelName %>;

  beforeEach(inject(function (_<%= camelName %>_) {
    <%= camelName %> = _<%= camelName %>_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
