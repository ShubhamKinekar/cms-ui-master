export class JsonHelper {

    static getJsonFromKeyValue(key: string, value: any): {} {
        let json: any = {};
        json[key] = value;
        return json;
    }

}
