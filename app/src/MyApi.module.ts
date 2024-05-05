import { RequestMethod } from "../../@core/enums";
import { type ModuleData } from "../../@core/system";
import { MyController } from "./controllers/test.controller";

export const MyApiModule : ModuleData = {

    controller : MyController,

    path: '/',
    routes : [

        {
            path: 'hello',
            requestMethod : RequestMethod.GET,
            callable: () => MyController.GET_HelloWorld
        },

        {
            path: 'goodbye',
            requestMethod : RequestMethod.GET,
            callable: () => MyController.GET_GoodbyeWorld
        },

    ]

};

