const { assert } = require('chai');

describe('Login', () => {
  describe('success', () => {
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
        await page.keyboard.type(USERNAME);
        await password.focus();
        await page.keyboard.type(PASSWORD);
        await submit.click();
      });
      it('should not keep displaying the login form', async () => {
        const form = await page.$('[class*="Login-card-"]');
        assert.notExists(form);
      });
      it('should display menu bar with profile menu and logout button', async () => {
        const bar = await page.$('header[class*="MuiAppBar-root-"]');
        assert.exists(bar, "bar doesn't exist");
        const profileButton = await page.$('button[title="Profile"]');
        assert.exists(profileButton, "profile button doesn't exist");
        await profileButton.click();
        const profileMenu = await page.$('ul[role="menu"][class*="MuiList-root-"]');
        assert.exists(profileMenu, "profile menu doesn't exist");
        const logoutButton = await profileMenu.$('li[class*="logout"]');
        assert.exists(logoutButton, "logout button doesn't exist");
      });
    });
  });
});
