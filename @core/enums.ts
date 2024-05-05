export enum StartMode
{
    Debug,
    Production
}

export enum RequestMethod
{
    GET,
    HEAD,
    POST,
    PUT,
    DELETE,
    CONNECT,
    OPTIONS,
    TRACE,
    PATCH,

    ANY
}

export enum StatusCode
{
    // result ok
    OK = 200,

    // client error
    NOT_FOUND = 404,

    // server error
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAIlABLE = 503
}