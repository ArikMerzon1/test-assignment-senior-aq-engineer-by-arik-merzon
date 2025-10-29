import {PlaywrightTestConfig} from "@playwright/test";
import dotenv from "dotenv";


dotenv.config();

let config: PlaywrightTestConfig = {
    workers: 1,
    testDir: './tests',
    fullyParallel: false,
    retries: 0,
    reporter: [
        // ['list'],
        ['html'],
        // ['allure-playwright']
    ],
    timeout:  60 * 1000, //todo add (4 *)
    expect: {
        timeout: 10 * 1000,
    },
    use: {
        screenshot: 'on',
        trace: 'on',
        video: 'on'
    }
}
export default config;