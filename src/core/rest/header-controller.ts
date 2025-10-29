import {injectable} from "tsyringe";

injectable()
export default class HeaderController {
    private _headers: { [key: string]: string; } = {};

    get headers(): { [p: string]: string } {
        return this._headers;
    }

    set headers(value: { [p: string]: string }) {
        this._headers = value;
    }



}