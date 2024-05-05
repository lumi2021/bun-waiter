import type { ClassElement, ClassExpression } from "typescript";
import { RootModules } from "../app/app.module";
import type { StartMode } from "./enums";
import { HttpServer } from "./Httpserver";
import { Router, type Route } from "./router";

export abstract class System
{

    public static start(mode : StartMode) : void
    {

        HttpServer.initServer();

        this.attatchModules(RootModules);

    }
    
    public static attachModule(module : ModuleData) : void
    {
        console.log("attaching module " + JSON.stringify(module));
        
        if (module.routes)
        {
            module.routes.forEach(e => {
                
                Router.addRoute(
                    [ e.path ],
                    e.requestMethod, e.callable, e.statusCodeToReturn
                );

            });
        }
    }

    public static attatchModules(modulesList : ModuleData[]) : void
    {
        modulesList.forEach(e => this.attachModule(e));
    }

}

export interface ModuleData
{

    path : String;
    controller : IController;
    routes? : Route[];
    childrenModules? : ModuleData[];

}

export interface IController {}