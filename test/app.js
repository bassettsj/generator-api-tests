import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

describe('generator-api-tests:app', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../src/app'))
      .withOptions({ someOption: true })
      .withPrompts({ someAnswer: true })
      .on('end', done);
  });

  it('creates files', () => {
    assert.file([
      'dummyfile.txt',
    ]);
  });
});
