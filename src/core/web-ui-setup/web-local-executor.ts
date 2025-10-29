import {BROWSER} from "../utils/enums-core";
import {Browser, BrowserContext, chromium, firefox, Page} from "@playwright/test";
import {container, injectable} from "tsyringe";
import {BrowserOptions} from "./browser-options";
import {getBooleanValue} from "../utils/utils";


injectable()
export class WebLocalExecutor implements BrowserOptions {

    browser: Browser | undefined;
    browserContext: BrowserContext | undefined;
    page: Page | undefined;

    async setBrowser(browserType: BROWSER): Promise<void> {
        switch (browserType) {
            case BROWSER.webkit:
                break;
            case BROWSER.mobileWebkit:
                break;
            case BROWSER.firefox: {
                this.browser = await firefox.launch({
                    headless: getBooleanValue(process.env.HEADLESS),
                    args: ['--start-maximized'],
                });

                this.page = await this.browser.newPage({
                    baseURL: process.env.SPORT_BASE_URL,
                    isMobile: false,
                    javaScriptEnabled: true,
                })
                break;
            }
            case BROWSER.chromium: {
                this.browser = await chromium.launch({
                    headless: getBooleanValue(process.env.HEADLESS),
                    args: ['--start-maximized'],
                });
                this.page = <Page>await this.browser.newPage({
                    baseURL: process.env.BASE_URL,
                    isMobile: false,
                    javaScriptEnabled: true,
                    locale: 'en-GB',
                });
                break;
            }
            default: {
                console.error(`<${browserType}> is unsupported browser type!!!`);
                throw Error(`<${browserType}> is unsupported browser type!!!`);
            }
        }

        container.register("browser", {useValue: this.browser});
        container.register("browserContext", {useValue: this.browserContext});
        container.register("page", {useValue: this.page});
    }
}