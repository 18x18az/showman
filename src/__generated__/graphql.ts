import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  URL: { input: any; output: any; }
};

/** A block refers to a group of match sittings played in the same stretch of time, e.g. all quals played in the morning before lunch */
export type Block = {
  __typename?: 'Block';
  /** Whether the block can be concluded */
  canConclude: Scalars['Boolean']['output'];
  /** The time the last match is scheduled to start */
  endTime: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier for the block */
  id: Scalars['Float']['output'];
  /** The name of the block */
  name: Scalars['String']['output'];
  /** Sittings in the block */
  sittings: Array<Sitting>;
  /** The time the first match is scheduled to start */
  startTime: Maybe<Scalars['DateTime']['output']>;
  /** Status of the block */
  status: BlockStatus;
  /** Sittings in the block that have not yet been queued */
  unqueuedSittings: Array<Sitting>;
};

/** The status of a block of matches */
export enum BlockStatus {
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

export enum Control_Mode {
  Auto = 'AUTO',
  Driver = 'DRIVER'
}

/** The checkin status of a team */
export enum Checkin {
  CheckedIn = 'CHECKED_IN',
  NotHere = 'NOT_HERE',
  NoShow = 'NO_SHOW'
}

export type Competition = {
  __typename?: 'Competition';
  /** Whether automation is currently enabled for match queueing */
  automationEnabled: Scalars['Boolean']['output'];
  /** The field that is currently live */
  liveField: Maybe<Field>;
  /** The field that is currently on deck */
  onDeckField: Maybe<Field>;
};

export type CompetitionField = {
  __typename?: 'CompetitionField';
  fieldId: Scalars['Float']['output'];
  /** Whether the field is the current live field */
  isLive: Scalars['Boolean']['output'];
  /** Whether the field is currently on deck */
  isOnDeck: Scalars['Boolean']['output'];
  /** The match currently on the field */
  onFieldSitting: Maybe<Sitting>;
  /** The match currently on the queueing table (on deck) for the field */
  onTableSitting: Maybe<Sitting>;
  /** The current stage of the match on the field */
  stage: MatchStage;
};

/** A contest refers to a match or group of matches between two alliances. E.g. in Bo3 finals, F1 and F2 are both part of the same contest */
export type Contest = {
  __typename?: 'Contest';
  /** The blue alliance */
  blueTeams: Array<Team>;
  /** Unique identifier for the contest */
  id: Scalars['Float']['output'];
  /** The matches in this contest */
  matches: Array<Match>;
  /** The number of the contest */
  number: Scalars['Float']['output'];
  /** The red alliance */
  redTeams: Array<Team>;
  /** The round of the contest */
  round: Round;
};

/** The current stage of the event */
export enum EventStage {
  AllianceSelection = 'ALLIANCE_SELECTION',
  Checkin = 'CHECKIN',
  Elims = 'ELIMS',
  Qualifications = 'QUALIFICATIONS',
  Teardown = 'TEARDOWN',
  WaitingForTeams = 'WAITING_FOR_TEAMS'
}

/** Representation of a single field */
export type Field = {
  __typename?: 'Field';
  /** Whether or not the field can be used for skills. Can be true even if the field is disabled. */
  canRunSkills: Scalars['Boolean']['output'];
  /** Information about competition matches associated with this field. Null if the field is not being used for competition matches. */
  competition: Maybe<CompetitionField>;
  /** The current state of field control on the field. Null if the field is disabled. */
  fieldControl: Maybe<FieldControl>;
  /** Unique identifier for the field */
  id: Scalars['Int']['output'];
  /** Whether the field is allocated as a competition field. Can be true even if the field is disabled. */
  isCompetition: Scalars['Boolean']['output'];
  /** Whether the field is enabled for use */
  isEnabled: Scalars['Boolean']['output'];
  /** Whether or not the field is allocated as a dedicated skills field. Can be true even if the field is disabled. */
  isSkills: Scalars['Boolean']['output'];
  /** Name of the field */
  name: Scalars['String']['output'];
};

export type FieldControl = {
  __typename?: 'FieldControl';
  /** If the field is currently running, the time that the current running period will end. */
  endTime: Maybe<Scalars['DateTime']['output']>;
  /** The field that this control object is associated with */
  field: Field;
  /** The ID of the field that this control object is associated with */
  fieldId: Scalars['Float']['output'];
  /** Whether the field is currently running */
  isRunning: Scalars['Boolean']['output'];
  /** The current mode of the field, null if undefined. Will still return a value even if it is not currently running. */
  mode: Maybe<Control_Mode>;
};

export type FieldUpdate = {
  /** Set a competition field to be able to run skills. Meaningless if the field is already a dedicated skills field. */
  canRunSkills: InputMaybe<Scalars['Boolean']['input']>;
  /** True for a competition field, false for a dedicated skills field */
  isCompetition: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether the field is enabled for use */
  isEnabled: InputMaybe<Scalars['Boolean']['input']>;
  /** Name of the field */
  name: InputMaybe<Scalars['String']['input']>;
};

/** A match refers to a single scored match between two alliances. A match may have multiple sittings if it is replayed e.g. due to a field fault */
export type Match = {
  __typename?: 'Match';
  /** The score of the blue alliance */
  blueScore: Maybe<Scalars['Int']['output']>;
  /** The contest this match is a part of */
  contest: Contest;
  /** Unique identifier for the match */
  id: Scalars['Int']['output'];
  /** The number of the match. E.g. SF-2-1 is 2 */
  number: Scalars['Int']['output'];
  /** The score of the red alliance */
  redScore: Maybe<Scalars['Int']['output']>;
  /** Sittings of the match */
  sittings: Array<Sitting>;
};

export enum MatchStage {
  Auton = 'AUTON',
  Driver = 'DRIVER',
  Empty = 'EMPTY',
  Outro = 'OUTRO',
  Queued = 'QUEUED',
  Scoring = 'SCORING',
  ScoringAuton = 'SCORING_AUTON'
}

/** The status of a match */
export enum MatchStatus {
  Complete = 'COMPLETE',
  NotStarted = 'NOT_STARTED',
  Queued = 'QUEUED',
  Scoring = 'SCORING'
}

export type Mutation = {
  __typename?: 'Mutation';
  clearLive: Competition;
  concludeBlock: Block;
  configureTournamentManager: TournamentManager;
  deleteField: Array<Field>;
  putLive: Competition;
  putOnDeck: Competition;
  queueSitting: Sitting;
  replay: CompetitionField;
  /** Reset the event. Only available in test mode. */
  reset: Stage;
  resetAuton: CompetitionField;
  setAutomationEnabled: Competition;
  startField: FieldControl;
  startNextBlock: Block;
  stopField: FieldControl;
  unqueue: CompetitionField;
  updateField: Field;
};


export type MutationConfigureTournamentManagerArgs = {
  settings: TournamentManagerSetup;
};


export type MutationDeleteFieldArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationPutOnDeckArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationQueueSittingArgs = {
  fieldId: Scalars['Int']['input'];
  sittingId: Scalars['Int']['input'];
};


export type MutationReplayArgs = {
  sittingId: Scalars['Int']['input'];
};


export type MutationResetAutonArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationSetAutomationEnabledArgs = {
  enabled: Scalars['Boolean']['input'];
};


export type MutationStartFieldArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationStopFieldArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationUnqueueArgs = {
  sittingId: Scalars['Int']['input'];
};


export type MutationUpdateFieldArgs = {
  fieldId: Scalars['Int']['input'];
  update: FieldUpdate;
};

export type Query = {
  __typename?: 'Query';
  blocks: Array<Block>;
  competitionInformation: Competition;
  contests: Array<Contest>;
  currentBlock: Maybe<Block>;
  fields: Array<Field>;
  matches: Array<Match>;
  nextBlock: Maybe<Block>;
  sittings: Array<Sitting>;
  stage: Stage;
  teams: Array<Team>;
  tournamentManager: TournamentManager;
};


export type QueryFieldsArgs = {
  isCompetition: InputMaybe<Scalars['Boolean']['input']>;
  isEnabled: InputMaybe<Scalars['Boolean']['input']>;
};

/** The round of the match */
export enum Round {
  F = 'F',
  Qf = 'QF',
  Qual = 'QUAL',
  Ro16 = 'Ro16',
  Sf = 'SF'
}

/** A sitting is an instance of a match being played. In case of a replay, another sitting is created for the same match. */
export type Sitting = {
  __typename?: 'Sitting';
  /** The block this sitting is a part of */
  block: Block;
  /** The contest this sitting is a part of */
  contest: Contest;
  /** The field this sitting will nominally be played on */
  field: Maybe<Field>;
  /** Unique identifier for the sitting */
  id: Scalars['Float']['output'];
  /** The match this sitting is a part of */
  match: Match;
  /** The number of the sitting. Indexed from 1 */
  number: Scalars['Float']['output'];
  /** The time the sitting is scheduled to be played */
  scheduled: Maybe<Scalars['DateTime']['output']>;
  /** The status of the sitting */
  status: MatchStatus;
};

export type Stage = {
  __typename?: 'Stage';
  /** The current stage of the event */
  stage: EventStage;
};

export type Subscription = {
  __typename?: 'Subscription';
  fieldControl: FieldControl;
};


export type SubscriptionFieldControlArgs = {
  fieldId: Scalars['Int']['input'];
};

export type Team = {
  __typename?: 'Team';
  /** Checkin status of the team */
  checkin: Checkin;
  /** Unique identifier for the team */
  id: Scalars['Int']['output'];
  /** Location of the team */
  location: Scalars['String']['output'];
  /** Name of the team */
  name: Scalars['String']['output'];
  /** Number of the team */
  number: Scalars['String']['output'];
  /** Rank of the team */
  rank: Maybe<Scalars['Int']['output']>;
  /** School of the team */
  school: Scalars['String']['output'];
};

export enum TmStatus {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  Initializing = 'INITIALIZING',
  NotConfigured = 'NOT_CONFIGURED'
}

export type TournamentManager = {
  __typename?: 'TournamentManager';
  /** The status of the TM server */
  status: TmStatus;
  /** The address of Tournament Manager. IP addresses must start with http e.g. http://192.168.1.42 */
  url: Maybe<Scalars['URL']['output']>;
};

export type TournamentManagerSetup = {
  /** The address of Tournament Manager. IP addresses must start with http e.g. http://192.168.1.42 */
  url: Scalars['URL']['input'];
};

export type SittingInformationFragment = { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } };

