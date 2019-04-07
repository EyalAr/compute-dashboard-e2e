const { assert } = require('chai');

describe('EC2 Instances', () => {
  describe('export', () => {
    before(() => resetPage());
    before(() => doLogin());
    after(() => closePage());

    it('should display the export button above the instances list', async () => {
      const exportButton = page.$('button[aria-label="Export"]');
      assert.exists(exportButton);
    });
  });
});
