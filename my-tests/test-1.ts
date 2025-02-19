import * as playwright from 'playwright';

(async () => {
  // 使用谷歌浏览器
  const browser = await playwright.chromium.launch({
    channel: 'chrome',
    headless: false,
  });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
  });
  const page = await context.newPage();

  // 监听浏览器关闭事件
  browser.on('disconnected', () => {
    console.log('浏览器已关闭');
    process.exit(0); // 退出程序
  });

  // 访问页面
  await page.goto('http://127.0.0.1:5001/gads');
  // await page.goto('https://ipcs.vip/');

  // 等待网页资源全部加载完成，网络处于空闲状态
  await page.waitForLoadState('networkidle');

  debugger;
  // 移除手动关闭浏览器的代码
  await browser.close();
})();