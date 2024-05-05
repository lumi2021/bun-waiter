import { StatusCode } from "../../../@core/enums";
import { RequestError, RequestResponse } from "../../../@core/request";
import type { IController } from "../../../@core/system";

export abstract class MyController implements IController
{

    public static GET_HelloWorld() : RequestResponse | RequestError
    {
        return new RequestResponse("Hello, World!");
    }

    public static GET_GoodbyeWorld() : RequestResponse | RequestError
    {
        return new RequestError(StatusCode.INTERNAL_SERVER_ERROR, "Goodbye, World. :'(");
    }

}