export type TeamInformationFragment = { __typename?: 'Team', id: number, number: string, name: string, rank: number | null };

export type SittingWithTeamsFragment = { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } };

export type BlockInformationFragment = { __typename?: 'Block', id: number, name: string, canConclude: boolean, unqueuedSittings: Array<{ __typename?: 'Sitting', id: number, number: number, field: { __typename?: 'Field', id: number, name: string } | null, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } }> };

export type QueueSittingMutationVariables = Exact<{
  sittingId: Scalars['Int']['input'];
  fieldId: Scalars['Int']['input'];
}>;


export type QueueSittingMutation = { __typename?: 'Mutation', queueSitting: { __typename?: 'Sitting', id: number } };

export type ConfigureTournamentManagerMutationVariables = Exact<{
  settings: TournamentManagerSetup;
}>;


export type ConfigureTournamentManagerMutation = { __typename?: 'Mutation', configureTournamentManager: { __typename?: 'TournamentManager', status: TmStatus } };

export type PutOnDeckMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type PutOnDeckMutation = { __typename?: 'Mutation', putOnDeck: { __typename?: 'Competition', onDeckField: { __typename?: 'Field', id: number } | null } };

export type PutLiveMutationVariables = Exact<{ [key: string]: never; }>;


export type PutLiveMutation = { __typename?: 'Mutation', putLive: { __typename?: 'Competition', liveField: { __typename?: 'Field', id: number } | null } };

export type UnqueueSittingMutationVariables = Exact<{
  sittingId: Scalars['Int']['input'];
}>;


export type UnqueueSittingMutation = { __typename?: 'Mutation', unqueue: { __typename?: 'CompetitionField', onFieldSitting: { __typename?: 'Sitting', id: number } | null, onTableSitting: { __typename?: 'Sitting', id: number } | null } };

export type ReplayMatchMutationVariables = Exact<{
  sittingId: Scalars['Int']['input'];
}>;


