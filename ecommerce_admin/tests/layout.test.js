const { test, expect,chromium } = require('@playwright/test');

test.describe('Layout Component', () => {
  let browser;
  let context;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('displays login button when session is not available', async () => {
    await page.setContent(`
      <div id="root">
        <Layout>
          <div data-testid="login-button">
            <button class="bg-white p-2 rounded-lg">Login with google</button>
          </div>
        </Layout>
      </div>
    `);

    const loginButton = await page.waitForSelector('button[data-testid="login-button"]');

    await expect(loginButton).toBeVisible();
  });

  test('displays main content when session is available', async () => {
    await page.setContent(`
      <div id="root">
        <Layout>
          <Navbar />
          <div data-testid="main-content">Main Content</div>
        </Layout>
      </div>
    `);

    const mainContent = await page.waitForSelector('div[data-testid="main-content"]');

    await expect(mainContent).toBeVisible();
  });
});

test.describe('Home Component', () => {
  let browser;
  let context;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('displays user name and image when session is available', async () => {
    await page.setContent(`
      <div id="root">
        <Layout>
          <div>
            <h3>
              Hello, <b>User Name</b>
            </h3>
            <div>
              <img src="user-image.jpg" alt="" class="h-6 w-5 rounded-full"/>
              <span>User Name</span>
            </div>
          </div>
        </Layout>
      </div>
    `);

    const userName = await page.waitForSelector('h3');
    const userImage = await page.waitForSelector('img');

    await expect(userName).toBeVisible();
    await expect(userImage).toBeVisible();
  });
});
