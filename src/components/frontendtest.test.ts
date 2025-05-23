import { afterEach } from 'node:test';
import puppeteer, { Browser, Page } from 'puppeteer';
import { beforeAll, test, expect, afterAll } from "vitest";


let browser: Browser
let page: Page;

afterEach(async () => {
   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profiles`, 
        { 
            method: "DELETE",
            
            body: JSON.stringify({
                    username: "testuser"
                }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            credentials: "include" 
        }
    );

    console.log(response);
});

beforeAll(async () => {
  browser = await puppeteer.launch({   
    headless: false, 
    slowMo: 50,      
    defaultViewport: null});
  page = await browser.newPage();
  await page.goto('http://localhost:5173'); 
  
}, 20000);

afterAll(async () => {
  await browser.close();
});


// tests C and R
test("Account created successfully", async () => {
    // click login button
    await page.click('#get-started');

    page.on('dialog', async (dialog) => {
        await dialog.dismiss(); 
    });

    let url = page.url();

    expect(url).toBe('http://localhost:5173/signup');

    // fill in the form
    await page.type('input[placeholder="username"]', 'testuser');
    await page.type('input[placeholder="password"]', 'Abc123!@');

    // click the submit button
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    url = page.url();
    expect(url).toBe('http://localhost:5173/testuser/startup');

    await page.type('input[placeholder="Email"]', 'testemail@gmail.com');
    await page.type('input[placeholder="Enter an address"]', 'Test');
    await page.select("#emailReminderPreference", "1_day");

    // click the submit button
    console.log(page.url());
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    url = page.url();
    expect(url).toBe('http://localhost:5173/profile/testuser');
})


// Invalid Create
test("Account created successfully", async () => {
    // click login button
    await page.click('#get-started');

    const url = page.url();
    expect(url).toBe('http://localhost:5173/signup');

    let alertMessage = '';
    page.on('dialog', async (dialog) => {
        alertMessage = dialog.message();
        await dialog.dismiss(); // or dialog.accept()
    });

    // fill in the form
    await page.type('input[placeholder="username"]', 'testuser');

    // use password that is too short
    await page.type('input[placeholder="password"]', 'Abc123');

    // click the submit button
    await page.click('button[type="submit"]');

    expect(alertMessage).toBe('unsuccessful to register user. something weird happened  Error: Not a strong password');
})