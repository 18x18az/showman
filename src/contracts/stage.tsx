import { JsonTopic } from "@/utils/maestro"

export enum EventStage {
    WAITING_FOR_TEAMS = 'WAITING_FOR_TEAMS',
    CHECKIN = 'CHECKIN',
    QUALIFICATIONS = 'QUALIFICATIONS',
    ALLIANCE_SELECTION = 'ALLIANCE_SELECTION',
    ELIMS = 'ELIMS',
    TEARDOWN = 'TEARDOWN'
}

const STAGE_TOPIC = 'stage'

interface StagePayload {
    stage: EventStage
}

export const StageSubscription = () => {
    const results = JsonTopic<StagePayload>(STAGE_TOPIC)
    if (results === undefined) {
        return undefined
    } else {
        return results.stage
    }
}
