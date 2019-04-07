const { assert } = require('chai');

describe('Logout', () => {
  before(() => resetPage());
  before(() => doLogin());
  after(() => closePage());

  describe('before attempt', () => {
    it('should display the logout button in the profile menu', async () => {
      const bar = await page.$('header');
      assert.exists(bar, "bar doesn't exist");
      const profileButton = await page.$('button[title="Profile"]');
      assert.exists(profileButton, "profile button doesn't exist");
      await profileButton.click();
      const profileMenu = await page.$('div#menu-appbar ul[role="menu"]');
      assert.exists(profileMenu, "profile menu doesn't exist");
      const logoutButton = await profileMenu.$('li[class*="logout"]');
      assert.exists(logoutButton, "logout button doesn't exist");
      await bar.click(); // close menu
    });
  });

  describe('after attempt', () => {
    before('Logging out', async () => {
      await page.reload();
      const profileButton = await page.$('button[title="Profile"]');
      await profileButton.click();
      await page.waitFor('div#menu-appbar ul[role="menu"]');
      const profileMenu = await page.$('div#menu-appbar ul[role="menu"]');
      const logoutButton = await profileMenu.$('li[class*="logout"]');
      logoutButton.click();
      await page.waitFor('input#username');
    });
    it('should display the login form', async () => {
      const username = await page.$('input#username');
      const password = await page.$('input#password');
      assert.exists(username, "username input doesn't exist");
      assert.exists(password, "password input doesn't exist");
    });
  });
});
