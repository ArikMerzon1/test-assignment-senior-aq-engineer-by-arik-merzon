import {Page} from "@playwright/test";
import {container, injectable, singleton} from "tsyringe";

singleton()
export default class ShopCustomerPageObject {
    private readonly page: Page;

    constructor() {
        this.page = container.resolve("page");
    }

    private selectors = {
        emailInput: '.wizardEmail',
        nextButton: '.btn',
        countryPicker: '.chosen-container.chosen-container-single',
        countryList: '.active-result',
        checkmarkButton: '[type="checkbox"]'
    }

    // async eventListener() {
    //     this.page.on('framenavigated', async frame => {
    //         if (frame.url().includes("customer")) {
    //             console.log(`Navigated to: ${frame.url()}`);
    //             await this.createUser();
    //         }
    //
    //     });
    // }

    async setEmail() {
        const account = process.env.EMAIL!
        await this.page.fill(this.selectors.emailInput, account);
    }

    async pressNextButton(){
        await this.page.locator(this.selectors.nextButton).click();
    }

    async selectCountry(countryName: string  = process.env.COUNTRY!) {
        await this.page.locator(this.selectors.countryPicker).click();
        const countryList = await this.page.$$(this.selectors.countryList);
        for (const country of countryList) {
            if (await country.innerText() == countryName)
                await country.click();
        }
    }

    async checkmark() {
        await this.page.locator(this.selectors.checkmarkButton).press('Space');
    }

    async proceedAsNewCustomerButton() {
        await (await this.page.$$(this.selectors.nextButton))[1].click();
    }

    async createUser(): Promise<void> {
        await this.setEmail();
        await this.pressNextButton();
        await this.selectCountry();
        await this.checkmark();
        await this.proceedAsNewCustomerButton();
    }
}