import {Page} from "@playwright/test";
import ShopCustomerPageObject from "./shop-customer-page-object";
import {container} from "tsyringe";

export default class BaseCheckoutPageObject {
    protected readonly page: Page;
    readonly shopCustomerPage: ShopCustomerPageObject;

    constructor() {
        this.page = container.resolve("page");
        this.shopCustomerPage = container.resolve(ShopCustomerPageObject);
    }

    async checkForUser() {
        const url = this.page.url();
        console.log(`Checking ${url}`);
        if (url.includes("customer")) {
            await this.shopCustomerPage.createUser();
        }
    }
}