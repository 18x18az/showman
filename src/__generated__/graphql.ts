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
  /** The current state of field control on the field. Null if the field is disabled. */
  fieldControl?: Maybe<FieldControl>;
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
  endTime?: Maybe<Scalars['DateTime']['output']>;
  /** The field that this control object is associated with */
  field: Field;
  /** Whether the field is currently running */
  isRunning: Scalars['Boolean']['output'];
  /** The current mode of the field, null if undefined. Will still return a value even if it is not currently running. */
  mode?: Maybe<Control_Mode>;
};

export type FieldUpdate = {
  /** Set a competition field to be able to run skills. Meaningless if the field is already a dedicated skills field. */
  canRunSkills?: InputMaybe<Scalars['Boolean']['input']>;
  /** True for a competition field, false for a dedicated skills field */
  isCompetition?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether the field is enabled for use */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Name of the field */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  configureTournamentManager: TournamentManager;
  /** Reset the event. Only available in test mode. */
  reset: Stage;
  updateField: Field;
};


export type MutationConfigureTournamentManagerArgs = {
  settings: TournamentManagerSetup;
};


export type MutationUpdateFieldArgs = {
  fieldId: Scalars['Int']['input'];
  update: FieldUpdate;
};

export type Query = {
  __typename?: 'Query';
  fields: Array<Field>;
  stage: Stage;
  teams: Array<Team>;
  tournamentManager: TournamentManager;
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
  url?: Maybe<Scalars['URL']['output']>;
};

export type TournamentManagerSetup = {
  /** The address of Tournament Manager. IP addresses must start with http e.g. http://192.168.1.42 */
  url: Scalars['URL']['input'];
};

export type GetEventStageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventStageQuery = { __typename?: 'Query', stage: { __typename?: 'Stage', stage: EventStage } };


export const GetEventStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventStage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"}}]}}]}}]} as unknown as DocumentNode<GetEventStageQuery, GetEventStageQueryVariables>;