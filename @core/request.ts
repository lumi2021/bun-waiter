import type { RequestMethod, StatusCode } from "./enums";


export interface RequestObject
{

    URL : string[];
    method : RequestMethod;
    headers : Headers;

    body? : string;

}

export class RequestResponse
{
    statusCode? : StatusCode;
    body? : string;
    headers? : { [key: string]: string };

    constructor (body? : string)
    {
        this.body = body;
    }
}

export class RequestError
{
    statusCode : StatusCode;
    message? : string;

    constructor (status : StatusCode, message? : string)
    {
        this.statusCode = status;
        this.message = message;
    }
}