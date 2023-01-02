import { Websocket } from "@18x18az/ouija";

function getTalosUrl(){
    const server = window.location.hostname;
    let url = "wss://bifrost.18x18az.org:443"
    if(server !== "display.18x18az.org"){
        const port = '1270'
        url = `ws://${server}:${port}`
    }

    return url;
}

export const talos = new Websocket(getTalosUrl());
