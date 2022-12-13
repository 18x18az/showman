import { IMatchInfo, IMatchList, MATCH_TYPE } from "@18x18az/rosetta";

export function getNextMatches(matches: IMatchList, match: IMatchInfo, depth: number): Array<IMatchInfo> | null {
    const nextMatch = getNextMatch(matches, match);
    if (!nextMatch) {
        return null
    }

    let nextMatches;
    if (depth > 1) {
        nextMatches = getNextMatches(matches, nextMatch, depth - 1);
    }

    if (!nextMatches) {
        nextMatches = [nextMatch];
    } else {
        nextMatches.unshift(nextMatch);
    }

    return nextMatches;
}

export function getMatchByOffset(matches: IMatchList, currentMatch: IMatchInfo, offset: number): IMatchInfo | null {
    let match: IMatchInfo | undefined = currentMatch;

    for (let step = 0; step < offset; step++) {
        match = getNextMatch(matches, match);
        if (!match) {
            return null;
        }
    }

    return match;
}

function getNextR16(matches: IMatchList, match: IMatchInfo): IMatchInfo | undefined {
    let number = parseInt(match.number as unknown as string);

    for (let i = number + 1; i < 9; i++) {
        const key = `R16 ${i}-1`;
        if (matches[key]) {
            return matches[key];
        }
    }

    return undefined;
}

function getNextElimMatch(matches: IMatchList, match: IMatchInfo): IMatchInfo | undefined {
    let type = match.type;
    let number = parseInt(match.number as unknown as string) + 1;

    if (type === MATCH_TYPE.R16) {
        if (number === 9) {
            type = MATCH_TYPE.QF;
            number = 1;
        } else {
            return getNextR16(matches, match);
        }
    } else if (type === MATCH_TYPE.QF && number === 5) {
        type = MATCH_TYPE.SF;
        number = 1;
    } else if (type === MATCH_TYPE.SF && number === 3) {
        type = MATCH_TYPE.F;
        number = 1;
    }

    const matchKey = `${type} ${number}-1`;
    return matches[matchKey];
}

function getNextQualMatch(matches: IMatchList, match: IMatchInfo): IMatchInfo {
    const nextNumber = parseInt(match.number as unknown as string) + 1;
    const fullKey = `Q${nextNumber}`;
    const nextMatch = matches[fullKey];
    return nextMatch
}

function getNextMatch(matches: IMatchList, match: IMatchInfo): IMatchInfo | undefined {
    if(!match?.type) {
        return
    }
    if (match.type === "QUAL") {
        return getNextQualMatch(matches, match);
    } else {
        return getNextElimMatch(matches, match);
    }
}

export function getMatchByString(match: string, matches: IMatchList): IMatchInfo | undefined {
    return matches[match];
}