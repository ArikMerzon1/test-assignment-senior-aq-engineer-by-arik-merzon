import "reflect-metadata";
import {expect, Page, test as base} from '@playwright/test';
import {container} from "tsyringe";
import UiTestingInitOptions from "../src/core/web-ui-setup/ui-testing-init-options";
import {BROWSER, TEST_EXECUTE} from "../src/core/utils/enums-core";
import {getStringValue} from "../src/core/utils/utils";
import {expectAll} from "../src/core/utils/expectAll";
import StorePageObject from "../src/pages/store-page-object";
import apiCapabilites from "../src/pages/api-capabilites";

export {expect} from '@playwright/test';

type MyFixtures = {
    withStorePage: StorePageObject;
    withRestApi: apiCapabilites;
};


export const test = base.extend<MyFixtures>({

    withStorePage: async ({}, use, testInfo) => {
        await container.resolve(UiTestingInitOptions).initWebBrowser();
        const storePage = container.resolve(StorePageObject);
        await storePage.start();
        await use(storePage);
    },


    withRestApi: async ({}, use) => {
        await use(container.resolve(apiCapabilites));
    }

});

test.beforeAll(async () => {
    console.log("beforeAll");
    await checkConfigValues();
});

test.beforeEach(async () => {
    console.log("beforeEach");
});

test.afterEach(async ({}, testInfo) => {
    console.log("afterEach");
    try {
        const page: Page = container.resolve("page");

        await page.close();

    } catch (err) {
        if ((err as Error).message.includes("Attempted to resolve unregistered dependency token")) {

        }
    }
});

test.afterAll(async () => {
    console.log("afterAll");
});


async function checkConfigValues() {
    await expectAll(
        (): any => expect((getStringValue(process.env['TEST_EXECUTE']) in TEST_EXECUTE), `TEST_EXECUTE of type "${process.env['TEST_EXECUTE']}" doesn't exist`).toBeTruthy(),
        (): any => expect((getStringValue(process.env['BROWSER']) in BROWSER), `BROWSER of type "${process.env['BROWSER']}" doesn't exist`).toBeTruthy(),
        (): any => expect((getStringValue(process.env['ENVIRONMENT'])), `ENVIRONMENT of type "${process.env['ENVIRONMENT']}" not supported`).toBeTruthy(),
    );
}







