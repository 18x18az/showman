import { FieldControl, IMatchInfo, MatchType } from "@18x18az/rosetta";

export function makeMatchName(match: IMatchInfo): string {
    const matchType = match.type;
    let matchTypeText = ""
    if (matchType === MatchType.QUAL) {
        matchTypeText = "Qualification"
    } else if (matchType === MatchType.R16) {
        matchTypeText = "Round of 16"
    } else if (matchType === MatchType.QF) {
        matchTypeText = "Quarterfinals"
    } else if (matchType === MatchType.SF) {
        matchTypeText = "Semifinals"
    } else if (matchType === MatchType.F) {
        matchTypeText = "Finals"
    }

    const matchNumber = match.number;

    let subNumber = ""
    if (match.subNumber && match.subNumber > 1) {
        subNumber = `-${match.subNumber}`
    }

    return `${matchTypeText} Match ${matchNumber}${subNumber}`
}

export function makeShortMatchName(match: IMatchInfo): string {
    const matchType = match.type;
    let matchTypeText = ""
    if (matchType === MatchType.QUAL) {
        matchTypeText = "Q"
    } else if (matchType === MatchType.R16) {
        matchTypeText = "R16"
    } else if (matchType === MatchType.QF) {
        matchTypeText = "QF"
    } else if (matchType === MatchType.SF) {
        matchTypeText = "SF"
    } else if (matchType === MatchType.F) {
        matchTypeText = "F"
    }

    const matchNumber = match.number;

    let subNumber = ""
    if (match.subNumber && match.subNumber > 1) {
        subNumber = `-${match.subNumber}`
    }

    return `${matchTypeText} ${matchNumber}${subNumber}`
}

export function makeControlText(control: FieldControl): string {
    let text = ""
    if (control === FieldControl.AUTONOMOUS) {
        text = "Auto";
    } else if (control === FieldControl.DRIVER) {
        text = "Driver";
    }

    return text;
}

export function makeClockText(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}