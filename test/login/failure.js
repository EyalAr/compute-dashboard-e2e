const { assert } = require('chai');

describe('Login', () => {
  describe('failure', () => {
    before(async () => {
      await resetPage();
      await page.goto(APP_URL);
    });
    after(() => page.close());
    describe('before attempt', () => {
      it('should display the login form', async () => {
        const form = await page.$('[class*="Login-card-"]');
        assert.exists(form);
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
      });
      it('should keep displaying the login form', async () => {
        const form = await page.$('[class*="Login-card-"]');
        assert.exists(form);
      });
      it('should display error message', async () => {
        const error = await page.$('div[role="alertdialog"]');
        assert.exists(error);
      });
    });
  });
});