export type ReplayMatchMutation = { __typename?: 'Mutation', replay: { __typename?: 'CompetitionField', onFieldSitting: { __typename?: 'Sitting', id: number } | null, onTableSitting: { __typename?: 'Sitting', id: number } | null } };

export type StartFieldMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type StartFieldMutation = { __typename?: 'Mutation', startField: { __typename?: 'FieldControl', endTime: any | null } };

export type StopFieldMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type StopFieldMutation = { __typename?: 'Mutation', stopField: { __typename?: 'FieldControl', endTime: any | null } };

export type ResetAutonMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type ResetAutonMutation = { __typename?: 'Mutation', resetAuton: { __typename?: 'CompetitionField', stage: MatchStage } };

export type ClearLiveMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearLiveMutation = { __typename?: 'Mutation', clearLive: { __typename?: 'Competition', liveField: { __typename?: 'Field', id: number } | null } };

export type SetAutomationEnabledMutationVariables = Exact<{
  enabled: Scalars['Boolean']['input'];
}>;


export type SetAutomationEnabledMutation = { __typename?: 'Mutation', setAutomationEnabled: { __typename?: 'Competition', automationEnabled: boolean } };

export type StartNextBlockMutationVariables = Exact<{ [key: string]: never; }>;


export type StartNextBlockMutation = { __typename?: 'Mutation', startNextBlock: { __typename?: 'Block', id: number } };

export type ConcludeBlockMutationVariables = Exact<{ [key: string]: never; }>;


export type ConcludeBlockMutation = { __typename?: 'Mutation', concludeBlock: { __typename?: 'Block', id: number } };

export type DeleteFieldMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type DeleteFieldMutation = { __typename?: 'Mutation', deleteField: Array<{ __typename?: 'Field', id: number }> };

export type OnDeckFieldQueryVariables = Exact<{ [key: string]: never; }>;


export type OnDeckFieldQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', onDeckField: { __typename?: 'Field', id: number, competition: { __typename?: 'CompetitionField', onFieldSitting: { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } } | null } | null } | null, liveField: { __typename?: 'Field', id: number, competition: { __typename?: 'CompetitionField', stage: MatchStage } | null } | null } };

export type RefereeInformationQueryVariables = Exact<{ [key: string]: never; }>;


export type RefereeInformationQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', liveField: { __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', stage: MatchStage, onFieldSitting: { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null } | null } | null, onDeckField: { __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', onFieldSitting: { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null } | null } | null } };

export type LiveFieldQueryVariables = Exact<{ [key: string]: never; }>;


export type LiveFieldQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', liveField: { __typename?: 'Field', id: number, fieldControl: { __typename?: 'FieldControl', endTime: any | null } | null, competition: { __typename?: 'CompetitionField', stage: MatchStage, onFieldSitting: { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } } | null } | null } | null } };

export type GetTableOccupiedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTableOccupiedQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', onTableSitting: { __typename?: 'Sitting', id: number } | null } | null }> };

export type GetUnqueuedSittingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnqueuedSittingsQuery = { __typename?: 'Query', currentBlock: { __typename?: 'Block', id: number, name: string, canConclude: boolean, unqueuedSittings: Array<{ __typename?: 'Sitting', id: number, number: number, field: { __typename?: 'Field', id: number, name: string } | null, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } }> } | null, nextBlock: { __typename?: 'Block', id: number, name: string } | null };

export type GetEventStageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventStageQuery = { __typename?: 'Query', stage: { __typename?: 'Stage', stage: EventStage } };

export type GetCompetitionFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompetitionFieldsQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', stage: MatchStage, isLive: boolean, isOnDeck: boolean, onFieldSitting: { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } } | null, onTableSitting: { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } } | null } | null, fieldControl: { __typename?: 'FieldControl', fieldId: number, endTime: any | null } | null }> };

export type CompetitionMiniSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompetitionMiniSettingsQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', automationEnabled: boolean } };

export type MatchOverlayQueryVariables = Exact<{ [key: string]: never; }>;


export type MatchOverlayQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', liveField: { __typename?: 'Field', id: number, competition: { __typename?: 'CompetitionField', stage: MatchStage, onFieldSitting: { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null } | null, fieldControl: { __typename?: 'FieldControl', endTime: any | null } | null } | null } };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', id: number, name: string, number: string }> };

export type FieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type FieldsQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string, isEnabled: boolean, isCompetition: boolean }> };

export type FieldControlSubscriptionVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type FieldControlSubscription = { __typename?: 'Subscription', fieldControl: { __typename?: 'FieldControl', fieldId: number, endTime: any | null, mode: Control_Mode | null } };

export const SittingInformationFragmentDoc = gql`
    fragment SittingInformation on Sitting {
  id
  number
  contest {
    round
    number
  }
  match {
    number
  }
}
    `;
export const TeamInformationFragmentDoc = gql`
    fragment TeamInformation on Team {
  id
  number
  name
  rank
}
    `;
export const SittingWithTeamsFragmentDoc = gql`
    fragment SittingWithTeams on Sitting {
  ...SittingInformation
  contest {
    redTeams {
      ...TeamInformation
    }
    blueTeams {
      ...TeamInformation
    }
  }
}
    ${SittingInformationFragmentDoc}
${TeamInformationFragmentDoc}`;
export const BlockInformationFragmentDoc = gql`
    fragment BlockInformation on Block {
  id
  name
  canConclude
  unqueuedSittings {
    ...SittingInformation
    field {
      id
      name
    }
  }
}
    ${SittingInformationFragmentDoc}`;
export const QueueSittingDocument = gql`
    mutation QueueSitting($sittingId: Int!, $fieldId: Int!) {
  queueSitting(sittingId: $sittingId, fieldId: $fieldId) {
    id
  }
}
    `;
export type QueueSittingMutationFn = Apollo.MutationFunction<QueueSittingMutation, QueueSittingMutationVariables>;

