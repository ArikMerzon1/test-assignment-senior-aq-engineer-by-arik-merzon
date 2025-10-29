import {Page} from "@playwright/test";
import {container} from "tsyringe";
import CheckoutPageObject from "./checkout-page-object";
import RequestQuotePageObject from "./request-quote-page-object";

export default class ProductCard {

    private readonly page: Page;

    constructor() {
        this.page = container.resolve("page");
    }

    get productDescription(): string | undefined {
        return this._productDescription;
    }

    set productDescription(value: string) {
        this._productDescription = value;
    }
    get productPriceTitle(): string {
        return <string>this._productPriceTitle;
    }

    set productPriceTitle(value: string) {
        this._productPriceTitle = value;
    }

    set productQuoteLink(value: string) {
        this._productQuoteLink = value;
    }

    set productBuyButton(value: string) {
        this._productBuyButton = value;
    }
    get productPriceInclVAT(): string {
        return this._productPriceInclVAT;
    }

    set productPriceInclVAT(value: string) {
        this._productPriceInclVAT = value;
    }
    get productPrice(): string {
        return this._productPrice;
    }

    set productPrice(value: string) {
        this._productPrice = value;
    }
    get productName(): string {
        return this._productName;
    }

    set productName(value: string) {
        this._productName = value;
    }
    private _productName!: string;
    private _productPrice!: string;
    private _productPriceInclVAT!: string;
    private _productBuyButton?: string;
    private _productQuoteLink?: string;
    private _productPriceTitle?: string;
    private _productDescription?: string;

    async buyProduct(): Promise<CheckoutPageObject> {
        await this.page.goto(<string>this._productBuyButton);
        const checkoutPage = container.resolve(CheckoutPageObject);
        await checkoutPage.checkForUser()
        return checkoutPage;
    }

    async getQuoteRequest(): Promise<RequestQuotePageObject> {
        await this.page.goto(<string>this._productQuoteLink);
        const requestPage = container.resolve(RequestQuotePageObject);
        await requestPage.checkForUser();
        return requestPage;

    }
}