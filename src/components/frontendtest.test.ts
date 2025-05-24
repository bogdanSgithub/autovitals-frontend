import puppeteer, { Browser, Page } from 'puppeteer';
import { beforeAll, test, expect, afterAll } from "vitest";

//these tests dont pass, they exist but for some reason the clicking doesnt work sometimes which breaks the tests

let browser: Browser
let page: Page;

beforeAll(async () => {
  browser = await puppeteer.launch({   
    headless: false, 
    slowMo: 50,      
    defaultViewport: null});
  page = await browser.newPage();
  await page.goto('http://localhost:5173'); 


  await fetch(`${import.meta.env.VITE_BACKEND_URL}/profiles`, 
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

  
}, 20000);

afterAll(async () => {
  await browser.close();
});


// PROFILE/USERS

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

    // unfortunately, the test fails here because the page isnt loaded here apparently, we spent a lot of time trying to figure out why because it works when manually testing, so this line is why all of these tests fail
    await page.click('#createProfile');
    await page.waitForNavigation();

    url = page.url();
    expect(url).toBe('http://localhost:5173/profile/testuser');
})


// Invalid Create
test("Account created with invalid info", async () => {
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


// CARS C AND R
test("Car created successfully", async () => {
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

    await page.click('#createProfile');
    await page.waitForNavigation();

    url = page.url();
    expect(url).toBe('http://localhost:5173/profile/testuser');

    // click add car button
    await page.click('#addCar');

    // fill in the form
    await page.type('input[placeholder="Model"]', 'Toyota Camry');

    await page.type('input[placeholder="Year"]', '2020');

    await page.type('input[placeholder="Mileage"]', '10000');

    await page.type('input[placeholder="mm/dd/yyyy"]', '01/01/2020');

    await page.type('input[placeholder="URL"]', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD7kYbBsLWRtt9D1wUB-w7hCUaWO_Wvijl_qLP756oaZa9RfEAQdj_jJnro2wWVOK6ESgQ5Vaao5I6z4EDBGeCOvjPJVjz2vWAgpNKBIqhLRjTLbNuFhcIvDj&s=3');

    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    const car = await page.$('.car-card');

    expect(car).not.toBeNull();

    await page.click('img[src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD7kYbBsLWRtt9D1wUB-w7hCUaWO_Wvijl_qLP756oaZa9RfEAQdj_jJnro2wWVOK6ESgQ5Vaao5I6z4EDBGeCOvjPJVjz2vWAgpNKBIqhLRjTLbNuFhcIvDj&s=3"]');
    await page.waitForNavigation();

    const maintenance = await page.$('.sidebar-title');
    expect(maintenance).not.toBeNull();

})


test("Invalid car made", async () => {
    // click login button
    await page.click('#get-started');

    let alertMessage = '';
    page.on('dialog', async (dialog) => {
        alertMessage = dialog.message();
        await dialog.dismiss(); // or dialog.accept()
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

    await page.click('#createProfile');
    await page.waitForNavigation();

    url = page.url();
    expect(url).toBe('http://localhost:5173/profile/testuser');

    // click add car button
    await page.click('#addCar');

    // fill in the form
    await page.type('input[placeholder="Model"]', 'Honda Accord');

    await page.type('input[placeholder="Year"]', '2020');

    await page.type('input[placeholder="Mileage"]', '10000');

    await page.type('input[placeholder="mm/dd/yyyy"]', '01/01/2020');


    // use invalid url
    await page.type('input[placeholder="URL"]', 'invalid..');

    await page.click('button[type="submit"]');

    expect(alertMessage).toBe('Error adding car: Inputs are invalid: Image URL is invalid or inaccessible.');
})


//MAINTENANCE C AND R
test("Maintenance created successfully", async () => {
    // click login button
    await page.click('#get-started');

    let alertMessage = '';
    page.on('dialog', async (dialog) => {
        alertMessage = dialog.message();
        await dialog.dismiss(); // or dialog.accept()
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

    await page.click('#createProfile');
    await page.waitForNavigation();

    url = page.url();
    expect(url).toBe('http://localhost:5173/profile/testuser');

    // click add car button
    await page.click('#addCar');

    // fill in the form
    await page.type('input[placeholder="Model"]', 'Toyota Camry');

    await page.type('input[placeholder="Year"]', '2020');

    await page.type('input[placeholder="Mileage"]', '10000');

    await page.type('input[placeholder="mm/dd/yyyy"]', '01/01/2020');

    await page.type('input[placeholder="URL"]', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD7kYbBsLWRtt9D1wUB-w7hCUaWO_Wvijl_qLP756oaZa9RfEAQdj_jJnro2wWVOK6ESgQ5Vaao5I6z4EDBGeCOvjPJVjz2vWAgpNKBIqhLRjTLbNuFhcIvDj&s=3');

    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    const car = await page.$('.car-card');

    expect(car).not.toBeNull();

    await page.click('img[src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD7kYbBsLWRtt9D1wUB-w7hCUaWO_Wvijl_qLP756oaZa9RfEAQdj_jJnro2wWVOK6ESgQ5Vaao5I6z4EDBGeCOvjPJVjz2vWAgpNKBIqhLRjTLbNuFhcIvDj&s=3"]');
    await page.waitForNavigation();

    // click add maintenance button
    await page.click('#addRecord');
    await page.waitForNavigation();

    // fill in the form
    await page.type('input[placeholder="E.g., Tires, Oil, Battery"]', 'Tires');
    await page.type('input[placeholder="mm/dd/yyyy"]', '01/01/2020');
    await page.type('input[placeholder="Enter mileage in KM"]', '10000');
    await page.type('input[placeholder="Enter Price in $"]', '100');
    await page.click('button[type="submit"]');

    
    expect(alertMessage).toBe('Maintenance record saved successfully!');
})


// Invalid Maintenance
test("Maintenance invalid input", async () => {
    // click login button
    await page.click('#get-started');

    let alertMessage = '';
    page.on('dialog', async (dialog) => {
        alertMessage = dialog.message();
        await dialog.dismiss(); // or dialog.accept()
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

    await page.click('#createProfile');
    await page.waitForNavigation();

    url = page.url();
    expect(url).toBe('http://localhost:5173/profile/testuser');

    // click add car button
    await page.click('#addCar');

    // fill in the form
    await page.type('input[placeholder="Model"]', 'Toyota Camry');

    await page.type('input[placeholder="Year"]', '2020');

    await page.type('input[placeholder="Mileage"]', '10000');

    await page.type('input[placeholder="mm/dd/yyyy"]', '01/01/2020');

    await page.type('input[placeholder="URL"]', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD7kYbBsLWRtt9D1wUB-w7hCUaWO_Wvijl_qLP756oaZa9RfEAQdj_jJnro2wWVOK6ESgQ5Vaao5I6z4EDBGeCOvjPJVjz2vWAgpNKBIqhLRjTLbNuFhcIvDj&s=3');

    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    const car = await page.$('.car-card');

    expect(car).not.toBeNull();

    await page.click('img[src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD7kYbBsLWRtt9D1wUB-w7hCUaWO_Wvijl_qLP756oaZa9RfEAQdj_jJnro2wWVOK6ESgQ5Vaao5I6z4EDBGeCOvjPJVjz2vWAgpNKBIqhLRjTLbNuFhcIvDj&s=3"]');
    await page.waitForNavigation();

    // click add maintenance button
    await page.click('#addRecord');
    await page.waitForNavigation();

    // fill in the form
    await page.type('input[placeholder="E.g., Tires, Oil, Battery"]', 'Tires');
    await page.type('input[placeholder="mm/dd/yyyy"]', '01/01/2020');
    await page.type('input[placeholder="Enter mileage in KM"]', '10000');
    await page.type('input[placeholder="Enter Price in $"]', '100');
    await page.click('button[type="submit"]');

    expect(alertMessage).toBe('Error adding maintenance record: Inputs are invalid: Car part is required. Last changed date is required. Mileage is required. Price is required.');
})