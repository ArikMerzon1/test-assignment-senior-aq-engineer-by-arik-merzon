import {ElementHandle} from "@playwright/test";
import ProductCard from "./product-card";
import {injectable} from "tsyringe";

injectable()
export default class ProductCardPageObject{
    private selectors = {
        productName: '[data-test="product-name"]',
        productNameSmallCard: '._rs-h3_tfgi0h_1._rs-typography_theme_light_tfgi0h_1._rs-text_hardness_auto_tfgi0h_1',
        productDescription: '[data-test="product-description"]',
        productPriceTitle: '[data-test="product-price-title"]',
        productPrice: '[data-test="product-price"]',
        productPriceVAT: '.wt-col-12._rs-text-3_tfgi0h_1._rs-typography_theme_light_tfgi0h_1._rs-text_hardness_auto_tfgi0h_1.jb-text-right',
        productCardBuyButton: '[data-test="product-card-footer-buy-button"]',
        productCardBuyButtonSmallCard: '[data-test="button"]',
        productCardLinks: '._rs-link_tfgi0h_1._rs-link_mode_standalone_tfgi0h_1._rs-typography_theme_light_tfgi0h_1',
    }

    async getProductCard(card: ElementHandle<HTMLElement | SVGElement>): Promise<ProductCard> {

        const productCard = new ProductCard();
        productCard.productName = await this.getProductName(card);
        productCard.productDescription = await this.getProductDescription(card);
        productCard.productPriceTitle = await this.getProductTitle(card);
        productCard.productPrice = await this.getProductPrice(card);
        productCard.productPriceInclVAT = await this.getProductPriceIncVAT(card);
        productCard.productBuyButton = await this.getProductBuyButton(card);
        productCard.productQuoteLink = await this.getProductQuoteLink(card);

        return productCard;
    }

    private async getProductName(card: ElementHandle<HTMLElement | SVGElement>): Promise<string> {
        let productName = await (await card.$(this.selectors.productName))?.innerText();
        if (productName) return productName;

        productName = await (await card.$(this.selectors.productNameSmallCard))?.innerText();
        if (productName) return productName;

        else return "undefined";
    }

    private async getProductDescription(card: ElementHandle<HTMLElement | SVGElement>) {
        const productDescription = await (await card.$(this.selectors.productDescription))?.innerText();
        if (productDescription) return productDescription;
        else return "undefined";
    }

    private async getProductTitle(card: ElementHandle<HTMLElement | SVGElement>) {
        const productTitle = await (await card.$(this.selectors.productPriceTitle))?.innerText();
        if (productTitle) return productTitle;
        else return "undefined";
    }

    private async getProductPrice(card: ElementHandle<HTMLElement | SVGElement>) {
        const productPrice = await (await card.$(this.selectors.productPrice))?.innerText();
        if (productPrice) return productPrice;
        else return "undefined";
    }

    private async getProductPriceIncVAT(card: ElementHandle<HTMLElement | SVGElement>) {
        const productPrice = await (await card.$(this.selectors.productPriceVAT))?.innerText();
        if (productPrice) return productPrice?.split(" ")[2];
        else return "undefined";
    }

    private async getProductBuyButton(card: ElementHandle<HTMLElement | SVGElement>) {
        let buyButton = await (await card.$(this.selectors.productCardBuyButton))?.getAttribute("href");
        if (buyButton) return buyButton;

        buyButton = await (await card.$(this.selectors.productCardBuyButtonSmallCard))?.getAttribute("href");
        if (buyButton) return buyButton;
        else return "undefined";
    }

    private async getProductQuoteLink(card: ElementHandle<HTMLElement | SVGElement>) {
        const productQuoteLink = await (await card.$(this.selectors.productCardLinks))?.getAttribute("href");
        if (productQuoteLink) return productQuoteLink;
        else return "undefined";
    }
}