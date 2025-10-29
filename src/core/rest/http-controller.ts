import {APIResponse} from "@playwright/test";

export default interface HttpController {
    post(path: string, headers: {[key: string]: string;}, body: unknown, expectedFailure: boolean, oauthFailure: boolean): Promise<APIResponse>;

    post(path: string, headers: { [key: string]: string; }): Promise<APIResponse>;

    delete(path: string, headers : { [key: string]: string; }, expectedFailure: boolean, oauthFailure: boolean): Promise<APIResponse>;

    get(path: string, headers : { [key: string]: string; }, expectedFailure: boolean, oauthFailure: boolean): Promise<APIResponse>;

    put(path: string, headers : { [key: string]: string; },body: object , expectedFailure: boolean, oauthFailure: boolean): Promise<APIResponse>;

    patch(path: string, headers : { [key: string]: string; }, body: object, expectedFailure: boolean, oauthFailure: boolean): Promise<APIResponse>;
}