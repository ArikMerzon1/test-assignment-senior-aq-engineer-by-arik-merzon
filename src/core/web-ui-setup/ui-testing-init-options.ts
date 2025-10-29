import {container, injectable} from "tsyringe";
import { BROWSER, TEST_EXECUTE} from "../utils/enums-core";
import {WebLocalExecutor} from "./web-local-executor";
import {WebCiExecutor} from "./web-ci-executor";
import {WebRemoteExecutor} from "./web-remote-executor";


injectable()
export default class UiTestingInitOptions {


    async initWebBrowser(): Promise<void> {
        const executorType = process.env.TEST_EXECUTE!;
        const browserType = process.env.BROWSER!;


        switch (executorType) {
            case TEST_EXECUTE.localExecutor:
                await container.resolve(WebLocalExecutor).setBrowser(browserType as BROWSER);
                break;
            case TEST_EXECUTE.ciExecutor:
                await container.resolve(WebCiExecutor).setBrowser(browserType as BROWSER);
                break;
            case TEST_EXECUTE.remoteExecutor:
                await container.resolve(WebRemoteExecutor).setBrowser(browserType as BROWSER);
                break;
            default:
                throw new Error("Unknown executor type " + executorType);
        }
    }
}






