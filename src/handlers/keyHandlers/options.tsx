import CancelKeyHandler from "./CancelKeyHandler";
import DeleteKeyHandler from "./DeleteKeyHandler";
import KeyHandler, { IKeyHandler } from "./KeyHandler";
export type TAddKeys = {
    ctrlKey?: boolean,
    shiftKey?: boolean,
    altKey?: boolean
}
export type TKeys = TAddKeys & {
    keyCode: number,
    handler: typeof KeyHandler
}
export const keyHandlers: TKeys[] = [
    { ctrlKey: false, shiftKey: false, altKey: false, keyCode: 46, handler: DeleteKeyHandler },
    { ctrlKey: false, shiftKey: false, altKey: false, keyCode: 27, handler: CancelKeyHandler },
]