/**
 * __useQueueSittingMutation__
 *
 * To run a mutation, you first call `useQueueSittingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQueueSittingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [queueSittingMutation, { data, loading, error }] = useQueueSittingMutation({
 *   variables: {
 *      sittingId: // value for 'sittingId'
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useQueueSittingMutation(baseOptions?: Apollo.MutationHookOptions<QueueSittingMutation, QueueSittingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QueueSittingMutation, QueueSittingMutationVariables>(QueueSittingDocument, options);
      }
export type QueueSittingMutationHookResult = ReturnType<typeof useQueueSittingMutation>;
export type QueueSittingMutationResult = Apollo.MutationResult<QueueSittingMutation>;
export type QueueSittingMutationOptions = Apollo.BaseMutationOptions<QueueSittingMutation, QueueSittingMutationVariables>;
export const ConfigureTournamentManagerDocument = gql`
    mutation configureTournamentManager($settings: TournamentManagerSetup!) {
  configureTournamentManager(settings: $settings) {
    status
  }
}
    `;
export type ConfigureTournamentManagerMutationFn = Apollo.MutationFunction<ConfigureTournamentManagerMutation, ConfigureTournamentManagerMutationVariables>;

/**
 * __useConfigureTournamentManagerMutation__
 *
 * To run a mutation, you first call `useConfigureTournamentManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfigureTournamentManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [configureTournamentManagerMutation, { data, loading, error }] = useConfigureTournamentManagerMutation({
 *   variables: {
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useConfigureTournamentManagerMutation(baseOptions?: Apollo.MutationHookOptions<ConfigureTournamentManagerMutation, ConfigureTournamentManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfigureTournamentManagerMutation, ConfigureTournamentManagerMutationVariables>(ConfigureTournamentManagerDocument, options);
      }
export type ConfigureTournamentManagerMutationHookResult = ReturnType<typeof useConfigureTournamentManagerMutation>;
export type ConfigureTournamentManagerMutationResult = Apollo.MutationResult<ConfigureTournamentManagerMutation>;
export type ConfigureTournamentManagerMutationOptions = Apollo.BaseMutationOptions<ConfigureTournamentManagerMutation, ConfigureTournamentManagerMutationVariables>;
export const PutOnDeckDocument = gql`
    mutation PutOnDeck($fieldId: Int!) {
  putOnDeck(fieldId: $fieldId) {
    onDeckField {
      id
    }
  }
}
    `;
export type PutOnDeckMutationFn = Apollo.MutationFunction<PutOnDeckMutation, PutOnDeckMutationVariables>;

/**
 * __usePutOnDeckMutation__
 *
 * To run a mutation, you first call `usePutOnDeckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutOnDeckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putOnDeckMutation, { data, loading, error }] = usePutOnDeckMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function usePutOnDeckMutation(baseOptions?: Apollo.MutationHookOptions<PutOnDeckMutation, PutOnDeckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PutOnDeckMutation, PutOnDeckMutationVariables>(PutOnDeckDocument, options);
      }
export type PutOnDeckMutationHookResult = ReturnType<typeof usePutOnDeckMutation>;
export type PutOnDeckMutationResult = Apollo.MutationResult<PutOnDeckMutation>;
export type PutOnDeckMutationOptions = Apollo.BaseMutationOptions<PutOnDeckMutation, PutOnDeckMutationVariables>;
export const PutLiveDocument = gql`
    mutation PutLive {
  putLive {
    liveField {
      id
    }
  }
}
    `;
export type PutLiveMutationFn = Apollo.MutationFunction<PutLiveMutation, PutLiveMutationVariables>;

/**
 * __usePutLiveMutation__
 *
 * To run a mutation, you first call `usePutLiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutLiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putLiveMutation, { data, loading, error }] = usePutLiveMutation({
 *   variables: {
 *   },
 * });
 */
export function usePutLiveMutation(baseOptions?: Apollo.MutationHookOptions<PutLiveMutation, PutLiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PutLiveMutation, PutLiveMutationVariables>(PutLiveDocument, options);
      }
export type PutLiveMutationHookResult = ReturnType<typeof usePutLiveMutation>;
export type PutLiveMutationResult = Apollo.MutationResult<PutLiveMutation>;
export type PutLiveMutationOptions = Apollo.BaseMutationOptions<PutLiveMutation, PutLiveMutationVariables>;
export const UnqueueSittingDocument = gql`
    mutation UnqueueSitting($sittingId: Int!) {
  unqueue(sittingId: $sittingId) {
    onFieldSitting {
      id
    }
    onTableSitting {
      id
    }
  }
}
    `;
export type UnqueueSittingMutationFn = Apollo.MutationFunction<UnqueueSittingMutation, UnqueueSittingMutationVariables>;

/**
 * __useUnqueueSittingMutation__
 *
 * To run a mutation, you first call `useUnqueueSittingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnqueueSittingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unqueueSittingMutation, { data, loading, error }] = useUnqueueSittingMutation({
 *   variables: {
 *      sittingId: // value for 'sittingId'
 *   },
 * });
 */
export function useUnqueueSittingMutation(baseOptions?: Apollo.MutationHookOptions<UnqueueSittingMutation, UnqueueSittingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnqueueSittingMutation, UnqueueSittingMutationVariables>(UnqueueSittingDocument, options);
      }
export type UnqueueSittingMutationHookResult = ReturnType<typeof useUnqueueSittingMutation>;
export type UnqueueSittingMutationResult = Apollo.MutationResult<UnqueueSittingMutation>;
export type UnqueueSittingMutationOptions = Apollo.BaseMutationOptions<UnqueueSittingMutation, UnqueueSittingMutationVariables>;
export const ReplayMatchDocument = gql`
    mutation ReplayMatch($sittingId: Int!) {
  replay(sittingId: $sittingId) {
    onFieldSitting {
      id
    }
    onTableSitting {
      id
    }
  }
}
    `;
export type ReplayMatchMutationFn = Apollo.MutationFunction<ReplayMatchMutation, ReplayMatchMutationVariables>;

/**
 * __useReplayMatchMutation__
 *
 * To run a mutation, you first call `useReplayMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplayMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replayMatchMutation, { data, loading, error }] = useReplayMatchMutation({
 *   variables: {
 *      sittingId: // value for 'sittingId'
 *   },
 * });
 */
export function useReplayMatchMutation(baseOptions?: Apollo.MutationHookOptions<ReplayMatchMutation, ReplayMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplayMatchMutation, ReplayMatchMutationVariables>(ReplayMatchDocument, options);
      }
export type ReplayMatchMutationHookResult = ReturnType<typeof useReplayMatchMutation>;
export type ReplayMatchMutationResult = Apollo.MutationResult<ReplayMatchMutation>;
export type ReplayMatchMutationOptions = Apollo.BaseMutationOptions<ReplayMatchMutation, ReplayMatchMutationVariables>;
export const StartFieldDocument = gql`
    mutation StartField($fieldId: Int!) {
  startField(fieldId: $fieldId) {
    endTime
  }
}
    `;
