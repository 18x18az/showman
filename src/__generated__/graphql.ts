/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: any; output: any; }
};

/** A block refers to a group of match sittings played in the same stretch of time, e.g. all quals played in the morning before lunch */
export type Block = {
  __typename?: 'Block';
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
  /** The field that is currently live */
  liveField: Maybe<Field>;
  /** The field that is currently on deck */
  onDeckField: Maybe<Field>;
};

export type CompetitionField = {
  __typename?: 'CompetitionField';
  fieldId: Scalars['Float']['output'];
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
  configureTournamentManager: TournamentManager;
  putOnDeck: Competition;
  queueSitting: Sitting;
  /** Reset the event. Only available in test mode. */
  reset: Stage;
  startField: FieldControl;
  startNextBlock: Block;
  unqueue: CompetitionField;
  updateField: Field;
};


export type MutationConfigureTournamentManagerArgs = {
  settings: TournamentManagerSetup;
};


export type MutationPutOnDeckArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationQueueSittingArgs = {
  fieldId: Scalars['Int']['input'];
  sittingId: Scalars['Int']['input'];
};


export type MutationStartFieldArgs = {
  fieldId: Scalars['Float']['input'];
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

export type GetEventStageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventStageQuery = { __typename?: 'Query', stage: { __typename?: 'Stage', stage: EventStage } };

export type ConfigureTournamentManagerMutationVariables = Exact<{
  settings: TournamentManagerSetup;
}>;


export type ConfigureTournamentManagerMutation = { __typename?: 'Mutation', configureTournamentManager: { __typename?: 'TournamentManager', status: TmStatus } };

export type PutOnDeckMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type PutOnDeckMutation = { __typename?: 'Mutation', putOnDeck: { __typename?: 'Competition', onDeckField: { __typename?: 'Field', id: number } | null } };

export type UnqueueSittingMutationVariables = Exact<{
  sittingId: Scalars['Int']['input'];
}>;


export type UnqueueSittingMutation = { __typename?: 'Mutation', unqueue: { __typename?: 'CompetitionField', onFieldSitting: { __typename?: 'Sitting', id: number } | null, onTableSitting: { __typename?: 'Sitting', id: number } | null } };

export type SittingInformationFragment = { __typename?: 'Sitting', id: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } } & { ' $fragmentName'?: 'SittingInformationFragment' };

export type GetCompetitionFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompetitionFieldsQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', stage: MatchStage, onFieldSitting: (
        { __typename?: 'Sitting' }
        & { ' $fragmentRefs'?: { 'SittingInformationFragment': SittingInformationFragment } }
      ) | null, onTableSitting: (
        { __typename?: 'Sitting' }
        & { ' $fragmentRefs'?: { 'SittingInformationFragment': SittingInformationFragment } }
      ) | null } | null, fieldControl: { __typename?: 'FieldControl', endTime: any | null } | null }> };

export type LiveFieldQueryVariables = Exact<{ [key: string]: never; }>;


export type LiveFieldQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', liveField: { __typename?: 'Field', id: number, fieldControl: { __typename?: 'FieldControl', endTime: any | null } | null, competition: { __typename?: 'CompetitionField', stage: MatchStage, onFieldSitting: { __typename?: 'Sitting', id: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } } | null } | null } | null } };

export type QueueSittingMutationVariables = Exact<{
  sittingId: Scalars['Int']['input'];
  fieldId: Scalars['Int']['input'];
}>;


export type QueueSittingMutation = { __typename?: 'Mutation', queueSitting: { __typename?: 'Sitting', id: number } };

export type GetUnqueuedMatchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnqueuedMatchesQuery = { __typename?: 'Query', currentBlock: { __typename?: 'Block', name: string, unqueuedSittings: Array<{ __typename?: 'Sitting', id: number, contest: { __typename?: 'Contest', round: Round, number: number }, field: { __typename?: 'Field', id: number, name: string } | null, match: { __typename?: 'Match', number: number } }> } | null };

export type GetTableOccupiedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTableOccupiedQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', onTableSitting: { __typename?: 'Sitting', id: number } | null } | null }> };

export type OnDeckFieldQueryVariables = Exact<{ [key: string]: never; }>;


export type OnDeckFieldQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', onDeckField: { __typename?: 'Field', id: number, competition: { __typename?: 'CompetitionField', onFieldSitting: { __typename?: 'Sitting', id: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } } | null } | null } | null, liveField: { __typename?: 'Field', id: number, competition: { __typename?: 'CompetitionField', stage: MatchStage } | null } | null } };

export const SittingInformationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SittingInformation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sitting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"match"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]} as unknown as DocumentNode<SittingInformationFragment, unknown>;
export const GetEventStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventStage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"}}]}}]}}]} as unknown as DocumentNode<GetEventStageQuery, GetEventStageQueryVariables>;
export const ConfigureTournamentManagerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"configureTournamentManager"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TournamentManagerSetup"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"configureTournamentManager"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ConfigureTournamentManagerMutation, ConfigureTournamentManagerMutationVariables>;
export const PutOnDeckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PutOnDeck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fieldId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"putOnDeck"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fieldId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fieldId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onDeckField"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PutOnDeckMutation, PutOnDeckMutationVariables>;
export const UnqueueSittingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnqueueSitting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sittingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unqueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sittingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sittingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onFieldSitting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"onTableSitting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UnqueueSittingMutation, UnqueueSittingMutationVariables>;
export const GetCompetitionFieldsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompetitionFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isEnabled"},"value":{"kind":"BooleanValue","value":true}},{"kind":"Argument","name":{"kind":"Name","value":"isCompetition"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"competition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"}},{"kind":"Field","name":{"kind":"Name","value":"onFieldSitting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SittingInformation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"onTableSitting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SittingInformation"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fieldControl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SittingInformation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sitting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"match"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]} as unknown as DocumentNode<GetCompetitionFieldsQuery, GetCompetitionFieldsQueryVariables>;
export const LiveFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LiveField"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competitionInformation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveField"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fieldControl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"competition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"}},{"kind":"Field","name":{"kind":"Name","value":"onFieldSitting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"match"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LiveFieldQuery, LiveFieldQueryVariables>;
export const QueueSittingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"QueueSitting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sittingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fieldId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queueSitting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sittingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sittingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fieldId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fieldId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<QueueSittingMutation, QueueSittingMutationVariables>;
export const GetUnqueuedMatchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnqueuedMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentBlock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unqueuedSittings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"field"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"match"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUnqueuedMatchesQuery, GetUnqueuedMatchesQueryVariables>;
export const GetTableOccupiedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTableOccupied"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isEnabled"},"value":{"kind":"BooleanValue","value":true}},{"kind":"Argument","name":{"kind":"Name","value":"isCompetition"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"competition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onTableSitting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTableOccupiedQuery, GetTableOccupiedQueryVariables>;
export const OnDeckFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OnDeckField"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competitionInformation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onDeckField"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"competition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onFieldSitting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"match"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"liveField"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"competition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnDeckFieldQuery, OnDeckFieldQueryVariables>;