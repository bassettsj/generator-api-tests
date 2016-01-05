import path from 'path';
import assert from 'yeoman-assert';
import { test as helpers } from 'yeoman-generator';

describe('generator-api-tests:app', function suite() {
  before((done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
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
