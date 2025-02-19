import { platform } from 'os';
import * as playwright from 'playwright';

(async () => {
    // 使用谷歌浏览器
    const browser = await playwright.chromium.launch({
        channel: 'chrome',
        headless: false,
    });
    const context = await browser.newContext({
        screen: { width: 500, height: 400 },
        userAgent: "MyCustomUserAgent/1.0",
        locale: "en-US",
        timezoneId: "Europe/Paris",
        platform: "123",
    });

    const page = await context.newPage();

    // 创建一个新的 CDP 会话 发送自定义的 CDP 命令
    // const client = await context.newCDPSession(page);
    // await client.send('Network.enable');
    // await client.send('Network.setUserAgentOverride', {
    //     userAgent: 'MyCustomUserAgent/1.0'
    // });

    // 访问页面
    await page.goto('http://127.0.0.1:5001/gads');

    // 等待 #fp 元素出现
    await page.waitForSelector('#fp');

    // 获取页面内容
    // const content = await page.$eval('#fp', element => element.innerHTML);
    // console.log(content);

    debugger;
    // 关闭浏览器
    await browser.close();
})();