export type StartFieldMutationFn = Apollo.MutationFunction<StartFieldMutation, StartFieldMutationVariables>;

/**
 * __useStartFieldMutation__
 *
 * To run a mutation, you first call `useStartFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startFieldMutation, { data, loading, error }] = useStartFieldMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useStartFieldMutation(baseOptions?: Apollo.MutationHookOptions<StartFieldMutation, StartFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartFieldMutation, StartFieldMutationVariables>(StartFieldDocument, options);
      }
export type StartFieldMutationHookResult = ReturnType<typeof useStartFieldMutation>;
export type StartFieldMutationResult = Apollo.MutationResult<StartFieldMutation>;
export type StartFieldMutationOptions = Apollo.BaseMutationOptions<StartFieldMutation, StartFieldMutationVariables>;
export const StopFieldDocument = gql`
    mutation StopField($fieldId: Int!) {
  stopField(fieldId: $fieldId) {
    endTime
  }
}
    `;
export type StopFieldMutationFn = Apollo.MutationFunction<StopFieldMutation, StopFieldMutationVariables>;

/**
 * __useStopFieldMutation__
 *
 * To run a mutation, you first call `useStopFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopFieldMutation, { data, loading, error }] = useStopFieldMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useStopFieldMutation(baseOptions?: Apollo.MutationHookOptions<StopFieldMutation, StopFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StopFieldMutation, StopFieldMutationVariables>(StopFieldDocument, options);
      }
export type StopFieldMutationHookResult = ReturnType<typeof useStopFieldMutation>;
export type StopFieldMutationResult = Apollo.MutationResult<StopFieldMutation>;
export type StopFieldMutationOptions = Apollo.BaseMutationOptions<StopFieldMutation, StopFieldMutationVariables>;
export const ResetAutonDocument = gql`
    mutation ResetAuton($fieldId: Int!) {
  resetAuton(fieldId: $fieldId) {
    stage
  }
}
    `;
export type ResetAutonMutationFn = Apollo.MutationFunction<ResetAutonMutation, ResetAutonMutationVariables>;

/**
 * __useResetAutonMutation__
 *
 * To run a mutation, you first call `useResetAutonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetAutonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetAutonMutation, { data, loading, error }] = useResetAutonMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useResetAutonMutation(baseOptions?: Apollo.MutationHookOptions<ResetAutonMutation, ResetAutonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetAutonMutation, ResetAutonMutationVariables>(ResetAutonDocument, options);
      }
export type ResetAutonMutationHookResult = ReturnType<typeof useResetAutonMutation>;
export type ResetAutonMutationResult = Apollo.MutationResult<ResetAutonMutation>;
export type ResetAutonMutationOptions = Apollo.BaseMutationOptions<ResetAutonMutation, ResetAutonMutationVariables>;
export const ClearLiveDocument = gql`
    mutation ClearLive {
  clearLive {
    liveField {
      id
    }
  }
}
    `;
export type ClearLiveMutationFn = Apollo.MutationFunction<ClearLiveMutation, ClearLiveMutationVariables>;

/**
 * __useClearLiveMutation__
 *
 * To run a mutation, you first call `useClearLiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearLiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearLiveMutation, { data, loading, error }] = useClearLiveMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearLiveMutation(baseOptions?: Apollo.MutationHookOptions<ClearLiveMutation, ClearLiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearLiveMutation, ClearLiveMutationVariables>(ClearLiveDocument, options);
      }
export type ClearLiveMutationHookResult = ReturnType<typeof useClearLiveMutation>;
export type ClearLiveMutationResult = Apollo.MutationResult<ClearLiveMutation>;
export type ClearLiveMutationOptions = Apollo.BaseMutationOptions<ClearLiveMutation, ClearLiveMutationVariables>;
export const SetAutomationEnabledDocument = gql`
    mutation SetAutomationEnabled($enabled: Boolean!) {
  setAutomationEnabled(enabled: $enabled) {
    automationEnabled
  }
}
    `;
export type SetAutomationEnabledMutationFn = Apollo.MutationFunction<SetAutomationEnabledMutation, SetAutomationEnabledMutationVariables>;

/**
 * __useSetAutomationEnabledMutation__
 *
 * To run a mutation, you first call `useSetAutomationEnabledMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAutomationEnabledMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAutomationEnabledMutation, { data, loading, error }] = useSetAutomationEnabledMutation({
 *   variables: {
 *      enabled: // value for 'enabled'
 *   },
 * });
 */
export function useSetAutomationEnabledMutation(baseOptions?: Apollo.MutationHookOptions<SetAutomationEnabledMutation, SetAutomationEnabledMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetAutomationEnabledMutation, SetAutomationEnabledMutationVariables>(SetAutomationEnabledDocument, options);
      }
export type SetAutomationEnabledMutationHookResult = ReturnType<typeof useSetAutomationEnabledMutation>;
export type SetAutomationEnabledMutationResult = Apollo.MutationResult<SetAutomationEnabledMutation>;
export type SetAutomationEnabledMutationOptions = Apollo.BaseMutationOptions<SetAutomationEnabledMutation, SetAutomationEnabledMutationVariables>;
export const StartNextBlockDocument = gql`
    mutation StartNextBlock {
  startNextBlock {
    id
  }
}
    `;
export type StartNextBlockMutationFn = Apollo.MutationFunction<StartNextBlockMutation, StartNextBlockMutationVariables>;

/**
 * __useStartNextBlockMutation__
 *
 * To run a mutation, you first call `useStartNextBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartNextBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startNextBlockMutation, { data, loading, error }] = useStartNextBlockMutation({
 *   variables: {
 *   },
 * });
 */
export function useStartNextBlockMutation(baseOptions?: Apollo.MutationHookOptions<StartNextBlockMutation, StartNextBlockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartNextBlockMutation, StartNextBlockMutationVariables>(StartNextBlockDocument, options);
      }
