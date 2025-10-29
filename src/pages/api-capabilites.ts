import {container, injectable} from "tsyringe";
import HttpController from "../core/rest/http-controller";
import {PrivetHttpController} from "../core/rest/privet-http-controller";

injectable()
export default class ApiCapabilites {

    private httpProvider: PrivetHttpController;

    constructor() {
        this.httpProvider = container.resolve(PrivetHttpController);
    }

    async linkChecker(linkList: string[]) {
        const brokenLinks: string[] = [];
        for (const link of linkList) {
            const response = await this.httpProvider.get(link);
            if( !response.ok())
                brokenLinks.push(link);
        }

        console.log("Broken Links:");
        for (const link of brokenLinks) {
            console.log(link);
        }

        return brokenLinks;
    }

}