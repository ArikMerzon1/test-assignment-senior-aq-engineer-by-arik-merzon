import {test} from "./testBase";
import {OPTIONS_SUBSCRIPTION_TIME, OPTIONS_TARGET_GROUP, PRODUCT_LIST} from "../src/pages/enums-page-objects";
import {expectAll} from "../src/core/utils/expectAll";
import {expect, request} from "@playwright/test";


test.describe("JetBrains Store Tests", () => {

    test(`Does all the products visible Test`, async ({withStorePage}) => {
        const productCards = await (await withStorePage.targetGroupSwitcher(OPTIONS_TARGET_GROUP.forOrganisations)).getProductCards();

        await expectAll(
            async () => { expect(productCards.length).toBe(15)},
            async () => {expect(productCards[0].productName).toBe(PRODUCT_LIST.allProductsPack)},
            async () => {expect(productCards[productCards.length - 1].productName).toBe(PRODUCT_LIST.webStorm)},
        );
    })

    test(`Subscription Options Test`, async ({withStorePage}) => {
        const productCard1 = await (await withStorePage.targetGroupSwitcher(OPTIONS_TARGET_GROUP.forIndividualUse)).selectProductCardByName(PRODUCT_LIST.dataGrip);

        await expectAll(
            async () => { expect(productCard1.productName).toContain("DataGrip")},
            async () => {expect(productCard1.productPrice).toContain("€109.00")},
            async () => {expect(productCard1.productPriceInclVAT).toContain("€129.71")},
        );

    })

    // designed to fail
    test(`Add item to basket and check Item, Price Test`, async ({withStorePage}) => {

         const product = await (await withStorePage.targetGroupSwitcher(OPTIONS_TARGET_GROUP.forIndividualUse)).selectProductCardByName(PRODUCT_LIST.dataGrip);
         const checkoutPage = await product.buyProduct()
         const basketItem = await checkoutPage.findOrderByProductName(PRODUCT_LIST.dataGrip);

         await expectAll(
            async () => { expect(product.productName).toContain(basketItem.productName)},
            async () => {expect(product.productPrice).toContain(basketItem.productPrice)},
        );

    })

    test(`Changing the billing plan Test`, async ({withStorePage}) => {
        const productCard1 = await withStorePage.selectProductCardByName(PRODUCT_LIST.aiPro);
        const productCard2 = await (await withStorePage.subscriptionTimeSwitcher(OPTIONS_SUBSCRIPTION_TIME.monthlyBilling)).selectProductCardByName(PRODUCT_LIST.aiPro);

        await expectAll(
            async () => {expect(productCard1.productName).toContain("AI Pro")},
            async () => {expect(productCard1.productPrice).toContain("€200.00")},
            async () => {expect(productCard1.productPriceInclVAT).toContain("€238.00")},

            async () => {expect(productCard2.productName).toContain("AI Pro")},
            async () => {expect(productCard2.productPrice).toContain("€20.00")},
            async () => {expect(productCard2.productPriceInclVAT).toContain("€23.80")},
        );
    })

    // designed to fail
    test(`Payment methods are availability`, async ({withStorePage}) => {
            const productCard = await (await withStorePage.targetGroupSwitcher(OPTIONS_TARGET_GROUP.forOrganisations)).selectProductCardByName(PRODUCT_LIST.dataGrip);
            const checkout = await productCard.buyProduct();
            const paymentMethods = await checkout.getPaymentMethods();

            await expectAll(
                async () => {expect(paymentMethods[0]).toBe("Credit Card")},
                async () => {expect(paymentMethods[1]).toBe("PayPal")},
                async () => {expect(paymentMethods[2]).toBe("Sofort")},
                async () => {expect(paymentMethods[3]).toBe("Wire Transfer")},
                async () => {expect(paymentMethods[4]).toBe("Partner or Reseller")},
            );
        })

    test("All links are valid Test", async ({withStorePage, withRestApi}) => {

        const links: string[] = await withStorePage.getPageLinks();

        const result = await withRestApi.linkChecker(links);

        expect(result.length).toBe(0)
    });


    /* More Test examples:

    - Add Remove quantity of products on checkout
    - Change country and verify VAT calculation in Store in Checkout
    - Promo/discount
    - Special offers links
    - Localization
    - Return from checkout back to Store page
    - Payment provides redirection links
    - Cross-Browser and OS Testing
    - API and Backend Validation
    - ...

     */

})