export type StartNextBlockMutationHookResult = ReturnType<typeof useStartNextBlockMutation>;
export type StartNextBlockMutationResult = Apollo.MutationResult<StartNextBlockMutation>;
export type StartNextBlockMutationOptions = Apollo.BaseMutationOptions<StartNextBlockMutation, StartNextBlockMutationVariables>;
export const ConcludeBlockDocument = gql`
    mutation ConcludeBlock {
  concludeBlock {
    id
  }
}
    `;
export type ConcludeBlockMutationFn = Apollo.MutationFunction<ConcludeBlockMutation, ConcludeBlockMutationVariables>;

/**
 * __useConcludeBlockMutation__
 *
 * To run a mutation, you first call `useConcludeBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConcludeBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [concludeBlockMutation, { data, loading, error }] = useConcludeBlockMutation({
 *   variables: {
 *   },
 * });
 */
export function useConcludeBlockMutation(baseOptions?: Apollo.MutationHookOptions<ConcludeBlockMutation, ConcludeBlockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConcludeBlockMutation, ConcludeBlockMutationVariables>(ConcludeBlockDocument, options);
      }
export type ConcludeBlockMutationHookResult = ReturnType<typeof useConcludeBlockMutation>;
export type ConcludeBlockMutationResult = Apollo.MutationResult<ConcludeBlockMutation>;
export type ConcludeBlockMutationOptions = Apollo.BaseMutationOptions<ConcludeBlockMutation, ConcludeBlockMutationVariables>;
export const DeleteFieldDocument = gql`
    mutation DeleteField($fieldId: Int!) {
  deleteField(fieldId: $fieldId) {
    id
  }
}
    `;
export type DeleteFieldMutationFn = Apollo.MutationFunction<DeleteFieldMutation, DeleteFieldMutationVariables>;

/**
 * __useDeleteFieldMutation__
 *
 * To run a mutation, you first call `useDeleteFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFieldMutation, { data, loading, error }] = useDeleteFieldMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useDeleteFieldMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFieldMutation, DeleteFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFieldMutation, DeleteFieldMutationVariables>(DeleteFieldDocument, options);
      }
export type DeleteFieldMutationHookResult = ReturnType<typeof useDeleteFieldMutation>;
export type DeleteFieldMutationResult = Apollo.MutationResult<DeleteFieldMutation>;
export type DeleteFieldMutationOptions = Apollo.BaseMutationOptions<DeleteFieldMutation, DeleteFieldMutationVariables>;
export const OnDeckFieldDocument = gql`
    query OnDeckField {
  competitionInformation {
    onDeckField {
      id
      competition {
        onFieldSitting {
          ...SittingInformation
        }
      }
    }
    liveField {
      id
      competition {
        stage
      }
    }
  }
}
    ${SittingInformationFragmentDoc}`;

/**
 * __useOnDeckFieldQuery__
 *
 * To run a query within a React component, call `useOnDeckFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useOnDeckFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnDeckFieldQuery({
 *   variables: {
 *   },
 * });
 */
export function useOnDeckFieldQuery(baseOptions?: Apollo.QueryHookOptions<OnDeckFieldQuery, OnDeckFieldQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OnDeckFieldQuery, OnDeckFieldQueryVariables>(OnDeckFieldDocument, options);
      }
export function useOnDeckFieldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OnDeckFieldQuery, OnDeckFieldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OnDeckFieldQuery, OnDeckFieldQueryVariables>(OnDeckFieldDocument, options);
        }
export function useOnDeckFieldSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OnDeckFieldQuery, OnDeckFieldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OnDeckFieldQuery, OnDeckFieldQueryVariables>(OnDeckFieldDocument, options);
        }
export type OnDeckFieldQueryHookResult = ReturnType<typeof useOnDeckFieldQuery>;
export type OnDeckFieldLazyQueryHookResult = ReturnType<typeof useOnDeckFieldLazyQuery>;
export type OnDeckFieldSuspenseQueryHookResult = ReturnType<typeof useOnDeckFieldSuspenseQuery>;
export type OnDeckFieldQueryResult = Apollo.QueryResult<OnDeckFieldQuery, OnDeckFieldQueryVariables>;
export const RefereeInformationDocument = gql`
    query RefereeInformation {
  competitionInformation {
    liveField {
      id
      name
      competition {
        stage
        onFieldSitting {
          ...SittingWithTeams
        }
      }
    }
    onDeckField {
      id
      name
      competition {
        onFieldSitting {
          ...SittingWithTeams
        }
      }
    }
  }
}
    ${SittingWithTeamsFragmentDoc}`;

/**
 * __useRefereeInformationQuery__
 *
 * To run a query within a React component, call `useRefereeInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefereeInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefereeInformationQuery({
 *   variables: {
 *   },
 * });
 */
export function useRefereeInformationQuery(baseOptions?: Apollo.QueryHookOptions<RefereeInformationQuery, RefereeInformationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefereeInformationQuery, RefereeInformationQueryVariables>(RefereeInformationDocument, options);
      }
export function useRefereeInformationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RefereeInformationQuery, RefereeInformationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefereeInformationQuery, RefereeInformationQueryVariables>(RefereeInformationDocument, options);
        }
export function useRefereeInformationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RefereeInformationQuery, RefereeInformationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RefereeInformationQuery, RefereeInformationQueryVariables>(RefereeInformationDocument, options);
        }
export type RefereeInformationQueryHookResult = ReturnType<typeof useRefereeInformationQuery>;
export type RefereeInformationLazyQueryHookResult = ReturnType<typeof useRefereeInformationLazyQuery>;
export type RefereeInformationSuspenseQueryHookResult = ReturnType<typeof useRefereeInformationSuspenseQuery>;
export type RefereeInformationQueryResult = Apollo.QueryResult<RefereeInformationQuery, RefereeInformationQueryVariables>;
export const LiveFieldDocument = gql`
    query LiveField {
  competitionInformation {
    liveField {
      id
      fieldControl {
        endTime
      }
      competition {
        stage
        onFieldSitting {
          ...SittingInformation
        }
      }
    }
  }
}
    ${SittingInformationFragmentDoc}`;

/**
 * __useLiveFieldQuery__
 *
 * To run a query within a React component, call `useLiveFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useLiveFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLiveFieldQuery({
 *   variables: {
 *   },
 * });
 */
export function useLiveFieldQuery(baseOptions?: Apollo.QueryHookOptions<LiveFieldQuery, LiveFieldQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LiveFieldQuery, LiveFieldQueryVariables>(LiveFieldDocument, options);
      }
