import { StatusCode, RequestMethod } from "./enums";

export abstract class Router
{

    private static _activeRoutes : ActiveRoute[] = [
        // base route to avoid errors
        {
            overrideable : true,
            path : '',
            requestMethod : RequestMethod.ANY,
            statusCodeToReturn : StatusCode.NOT_FOUND
        }
    ];

    public static getRoute(route : string[]) : RouterResult
    {

        let completePath = route.join('/');

        let res = this._activeRoutes.find(e => e.path == completePath);

        return res
        
        ? {
            path : res.path,
            requestMethod : res.requestMethod,
            callable : res.callable,
            statusCode : res.statusCodeToReturn
        }

        : {
            path : route.join('/'),
            requestMethod : RequestMethod.ANY,
            statusCode : StatusCode.NOT_FOUND
        };

    }

    public static hasRote(route : string[]) : boolean
    {
        let completePath = route.join('/');

        return this._activeRoutes.find(e => e.path == completePath) != undefined;
    }

    public static addRoute(route : string[], requestMethod : RequestMethod, callable? : Function, codeToReturn? : StatusCode, overrideable : boolean = false) : void
    {
        if (!this.hasRote(route))
        {
            let completePath = route.join('/');

            this._activeRoutes.push(
                {
                    path : completePath,
                    overrideable : overrideable,
                    requestMethod : requestMethod,
                    callable : callable,
                    statusCodeToReturn : codeToReturn
                }
            );
        }
    }

}

export interface Route
{

    path : string;
    childrenRoutes? : Route[];
    requestMethod : RequestMethod;
    callable? : Function;
    statusCodeToReturn? : StatusCode;

}

export interface ActiveRoute
{
    path : string;

    requestMethod : RequestMethod;
    callable? : Function;
    statusCodeToReturn? : StatusCode;

    overrideable : boolean;
}


export interface RouterResult
{

    path : string;
    requestMethod : RequestMethod;
    callable? : Function;
    statusCode? : StatusCode;

}
