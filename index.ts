import { StartMode } from "./@core/enums";
import { System } from "./@core/system";

/*
* DON'T TOUCH THIS FILE! 
*
* This is the entry point of the server.
* Any change here can cause some malfunction
* 
* Including:
*   -   Bad Requests;
*   -   Wrong responses;
*   -   Security Breachs.
* 
*/


let mode : StartMode = StartMode.Production;

if (Bun.argv.includes("--debug"))
    mode = StartMode.Debug;

System.start(mode);