export function useLiveFieldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LiveFieldQuery, LiveFieldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LiveFieldQuery, LiveFieldQueryVariables>(LiveFieldDocument, options);
        }
export function useLiveFieldSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LiveFieldQuery, LiveFieldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LiveFieldQuery, LiveFieldQueryVariables>(LiveFieldDocument, options);
        }
export type LiveFieldQueryHookResult = ReturnType<typeof useLiveFieldQuery>;
export type LiveFieldLazyQueryHookResult = ReturnType<typeof useLiveFieldLazyQuery>;
export type LiveFieldSuspenseQueryHookResult = ReturnType<typeof useLiveFieldSuspenseQuery>;
export type LiveFieldQueryResult = Apollo.QueryResult<LiveFieldQuery, LiveFieldQueryVariables>;
export const GetTableOccupiedDocument = gql`
    query GetTableOccupied {
  fields(isEnabled: true, isCompetition: true) {
    id
    name
    competition {
      onTableSitting {
        id
      }
    }
  }
}
    `;

/**
 * __useGetTableOccupiedQuery__
 *
 * To run a query within a React component, call `useGetTableOccupiedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTableOccupiedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTableOccupiedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTableOccupiedQuery(baseOptions?: Apollo.QueryHookOptions<GetTableOccupiedQuery, GetTableOccupiedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTableOccupiedQuery, GetTableOccupiedQueryVariables>(GetTableOccupiedDocument, options);
      }
export function useGetTableOccupiedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTableOccupiedQuery, GetTableOccupiedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTableOccupiedQuery, GetTableOccupiedQueryVariables>(GetTableOccupiedDocument, options);
        }
export function useGetTableOccupiedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTableOccupiedQuery, GetTableOccupiedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTableOccupiedQuery, GetTableOccupiedQueryVariables>(GetTableOccupiedDocument, options);
        }
export type GetTableOccupiedQueryHookResult = ReturnType<typeof useGetTableOccupiedQuery>;
export type GetTableOccupiedLazyQueryHookResult = ReturnType<typeof useGetTableOccupiedLazyQuery>;
export type GetTableOccupiedSuspenseQueryHookResult = ReturnType<typeof useGetTableOccupiedSuspenseQuery>;
export type GetTableOccupiedQueryResult = Apollo.QueryResult<GetTableOccupiedQuery, GetTableOccupiedQueryVariables>;
export const GetUnqueuedSittingsDocument = gql`
    query GetUnqueuedSittings {
  currentBlock {
    ...BlockInformation
  }
  nextBlock {
    id
    name
  }
}
    ${BlockInformationFragmentDoc}`;

/**
 * __useGetUnqueuedSittingsQuery__
 *
 * To run a query within a React component, call `useGetUnqueuedSittingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnqueuedSittingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnqueuedSittingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnqueuedSittingsQuery(baseOptions?: Apollo.QueryHookOptions<GetUnqueuedSittingsQuery, GetUnqueuedSittingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnqueuedSittingsQuery, GetUnqueuedSittingsQueryVariables>(GetUnqueuedSittingsDocument, options);
      }
export function useGetUnqueuedSittingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnqueuedSittingsQuery, GetUnqueuedSittingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnqueuedSittingsQuery, GetUnqueuedSittingsQueryVariables>(GetUnqueuedSittingsDocument, options);
        }
export function useGetUnqueuedSittingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUnqueuedSittingsQuery, GetUnqueuedSittingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnqueuedSittingsQuery, GetUnqueuedSittingsQueryVariables>(GetUnqueuedSittingsDocument, options);
        }
export type GetUnqueuedSittingsQueryHookResult = ReturnType<typeof useGetUnqueuedSittingsQuery>;
export type GetUnqueuedSittingsLazyQueryHookResult = ReturnType<typeof useGetUnqueuedSittingsLazyQuery>;
export type GetUnqueuedSittingsSuspenseQueryHookResult = ReturnType<typeof useGetUnqueuedSittingsSuspenseQuery>;
export type GetUnqueuedSittingsQueryResult = Apollo.QueryResult<GetUnqueuedSittingsQuery, GetUnqueuedSittingsQueryVariables>;
export const GetEventStageDocument = gql`
    query GetEventStage {
  stage {
    stage
  }
}
    `;

/**
 * __useGetEventStageQuery__
 *
 * To run a query within a React component, call `useGetEventStageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventStageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventStageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventStageQuery(baseOptions?: Apollo.QueryHookOptions<GetEventStageQuery, GetEventStageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventStageQuery, GetEventStageQueryVariables>(GetEventStageDocument, options);
      }
export function useGetEventStageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventStageQuery, GetEventStageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventStageQuery, GetEventStageQueryVariables>(GetEventStageDocument, options);
        }
export function useGetEventStageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventStageQuery, GetEventStageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventStageQuery, GetEventStageQueryVariables>(GetEventStageDocument, options);
        }
export type GetEventStageQueryHookResult = ReturnType<typeof useGetEventStageQuery>;
export type GetEventStageLazyQueryHookResult = ReturnType<typeof useGetEventStageLazyQuery>;
export type GetEventStageSuspenseQueryHookResult = ReturnType<typeof useGetEventStageSuspenseQuery>;
export type GetEventStageQueryResult = Apollo.QueryResult<GetEventStageQuery, GetEventStageQueryVariables>;
export const GetCompetitionFieldsDocument = gql`
    query GetCompetitionFields {
  fields(isEnabled: true, isCompetition: true) {
    id
    name
    competition {
      stage
      isLive
      isOnDeck
      onFieldSitting {
        ...SittingInformation
      }
      onTableSitting {
        ...SittingInformation
      }
    }
    fieldControl {
      fieldId
      endTime
    }
  }
}
    ${SittingInformationFragmentDoc}`;

/**
 * __useGetCompetitionFieldsQuery__
 *
 * To run a query within a React component, call `useGetCompetitionFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompetitionFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompetitionFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompetitionFieldsQuery(baseOptions?: Apollo.QueryHookOptions<GetCompetitionFieldsQuery, GetCompetitionFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompetitionFieldsQuery, GetCompetitionFieldsQueryVariables>(GetCompetitionFieldsDocument, options);
      }
export function useGetCompetitionFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompetitionFieldsQuery, GetCompetitionFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompetitionFieldsQuery, GetCompetitionFieldsQueryVariables>(GetCompetitionFieldsDocument, options);
        }
export function useGetCompetitionFieldsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCompetitionFieldsQuery, GetCompetitionFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCompetitionFieldsQuery, GetCompetitionFieldsQueryVariables>(GetCompetitionFieldsDocument, options);
        }
export type GetCompetitionFieldsQueryHookResult = ReturnType<typeof useGetCompetitionFieldsQuery>;
export type GetCompetitionFieldsLazyQueryHookResult = ReturnType<typeof useGetCompetitionFieldsLazyQuery>;
export type GetCompetitionFieldsSuspenseQueryHookResult = ReturnType<typeof useGetCompetitionFieldsSuspenseQuery>;
export type GetCompetitionFieldsQueryResult = Apollo.QueryResult<GetCompetitionFieldsQuery, GetCompetitionFieldsQueryVariables>;
export const CompetitionMiniSettingsDocument = gql`
    query CompetitionMiniSettings {
  competitionInformation {
    automationEnabled
  }
}
    `;

/**
 * __useCompetitionMiniSettingsQuery__
 *
 * To run a query within a React component, call `useCompetitionMiniSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompetitionMiniSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompetitionMiniSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompetitionMiniSettingsQuery(baseOptions?: Apollo.QueryHookOptions<CompetitionMiniSettingsQuery, CompetitionMiniSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompetitionMiniSettingsQuery, CompetitionMiniSettingsQueryVariables>(CompetitionMiniSettingsDocument, options);
      }
export function useCompetitionMiniSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompetitionMiniSettingsQuery, CompetitionMiniSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompetitionMiniSettingsQuery, CompetitionMiniSettingsQueryVariables>(CompetitionMiniSettingsDocument, options);
        }
export function useCompetitionMiniSettingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompetitionMiniSettingsQuery, CompetitionMiniSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompetitionMiniSettingsQuery, CompetitionMiniSettingsQueryVariables>(CompetitionMiniSettingsDocument, options);
        }
export type CompetitionMiniSettingsQueryHookResult = ReturnType<typeof useCompetitionMiniSettingsQuery>;
export type CompetitionMiniSettingsLazyQueryHookResult = ReturnType<typeof useCompetitionMiniSettingsLazyQuery>;
export type CompetitionMiniSettingsSuspenseQueryHookResult = ReturnType<typeof useCompetitionMiniSettingsSuspenseQuery>;
export type CompetitionMiniSettingsQueryResult = Apollo.QueryResult<CompetitionMiniSettingsQuery, CompetitionMiniSettingsQueryVariables>;
export const MatchOverlayDocument = gql`
    query MatchOverlay {
  competitionInformation {
    liveField {
      id
      competition {
        stage
        onFieldSitting {
          ...SittingWithTeams
        }
      }
      fieldControl {
        endTime
      }
    }
  }
}
    ${SittingWithTeamsFragmentDoc}`;

/**
 * __useMatchOverlayQuery__
 *
 * To run a query within a React component, call `useMatchOverlayQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchOverlayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchOverlayQuery({
 *   variables: {
 *   },
 * });
 */
