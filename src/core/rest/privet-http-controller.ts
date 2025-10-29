import {APIResponse, request} from "@playwright/test";
import {injectable} from "tsyringe";
import HttpController from "./http-controller";


//// Please put all Public interfaces into <HttpController> ////
injectable()
export class PrivetHttpController implements HttpController {

    async delete(path: string, headers : { [key: string]: string; } | undefined, expectedFailure = false, oauthFailure = false) {
        const apiContext = await request.newContext({
            baseURL: process.env["API_SERVICE_BASE_URL_1"],
            extraHTTPHeaders: headers,
        });


        let response: APIResponse = {} as APIResponse;

        try {
            response = await apiContext.delete(path);
            console.log(`data: ${JSON.stringify(response.body())}`);

            if (!response.ok()) {
                console.log("status code: " + response.status());
                console.log("response text: " + await response.text());
            }
            return response;
        } catch (error) {
            if (expectedFailure) {
                return response;
            }
            console.log("status code: " + response.status());
            console.log("response text: " + await response.text());
            throw error;
        }
    }

    async get(path: string, headers : { [key: string]: string; } = {}, expectedFailure = false, oauthFailure = false) {
        const apiContext = await request.newContext({
            baseURL: process.env.API_SERVICE_BASE_URL_1,
            extraHTTPHeaders: headers,
        });

        let response: APIResponse = {} as APIResponse;

        try {
            response = await apiContext.get(path);
            // console.log(( await response.body()).toString());

            if (!response.ok()) {
                console.log("status code: " + response.status());
                console.log("response text: " + await response.text());
            }
            return response;
        } catch (error) {
            if (expectedFailure) {
                return response;
            }
            console.log("status code: " + response.status);
            console.log("response text: " + response.text);
            throw error;
        }
    }

    async post(path: string, headers? : { [key: string]: string; }, body: object = {}, expectedFailure= false, oauthFailure = false) {
        try {
            const apiContext = await request.newContext({
                baseURL: process.env["API_SERVICE_BASE_URL_1"],
                extraHTTPHeaders: headers,
            });


            let response: APIResponse = {} as APIResponse;

            try {
                response = await apiContext.post(path, {data: body});
                console.log(`data: ${JSON.stringify(response.body())}`);

                if (!response.ok()) {
                    console.log("status code: " + response.status);
                    console.log("response text: " + await response.text);
                }
                return response;
            } catch (error) {
                if (expectedFailure) {
                    return response;
                }
                console.log("status code: " + response.status);
                console.log("response text: " + await response.text);
                // noinspection ExceptionCaughtLocallyJS
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }

    async put(path: string, headers : { [key: string]: string; } = {}, body: object = {}, expectedFailure = false, oauthFailure = false) {
        const apiContext = await request.newContext({
            baseURL: process.env["API_SERVICE_BASE_URL_1"],
            extraHTTPHeaders: headers,
        });


        let response: APIResponse = {} as APIResponse;

        try {
            response = await apiContext.put(path, body);
            console.log(`data: ${JSON.stringify(response.body())}`);

            if (!response.ok()) {
                console.log("status code: " + response.status());
                console.log("response text: " + await response.text());
            }
            return response;
        } catch (error) {
            if (expectedFailure) {
                return response;
            }
            console.log("status code: " + response.status());
            console.log("response text: " + await response.text());
            throw error;
        }
    }

    async patch(path: string, headers : { [key: string]: string; } = {}, body: object = {}, expectedFailure = false, oauthFailure = false) {
        const apiContext = await request.newContext({
            baseURL: process.env["API_SERVICE_BASE_URL_1"],
            extraHTTPHeaders: headers,
        });


        let response: APIResponse = {} as APIResponse;

        try {
            await apiContext.storageState()
            response = await apiContext.patch(path, body);
            console.log(`data: ${JSON.stringify(response.body())}`);

            if (!response.ok()) {
                console.log("status code: " + response.status());
                console.log("response text: " + await response.text());
            }
            return response;
        } catch (error) {
            if (expectedFailure) {
                return response;
            }
            console.log("status code: " + response.status());
            console.log("response text: " + await response.text());
            throw error;
        }
    }
}


