import { IFieldInfo, IMatchInfo, IMatchList } from "@18x18az/rosetta";
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
