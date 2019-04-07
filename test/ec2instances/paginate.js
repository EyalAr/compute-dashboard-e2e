const { assert } = require('chai');

describe('EC2 Instances', () => {
  describe('paginate', () => {
    before(() => resetPage());
    before(() => doLogin());
    after(() => closePage());

    before(() => page.waitFor(3000)); // let results load

    it('should display Next button below the instances list', async () => {
      const nextButton = await page.$('button.next-page');
      assert.exists(nextButton);
    });

    describe('clicking Next', () => {
      let listBefore;
      let listAfter;
      before(async () => {
        listBefore = await page.$eval('tbody.datagrid-body', e => e.innerHTML);
        const nextButton = await page.$('button.next-page');
        await nextButton.click();
        await page.waitFor(3000);
        listAfter = await page.$eval('tbody.datagrid-body', e => e.innerHTML);
      });

      it('should display different results when Next is clicked', async () => {
        assert.notDeepEqual(listAfter, listBefore);
      });

      it('should display Prev button below the instances list', async () => {
        const prevButton = await page.$('button.previous-page');
        assert.exists(prevButton);
      });
    });
  });
});