export function useMatchOverlayQuery(baseOptions?: Apollo.QueryHookOptions<MatchOverlayQuery, MatchOverlayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatchOverlayQuery, MatchOverlayQueryVariables>(MatchOverlayDocument, options);
      }
export function useMatchOverlayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatchOverlayQuery, MatchOverlayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatchOverlayQuery, MatchOverlayQueryVariables>(MatchOverlayDocument, options);
        }
export function useMatchOverlaySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MatchOverlayQuery, MatchOverlayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MatchOverlayQuery, MatchOverlayQueryVariables>(MatchOverlayDocument, options);
        }
export type MatchOverlayQueryHookResult = ReturnType<typeof useMatchOverlayQuery>;
export type MatchOverlayLazyQueryHookResult = ReturnType<typeof useMatchOverlayLazyQuery>;
export type MatchOverlaySuspenseQueryHookResult = ReturnType<typeof useMatchOverlaySuspenseQuery>;
export type MatchOverlayQueryResult = Apollo.QueryResult<MatchOverlayQuery, MatchOverlayQueryVariables>;
export const TeamsDocument = gql`
    query Teams {
  teams {
    id
    name
    number
  }
}
    `;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export function useTeamsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsSuspenseQueryHookResult = ReturnType<typeof useTeamsSuspenseQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const FieldsDocument = gql`
    query Fields {
  fields {
    id
    name
    isEnabled
    isCompetition
  }
}
    `;

/**
 * __useFieldsQuery__
 *
 * To run a query within a React component, call `useFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFieldsQuery(baseOptions?: Apollo.QueryHookOptions<FieldsQuery, FieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FieldsQuery, FieldsQueryVariables>(FieldsDocument, options);
      }
export function useFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FieldsQuery, FieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FieldsQuery, FieldsQueryVariables>(FieldsDocument, options);
        }
export function useFieldsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FieldsQuery, FieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FieldsQuery, FieldsQueryVariables>(FieldsDocument, options);
        }
export type FieldsQueryHookResult = ReturnType<typeof useFieldsQuery>;
export type FieldsLazyQueryHookResult = ReturnType<typeof useFieldsLazyQuery>;
export type FieldsSuspenseQueryHookResult = ReturnType<typeof useFieldsSuspenseQuery>;
export type FieldsQueryResult = Apollo.QueryResult<FieldsQuery, FieldsQueryVariables>;
export const FieldControlDocument = gql`
    subscription FieldControl($fieldId: Int!) {
  fieldControl(fieldId: $fieldId) {
    fieldId
    endTime
    mode
  }
}
    `;

/**
 * __useFieldControlSubscription__
 *
 * To run a query within a React component, call `useFieldControlSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFieldControlSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFieldControlSubscription({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useFieldControlSubscription(baseOptions: Apollo.SubscriptionHookOptions<FieldControlSubscription, FieldControlSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FieldControlSubscription, FieldControlSubscriptionVariables>(FieldControlDocument, options);
      }
export type FieldControlSubscriptionHookResult = ReturnType<typeof useFieldControlSubscription>;
export type FieldControlSubscriptionResult = Apollo.SubscriptionResult<FieldControlSubscription>;