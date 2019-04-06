const { assert } = require('chai');

describe('Login', () => {
  describe('success', () => {
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
        await page.keyboard.type(USERNAME);
        await password.focus();
        await page.keyboard.type(PASSWORD);
        await submit.click();
        await page.waitFor('header');
      });
      it('should not keep displaying the login form', async () => {
        const username = await page.$('input#username');
        const password = await page.$('input#password');
        assert.notExists(username, 'username input exists');
        assert.notExists(password, 'password input exists');
      });
      it('should display menu bar with profile menu and logout button', async () => {
        const bar = await page.$('header');
        assert.exists(bar, "bar doesn't exist");
        const profileButton = await page.$('button[title="Profile"]');
        assert.exists(profileButton, "profile button doesn't exist");
        await profileButton.click();
        const profileMenu = await page.$('div#menu-appbar ul[role="menu"]');
        assert.exists(profileMenu, "profile menu doesn't exist");
        const logoutButton = await profileMenu.$('li[class*="logout"]');
        assert.exists(logoutButton, "logout button doesn't exist");
      });
    });
  });
});
