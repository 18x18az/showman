import { Websocket } from "@18x18az/ouija";

const server = window.location.hostname;
const port = '1270'

const talos_url = `ws://${server}:${port}`

export const talos = new Websocket(talos_url);