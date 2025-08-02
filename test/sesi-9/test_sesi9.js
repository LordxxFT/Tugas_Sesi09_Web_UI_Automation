const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const { delayed } = require('selenium-webdriver/lib/promise');

describe('Google Search Test', function () {
    let driver;

    it('Test SauceDemo login success', async function () {
        options = new chrome.Options();
        options.addArguments('--incognito'); // option ke chrome supaya gaada popup password nya
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        // assert: memastikan object sama persis
        assert.strictEqual(title, 'Swag Labs');

        //   |
        //   v


        // inputs
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()
        
        await driver.sleep(2000);


        await driver.quit();
    });

    it('Test SauceDemo -> login success -> change a-z to high - low', async function () {
        options = new chrome.Options();
        options.addArguments('--incognito'); // option ke chrome supaya gaada popup password nya
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        // assert: memastikan object sama persis
        assert.strictEqual(title, 'Swag Labs');

        //   |
        //   v

        // inputs
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()
        
        //   |
        //   v

        // tunggu element tampil
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Shopping cart harus tampil');
        
        // assert: elememt ada
        await buttonCart.isDisplayed()

        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.equal(logotext, 'Swag Labs')

        //   |
        //   v

        // assert: dropdown search
        let dropdownSort = await driver.findElement(By.xpath('//*[@data-test="product-sort-container"]'));
        await dropdownSort.click()     
        // az = dari a ke z
        // za = dari z ke a
        // lohi = dari harga rendah ke tinggi
        // hilo = dari harga tinggi ke rendah  
        let option = await driver.findElement(By.xpath('//*[@value="lohi"]'));
        await option.click();
        
        // jeda sebelum quitting driver
        await driver.sleep(2000);


        await driver.quit();
    });

});
