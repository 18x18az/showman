import { IFieldInfo, IMatchInfo, IMatchList, IFieldState } from "@18x18az/rosetta";
import { getMatchByOffset, getMatchByString } from "./Match";

function getFieldPosition(field: string, fields: Array<IFieldInfo>): number{
    return fields.findIndex(checked => checked.field == field);
}

export function determineMatch(relevantField: string, activeField: string, fields: Array<IFieldInfo>, currentMatchKey: string, matches: IMatchList): IMatchInfo | null{
    const currentMatch = getMatchByString(currentMatchKey, matches);

    if(!currentMatch){
        return null;
    }

    if(relevantField == activeField){
        return currentMatch;
    }
    const numFields = fields.length;
    const relevantFieldPosition = getFieldPosition(relevantField, fields);
    const activeFieldPosition = getFieldPosition(activeField, fields);

    let difference = relevantFieldPosition - activeFieldPosition;
    if(difference < 0) {
        difference = numFields + difference;
    }

    return getMatchByOffset(matches, currentMatch, difference);
}

export function isPreMatch(state: IFieldState | null): boolean {
    if (!state) {
        return false;
    }
    else if (state.control === "DISABLED" && state.timeRemaining !== 0) {
        return true;
    }
    return false;
}

export function isInMatch(state: IFieldState | null): boolean {
    // check if null
    if (!state) {
        return false;
    }
    // in match
    else if (state.control === "AUTO" ||
            state.control === "DRIVER") {
        return true;
    }
    return false;
}

export function isMatchPaused(state: IFieldState | null): boolean {
    if (state && state.control === "PAUSED") {
        return true;
    }
    else return false;
}

export function isMatchEnded(state: IFieldState | null): boolean {
    if (!state) {
        return false;
    }
    else if (state.timeRemaining === 0 &&
            state.control === "DISABLED") {
        return true;
    }
    return false;
}