import { env, type Server } from "bun";
import { RequestError, RequestResponse, type RequestObject } from "./request";
import { RequestMethod, StatusCode } from "./enums";
import { Router, type RouterResult } from "./router";

const PORT = env.Default_port || 3000;

export abstract class HttpServer
{

    private static _server : Server;
    public static get serverUrl() : URL
    {
        return this._server.url;
    }
    public static get serverUrlString() : string
    {
        return this._server.url.toString();
    }

    public static initServer() : void
    {
        this._server = Bun.serve({
            port: PORT,

            fetch(request : Request) {
                
                let reqObj = HttpServer._preprocess(request);
                
                let routerRes = Router.getRoute(reqObj.URL);

                return HttpServer._processRequest(routerRes, reqObj);
            },

        });


        console.log(`Listening on ${this.serverUrl}`);

    }

    private static _preprocess(request : Request) : RequestObject
    {

        // remove the server path from the URL
        let relevantPath : string = request.url.slice(this.serverUrlString.length);
        let route : string[] = relevantPath.split(/[\/\\]/);

        let headers : Headers = request.headers;

        let method : RequestMethod = null!;

        switch (request.method) {
            case 'GET': method      = RequestMethod.GET; break;
            case 'HEAD': method     = RequestMethod.HEAD; break;
            case 'POST': method     = RequestMethod.POST; break;
            case 'PUT': method      = RequestMethod.PUT; break;
            case 'DELETE': method   = RequestMethod.DELETE; break;
            case 'CONNECT': method  = RequestMethod.CONNECT; break;
            case 'OPTIONS': method  = RequestMethod.OPTIONS; break;
            case 'TRACE': method    = RequestMethod.TRACE; break;
            case 'PATH': method     = RequestMethod.PATCH; break;
        }

        let body : string | undefined = request.body?.toString();

        return {
            URL : route,
            headers : headers,
            method : method,
            body : body
        };

    }

    public static _processRequest(route : RouterResult, request : RequestObject) : Response
    {
        let statusCode : number = 200;
        let body : string | undefined;
        let headers : { [key: string]: string } = {};

        // Check for Fast Response Code first
        if (route.statusCode)
        {

            statusCode = route.statusCode;
            body = `<pre> ${this._getStatusCodeMessage(statusCode)} </pre>`;
            headers['Content-Type'] = "text/html";

        }

        // Call the callable
        else
        {
            
            if (route.callable) {
                
                let res = route.callable()();

                console.log(res);

                if (res instanceof RequestResponse)
                {

                    statusCode = res.statusCode ? res.statusCode : StatusCode.OK;
                    body = res.body;
                    if (res.headers) headers = res.headers;

                }
                else if (res instanceof RequestError)
                {
                    statusCode = res.statusCode;

                    if (!res.message)
                        body = `<pre> ${this._getStatusCodeMessage(res.statusCode)} </pre>`;
                    else
                        body = `<pre> ${res.statusCode}: ${res.message} </pre>`;

                    headers['Content-Type'] = "text/html";
                }
                else
                {
                    statusCode = StatusCode.INTERNAL_SERVER_ERROR;
                    body = "<pre> 500: Method return type must be RequestResponse or RequestError! </pre>";
                    headers['Content-Type'] = "text/html";
                }

            }
            else
            {
                statusCode = StatusCode.INTERNAL_SERVER_ERROR;
                body = "<pre> 500: Route must have an callable or an constant status code to return! </pre>";
                headers['Content-Type'] = "text/html";
            }

        }

        return new Response( body, {
            status : statusCode,
            headers : headers
        });

    }

    public static _getStatusCodeMessage(status : StatusCode) : string
    {
        let msg = `${status}: `;

        switch (status)
        {
            case StatusCode.OK:
                msg += "Sucessfully Requested!";
                break;
            
            case StatusCode.NOT_FOUND:
                msg += "Not Found!";
                break;
            
            case StatusCode.INTERNAL_SERVER_ERROR:
                msg += "Internal Server Error!";
                break;

            case StatusCode.SERVICE_UNAVAIlABLE:
                msg += "The Service is Unavailable!";
                break;
        
            default:
                msg  += "Unknown!";
                break;
        }

        return msg;

    }

}