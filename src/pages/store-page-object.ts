import {container, singleton} from "tsyringe";
import {Page} from "@playwright/test";
import {rejectAllCookies} from "../core/utils/cookiesHandler";
import ProductCard from "./product-card";
import ProductCardPageObject from "./product-card-page-object";
import {OPTIONS_SUBSCRIPTION_TIME, OPTIONS_TARGET_GROUP, PRODUCT_LIST} from "./enums-page-objects";
import {it} from "node:test";

singleton()
export default class StorePageObject {


    // todo - make Page privet!!!
    readonly page: Page;
    // readonly shopCustomerPage: ShopCustomerPageObject;
    private targetGroupSelection= OPTIONS_TARGET_GROUP.forOrganisations ;

    constructor() {
        this.page = container.resolve("page");
        // this.shopCustomerPage = container.resolve(ShopCustomerPageObject);
    }

    private selectors = {
        clientTypeSwitcher: '[data-test="adaptive-switcher__switcher"]',
        innerNodesSwitcher: "._option_1kyrno7_67",
        textContentSwitcher: ".wt-col-inline.jb-text-nowrap.switcher-label-section__text",
        cardView: '.wt-css-content-switcher__block',
        visibleCards: '[data-test="sticky-tag-wrapper"]',
    }

    async start(): Promise<void> {
        const path = process.env.BASE_URL!;
        await this.page.goto(path);
        await rejectAllCookies(this.page);
        // await this.shopCustomerPage.eventListener();
    }

    async targetGroupSwitcher(targetGroup: OPTIONS_TARGET_GROUP): Promise<this> {
        const targetGroupList = await this.page.$$(this.selectors.innerNodesSwitcher);
        for (const item of targetGroupList) {
            if ((await item.innerText()).toLowerCase() == targetGroup.toLowerCase()) {
                await item.click();
                break;
            }
        }
        this.targetGroupSelection = targetGroup
        return this
    }

    async subscriptionTimeSwitcher(planType: OPTIONS_SUBSCRIPTION_TIME) {
        await this.page.waitForLoadState("load");
        const plans = await this.page.$$(this.selectors.innerNodesSwitcher);
        for (const item of plans) {
            if ((await item.innerText()).toLowerCase().includes(planType.toLowerCase())) {
                await item.click();
                break;
            }
        }
        return this;
    }

    async getProductCards(): Promise<ProductCard[]> {
        let productCards: ProductCard[] = [];
        const cardsView = await this.page.$$(this.selectors.cardView);
        const indexOfTargetGroup = Object.values(OPTIONS_TARGET_GROUP).indexOf(this.targetGroupSelection as unknown as OPTIONS_TARGET_GROUP);
        const visibleCards = await cardsView[indexOfTargetGroup].$$(this.selectors.visibleCards);

        const productCardsPage = container.resolve(ProductCardPageObject);

        for (const cardLink of visibleCards) {
            const card = await productCardsPage.getProductCard(cardLink);
            productCards.push(card);
        }
        return productCards
    }

    async selectProductCardByName(productName: PRODUCT_LIST): Promise<ProductCard> {
        const productCards = await this.getProductCards();
        for (const card of productCards) {
            if (card.productName == productName) return card;
        }
        throw new Error(`${productName} is not a valid product`);
    }

    async getPageLinks(): Promise<string[]> {
        // @ts-ignore
        return this.page.locator("a").evaluateAll(els => els.map(el => el.href));
    }

}