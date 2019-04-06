const { assert } = require('chai');

describe('Login', () => {
  describe('failure', () => {
    before(async () => {
      await resetPage();
      await page.waitFor('input#username');
    });
    after(() => page.close());
    describe('before attempt', () => {
      it('should display the login form', async () => {
        const username = await page.$('input#username');
        const password = await page.$('input#password');
        assert.exists(username, "username input doesn't exist");
        assert.exists(password, "password input doesn't exist");
      });
    });
    describe('after attempt', () => {
      before(async () => {
        const username = await page.$('input#username');
        const password = await page.$('input#password');
        const submit = await page.$('button[type="submit"]');
        await username.focus();
        await page.keyboard.type('not-a-user');
        await password.focus();
        await page.keyboard.type('passpass');
        await submit.click();
        await page.waitFor(1000);
      });
      it('should keep displaying the login form', async () => {
        const username = await page.$('input#username');
        const password = await page.$('input#password');
        assert.exists(username, "username input doesn't exist");
        assert.exists(password, "password input doesn't exist");
      });
      it('should display error message', async () => {
        const error = await page.$('div[role="alertdialog"]');
        assert.exists(error);
      });
    });
  });
});
