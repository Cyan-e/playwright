import * as playwright from 'playwright';

(async () => {
    // 使用谷歌浏览器
    const browser = await playwright.chromium.launch({
        channel: 'chrome',
        headless: false,
    });
    const context = await browser.newContext({
        isMobile:true,
        screen: { width: 500, height: 400 },
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110",
        locale: "en-US",
        timezoneId: "Europe/Paris",
        navigator: {
            platform: "platform-test1",
            userAgentData: {
                platformVersion:"10.1.11-test",
                architecture: "arcch-test",
                bitness: "x64-test",
                model: "model-test",
                wow64: true,
                platform:"platform-test2",
                brands: [
                    {
                        brand: "Google Chrome",
                        version: "94",
                    },
                    {
                        brand: ";Not A Brand",
                        version: "99",
                    },
                ]
            }
        },
        extraHTTPHeaders: {
            "sec-ch-ua": '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
        },
        deviceScaleFactor: 1.5,
    });

    const page = await context.newPage();

    // 创建一个新的 CDP 会话 发送自定义的 CDP 命令
    const client = await context.newCDPSession(page);
    await client.send('Emulation.setIdleOverride',{
        isUserActive: false,
        isScreenUnlocked:false,
    });

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