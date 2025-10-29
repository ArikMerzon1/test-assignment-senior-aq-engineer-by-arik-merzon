import {singleton} from "tsyringe";
import BaseCheckoutPageObject from "./base-checkout-page-object";
import {PRODUCT_LIST} from "./enums-page-objects";
import {ElementHandle} from "@playwright/test";
import ProductCard from "./product-card";

singleton()
export default class CheckoutPageObject extends BaseCheckoutPageObject {

    private selectors = {
        subscriptionPlan: '.form-control',
        subscriptionPlanList: '.form-control > .selektor-title',
        orderItemsTable: '#orderItemsTable',
        productName: '.product',
        productSKU: '.SKU-operation',
        price: '.price.js-reseller-quote-related-invisible.coterm-price',
        orderItemQuantity: '.orderItemQuantity',
        totalPriceForSKU: '.price.coterm-price.js-reseller-quote-related-invisible',
        totalPrice: '.summaryRowWrapper > .summaryPrice > .price',
        totalVAT: '#vatAmountField',
        grandTotalPrice: '.summaryRowWrapper > .summaryPrice > .price',
        orderItemName: ".orderItemName",

        paymentMethods: '.purchaseMethodBlock',
    }

    async getProductCard(card: ElementHandle<HTMLElement | SVGElement>): Promise<ProductCard> {

        const orderCard = new ProductCard();
        orderCard.productName = await this.getProductName(card);
        orderCard.productDescription = await this.getProductDescription(card);
        orderCard.productPrice = await this.getProductPrice(card);


        return orderCard;
    }

    async getSubscriptionPlan() {
        return await this.page.locator(this.selectors.subscriptionPlanList).innerText();
    }

    async findOrderByProductName(name: PRODUCT_LIST): Promise<ProductCard> {
        await this.page.waitForLoadState("load");
        const ordersList = await this.page.$$("tr");
        for (const item of ordersList) {
            const productName = <string>await (await item.$(this.selectors.orderItemName))?.innerText();
            if (productName.includes(name)) {
                return await this.getProductCard(item);
            }
        }
        throw Error(`Unable to find ${name}`);
    }

    async getPaymentMethods(): Promise<Array<string>> {
        await this.page.waitForLoadState("load");
        let paymentMethods: Array<string> = [];
        await this.page.focus(".paymentArea");
        const payMethods = await this.page.$$(this.selectors.paymentMethods);
        for (const item of payMethods) {
            console.log(await item.innerText());
            paymentMethods.push(await item.innerText());
        }
        return paymentMethods;
    }

    private async getProductName(card: ElementHandle<HTMLElement | SVGElement>): Promise<string> {
         const name = await (await card.$(this.selectors.orderItemName))?.innerText();
        if (name) return name;
        else return "undefined";
    }

    private async getProductDescription(card: ElementHandle<HTMLElement | SVGElement>): Promise<string> {
        const description = (await card.$(this.selectors.productSKU))?.innerText();
        if (description) return description;
        else return "undefined";
    }


    private async getProductPrice(card: ElementHandle<HTMLElement | SVGElement>): Promise<string> {
        const price =  await (await card.$(this.selectors.price))?.innerText();
        if (price) return price;
        else return "undefined";
    }

    private async getProductPriceIncVAT(card: ElementHandle<HTMLElement | SVGElement>): Promise<string> {
        const priceIncVAT = await (await card.$(""))?.innerText();
        if (priceIncVAT) return priceIncVAT;
        else return "undefined";
    }
}