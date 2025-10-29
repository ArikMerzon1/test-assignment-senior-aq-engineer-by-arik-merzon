import {BrowserOptions} from "./browser-options";
import {BROWSER} from "../utils/enums-core";
import {injectable} from "tsyringe";

injectable()
export class WebRemoteExecutor implements BrowserOptions {
    async setBrowser(browserType: BROWSER): Promise<void> {
        throw new Error("Method not implemented.");
    }
}