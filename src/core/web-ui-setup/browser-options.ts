import {BROWSER} from "../utils/enums-core";

export interface BrowserOptions {
    setBrowser(browserType: BROWSER): Promise<void>;
}