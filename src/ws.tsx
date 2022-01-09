import { Websocket } from "@18x18az/ouija";

const talos_url = "ws://localhost:1270"

export const talos = new Websocket(talos_url);