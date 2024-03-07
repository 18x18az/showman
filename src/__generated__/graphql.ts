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
  IP: { input: any; output: any; }
  URL: { input: any; output: any; }
};

export type AllianceSelection = {
  __typename?: 'AllianceSelection';
  /** The alliances that have been formed */
  alliances: Array<Array<Team>>;
  /** The teams that are still eligible to be picked */
  pickable: Array<Team>;
  /** The team that has been picked */
  picked: Maybe<Team>;
  /** The team that is currently picking */
  picking: Maybe<Team>;
  /** The teams that are not yet part of an alliance */
  remaining: Array<Team>;
};

export type Award = {
  __typename?: 'Award';
  /** Unique identifier for the award */
  id: Scalars['Int']['output'];
  /** Name of the award */
  name: Scalars['String']['output'];
  /** The team(s) that won the award */
  winners: Maybe<Array<Team>>;
};

export enum AwardStage {
  Intro = 'INTRO',
  None = 'NONE',
  Revealed = 'REVEALED'
}

export type Backend = {
  __typename?: 'Backend';
  /** The password for the backend */
  password: Maybe<Scalars['String']['output']>;
  /** The status of the backend */
  status: BackendStatus;
  /** The address of the backend. IP addresses must start with http e.g. http://192.168.1.42 */
  url: Maybe<Scalars['URL']['output']>;
};

export type BackendSetup = {
  /** The password for the backend */
  password: Scalars['String']['input'];
  /** The address of the backend. IP addresses must start with http e.g. http://192.168.1.42 */
  url?: InputMaybe<Scalars['URL']['input']>;
};

export enum BackendStatus {
  AuthError = 'AUTH_ERROR',
  Connected = 'CONNECTED',
  NotConfigured = 'NOT_CONFIGURED'
}

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

export type Camera = {
  __typename?: 'Camera';
  currentPreset: Maybe<Preset>;
  id: Scalars['Int']['output'];
  ip: Scalars['IP']['output'];
  name: Scalars['String']['output'];
  presets: Array<Preset>;
  scene: Scene;
};

export type CameraEdit = {
  ip?: InputMaybe<Scalars['IP']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Competition = {
  __typename?: 'Competition';
  /** Whether to automatically go to the match results */
  autoAdvance: Scalars['Boolean']['output'];
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

/** Control of remote displays */
export type Display = {
  __typename?: 'Display';
  /** The field that the display is currently assigned to */
  field: Maybe<Field>;
  /** Name of the display */
  name: Scalars['String']['output'];
  /** Unique identifier for the display */
  uuid: Scalars['String']['output'];
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
  /** The camera preset which displays the field */
  preset: Maybe<Preset>;
  /** The scene which displays the field */
  scene: Maybe<Scene>;
  /** Information about skills matches associated with this field. Null if the field is not being used for skills matches. */
  skills: Maybe<Skills>;
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
  canRunSkills?: InputMaybe<Scalars['Boolean']['input']>;
  /** True for a competition field, false for a dedicated skills field */
  isCompetition?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether the field is enabled for use */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Name of the field */
  name?: InputMaybe<Scalars['String']['input']>;
  /** ID of the camera preset associated with the field */
  presetId?: InputMaybe<Scalars['Float']['input']>;
  /** ID of the scene associated with the field */
  sceneId?: InputMaybe<Scalars['Float']['input']>;
};

/** The inspection status of a team */
export enum Inspection {
  CheckedIn = 'CHECKED_IN',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  NotHere = 'NOT_HERE',
  NoShow = 'NO_SHOW'
}

export type InspectionGroup = {
  __typename?: 'InspectionGroup';
  /** Unique identifier for the inspection group */
  id: Scalars['Int']['output'];
  /** All inspection points for the group */
  points: Array<InspectionPoint>;
  /** Program the inspection group applies to */
  program: Program;
  /** Title of the inspection group */
  text: Scalars['String']['output'];
};

export type InspectionPoint = {
  __typename?: 'InspectionPoint';
  /** Group the inspection point belongs to */
  group: InspectionGroup;
  /** Unique identifier for the inspection point */
  id: Scalars['Int']['output'];
  /** Program the inspection point applies to */
  program: Program;
  /** Text of the inspection point */
  text: Scalars['String']['output'];
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
  addCamera: Array<Camera>;
  addField: Field;
  addScene: Array<Scene>;
  advanceAwardStage: Overlay;
  allianceSelectionAccept: AllianceSelection;
  allianceSelectionCancel: AllianceSelection;
  allianceSelectionDecline: AllianceSelection;
  allianceSelectionPick: AllianceSelection;
  allianceSelectionUndo: AllianceSelection;
  callPreset: Camera;
  cancelTimeout: Timeout;
  clearLive: Competition;
  clearResults: Results;
  concludeBlock: Block;
  configureBackend: Backend;
  configureTournamentManager: TournamentManager;
  createPreset: Camera;
  cutToScene: Scene;
  deleteField: Array<Field>;
  editCamera: Camera;
  editScene: Scene;
  markCheckin: Team;
  promoteResults: Results;
  putLive: Competition;
  putOnDeck: Competition;
  queueDriverSkills: Skills;
  queueProgrammingSkills: Skills;
  queueSitting: Sitting;
  removeCamera: Array<Camera>;
  removeScene: Array<Scene>;
  renameDisplay: Display;
  replay: CompetitionField;
  /** Reset the event. Only available in test mode. */
  reset: Stage;
  resetAuton: CompetitionField;
  savePreset: Camera;
  setAutoAdvance: Competition;
  setAutomationEnabled: Competition;
  setDisplayField: Display;
  setDisplayedAward: Overlay;
  setInspectionPoint: Team;
  setOverlayDisplayed: Overlay;
  setPreviewScene: Scene;
  setSkillsEnabled: Array<Field>;
  setSolidDisplayScene: SolidDisplay;
  setSolidDisplayed: SolidDisplay;
  startAllianceSelection: AllianceSelection;
  startField: FieldControl;
  startNextBlock: Block;
  startTimeout: Timeout;
  stopField: FieldControl;
  transitionToScene: Scene;
  unqueue: CompetitionField;
  updateAwards: Array<Award>;
  updateField: Field;
  updatePreset: Preset;
};


export type MutationAllianceSelectionPickArgs = {
  teamId: Scalars['Int']['input'];
};


export type MutationCallPresetArgs = {
  cameraId: Scalars['Int']['input'];
  presetId: Scalars['Int']['input'];
};


export type MutationConfigureBackendArgs = {
  settings: BackendSetup;
};


export type MutationConfigureTournamentManagerArgs = {
  settings: TournamentManagerSetup;
};


export type MutationCreatePresetArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteFieldArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationEditCameraArgs = {
  data: CameraEdit;
  id: Scalars['Int']['input'];
};


export type MutationEditSceneArgs = {
  data: SceneEdit;
  id: Scalars['Int']['input'];
};


export type MutationMarkCheckinArgs = {
  status: Inspection;
  teamId: Scalars['Int']['input'];
};


export type MutationPutOnDeckArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationQueueDriverSkillsArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationQueueProgrammingSkillsArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationQueueSittingArgs = {
  fieldId: Scalars['Int']['input'];
  sittingId: Scalars['Int']['input'];
};


export type MutationRemoveCameraArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveSceneArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRenameDisplayArgs = {
  name: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};


export type MutationReplayArgs = {
  sittingId: Scalars['Int']['input'];
};


export type MutationResetAutonArgs = {
  fieldId: Scalars['Int']['input'];
};


export type MutationSavePresetArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSetAutoAdvanceArgs = {
  enabled: Scalars['Boolean']['input'];
};


export type MutationSetAutomationEnabledArgs = {
  enabled: Scalars['Boolean']['input'];
};


export type MutationSetDisplayFieldArgs = {
  fieldId: InputMaybe<Scalars['Int']['input']>;
  uuid: Scalars['String']['input'];
};


export type MutationSetDisplayedAwardArgs = {
  awardId: Scalars['Int']['input'];
};


export type MutationSetInspectionPointArgs = {
  isMet: Scalars['Boolean']['input'];
  pointId: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
};


export type MutationSetOverlayDisplayedArgs = {
  displayed: OverlayDisplayed;
};


export type MutationSetPreviewSceneArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSetSkillsEnabledArgs = {
  enabled: Scalars['Boolean']['input'];
};


export type MutationSetSolidDisplaySceneArgs = {
  sceneId: Scalars['Int']['input'];
};


export type MutationSetSolidDisplayedArgs = {
  displayed: SolidDisplayDisplayed;
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


export type MutationUpdatePresetArgs = {
  id: Scalars['Int']['input'];
  update: PresetUpdate;
};

export type Overlay = {
  __typename?: 'Overlay';
  award: Maybe<Award>;
  displayed: OverlayDisplayed;
  stage: AwardStage;
};

export enum OverlayDisplayed {
  Card = 'CARD',
  Match = 'MATCH',
  None = 'NONE'
}

export type Preset = {
  __typename?: 'Preset';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type PresetUpdate = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum Program {
  Vexu = 'VEXU',
  Vrc = 'VRC'
}

export type Query = {
  __typename?: 'Query';
  allianceSelection: Maybe<AllianceSelection>;
  awards: Array<Award>;
  backend: Backend;
  blocks: Array<Block>;
  camera: Camera;
  cameras: Array<Camera>;
  competitionInformation: Competition;
  contests: Array<Contest>;
  currentBlock: Maybe<Block>;
  display: Display;
  displays: Array<Display>;
  field: Field;
  fields: Array<Field>;
  inspectionGroups: Array<InspectionGroup>;
  matches: Array<Match>;
  nextBlock: Maybe<Block>;
  overlay: Overlay;
  previewScene: Maybe<Scene>;
  programScene: Maybe<Scene>;
  results: Results;
  scene: Scene;
  scenes: Array<Scene>;
  sittings: Array<Sitting>;
  solidDisplay: SolidDisplay;
  stage: Stage;
  team: Team;
  teams: Array<Team>;
  timeout: Timeout;
  tournamentManager: TournamentManager;
};


export type QueryCameraArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDisplayArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryFieldArgs = {
  fieldId: Scalars['Int']['input'];
};


export type QueryFieldsArgs = {
  isCompetition: InputMaybe<Scalars['Boolean']['input']>;
  isEnabled: InputMaybe<Scalars['Boolean']['input']>;
  skillsEnabled: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySceneArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTeamArgs = {
  teamId: Scalars['Int']['input'];
};


export type QueryTeamsArgs = {
  inspectionStatus: InputMaybe<Inspection>;
};

export type Results = {
  __typename?: 'Results';
  displayedResults: Maybe<Match>;
  nextResults: Maybe<Match>;
};

/** The round of the match */
export enum Round {
  F = 'F',
  Qf = 'QF',
  Qual = 'QUAL',
  Ro16 = 'Ro16',
  Sf = 'SF'
}

export type Scene = {
  __typename?: 'Scene';
  camera: Maybe<Camera>;
  id: Scalars['Int']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SceneEdit = {
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

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

export type Skills = {
  __typename?: 'Skills';
  fieldId: Scalars['Float']['output'];
  stopTime: Maybe<Scalars['Float']['output']>;
};

export type SolidDisplay = {
  __typename?: 'SolidDisplay';
  displayed: SolidDisplayDisplayed;
  scene: Maybe<Scene>;
};

/** The currently displayed view on the solid display */
export enum SolidDisplayDisplayed {
  Inspection = 'INSPECTION',
  Logo = 'LOGO',
  Results = 'RESULTS'
}

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
  /** Unique identifier for the team */
  id: Scalars['Int']['output'];
  /** All inspection groups applicable to the team */
  inspection: Array<TeamInspectionGroup>;
  /** Inspection status of the team */
  inspectionStatus: Inspection;
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
  /** All inspection groups containing points not met by the team */
  unmetInspection: Array<TeamInspectionGroup>;
};

export type TeamInspectionGroup = {
  __typename?: 'TeamInspectionGroup';
  /** Unique identifier for the inspection group */
  id: Scalars['Int']['output'];
  /** All inspection points applicable to the team */
  points: Array<TeamInspectionPoint>;
  /** Program the inspection group applies to */
  program: Program;
  /** Title of the inspection group */
  text: Scalars['String']['output'];
  /** Unmet inspection points for the team */
  unmetPoints: Array<TeamInspectionPoint>;
};

export type TeamInspectionPoint = {
  __typename?: 'TeamInspectionPoint';
  /** Group the inspection point belongs to */
  group: InspectionGroup;
  /** Unique identifier for the inspection point */
  id: Scalars['Int']['output'];
  /** Whether the team has met the inspection point */
  met: Scalars['Boolean']['output'];
  /** Program the inspection point applies to */
  program: Program;
  /** Text of the inspection point */
  text: Scalars['String']['output'];
};

export type Timeout = {
  __typename?: 'Timeout';
  /** The time that the timeout will end, null if there is no timeout. */
  endTime: Maybe<Scalars['DateTime']['output']>;
};

export enum TmStatus {
  AuthError = 'AUTH_ERROR',
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  Initializing = 'INITIALIZING',
  NotConfigured = 'NOT_CONFIGURED'
}

export type TournamentManager = {
  __typename?: 'TournamentManager';
  /** The password for Tournament Manager */
  password: Maybe<Scalars['String']['output']>;
  /** The status of the TM server */
  status: TmStatus;
  /** The address of Tournament Manager. IP addresses must start with http e.g. http://192.168.1.42 */
  url: Maybe<Scalars['URL']['output']>;
};

export type TournamentManagerSetup = {
  /** The password for Tournament Manager */
  password: Scalars['String']['input'];
  /** The address of Tournament Manager. IP addresses must start with http e.g. http://192.168.1.42 */
  url: Scalars['URL']['input'];
};

export type AllianceSelectionControlQueryVariables = Exact<{ [key: string]: never; }>;


export type AllianceSelectionControlQuery = { __typename?: 'Query', allianceSelection: { __typename?: 'AllianceSelection', picking: { __typename?: 'Team', id: number, number: string } | null, pickable: Array<{ __typename?: 'Team', id: number, number: string }>, alliances: Array<Array<{ __typename?: 'Team', id: number, number: string }>>, picked: { __typename?: 'Team', id: number, number: string } | null } | null };

export type CanStartAllianceSelectionQueryVariables = Exact<{ [key: string]: never; }>;


export type CanStartAllianceSelectionQuery = { __typename?: 'Query', stage: { __typename?: 'Stage', stage: EventStage }, currentBlock: { __typename?: 'Block', id: number } | null, nextBlock: { __typename?: 'Block', id: number } | null };

export type AllianceSelectionResultsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllianceSelectionResultsQuery = { __typename?: 'Query', allianceSelection: { __typename?: 'AllianceSelection', alliances: Array<Array<{ __typename?: 'Team', id: number, number: string }>> } | null };

export type StartAllianceSelectionMutationVariables = Exact<{ [key: string]: never; }>;


export type StartAllianceSelectionMutation = { __typename?: 'Mutation', startAllianceSelection: { __typename?: 'AllianceSelection', picking: { __typename?: 'Team', id: number } | null } };

export type AllianceSelectionPickMutationVariables = Exact<{
  teamId: Scalars['Int']['input'];
}>;


export type AllianceSelectionPickMutation = { __typename?: 'Mutation', allianceSelectionPick: { __typename?: 'AllianceSelection', picking: { __typename?: 'Team', id: number } | null } };

export type AllianceSelectionAcceptMutationVariables = Exact<{ [key: string]: never; }>;


export type AllianceSelectionAcceptMutation = { __typename?: 'Mutation', allianceSelectionAccept: { __typename?: 'AllianceSelection', picking: { __typename?: 'Team', id: number } | null } };

export type AllianceSelectionDeclineMutationVariables = Exact<{ [key: string]: never; }>;


export type AllianceSelectionDeclineMutation = { __typename?: 'Mutation', allianceSelectionDecline: { __typename?: 'AllianceSelection', picking: { __typename?: 'Team', id: number } | null } };

export type AllianceSelectionUndoMutationVariables = Exact<{ [key: string]: never; }>;


export type AllianceSelectionUndoMutation = { __typename?: 'Mutation', allianceSelectionUndo: { __typename?: 'AllianceSelection', picking: { __typename?: 'Team', id: number } | null } };

export type AllianceSelectionCancelMutationVariables = Exact<{ [key: string]: never; }>;


export type AllianceSelectionCancelMutation = { __typename?: 'Mutation', allianceSelectionCancel: { __typename?: 'AllianceSelection', picking: { __typename?: 'Team', id: number } | null } };

export type CamerasQueryVariables = Exact<{ [key: string]: never; }>;


export type CamerasQuery = { __typename?: 'Query', cameras: Array<{ __typename?: 'Camera', id: number, name: string, ip: any, scene: { __typename?: 'Scene', id: number, name: string } }> };

export type PresetsQueryVariables = Exact<{
  sceneId: Scalars['Int']['input'];
}>;


export type PresetsQuery = { __typename?: 'Query', scene: { __typename?: 'Scene', id: number, camera: { __typename?: 'Camera', presets: Array<{ __typename?: 'Preset', id: number, name: string }> } | null } };

export type CameraControlInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type CameraControlInfoQuery = { __typename?: 'Query', scenes: Array<{ __typename?: 'Scene', id: number, name: string, camera: { __typename?: 'Camera', id: number } | null }>, cameras: Array<{ __typename?: 'Camera', id: number, name: string, currentPreset: { __typename?: 'Preset', id: number } | null, presets: Array<{ __typename?: 'Preset', id: number, name: string }>, scene: { __typename?: 'Scene', id: number } }>, previewScene: { __typename?: 'Scene', id: number } | null, programScene: { __typename?: 'Scene', id: number } | null };

export type AddCameraMutationVariables = Exact<{ [key: string]: never; }>;


export type AddCameraMutation = { __typename?: 'Mutation', addCamera: Array<{ __typename?: 'Camera', id: number, name: string, ip: any }> };

export type RemoveCameraMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveCameraMutation = { __typename?: 'Mutation', removeCamera: Array<{ __typename?: 'Camera', id: number, name: string, ip: any }> };

export type EditCameraMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: CameraEdit;
}>;


export type EditCameraMutation = { __typename?: 'Mutation', editCamera: { __typename?: 'Camera', id: number, name: string, ip: any } };

export type CreatePresetMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CreatePresetMutation = { __typename?: 'Mutation', createPreset: { __typename?: 'Camera', id: number, name: string } };

export type UpdatePresetMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  update: PresetUpdate;
}>;


export type UpdatePresetMutation = { __typename?: 'Mutation', updatePreset: { __typename?: 'Preset', id: number, name: string } };

export type CallPresetMutationVariables = Exact<{
  cameraId: Scalars['Int']['input'];
  presetId: Scalars['Int']['input'];
}>;


export type CallPresetMutation = { __typename?: 'Mutation', callPreset: { __typename?: 'Camera', id: number, name: string, currentPreset: { __typename?: 'Preset', id: number } | null } };

export type SavePresetMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type SavePresetMutation = { __typename?: 'Mutation', savePreset: { __typename?: 'Camera', id: number, name: string, currentPreset: { __typename?: 'Preset', id: number } | null } };

export type SetPreviewSceneMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type SetPreviewSceneMutation = { __typename?: 'Mutation', setPreviewScene: { __typename?: 'Scene', id: number } };

export type CutToSceneMutationVariables = Exact<{ [key: string]: never; }>;


export type CutToSceneMutation = { __typename?: 'Mutation', cutToScene: { __typename?: 'Scene', id: number } };

export type TransitionToSceneMutationVariables = Exact<{ [key: string]: never; }>;


export type TransitionToSceneMutation = { __typename?: 'Mutation', transitionToScene: { __typename?: 'Scene', id: number } };

export type StreamSidebarQueryVariables = Exact<{ [key: string]: never; }>;


export type StreamSidebarQuery = { __typename?: 'Query', scenes: Array<{ __typename?: 'Scene', id: number, name: string }>, solidDisplay: { __typename?: 'SolidDisplay', displayed: SolidDisplayDisplayed, scene: { __typename?: 'Scene', id: number, name: string } | null }, overlay: { __typename?: 'Overlay', displayed: OverlayDisplayed, stage: AwardStage, award: { __typename?: 'Award', id: number, name: string } | null }, awards: Array<{ __typename?: 'Award', id: number, name: string, winners: Array<{ __typename?: 'Team', id: number }> | null }> };

export type SetSolidDisplaySceneMutationVariables = Exact<{
  sceneId: Scalars['Int']['input'];
}>;


export type SetSolidDisplaySceneMutation = { __typename?: 'Mutation', setSolidDisplayScene: { __typename?: 'SolidDisplay', displayed: SolidDisplayDisplayed, scene: { __typename?: 'Scene', id: number, name: string } | null } };

export type SetSolidDisplayMutationVariables = Exact<{
  displayed: SolidDisplayDisplayed;
}>;


export type SetSolidDisplayMutation = { __typename?: 'Mutation', setSolidDisplayed: { __typename?: 'SolidDisplay', displayed: SolidDisplayDisplayed } };

export type GetSolidDisplayViewQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSolidDisplayViewQuery = { __typename?: 'Query', solidDisplay: { __typename?: 'SolidDisplay', displayed: SolidDisplayDisplayed }, stage: { __typename?: 'Stage', stage: EventStage } };

export type GetOverlayDisplayControlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOverlayDisplayControlQuery = { __typename?: 'Query', overlay: { __typename?: 'Overlay', displayed: OverlayDisplayed, stage: AwardStage, award: { __typename?: 'Award', id: number, name: string, winners: Array<{ __typename?: 'Team', id: number, number: string, name: string, location: string }> | null } | null }, stage: { __typename?: 'Stage', stage: EventStage } };

export type SetOverlayDisplayMutationVariables = Exact<{
  displayed: OverlayDisplayed;
}>;


export type SetOverlayDisplayMutation = { __typename?: 'Mutation', setOverlayDisplayed: { __typename?: 'Overlay', displayed: OverlayDisplayed } };

export type GetOverlayDisplayViewQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOverlayDisplayViewQuery = { __typename?: 'Query', overlay: { __typename?: 'Overlay', displayed: OverlayDisplayed } };

export type UpdateAwardsMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateAwardsMutation = { __typename?: 'Mutation', updateAwards: Array<{ __typename?: 'Award', id: number }> };

export type SetDisplayedAwardMutationVariables = Exact<{
  awardId: Scalars['Int']['input'];
}>;


export type SetDisplayedAwardMutation = { __typename?: 'Mutation', setDisplayedAward: { __typename?: 'Overlay', award: { __typename?: 'Award', id: number, name: string } | null } };

export type AdvanceAwardStageMutationVariables = Exact<{ [key: string]: never; }>;


export type AdvanceAwardStageMutation = { __typename?: 'Mutation', advanceAwardStage: { __typename?: 'Overlay', award: { __typename?: 'Award', id: number, name: string } | null } };

export type LiveFieldQueryVariables = Exact<{ [key: string]: never; }>;


export type LiveFieldQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', liveField: { __typename?: 'Field', id: number, fieldControl: { __typename?: 'FieldControl', endTime: any | null } | null, competition: { __typename?: 'CompetitionField', stage: MatchStage, onFieldSitting: { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } } | null } | null } | null } };

export type GetCompetitionFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompetitionFieldsQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', stage: MatchStage, isLive: boolean, isOnDeck: boolean, onFieldSitting: { __typename?: 'Sitting', scheduled: any | null, id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null, onTableSitting: { __typename?: 'Sitting', scheduled: any | null, id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null } | null, fieldControl: { __typename?: 'FieldControl', fieldId: number, endTime: any | null } | null }> };

export type GetTableOccupiedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTableOccupiedQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', onTableSitting: { __typename?: 'Sitting', id: number } | null } | null }> };

export type QueueSittingMutationVariables = Exact<{
  sittingId: Scalars['Int']['input'];
  fieldId: Scalars['Int']['input'];
}>;


export type QueueSittingMutation = { __typename?: 'Mutation', queueSitting: { __typename?: 'Sitting', id: number } };

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

export type ClearLiveMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearLiveMutation = { __typename?: 'Mutation', clearLive: { __typename?: 'Competition', liveField: { __typename?: 'Field', id: number } | null } };

export type SetAutomationEnabledMutationVariables = Exact<{
  enabled: Scalars['Boolean']['input'];
}>;


export type SetAutomationEnabledMutation = { __typename?: 'Mutation', setAutomationEnabled: { __typename?: 'Competition', automationEnabled: boolean } };

export type SetAutoAdvanceMutationVariables = Exact<{
  enabled: Scalars['Boolean']['input'];
}>;


export type SetAutoAdvanceMutation = { __typename?: 'Mutation', setAutoAdvance: { __typename?: 'Competition', autoAdvance: boolean } };

export type SetSkillsEnabledMutationVariables = Exact<{
  enabled: Scalars['Boolean']['input'];
}>;


export type SetSkillsEnabledMutation = { __typename?: 'Mutation', setSkillsEnabled: Array<{ __typename?: 'Field', id: number, canRunSkills: boolean }> };

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

export type QueueDriverSkillsMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type QueueDriverSkillsMutation = { __typename?: 'Mutation', queueDriverSkills: { __typename?: 'Skills', fieldId: number } };

export type QueueProgrammingSkillsMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type QueueProgrammingSkillsMutation = { __typename?: 'Mutation', queueProgrammingSkills: { __typename?: 'Skills', fieldId: number } };

export type FieldControlSubscriptionVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type FieldControlSubscription = { __typename?: 'Subscription', fieldControl: { __typename?: 'FieldControl', fieldId: number, endTime: any | null, mode: Control_Mode | null } };

export type FieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type FieldsQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string, isEnabled: boolean, isCompetition: boolean, scene: { __typename?: 'Scene', id: number, name: string } | null, preset: { __typename?: 'Preset', id: number, name: string } | null }> };

export type UpdateFieldNameMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
  name: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateFieldNameMutation = { __typename?: 'Mutation', updateField: { __typename?: 'Field', id: number, name: string, isEnabled: boolean, isCompetition: boolean } };

export type EditFieldMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
  update: FieldUpdate;
}>;


export type EditFieldMutation = { __typename?: 'Mutation', updateField: { __typename?: 'Field', id: number, name: string, isEnabled: boolean, isCompetition: boolean } };

export type DeleteFieldMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type DeleteFieldMutation = { __typename?: 'Mutation', deleteField: Array<{ __typename?: 'Field', id: number }> };

export type SetFieldEnabledMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
  isEnabled: Scalars['Boolean']['input'];
}>;


export type SetFieldEnabledMutation = { __typename?: 'Mutation', updateField: { __typename?: 'Field', id: number, isEnabled: boolean } };

export type SetFieldIsCompetitionMutationVariables = Exact<{
  fieldId: Scalars['Int']['input'];
  isCompetition: Scalars['Boolean']['input'];
}>;


export type SetFieldIsCompetitionMutation = { __typename?: 'Mutation', updateField: { __typename?: 'Field', id: number, isCompetition: boolean } };

export type OnDeckFieldQueryVariables = Exact<{ [key: string]: never; }>;


export type OnDeckFieldQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', onDeckField: { __typename?: 'Field', id: number, competition: { __typename?: 'CompetitionField', onFieldSitting: { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } } | null } | null } | null, liveField: { __typename?: 'Field', id: number, competition: { __typename?: 'CompetitionField', stage: MatchStage } | null } | null } };

export type FieldNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type FieldNamesQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string }> };

export type AddFieldMutationVariables = Exact<{ [key: string]: never; }>;


export type AddFieldMutation = { __typename?: 'Mutation', addField: { __typename?: 'Field', id: number, name: string } };

export type SittingInformationFragment = { __typename?: 'Sitting', id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } };

export type TeamInformationFragment = { __typename?: 'Team', id: number, number: string, name: string, rank: number | null };

export type SittingWithTeamsFragment = { __typename?: 'Sitting', scheduled: any | null, id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } };

export type BlockInformationFragment = { __typename?: 'Block', id: number, name: string, canConclude: boolean, unqueuedSittings: Array<{ __typename?: 'Sitting', id: number, number: number, field: { __typename?: 'Field', id: number, name: string } | null, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } }> };

export type InspectableTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type InspectableTeamsQuery = { __typename?: 'Query', notStarted: Array<{ __typename?: 'Team', id: number, number: string }>, inProgress: Array<{ __typename?: 'Team', id: number, number: string }> };

export type InspectionGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type InspectionGroupsQuery = { __typename?: 'Query', notCheckedIn: Array<{ __typename?: 'Team', id: number, number: string }>, notStarted: Array<{ __typename?: 'Team', id: number, number: string }>, inProgress: Array<{ __typename?: 'Team', id: number, number: string }>, completed: Array<{ __typename?: 'Team', id: number, number: string }> };

export type InspectionDataQueryVariables = Exact<{
  teamId: Scalars['Int']['input'];
}>;


export type InspectionDataQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: number, number: string, inspectionStatus: Inspection, inspection: Array<{ __typename?: 'TeamInspectionGroup', id: number, text: string, points: Array<{ __typename?: 'TeamInspectionPoint', id: number, text: string, met: boolean }> }> } };

export type SetInspectionPointMutationVariables = Exact<{
  pointId: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
  isMet: Scalars['Boolean']['input'];
}>;


export type SetInspectionPointMutation = { __typename?: 'Mutation', setInspectionPoint: { __typename?: 'Team', id: number } };

export type ConfigureTournamentManagerMutationVariables = Exact<{
  settings: TournamentManagerSetup;
}>;


export type ConfigureTournamentManagerMutation = { __typename?: 'Mutation', configureTournamentManager: { __typename?: 'TournamentManager', status: TmStatus } };

export type RenameDisplayMutationVariables = Exact<{
  uuid: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type RenameDisplayMutation = { __typename?: 'Mutation', renameDisplay: { __typename?: 'Display', uuid: string, name: string } };

export type SetDisplayFieldMutationVariables = Exact<{
  uuid: Scalars['String']['input'];
  fieldId: InputMaybe<Scalars['Int']['input']>;
}>;


export type SetDisplayFieldMutation = { __typename?: 'Mutation', setDisplayField: { __typename?: 'Display', uuid: string, field: { __typename?: 'Field', id: number } | null } };

export type StartTimeoutMutationVariables = Exact<{ [key: string]: never; }>;


export type StartTimeoutMutation = { __typename?: 'Mutation', startTimeout: { __typename?: 'Timeout', endTime: any | null } };

export type CancelTimeoutMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelTimeoutMutation = { __typename?: 'Mutation', cancelTimeout: { __typename?: 'Timeout', endTime: any | null } };

export type MarkCheckinMutationVariables = Exact<{
  teamId: Scalars['Int']['input'];
  status: Inspection;
}>;


export type MarkCheckinMutation = { __typename?: 'Mutation', markCheckin: { __typename?: 'Team', id: number, inspectionStatus: Inspection } };

export type RefereeInformationQueryVariables = Exact<{ [key: string]: never; }>;


export type RefereeInformationQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', liveField: { __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', stage: MatchStage, onFieldSitting: { __typename?: 'Sitting', scheduled: any | null, id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null } | null } | null, onDeckField: { __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', onFieldSitting: { __typename?: 'Sitting', scheduled: any | null, id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null } | null } | null } };

export type GetEventStageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventStageQuery = { __typename?: 'Query', stage: { __typename?: 'Stage', stage: EventStage } };

export type CompetitionMiniSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompetitionMiniSettingsQuery = { __typename?: 'Query', stage: { __typename?: 'Stage', stage: EventStage }, competitionInformation: { __typename?: 'Competition', automationEnabled: boolean, autoAdvance: boolean }, currentBlock: { __typename?: 'Block', id: number } | null, results: { __typename?: 'Results', displayedResults: { __typename?: 'Match', id: number } | null, nextResults: { __typename?: 'Match', id: number } | null }, fields: Array<{ __typename?: 'Field', id: number, canRunSkills: boolean }>, timeout: { __typename?: 'Timeout', endTime: any | null } };

export type MatchOverlayQueryVariables = Exact<{ [key: string]: never; }>;


export type MatchOverlayQuery = { __typename?: 'Query', competitionInformation: { __typename?: 'Competition', liveField: { __typename?: 'Field', id: number, competition: { __typename?: 'CompetitionField', stage: MatchStage, onFieldSitting: { __typename?: 'Sitting', scheduled: any | null, id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null } | null, fieldControl: { __typename?: 'FieldControl', endTime: any | null } | null } | null } };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', id: number, name: string, number: string, inspectionStatus: Inspection, rank: number | null }> };

export type DisplaysQueryVariables = Exact<{ [key: string]: never; }>;


export type DisplaysQuery = { __typename?: 'Query', displays: Array<{ __typename?: 'Display', uuid: string, name: string, field: { __typename?: 'Field', id: number, name: string } | null }> };

export type FieldDisplayQueryVariables = Exact<{
  uuid: Scalars['String']['input'];
}>;


export type FieldDisplayQuery = { __typename?: 'Query', timeout: { __typename?: 'Timeout', endTime: any | null }, display: { __typename?: 'Display', uuid: string, field: { __typename?: 'Field', id: number, name: string, fieldControl: { __typename?: 'FieldControl', endTime: any | null, mode: Control_Mode | null } | null, competition: { __typename?: 'CompetitionField', stage: MatchStage, isLive: boolean, onFieldSitting: { __typename?: 'Sitting', scheduled: any | null, id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null } | null, skills: { __typename?: 'Skills', fieldId: number, stopTime: number | null } | null } | null } };

export type SkillsFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type SkillsFieldsQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string, canRunSkills: boolean }> };

export type SkillsFieldQueryVariables = Exact<{
  fieldId: Scalars['Int']['input'];
}>;


export type SkillsFieldQuery = { __typename?: 'Query', field: { __typename?: 'Field', id: number, name: string, fieldControl: { __typename?: 'FieldControl', mode: Control_Mode | null, endTime: any | null } | null, skills: { __typename?: 'Skills', fieldId: number, stopTime: number | null } | null } };

export type QueueDisplayQueryVariables = Exact<{ [key: string]: never; }>;


export type QueueDisplayQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'Field', id: number, name: string, competition: { __typename?: 'CompetitionField', stage: MatchStage, onFieldSitting: { __typename?: 'Sitting', scheduled: any | null, id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null, onTableSitting: { __typename?: 'Sitting', scheduled: any | null, id: number, number: number, contest: { __typename?: 'Contest', round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> }, match: { __typename?: 'Match', number: number } } | null } | null }> };

export type GetNotCheckedInTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotCheckedInTeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', id: number, name: string, number: string }> };

export type ClearResultsMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearResultsMutation = { __typename?: 'Mutation', clearResults: { __typename?: 'Results', displayedResults: { __typename?: 'Match', id: number } | null } };

export type PromoteResultsMutationVariables = Exact<{ [key: string]: never; }>;


export type PromoteResultsMutation = { __typename?: 'Mutation', promoteResults: { __typename?: 'Results', displayedResults: { __typename?: 'Match', id: number } | null } };

export type ResultsQueryVariables = Exact<{ [key: string]: never; }>;


export type ResultsQuery = { __typename?: 'Query', results: { __typename?: 'Results', displayedResults: { __typename?: 'Match', id: number, number: number, redScore: number | null, blueScore: number | null, contest: { __typename?: 'Contest', id: number, round: Round, number: number, redTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }>, blueTeams: Array<{ __typename?: 'Team', id: number, number: string, name: string, rank: number | null }> } } | null } };

export type ScenesQueryVariables = Exact<{ [key: string]: never; }>;


export type ScenesQuery = { __typename?: 'Query', scenes: Array<{ __typename?: 'Scene', id: number, name: string, key: string }> };

export type EditSceneMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: SceneEdit;
}>;


export type EditSceneMutation = { __typename?: 'Mutation', editScene: { __typename?: 'Scene', id: number, name: string } };

export type AddSceneMutationVariables = Exact<{ [key: string]: never; }>;


export type AddSceneMutation = { __typename?: 'Mutation', addScene: Array<{ __typename?: 'Scene', id: number, name: string }> };

export type RemoveSceneMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveSceneMutation = { __typename?: 'Mutation', removeScene: Array<{ __typename?: 'Scene', id: number, name: string }> };

export type StartNextBlockMutationVariables = Exact<{ [key: string]: never; }>;


export type StartNextBlockMutation = { __typename?: 'Mutation', startNextBlock: { __typename?: 'Block', id: number } };

export type ConcludeBlockMutationVariables = Exact<{ [key: string]: never; }>;


export type ConcludeBlockMutation = { __typename?: 'Mutation', concludeBlock: { __typename?: 'Block', id: number } };

export type GetUnqueuedSittingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnqueuedSittingsQuery = { __typename?: 'Query', currentBlock: { __typename?: 'Block', id: number, name: string, canConclude: boolean, unqueuedSittings: Array<{ __typename?: 'Sitting', id: number, number: number, field: { __typename?: 'Field', id: number, name: string } | null, contest: { __typename?: 'Contest', round: Round, number: number }, match: { __typename?: 'Match', number: number } }> } | null, nextBlock: { __typename?: 'Block', id: number, name: string } | null };

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
  scheduled
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
export const AllianceSelectionControlDocument = gql`
    query AllianceSelectionControl {
  allianceSelection {
    picking {
      id
      number
    }
    pickable {
      id
      number
    }
    alliances {
      id
      number
    }
    picked {
      id
      number
    }
  }
}
    `;

/**
 * __useAllianceSelectionControlQuery__
 *
 * To run a query within a React component, call `useAllianceSelectionControlQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllianceSelectionControlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllianceSelectionControlQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllianceSelectionControlQuery(baseOptions?: Apollo.QueryHookOptions<AllianceSelectionControlQuery, AllianceSelectionControlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllianceSelectionControlQuery, AllianceSelectionControlQueryVariables>(AllianceSelectionControlDocument, options);
      }
export function useAllianceSelectionControlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllianceSelectionControlQuery, AllianceSelectionControlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllianceSelectionControlQuery, AllianceSelectionControlQueryVariables>(AllianceSelectionControlDocument, options);
        }
export function useAllianceSelectionControlSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllianceSelectionControlQuery, AllianceSelectionControlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllianceSelectionControlQuery, AllianceSelectionControlQueryVariables>(AllianceSelectionControlDocument, options);
        }
export type AllianceSelectionControlQueryHookResult = ReturnType<typeof useAllianceSelectionControlQuery>;
export type AllianceSelectionControlLazyQueryHookResult = ReturnType<typeof useAllianceSelectionControlLazyQuery>;
export type AllianceSelectionControlSuspenseQueryHookResult = ReturnType<typeof useAllianceSelectionControlSuspenseQuery>;
export type AllianceSelectionControlQueryResult = Apollo.QueryResult<AllianceSelectionControlQuery, AllianceSelectionControlQueryVariables>;
export const CanStartAllianceSelectionDocument = gql`
    query CanStartAllianceSelection {
  stage {
    stage
  }
  currentBlock {
    id
  }
  nextBlock {
    id
  }
}
    `;

/**
 * __useCanStartAllianceSelectionQuery__
 *
 * To run a query within a React component, call `useCanStartAllianceSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCanStartAllianceSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanStartAllianceSelectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCanStartAllianceSelectionQuery(baseOptions?: Apollo.QueryHookOptions<CanStartAllianceSelectionQuery, CanStartAllianceSelectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CanStartAllianceSelectionQuery, CanStartAllianceSelectionQueryVariables>(CanStartAllianceSelectionDocument, options);
      }
export function useCanStartAllianceSelectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CanStartAllianceSelectionQuery, CanStartAllianceSelectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CanStartAllianceSelectionQuery, CanStartAllianceSelectionQueryVariables>(CanStartAllianceSelectionDocument, options);
        }
export function useCanStartAllianceSelectionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CanStartAllianceSelectionQuery, CanStartAllianceSelectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CanStartAllianceSelectionQuery, CanStartAllianceSelectionQueryVariables>(CanStartAllianceSelectionDocument, options);
        }
export type CanStartAllianceSelectionQueryHookResult = ReturnType<typeof useCanStartAllianceSelectionQuery>;
export type CanStartAllianceSelectionLazyQueryHookResult = ReturnType<typeof useCanStartAllianceSelectionLazyQuery>;
export type CanStartAllianceSelectionSuspenseQueryHookResult = ReturnType<typeof useCanStartAllianceSelectionSuspenseQuery>;
export type CanStartAllianceSelectionQueryResult = Apollo.QueryResult<CanStartAllianceSelectionQuery, CanStartAllianceSelectionQueryVariables>;
export const AllianceSelectionResultsDocument = gql`
    query AllianceSelectionResults {
  allianceSelection {
    alliances {
      id
      number
    }
  }
}
    `;

/**
 * __useAllianceSelectionResultsQuery__
 *
 * To run a query within a React component, call `useAllianceSelectionResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllianceSelectionResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllianceSelectionResultsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllianceSelectionResultsQuery(baseOptions?: Apollo.QueryHookOptions<AllianceSelectionResultsQuery, AllianceSelectionResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllianceSelectionResultsQuery, AllianceSelectionResultsQueryVariables>(AllianceSelectionResultsDocument, options);
      }
export function useAllianceSelectionResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllianceSelectionResultsQuery, AllianceSelectionResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllianceSelectionResultsQuery, AllianceSelectionResultsQueryVariables>(AllianceSelectionResultsDocument, options);
        }
export function useAllianceSelectionResultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllianceSelectionResultsQuery, AllianceSelectionResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllianceSelectionResultsQuery, AllianceSelectionResultsQueryVariables>(AllianceSelectionResultsDocument, options);
        }
export type AllianceSelectionResultsQueryHookResult = ReturnType<typeof useAllianceSelectionResultsQuery>;
export type AllianceSelectionResultsLazyQueryHookResult = ReturnType<typeof useAllianceSelectionResultsLazyQuery>;
export type AllianceSelectionResultsSuspenseQueryHookResult = ReturnType<typeof useAllianceSelectionResultsSuspenseQuery>;
export type AllianceSelectionResultsQueryResult = Apollo.QueryResult<AllianceSelectionResultsQuery, AllianceSelectionResultsQueryVariables>;
export const StartAllianceSelectionDocument = gql`
    mutation StartAllianceSelection {
  startAllianceSelection {
    picking {
      id
    }
  }
}
    `;
export type StartAllianceSelectionMutationFn = Apollo.MutationFunction<StartAllianceSelectionMutation, StartAllianceSelectionMutationVariables>;

/**
 * __useStartAllianceSelectionMutation__
 *
 * To run a mutation, you first call `useStartAllianceSelectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartAllianceSelectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startAllianceSelectionMutation, { data, loading, error }] = useStartAllianceSelectionMutation({
 *   variables: {
 *   },
 * });
 */
export function useStartAllianceSelectionMutation(baseOptions?: Apollo.MutationHookOptions<StartAllianceSelectionMutation, StartAllianceSelectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartAllianceSelectionMutation, StartAllianceSelectionMutationVariables>(StartAllianceSelectionDocument, options);
      }
export type StartAllianceSelectionMutationHookResult = ReturnType<typeof useStartAllianceSelectionMutation>;
export type StartAllianceSelectionMutationResult = Apollo.MutationResult<StartAllianceSelectionMutation>;
export type StartAllianceSelectionMutationOptions = Apollo.BaseMutationOptions<StartAllianceSelectionMutation, StartAllianceSelectionMutationVariables>;
export const AllianceSelectionPickDocument = gql`
    mutation AllianceSelectionPick($teamId: Int!) {
  allianceSelectionPick(teamId: $teamId) {
    picking {
      id
    }
  }
}
    `;
export type AllianceSelectionPickMutationFn = Apollo.MutationFunction<AllianceSelectionPickMutation, AllianceSelectionPickMutationVariables>;

/**
 * __useAllianceSelectionPickMutation__
 *
 * To run a mutation, you first call `useAllianceSelectionPickMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllianceSelectionPickMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allianceSelectionPickMutation, { data, loading, error }] = useAllianceSelectionPickMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useAllianceSelectionPickMutation(baseOptions?: Apollo.MutationHookOptions<AllianceSelectionPickMutation, AllianceSelectionPickMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllianceSelectionPickMutation, AllianceSelectionPickMutationVariables>(AllianceSelectionPickDocument, options);
      }
export type AllianceSelectionPickMutationHookResult = ReturnType<typeof useAllianceSelectionPickMutation>;
export type AllianceSelectionPickMutationResult = Apollo.MutationResult<AllianceSelectionPickMutation>;
export type AllianceSelectionPickMutationOptions = Apollo.BaseMutationOptions<AllianceSelectionPickMutation, AllianceSelectionPickMutationVariables>;
export const AllianceSelectionAcceptDocument = gql`
    mutation AllianceSelectionAccept {
  allianceSelectionAccept {
    picking {
      id
    }
  }
}
    `;
export type AllianceSelectionAcceptMutationFn = Apollo.MutationFunction<AllianceSelectionAcceptMutation, AllianceSelectionAcceptMutationVariables>;

/**
 * __useAllianceSelectionAcceptMutation__
 *
 * To run a mutation, you first call `useAllianceSelectionAcceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllianceSelectionAcceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allianceSelectionAcceptMutation, { data, loading, error }] = useAllianceSelectionAcceptMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllianceSelectionAcceptMutation(baseOptions?: Apollo.MutationHookOptions<AllianceSelectionAcceptMutation, AllianceSelectionAcceptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllianceSelectionAcceptMutation, AllianceSelectionAcceptMutationVariables>(AllianceSelectionAcceptDocument, options);
      }
export type AllianceSelectionAcceptMutationHookResult = ReturnType<typeof useAllianceSelectionAcceptMutation>;
export type AllianceSelectionAcceptMutationResult = Apollo.MutationResult<AllianceSelectionAcceptMutation>;
export type AllianceSelectionAcceptMutationOptions = Apollo.BaseMutationOptions<AllianceSelectionAcceptMutation, AllianceSelectionAcceptMutationVariables>;
export const AllianceSelectionDeclineDocument = gql`
    mutation AllianceSelectionDecline {
  allianceSelectionDecline {
    picking {
      id
    }
  }
}
    `;
export type AllianceSelectionDeclineMutationFn = Apollo.MutationFunction<AllianceSelectionDeclineMutation, AllianceSelectionDeclineMutationVariables>;

/**
 * __useAllianceSelectionDeclineMutation__
 *
 * To run a mutation, you first call `useAllianceSelectionDeclineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllianceSelectionDeclineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allianceSelectionDeclineMutation, { data, loading, error }] = useAllianceSelectionDeclineMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllianceSelectionDeclineMutation(baseOptions?: Apollo.MutationHookOptions<AllianceSelectionDeclineMutation, AllianceSelectionDeclineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllianceSelectionDeclineMutation, AllianceSelectionDeclineMutationVariables>(AllianceSelectionDeclineDocument, options);
      }
export type AllianceSelectionDeclineMutationHookResult = ReturnType<typeof useAllianceSelectionDeclineMutation>;
export type AllianceSelectionDeclineMutationResult = Apollo.MutationResult<AllianceSelectionDeclineMutation>;
export type AllianceSelectionDeclineMutationOptions = Apollo.BaseMutationOptions<AllianceSelectionDeclineMutation, AllianceSelectionDeclineMutationVariables>;
export const AllianceSelectionUndoDocument = gql`
    mutation AllianceSelectionUndo {
  allianceSelectionUndo {
    picking {
      id
    }
  }
}
    `;
export type AllianceSelectionUndoMutationFn = Apollo.MutationFunction<AllianceSelectionUndoMutation, AllianceSelectionUndoMutationVariables>;

/**
 * __useAllianceSelectionUndoMutation__
 *
 * To run a mutation, you first call `useAllianceSelectionUndoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllianceSelectionUndoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allianceSelectionUndoMutation, { data, loading, error }] = useAllianceSelectionUndoMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllianceSelectionUndoMutation(baseOptions?: Apollo.MutationHookOptions<AllianceSelectionUndoMutation, AllianceSelectionUndoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllianceSelectionUndoMutation, AllianceSelectionUndoMutationVariables>(AllianceSelectionUndoDocument, options);
      }
export type AllianceSelectionUndoMutationHookResult = ReturnType<typeof useAllianceSelectionUndoMutation>;
export type AllianceSelectionUndoMutationResult = Apollo.MutationResult<AllianceSelectionUndoMutation>;
export type AllianceSelectionUndoMutationOptions = Apollo.BaseMutationOptions<AllianceSelectionUndoMutation, AllianceSelectionUndoMutationVariables>;
export const AllianceSelectionCancelDocument = gql`
    mutation AllianceSelectionCancel {
  allianceSelectionCancel {
    picking {
      id
    }
  }
}
    `;
export type AllianceSelectionCancelMutationFn = Apollo.MutationFunction<AllianceSelectionCancelMutation, AllianceSelectionCancelMutationVariables>;

/**
 * __useAllianceSelectionCancelMutation__
 *
 * To run a mutation, you first call `useAllianceSelectionCancelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllianceSelectionCancelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allianceSelectionCancelMutation, { data, loading, error }] = useAllianceSelectionCancelMutation({
 *   variables: {
 *   },
 * });
 */
export function useAllianceSelectionCancelMutation(baseOptions?: Apollo.MutationHookOptions<AllianceSelectionCancelMutation, AllianceSelectionCancelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AllianceSelectionCancelMutation, AllianceSelectionCancelMutationVariables>(AllianceSelectionCancelDocument, options);
      }
export type AllianceSelectionCancelMutationHookResult = ReturnType<typeof useAllianceSelectionCancelMutation>;
export type AllianceSelectionCancelMutationResult = Apollo.MutationResult<AllianceSelectionCancelMutation>;
export type AllianceSelectionCancelMutationOptions = Apollo.BaseMutationOptions<AllianceSelectionCancelMutation, AllianceSelectionCancelMutationVariables>;
export const CamerasDocument = gql`
    query Cameras {
  cameras {
    id
    name
    ip
    scene {
      id
      name
    }
  }
}
    `;

/**
 * __useCamerasQuery__
 *
 * To run a query within a React component, call `useCamerasQuery` and pass it any options that fit your needs.
 * When your component renders, `useCamerasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCamerasQuery({
 *   variables: {
 *   },
 * });
 */
export function useCamerasQuery(baseOptions?: Apollo.QueryHookOptions<CamerasQuery, CamerasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CamerasQuery, CamerasQueryVariables>(CamerasDocument, options);
      }
export function useCamerasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CamerasQuery, CamerasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CamerasQuery, CamerasQueryVariables>(CamerasDocument, options);
        }
export function useCamerasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CamerasQuery, CamerasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CamerasQuery, CamerasQueryVariables>(CamerasDocument, options);
        }
export type CamerasQueryHookResult = ReturnType<typeof useCamerasQuery>;
export type CamerasLazyQueryHookResult = ReturnType<typeof useCamerasLazyQuery>;
export type CamerasSuspenseQueryHookResult = ReturnType<typeof useCamerasSuspenseQuery>;
export type CamerasQueryResult = Apollo.QueryResult<CamerasQuery, CamerasQueryVariables>;
export const PresetsDocument = gql`
    query Presets($sceneId: Int!) {
  scene(id: $sceneId) {
    id
    camera {
      presets {
        id
        name
      }
    }
  }
}
    `;

/**
 * __usePresetsQuery__
 *
 * To run a query within a React component, call `usePresetsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresetsQuery({
 *   variables: {
 *      sceneId: // value for 'sceneId'
 *   },
 * });
 */
export function usePresetsQuery(baseOptions: Apollo.QueryHookOptions<PresetsQuery, PresetsQueryVariables> & ({ variables: PresetsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PresetsQuery, PresetsQueryVariables>(PresetsDocument, options);
      }
export function usePresetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PresetsQuery, PresetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PresetsQuery, PresetsQueryVariables>(PresetsDocument, options);
        }
export function usePresetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PresetsQuery, PresetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PresetsQuery, PresetsQueryVariables>(PresetsDocument, options);
        }
export type PresetsQueryHookResult = ReturnType<typeof usePresetsQuery>;
export type PresetsLazyQueryHookResult = ReturnType<typeof usePresetsLazyQuery>;
export type PresetsSuspenseQueryHookResult = ReturnType<typeof usePresetsSuspenseQuery>;
export type PresetsQueryResult = Apollo.QueryResult<PresetsQuery, PresetsQueryVariables>;
export const CameraControlInfoDocument = gql`
    query CameraControlInfo {
  scenes {
    id
    name
    camera {
      id
    }
  }
  cameras {
    id
    name
    currentPreset {
      id
    }
    presets {
      id
      name
    }
    scene {
      id
    }
  }
  previewScene {
    id
  }
  programScene {
    id
  }
}
    `;

/**
 * __useCameraControlInfoQuery__
 *
 * To run a query within a React component, call `useCameraControlInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useCameraControlInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCameraControlInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useCameraControlInfoQuery(baseOptions?: Apollo.QueryHookOptions<CameraControlInfoQuery, CameraControlInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CameraControlInfoQuery, CameraControlInfoQueryVariables>(CameraControlInfoDocument, options);
      }
export function useCameraControlInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CameraControlInfoQuery, CameraControlInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CameraControlInfoQuery, CameraControlInfoQueryVariables>(CameraControlInfoDocument, options);
        }
export function useCameraControlInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CameraControlInfoQuery, CameraControlInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CameraControlInfoQuery, CameraControlInfoQueryVariables>(CameraControlInfoDocument, options);
        }
export type CameraControlInfoQueryHookResult = ReturnType<typeof useCameraControlInfoQuery>;
export type CameraControlInfoLazyQueryHookResult = ReturnType<typeof useCameraControlInfoLazyQuery>;
export type CameraControlInfoSuspenseQueryHookResult = ReturnType<typeof useCameraControlInfoSuspenseQuery>;
export type CameraControlInfoQueryResult = Apollo.QueryResult<CameraControlInfoQuery, CameraControlInfoQueryVariables>;
export const AddCameraDocument = gql`
    mutation AddCamera {
  addCamera {
    id
    name
    ip
  }
}
    `;
export type AddCameraMutationFn = Apollo.MutationFunction<AddCameraMutation, AddCameraMutationVariables>;

/**
 * __useAddCameraMutation__
 *
 * To run a mutation, you first call `useAddCameraMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCameraMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCameraMutation, { data, loading, error }] = useAddCameraMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddCameraMutation(baseOptions?: Apollo.MutationHookOptions<AddCameraMutation, AddCameraMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCameraMutation, AddCameraMutationVariables>(AddCameraDocument, options);
      }
export type AddCameraMutationHookResult = ReturnType<typeof useAddCameraMutation>;
export type AddCameraMutationResult = Apollo.MutationResult<AddCameraMutation>;
export type AddCameraMutationOptions = Apollo.BaseMutationOptions<AddCameraMutation, AddCameraMutationVariables>;
export const RemoveCameraDocument = gql`
    mutation RemoveCamera($id: Int!) {
  removeCamera(id: $id) {
    id
    name
    ip
  }
}
    `;
export type RemoveCameraMutationFn = Apollo.MutationFunction<RemoveCameraMutation, RemoveCameraMutationVariables>;

/**
 * __useRemoveCameraMutation__
 *
 * To run a mutation, you first call `useRemoveCameraMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCameraMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCameraMutation, { data, loading, error }] = useRemoveCameraMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCameraMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCameraMutation, RemoveCameraMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCameraMutation, RemoveCameraMutationVariables>(RemoveCameraDocument, options);
      }
export type RemoveCameraMutationHookResult = ReturnType<typeof useRemoveCameraMutation>;
export type RemoveCameraMutationResult = Apollo.MutationResult<RemoveCameraMutation>;
export type RemoveCameraMutationOptions = Apollo.BaseMutationOptions<RemoveCameraMutation, RemoveCameraMutationVariables>;
export const EditCameraDocument = gql`
    mutation EditCamera($id: Int!, $data: CameraEdit!) {
  editCamera(id: $id, data: $data) {
    id
    name
    ip
  }
}
    `;
export type EditCameraMutationFn = Apollo.MutationFunction<EditCameraMutation, EditCameraMutationVariables>;

/**
 * __useEditCameraMutation__
 *
 * To run a mutation, you first call `useEditCameraMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCameraMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCameraMutation, { data, loading, error }] = useEditCameraMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditCameraMutation(baseOptions?: Apollo.MutationHookOptions<EditCameraMutation, EditCameraMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCameraMutation, EditCameraMutationVariables>(EditCameraDocument, options);
      }
export type EditCameraMutationHookResult = ReturnType<typeof useEditCameraMutation>;
export type EditCameraMutationResult = Apollo.MutationResult<EditCameraMutation>;
export type EditCameraMutationOptions = Apollo.BaseMutationOptions<EditCameraMutation, EditCameraMutationVariables>;
export const CreatePresetDocument = gql`
    mutation CreatePreset($id: Int!) {
  createPreset(id: $id) {
    id
    name
  }
}
    `;
export type CreatePresetMutationFn = Apollo.MutationFunction<CreatePresetMutation, CreatePresetMutationVariables>;

/**
 * __useCreatePresetMutation__
 *
 * To run a mutation, you first call `useCreatePresetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePresetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPresetMutation, { data, loading, error }] = useCreatePresetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreatePresetMutation(baseOptions?: Apollo.MutationHookOptions<CreatePresetMutation, CreatePresetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePresetMutation, CreatePresetMutationVariables>(CreatePresetDocument, options);
      }
export type CreatePresetMutationHookResult = ReturnType<typeof useCreatePresetMutation>;
export type CreatePresetMutationResult = Apollo.MutationResult<CreatePresetMutation>;
export type CreatePresetMutationOptions = Apollo.BaseMutationOptions<CreatePresetMutation, CreatePresetMutationVariables>;
export const UpdatePresetDocument = gql`
    mutation UpdatePreset($id: Int!, $update: PresetUpdate!) {
  updatePreset(id: $id, update: $update) {
    id
    name
  }
}
    `;
export type UpdatePresetMutationFn = Apollo.MutationFunction<UpdatePresetMutation, UpdatePresetMutationVariables>;

/**
 * __useUpdatePresetMutation__
 *
 * To run a mutation, you first call `useUpdatePresetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePresetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePresetMutation, { data, loading, error }] = useUpdatePresetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpdatePresetMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePresetMutation, UpdatePresetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePresetMutation, UpdatePresetMutationVariables>(UpdatePresetDocument, options);
      }
export type UpdatePresetMutationHookResult = ReturnType<typeof useUpdatePresetMutation>;
export type UpdatePresetMutationResult = Apollo.MutationResult<UpdatePresetMutation>;
export type UpdatePresetMutationOptions = Apollo.BaseMutationOptions<UpdatePresetMutation, UpdatePresetMutationVariables>;
export const CallPresetDocument = gql`
    mutation CallPreset($cameraId: Int!, $presetId: Int!) {
  callPreset(cameraId: $cameraId, presetId: $presetId) {
    id
    name
    currentPreset {
      id
    }
  }
}
    `;
export type CallPresetMutationFn = Apollo.MutationFunction<CallPresetMutation, CallPresetMutationVariables>;

/**
 * __useCallPresetMutation__
 *
 * To run a mutation, you first call `useCallPresetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCallPresetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [callPresetMutation, { data, loading, error }] = useCallPresetMutation({
 *   variables: {
 *      cameraId: // value for 'cameraId'
 *      presetId: // value for 'presetId'
 *   },
 * });
 */
export function useCallPresetMutation(baseOptions?: Apollo.MutationHookOptions<CallPresetMutation, CallPresetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CallPresetMutation, CallPresetMutationVariables>(CallPresetDocument, options);
      }
export type CallPresetMutationHookResult = ReturnType<typeof useCallPresetMutation>;
export type CallPresetMutationResult = Apollo.MutationResult<CallPresetMutation>;
export type CallPresetMutationOptions = Apollo.BaseMutationOptions<CallPresetMutation, CallPresetMutationVariables>;
export const SavePresetDocument = gql`
    mutation SavePreset($id: Int!) {
  savePreset(id: $id) {
    id
    name
    currentPreset {
      id
    }
  }
}
    `;
export type SavePresetMutationFn = Apollo.MutationFunction<SavePresetMutation, SavePresetMutationVariables>;

/**
 * __useSavePresetMutation__
 *
 * To run a mutation, you first call `useSavePresetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePresetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePresetMutation, { data, loading, error }] = useSavePresetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSavePresetMutation(baseOptions?: Apollo.MutationHookOptions<SavePresetMutation, SavePresetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SavePresetMutation, SavePresetMutationVariables>(SavePresetDocument, options);
      }
export type SavePresetMutationHookResult = ReturnType<typeof useSavePresetMutation>;
export type SavePresetMutationResult = Apollo.MutationResult<SavePresetMutation>;
export type SavePresetMutationOptions = Apollo.BaseMutationOptions<SavePresetMutation, SavePresetMutationVariables>;
export const SetPreviewSceneDocument = gql`
    mutation SetPreviewScene($id: Int!) {
  setPreviewScene(id: $id) {
    id
  }
}
    `;
export type SetPreviewSceneMutationFn = Apollo.MutationFunction<SetPreviewSceneMutation, SetPreviewSceneMutationVariables>;

/**
 * __useSetPreviewSceneMutation__
 *
 * To run a mutation, you first call `useSetPreviewSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPreviewSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPreviewSceneMutation, { data, loading, error }] = useSetPreviewSceneMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetPreviewSceneMutation(baseOptions?: Apollo.MutationHookOptions<SetPreviewSceneMutation, SetPreviewSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPreviewSceneMutation, SetPreviewSceneMutationVariables>(SetPreviewSceneDocument, options);
      }
export type SetPreviewSceneMutationHookResult = ReturnType<typeof useSetPreviewSceneMutation>;
export type SetPreviewSceneMutationResult = Apollo.MutationResult<SetPreviewSceneMutation>;
export type SetPreviewSceneMutationOptions = Apollo.BaseMutationOptions<SetPreviewSceneMutation, SetPreviewSceneMutationVariables>;
export const CutToSceneDocument = gql`
    mutation CutToScene {
  cutToScene {
    id
  }
}
    `;
export type CutToSceneMutationFn = Apollo.MutationFunction<CutToSceneMutation, CutToSceneMutationVariables>;

/**
 * __useCutToSceneMutation__
 *
 * To run a mutation, you first call `useCutToSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCutToSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cutToSceneMutation, { data, loading, error }] = useCutToSceneMutation({
 *   variables: {
 *   },
 * });
 */
export function useCutToSceneMutation(baseOptions?: Apollo.MutationHookOptions<CutToSceneMutation, CutToSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CutToSceneMutation, CutToSceneMutationVariables>(CutToSceneDocument, options);
      }
export type CutToSceneMutationHookResult = ReturnType<typeof useCutToSceneMutation>;
export type CutToSceneMutationResult = Apollo.MutationResult<CutToSceneMutation>;
export type CutToSceneMutationOptions = Apollo.BaseMutationOptions<CutToSceneMutation, CutToSceneMutationVariables>;
export const TransitionToSceneDocument = gql`
    mutation TransitionToScene {
  transitionToScene {
    id
  }
}
    `;
export type TransitionToSceneMutationFn = Apollo.MutationFunction<TransitionToSceneMutation, TransitionToSceneMutationVariables>;

/**
 * __useTransitionToSceneMutation__
 *
 * To run a mutation, you first call `useTransitionToSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransitionToSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transitionToSceneMutation, { data, loading, error }] = useTransitionToSceneMutation({
 *   variables: {
 *   },
 * });
 */
export function useTransitionToSceneMutation(baseOptions?: Apollo.MutationHookOptions<TransitionToSceneMutation, TransitionToSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransitionToSceneMutation, TransitionToSceneMutationVariables>(TransitionToSceneDocument, options);
      }
export type TransitionToSceneMutationHookResult = ReturnType<typeof useTransitionToSceneMutation>;
export type TransitionToSceneMutationResult = Apollo.MutationResult<TransitionToSceneMutation>;
export type TransitionToSceneMutationOptions = Apollo.BaseMutationOptions<TransitionToSceneMutation, TransitionToSceneMutationVariables>;
export const StreamSidebarDocument = gql`
    query StreamSidebar {
  scenes {
    id
    name
  }
  solidDisplay {
    scene {
      id
      name
    }
    displayed
  }
  overlay {
    displayed
    award {
      id
      name
    }
    stage
  }
  awards {
    id
    name
    winners {
      id
    }
  }
}
    `;

/**
 * __useStreamSidebarQuery__
 *
 * To run a query within a React component, call `useStreamSidebarQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamSidebarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamSidebarQuery({
 *   variables: {
 *   },
 * });
 */
export function useStreamSidebarQuery(baseOptions?: Apollo.QueryHookOptions<StreamSidebarQuery, StreamSidebarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StreamSidebarQuery, StreamSidebarQueryVariables>(StreamSidebarDocument, options);
      }
export function useStreamSidebarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreamSidebarQuery, StreamSidebarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StreamSidebarQuery, StreamSidebarQueryVariables>(StreamSidebarDocument, options);
        }
export function useStreamSidebarSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StreamSidebarQuery, StreamSidebarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StreamSidebarQuery, StreamSidebarQueryVariables>(StreamSidebarDocument, options);
        }
export type StreamSidebarQueryHookResult = ReturnType<typeof useStreamSidebarQuery>;
export type StreamSidebarLazyQueryHookResult = ReturnType<typeof useStreamSidebarLazyQuery>;
export type StreamSidebarSuspenseQueryHookResult = ReturnType<typeof useStreamSidebarSuspenseQuery>;
export type StreamSidebarQueryResult = Apollo.QueryResult<StreamSidebarQuery, StreamSidebarQueryVariables>;
export const SetSolidDisplaySceneDocument = gql`
    mutation setSolidDisplayScene($sceneId: Int!) {
  setSolidDisplayScene(sceneId: $sceneId) {
    scene {
      id
      name
    }
    displayed
  }
}
    `;
export type SetSolidDisplaySceneMutationFn = Apollo.MutationFunction<SetSolidDisplaySceneMutation, SetSolidDisplaySceneMutationVariables>;

/**
 * __useSetSolidDisplaySceneMutation__
 *
 * To run a mutation, you first call `useSetSolidDisplaySceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSolidDisplaySceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSolidDisplaySceneMutation, { data, loading, error }] = useSetSolidDisplaySceneMutation({
 *   variables: {
 *      sceneId: // value for 'sceneId'
 *   },
 * });
 */
export function useSetSolidDisplaySceneMutation(baseOptions?: Apollo.MutationHookOptions<SetSolidDisplaySceneMutation, SetSolidDisplaySceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetSolidDisplaySceneMutation, SetSolidDisplaySceneMutationVariables>(SetSolidDisplaySceneDocument, options);
      }
export type SetSolidDisplaySceneMutationHookResult = ReturnType<typeof useSetSolidDisplaySceneMutation>;
export type SetSolidDisplaySceneMutationResult = Apollo.MutationResult<SetSolidDisplaySceneMutation>;
export type SetSolidDisplaySceneMutationOptions = Apollo.BaseMutationOptions<SetSolidDisplaySceneMutation, SetSolidDisplaySceneMutationVariables>;
export const SetSolidDisplayDocument = gql`
    mutation setSolidDisplay($displayed: SolidDisplayDisplayed!) {
  setSolidDisplayed(displayed: $displayed) {
    displayed
  }
}
    `;
export type SetSolidDisplayMutationFn = Apollo.MutationFunction<SetSolidDisplayMutation, SetSolidDisplayMutationVariables>;

/**
 * __useSetSolidDisplayMutation__
 *
 * To run a mutation, you first call `useSetSolidDisplayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSolidDisplayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSolidDisplayMutation, { data, loading, error }] = useSetSolidDisplayMutation({
 *   variables: {
 *      displayed: // value for 'displayed'
 *   },
 * });
 */
export function useSetSolidDisplayMutation(baseOptions?: Apollo.MutationHookOptions<SetSolidDisplayMutation, SetSolidDisplayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetSolidDisplayMutation, SetSolidDisplayMutationVariables>(SetSolidDisplayDocument, options);
      }
export type SetSolidDisplayMutationHookResult = ReturnType<typeof useSetSolidDisplayMutation>;
export type SetSolidDisplayMutationResult = Apollo.MutationResult<SetSolidDisplayMutation>;
export type SetSolidDisplayMutationOptions = Apollo.BaseMutationOptions<SetSolidDisplayMutation, SetSolidDisplayMutationVariables>;
export const GetSolidDisplayViewDocument = gql`
    query GetSolidDisplayView {
  solidDisplay {
    displayed
  }
  stage {
    stage
  }
}
    `;

/**
 * __useGetSolidDisplayViewQuery__
 *
 * To run a query within a React component, call `useGetSolidDisplayViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSolidDisplayViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSolidDisplayViewQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSolidDisplayViewQuery(baseOptions?: Apollo.QueryHookOptions<GetSolidDisplayViewQuery, GetSolidDisplayViewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSolidDisplayViewQuery, GetSolidDisplayViewQueryVariables>(GetSolidDisplayViewDocument, options);
      }
export function useGetSolidDisplayViewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSolidDisplayViewQuery, GetSolidDisplayViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSolidDisplayViewQuery, GetSolidDisplayViewQueryVariables>(GetSolidDisplayViewDocument, options);
        }
export function useGetSolidDisplayViewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSolidDisplayViewQuery, GetSolidDisplayViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSolidDisplayViewQuery, GetSolidDisplayViewQueryVariables>(GetSolidDisplayViewDocument, options);
        }
export type GetSolidDisplayViewQueryHookResult = ReturnType<typeof useGetSolidDisplayViewQuery>;
export type GetSolidDisplayViewLazyQueryHookResult = ReturnType<typeof useGetSolidDisplayViewLazyQuery>;
export type GetSolidDisplayViewSuspenseQueryHookResult = ReturnType<typeof useGetSolidDisplayViewSuspenseQuery>;
export type GetSolidDisplayViewQueryResult = Apollo.QueryResult<GetSolidDisplayViewQuery, GetSolidDisplayViewQueryVariables>;
export const GetOverlayDisplayControlDocument = gql`
    query GetOverlayDisplayControl {
  overlay {
    displayed
    stage
    award {
      id
      name
      winners {
        id
        number
        name
        location
      }
    }
  }
  stage {
    stage
  }
}
    `;

/**
 * __useGetOverlayDisplayControlQuery__
 *
 * To run a query within a React component, call `useGetOverlayDisplayControlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOverlayDisplayControlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOverlayDisplayControlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOverlayDisplayControlQuery(baseOptions?: Apollo.QueryHookOptions<GetOverlayDisplayControlQuery, GetOverlayDisplayControlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOverlayDisplayControlQuery, GetOverlayDisplayControlQueryVariables>(GetOverlayDisplayControlDocument, options);
      }
export function useGetOverlayDisplayControlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOverlayDisplayControlQuery, GetOverlayDisplayControlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOverlayDisplayControlQuery, GetOverlayDisplayControlQueryVariables>(GetOverlayDisplayControlDocument, options);
        }
export function useGetOverlayDisplayControlSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOverlayDisplayControlQuery, GetOverlayDisplayControlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOverlayDisplayControlQuery, GetOverlayDisplayControlQueryVariables>(GetOverlayDisplayControlDocument, options);
        }
export type GetOverlayDisplayControlQueryHookResult = ReturnType<typeof useGetOverlayDisplayControlQuery>;
export type GetOverlayDisplayControlLazyQueryHookResult = ReturnType<typeof useGetOverlayDisplayControlLazyQuery>;
export type GetOverlayDisplayControlSuspenseQueryHookResult = ReturnType<typeof useGetOverlayDisplayControlSuspenseQuery>;
export type GetOverlayDisplayControlQueryResult = Apollo.QueryResult<GetOverlayDisplayControlQuery, GetOverlayDisplayControlQueryVariables>;
export const SetOverlayDisplayDocument = gql`
    mutation setOverlayDisplay($displayed: OverlayDisplayed!) {
  setOverlayDisplayed(displayed: $displayed) {
    displayed
  }
}
    `;
export type SetOverlayDisplayMutationFn = Apollo.MutationFunction<SetOverlayDisplayMutation, SetOverlayDisplayMutationVariables>;

/**
 * __useSetOverlayDisplayMutation__
 *
 * To run a mutation, you first call `useSetOverlayDisplayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetOverlayDisplayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setOverlayDisplayMutation, { data, loading, error }] = useSetOverlayDisplayMutation({
 *   variables: {
 *      displayed: // value for 'displayed'
 *   },
 * });
 */
export function useSetOverlayDisplayMutation(baseOptions?: Apollo.MutationHookOptions<SetOverlayDisplayMutation, SetOverlayDisplayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetOverlayDisplayMutation, SetOverlayDisplayMutationVariables>(SetOverlayDisplayDocument, options);
      }
export type SetOverlayDisplayMutationHookResult = ReturnType<typeof useSetOverlayDisplayMutation>;
export type SetOverlayDisplayMutationResult = Apollo.MutationResult<SetOverlayDisplayMutation>;
export type SetOverlayDisplayMutationOptions = Apollo.BaseMutationOptions<SetOverlayDisplayMutation, SetOverlayDisplayMutationVariables>;
export const GetOverlayDisplayViewDocument = gql`
    query GetOverlayDisplayView {
  overlay {
    displayed
  }
}
    `;

/**
 * __useGetOverlayDisplayViewQuery__
 *
 * To run a query within a React component, call `useGetOverlayDisplayViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOverlayDisplayViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOverlayDisplayViewQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOverlayDisplayViewQuery(baseOptions?: Apollo.QueryHookOptions<GetOverlayDisplayViewQuery, GetOverlayDisplayViewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOverlayDisplayViewQuery, GetOverlayDisplayViewQueryVariables>(GetOverlayDisplayViewDocument, options);
      }
export function useGetOverlayDisplayViewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOverlayDisplayViewQuery, GetOverlayDisplayViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOverlayDisplayViewQuery, GetOverlayDisplayViewQueryVariables>(GetOverlayDisplayViewDocument, options);
        }
export function useGetOverlayDisplayViewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOverlayDisplayViewQuery, GetOverlayDisplayViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOverlayDisplayViewQuery, GetOverlayDisplayViewQueryVariables>(GetOverlayDisplayViewDocument, options);
        }
export type GetOverlayDisplayViewQueryHookResult = ReturnType<typeof useGetOverlayDisplayViewQuery>;
export type GetOverlayDisplayViewLazyQueryHookResult = ReturnType<typeof useGetOverlayDisplayViewLazyQuery>;
export type GetOverlayDisplayViewSuspenseQueryHookResult = ReturnType<typeof useGetOverlayDisplayViewSuspenseQuery>;
export type GetOverlayDisplayViewQueryResult = Apollo.QueryResult<GetOverlayDisplayViewQuery, GetOverlayDisplayViewQueryVariables>;
export const UpdateAwardsDocument = gql`
    mutation updateAwards {
  updateAwards {
    id
  }
}
    `;
export type UpdateAwardsMutationFn = Apollo.MutationFunction<UpdateAwardsMutation, UpdateAwardsMutationVariables>;

/**
 * __useUpdateAwardsMutation__
 *
 * To run a mutation, you first call `useUpdateAwardsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAwardsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAwardsMutation, { data, loading, error }] = useUpdateAwardsMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateAwardsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAwardsMutation, UpdateAwardsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAwardsMutation, UpdateAwardsMutationVariables>(UpdateAwardsDocument, options);
      }
export type UpdateAwardsMutationHookResult = ReturnType<typeof useUpdateAwardsMutation>;
export type UpdateAwardsMutationResult = Apollo.MutationResult<UpdateAwardsMutation>;
export type UpdateAwardsMutationOptions = Apollo.BaseMutationOptions<UpdateAwardsMutation, UpdateAwardsMutationVariables>;
export const SetDisplayedAwardDocument = gql`
    mutation setDisplayedAward($awardId: Int!) {
  setDisplayedAward(awardId: $awardId) {
    award {
      id
      name
    }
  }
}
    `;
export type SetDisplayedAwardMutationFn = Apollo.MutationFunction<SetDisplayedAwardMutation, SetDisplayedAwardMutationVariables>;

/**
 * __useSetDisplayedAwardMutation__
 *
 * To run a mutation, you first call `useSetDisplayedAwardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDisplayedAwardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDisplayedAwardMutation, { data, loading, error }] = useSetDisplayedAwardMutation({
 *   variables: {
 *      awardId: // value for 'awardId'
 *   },
 * });
 */
export function useSetDisplayedAwardMutation(baseOptions?: Apollo.MutationHookOptions<SetDisplayedAwardMutation, SetDisplayedAwardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDisplayedAwardMutation, SetDisplayedAwardMutationVariables>(SetDisplayedAwardDocument, options);
      }
export type SetDisplayedAwardMutationHookResult = ReturnType<typeof useSetDisplayedAwardMutation>;
export type SetDisplayedAwardMutationResult = Apollo.MutationResult<SetDisplayedAwardMutation>;
export type SetDisplayedAwardMutationOptions = Apollo.BaseMutationOptions<SetDisplayedAwardMutation, SetDisplayedAwardMutationVariables>;
export const AdvanceAwardStageDocument = gql`
    mutation advanceAwardStage {
  advanceAwardStage {
    award {
      id
      name
    }
  }
}
    `;
export type AdvanceAwardStageMutationFn = Apollo.MutationFunction<AdvanceAwardStageMutation, AdvanceAwardStageMutationVariables>;

/**
 * __useAdvanceAwardStageMutation__
 *
 * To run a mutation, you first call `useAdvanceAwardStageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdvanceAwardStageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [advanceAwardStageMutation, { data, loading, error }] = useAdvanceAwardStageMutation({
 *   variables: {
 *   },
 * });
 */
export function useAdvanceAwardStageMutation(baseOptions?: Apollo.MutationHookOptions<AdvanceAwardStageMutation, AdvanceAwardStageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdvanceAwardStageMutation, AdvanceAwardStageMutationVariables>(AdvanceAwardStageDocument, options);
      }
export type AdvanceAwardStageMutationHookResult = ReturnType<typeof useAdvanceAwardStageMutation>;
export type AdvanceAwardStageMutationResult = Apollo.MutationResult<AdvanceAwardStageMutation>;
export type AdvanceAwardStageMutationOptions = Apollo.BaseMutationOptions<AdvanceAwardStageMutation, AdvanceAwardStageMutationVariables>;
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
        ...SittingWithTeams
      }
      onTableSitting {
        ...SittingWithTeams
      }
    }
    fieldControl {
      fieldId
      endTime
    }
  }
}
    ${SittingWithTeamsFragmentDoc}`;

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
export const SetAutoAdvanceDocument = gql`
    mutation SetAutoAdvance($enabled: Boolean!) {
  setAutoAdvance(enabled: $enabled) {
    autoAdvance
  }
}
    `;
export type SetAutoAdvanceMutationFn = Apollo.MutationFunction<SetAutoAdvanceMutation, SetAutoAdvanceMutationVariables>;

/**
 * __useSetAutoAdvanceMutation__
 *
 * To run a mutation, you first call `useSetAutoAdvanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAutoAdvanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAutoAdvanceMutation, { data, loading, error }] = useSetAutoAdvanceMutation({
 *   variables: {
 *      enabled: // value for 'enabled'
 *   },
 * });
 */
export function useSetAutoAdvanceMutation(baseOptions?: Apollo.MutationHookOptions<SetAutoAdvanceMutation, SetAutoAdvanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetAutoAdvanceMutation, SetAutoAdvanceMutationVariables>(SetAutoAdvanceDocument, options);
      }
export type SetAutoAdvanceMutationHookResult = ReturnType<typeof useSetAutoAdvanceMutation>;
export type SetAutoAdvanceMutationResult = Apollo.MutationResult<SetAutoAdvanceMutation>;
export type SetAutoAdvanceMutationOptions = Apollo.BaseMutationOptions<SetAutoAdvanceMutation, SetAutoAdvanceMutationVariables>;
export const SetSkillsEnabledDocument = gql`
    mutation SetSkillsEnabled($enabled: Boolean!) {
  setSkillsEnabled(enabled: $enabled) {
    id
    canRunSkills
  }
}
    `;
export type SetSkillsEnabledMutationFn = Apollo.MutationFunction<SetSkillsEnabledMutation, SetSkillsEnabledMutationVariables>;

/**
 * __useSetSkillsEnabledMutation__
 *
 * To run a mutation, you first call `useSetSkillsEnabledMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSkillsEnabledMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSkillsEnabledMutation, { data, loading, error }] = useSetSkillsEnabledMutation({
 *   variables: {
 *      enabled: // value for 'enabled'
 *   },
 * });
 */
export function useSetSkillsEnabledMutation(baseOptions?: Apollo.MutationHookOptions<SetSkillsEnabledMutation, SetSkillsEnabledMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetSkillsEnabledMutation, SetSkillsEnabledMutationVariables>(SetSkillsEnabledDocument, options);
      }
export type SetSkillsEnabledMutationHookResult = ReturnType<typeof useSetSkillsEnabledMutation>;
export type SetSkillsEnabledMutationResult = Apollo.MutationResult<SetSkillsEnabledMutation>;
export type SetSkillsEnabledMutationOptions = Apollo.BaseMutationOptions<SetSkillsEnabledMutation, SetSkillsEnabledMutationVariables>;
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
export const QueueDriverSkillsDocument = gql`
    mutation QueueDriverSkills($fieldId: Int!) {
  queueDriverSkills(fieldId: $fieldId) {
    fieldId
  }
}
    `;
export type QueueDriverSkillsMutationFn = Apollo.MutationFunction<QueueDriverSkillsMutation, QueueDriverSkillsMutationVariables>;

/**
 * __useQueueDriverSkillsMutation__
 *
 * To run a mutation, you first call `useQueueDriverSkillsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQueueDriverSkillsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [queueDriverSkillsMutation, { data, loading, error }] = useQueueDriverSkillsMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useQueueDriverSkillsMutation(baseOptions?: Apollo.MutationHookOptions<QueueDriverSkillsMutation, QueueDriverSkillsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QueueDriverSkillsMutation, QueueDriverSkillsMutationVariables>(QueueDriverSkillsDocument, options);
      }
export type QueueDriverSkillsMutationHookResult = ReturnType<typeof useQueueDriverSkillsMutation>;
export type QueueDriverSkillsMutationResult = Apollo.MutationResult<QueueDriverSkillsMutation>;
export type QueueDriverSkillsMutationOptions = Apollo.BaseMutationOptions<QueueDriverSkillsMutation, QueueDriverSkillsMutationVariables>;
export const QueueProgrammingSkillsDocument = gql`
    mutation QueueProgrammingSkills($fieldId: Int!) {
  queueProgrammingSkills(fieldId: $fieldId) {
    fieldId
  }
}
    `;
export type QueueProgrammingSkillsMutationFn = Apollo.MutationFunction<QueueProgrammingSkillsMutation, QueueProgrammingSkillsMutationVariables>;

/**
 * __useQueueProgrammingSkillsMutation__
 *
 * To run a mutation, you first call `useQueueProgrammingSkillsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQueueProgrammingSkillsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [queueProgrammingSkillsMutation, { data, loading, error }] = useQueueProgrammingSkillsMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useQueueProgrammingSkillsMutation(baseOptions?: Apollo.MutationHookOptions<QueueProgrammingSkillsMutation, QueueProgrammingSkillsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QueueProgrammingSkillsMutation, QueueProgrammingSkillsMutationVariables>(QueueProgrammingSkillsDocument, options);
      }
export type QueueProgrammingSkillsMutationHookResult = ReturnType<typeof useQueueProgrammingSkillsMutation>;
export type QueueProgrammingSkillsMutationResult = Apollo.MutationResult<QueueProgrammingSkillsMutation>;
export type QueueProgrammingSkillsMutationOptions = Apollo.BaseMutationOptions<QueueProgrammingSkillsMutation, QueueProgrammingSkillsMutationVariables>;
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
export function useFieldControlSubscription(baseOptions: Apollo.SubscriptionHookOptions<FieldControlSubscription, FieldControlSubscriptionVariables> & ({ variables: FieldControlSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FieldControlSubscription, FieldControlSubscriptionVariables>(FieldControlDocument, options);
      }
export type FieldControlSubscriptionHookResult = ReturnType<typeof useFieldControlSubscription>;
export type FieldControlSubscriptionResult = Apollo.SubscriptionResult<FieldControlSubscription>;
export const FieldsDocument = gql`
    query Fields {
  fields {
    id
    name
    isEnabled
    isCompetition
    scene {
      id
      name
    }
    preset {
      id
      name
    }
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
export const UpdateFieldNameDocument = gql`
    mutation UpdateFieldName($fieldId: Int!, $name: String) {
  updateField(fieldId: $fieldId, update: {name: $name}) {
    id
    name
    isEnabled
    isCompetition
  }
}
    `;
export type UpdateFieldNameMutationFn = Apollo.MutationFunction<UpdateFieldNameMutation, UpdateFieldNameMutationVariables>;

/**
 * __useUpdateFieldNameMutation__
 *
 * To run a mutation, you first call `useUpdateFieldNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFieldNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFieldNameMutation, { data, loading, error }] = useUpdateFieldNameMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateFieldNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFieldNameMutation, UpdateFieldNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFieldNameMutation, UpdateFieldNameMutationVariables>(UpdateFieldNameDocument, options);
      }
export type UpdateFieldNameMutationHookResult = ReturnType<typeof useUpdateFieldNameMutation>;
export type UpdateFieldNameMutationResult = Apollo.MutationResult<UpdateFieldNameMutation>;
export type UpdateFieldNameMutationOptions = Apollo.BaseMutationOptions<UpdateFieldNameMutation, UpdateFieldNameMutationVariables>;
export const EditFieldDocument = gql`
    mutation EditField($fieldId: Int!, $update: FieldUpdate!) {
  updateField(fieldId: $fieldId, update: $update) {
    id
    name
    isEnabled
    isCompetition
  }
}
    `;
export type EditFieldMutationFn = Apollo.MutationFunction<EditFieldMutation, EditFieldMutationVariables>;

/**
 * __useEditFieldMutation__
 *
 * To run a mutation, you first call `useEditFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editFieldMutation, { data, loading, error }] = useEditFieldMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *      update: // value for 'update'
 *   },
 * });
 */
export function useEditFieldMutation(baseOptions?: Apollo.MutationHookOptions<EditFieldMutation, EditFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditFieldMutation, EditFieldMutationVariables>(EditFieldDocument, options);
      }
export type EditFieldMutationHookResult = ReturnType<typeof useEditFieldMutation>;
export type EditFieldMutationResult = Apollo.MutationResult<EditFieldMutation>;
export type EditFieldMutationOptions = Apollo.BaseMutationOptions<EditFieldMutation, EditFieldMutationVariables>;
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
export const SetFieldEnabledDocument = gql`
    mutation SetFieldEnabled($fieldId: Int!, $isEnabled: Boolean!) {
  updateField(fieldId: $fieldId, update: {isEnabled: $isEnabled}) {
    id
    isEnabled
  }
}
    `;
export type SetFieldEnabledMutationFn = Apollo.MutationFunction<SetFieldEnabledMutation, SetFieldEnabledMutationVariables>;

/**
 * __useSetFieldEnabledMutation__
 *
 * To run a mutation, you first call `useSetFieldEnabledMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetFieldEnabledMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setFieldEnabledMutation, { data, loading, error }] = useSetFieldEnabledMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *      isEnabled: // value for 'isEnabled'
 *   },
 * });
 */
export function useSetFieldEnabledMutation(baseOptions?: Apollo.MutationHookOptions<SetFieldEnabledMutation, SetFieldEnabledMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetFieldEnabledMutation, SetFieldEnabledMutationVariables>(SetFieldEnabledDocument, options);
      }
export type SetFieldEnabledMutationHookResult = ReturnType<typeof useSetFieldEnabledMutation>;
export type SetFieldEnabledMutationResult = Apollo.MutationResult<SetFieldEnabledMutation>;
export type SetFieldEnabledMutationOptions = Apollo.BaseMutationOptions<SetFieldEnabledMutation, SetFieldEnabledMutationVariables>;
export const SetFieldIsCompetitionDocument = gql`
    mutation SetFieldIsCompetition($fieldId: Int!, $isCompetition: Boolean!) {
  updateField(fieldId: $fieldId, update: {isCompetition: $isCompetition}) {
    id
    isCompetition
  }
}
    `;
export type SetFieldIsCompetitionMutationFn = Apollo.MutationFunction<SetFieldIsCompetitionMutation, SetFieldIsCompetitionMutationVariables>;

/**
 * __useSetFieldIsCompetitionMutation__
 *
 * To run a mutation, you first call `useSetFieldIsCompetitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetFieldIsCompetitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setFieldIsCompetitionMutation, { data, loading, error }] = useSetFieldIsCompetitionMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *      isCompetition: // value for 'isCompetition'
 *   },
 * });
 */
export function useSetFieldIsCompetitionMutation(baseOptions?: Apollo.MutationHookOptions<SetFieldIsCompetitionMutation, SetFieldIsCompetitionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetFieldIsCompetitionMutation, SetFieldIsCompetitionMutationVariables>(SetFieldIsCompetitionDocument, options);
      }
export type SetFieldIsCompetitionMutationHookResult = ReturnType<typeof useSetFieldIsCompetitionMutation>;
export type SetFieldIsCompetitionMutationResult = Apollo.MutationResult<SetFieldIsCompetitionMutation>;
export type SetFieldIsCompetitionMutationOptions = Apollo.BaseMutationOptions<SetFieldIsCompetitionMutation, SetFieldIsCompetitionMutationVariables>;
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
export const FieldNamesDocument = gql`
    query FieldNames {
  fields {
    id
    name
  }
}
    `;

/**
 * __useFieldNamesQuery__
 *
 * To run a query within a React component, call `useFieldNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFieldNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFieldNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFieldNamesQuery(baseOptions?: Apollo.QueryHookOptions<FieldNamesQuery, FieldNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FieldNamesQuery, FieldNamesQueryVariables>(FieldNamesDocument, options);
      }
export function useFieldNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FieldNamesQuery, FieldNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FieldNamesQuery, FieldNamesQueryVariables>(FieldNamesDocument, options);
        }
export function useFieldNamesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FieldNamesQuery, FieldNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FieldNamesQuery, FieldNamesQueryVariables>(FieldNamesDocument, options);
        }
export type FieldNamesQueryHookResult = ReturnType<typeof useFieldNamesQuery>;
export type FieldNamesLazyQueryHookResult = ReturnType<typeof useFieldNamesLazyQuery>;
export type FieldNamesSuspenseQueryHookResult = ReturnType<typeof useFieldNamesSuspenseQuery>;
export type FieldNamesQueryResult = Apollo.QueryResult<FieldNamesQuery, FieldNamesQueryVariables>;
export const AddFieldDocument = gql`
    mutation addField {
  addField {
    id
    name
  }
}
    `;
export type AddFieldMutationFn = Apollo.MutationFunction<AddFieldMutation, AddFieldMutationVariables>;

/**
 * __useAddFieldMutation__
 *
 * To run a mutation, you first call `useAddFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFieldMutation, { data, loading, error }] = useAddFieldMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddFieldMutation(baseOptions?: Apollo.MutationHookOptions<AddFieldMutation, AddFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFieldMutation, AddFieldMutationVariables>(AddFieldDocument, options);
      }
export type AddFieldMutationHookResult = ReturnType<typeof useAddFieldMutation>;
export type AddFieldMutationResult = Apollo.MutationResult<AddFieldMutation>;
export type AddFieldMutationOptions = Apollo.BaseMutationOptions<AddFieldMutation, AddFieldMutationVariables>;
export const InspectableTeamsDocument = gql`
    query InspectableTeams {
  notStarted: teams(inspectionStatus: CHECKED_IN) {
    id
    number
  }
  inProgress: teams(inspectionStatus: IN_PROGRESS) {
    id
    number
  }
}
    `;

/**
 * __useInspectableTeamsQuery__
 *
 * To run a query within a React component, call `useInspectableTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectableTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectableTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInspectableTeamsQuery(baseOptions?: Apollo.QueryHookOptions<InspectableTeamsQuery, InspectableTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InspectableTeamsQuery, InspectableTeamsQueryVariables>(InspectableTeamsDocument, options);
      }
export function useInspectableTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InspectableTeamsQuery, InspectableTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InspectableTeamsQuery, InspectableTeamsQueryVariables>(InspectableTeamsDocument, options);
        }
export function useInspectableTeamsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InspectableTeamsQuery, InspectableTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InspectableTeamsQuery, InspectableTeamsQueryVariables>(InspectableTeamsDocument, options);
        }
export type InspectableTeamsQueryHookResult = ReturnType<typeof useInspectableTeamsQuery>;
export type InspectableTeamsLazyQueryHookResult = ReturnType<typeof useInspectableTeamsLazyQuery>;
export type InspectableTeamsSuspenseQueryHookResult = ReturnType<typeof useInspectableTeamsSuspenseQuery>;
export type InspectableTeamsQueryResult = Apollo.QueryResult<InspectableTeamsQuery, InspectableTeamsQueryVariables>;
export const InspectionGroupsDocument = gql`
    query InspectionGroups {
  notCheckedIn: teams(inspectionStatus: NOT_HERE) {
    id
    number
  }
  notStarted: teams(inspectionStatus: CHECKED_IN) {
    id
    number
  }
  inProgress: teams(inspectionStatus: IN_PROGRESS) {
    id
    number
  }
  completed: teams(inspectionStatus: COMPLETED) {
    id
    number
  }
}
    `;

/**
 * __useInspectionGroupsQuery__
 *
 * To run a query within a React component, call `useInspectionGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectionGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectionGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInspectionGroupsQuery(baseOptions?: Apollo.QueryHookOptions<InspectionGroupsQuery, InspectionGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InspectionGroupsQuery, InspectionGroupsQueryVariables>(InspectionGroupsDocument, options);
      }
export function useInspectionGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InspectionGroupsQuery, InspectionGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InspectionGroupsQuery, InspectionGroupsQueryVariables>(InspectionGroupsDocument, options);
        }
export function useInspectionGroupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InspectionGroupsQuery, InspectionGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InspectionGroupsQuery, InspectionGroupsQueryVariables>(InspectionGroupsDocument, options);
        }
export type InspectionGroupsQueryHookResult = ReturnType<typeof useInspectionGroupsQuery>;
export type InspectionGroupsLazyQueryHookResult = ReturnType<typeof useInspectionGroupsLazyQuery>;
export type InspectionGroupsSuspenseQueryHookResult = ReturnType<typeof useInspectionGroupsSuspenseQuery>;
export type InspectionGroupsQueryResult = Apollo.QueryResult<InspectionGroupsQuery, InspectionGroupsQueryVariables>;
export const InspectionDataDocument = gql`
    query InspectionData($teamId: Int!) {
  team(teamId: $teamId) {
    id
    number
    inspectionStatus
    inspection {
      id
      text
      points {
        id
        text
        met
      }
    }
  }
}
    `;

/**
 * __useInspectionDataQuery__
 *
 * To run a query within a React component, call `useInspectionDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectionDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectionDataQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useInspectionDataQuery(baseOptions: Apollo.QueryHookOptions<InspectionDataQuery, InspectionDataQueryVariables> & ({ variables: InspectionDataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InspectionDataQuery, InspectionDataQueryVariables>(InspectionDataDocument, options);
      }
export function useInspectionDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InspectionDataQuery, InspectionDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InspectionDataQuery, InspectionDataQueryVariables>(InspectionDataDocument, options);
        }
export function useInspectionDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InspectionDataQuery, InspectionDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InspectionDataQuery, InspectionDataQueryVariables>(InspectionDataDocument, options);
        }
export type InspectionDataQueryHookResult = ReturnType<typeof useInspectionDataQuery>;
export type InspectionDataLazyQueryHookResult = ReturnType<typeof useInspectionDataLazyQuery>;
export type InspectionDataSuspenseQueryHookResult = ReturnType<typeof useInspectionDataSuspenseQuery>;
export type InspectionDataQueryResult = Apollo.QueryResult<InspectionDataQuery, InspectionDataQueryVariables>;
export const SetInspectionPointDocument = gql`
    mutation SetInspectionPoint($pointId: Int!, $teamId: Int!, $isMet: Boolean!) {
  setInspectionPoint(pointId: $pointId, teamId: $teamId, isMet: $isMet) {
    id
  }
}
    `;
export type SetInspectionPointMutationFn = Apollo.MutationFunction<SetInspectionPointMutation, SetInspectionPointMutationVariables>;

/**
 * __useSetInspectionPointMutation__
 *
 * To run a mutation, you first call `useSetInspectionPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetInspectionPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setInspectionPointMutation, { data, loading, error }] = useSetInspectionPointMutation({
 *   variables: {
 *      pointId: // value for 'pointId'
 *      teamId: // value for 'teamId'
 *      isMet: // value for 'isMet'
 *   },
 * });
 */
export function useSetInspectionPointMutation(baseOptions?: Apollo.MutationHookOptions<SetInspectionPointMutation, SetInspectionPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetInspectionPointMutation, SetInspectionPointMutationVariables>(SetInspectionPointDocument, options);
      }
export type SetInspectionPointMutationHookResult = ReturnType<typeof useSetInspectionPointMutation>;
export type SetInspectionPointMutationResult = Apollo.MutationResult<SetInspectionPointMutation>;
export type SetInspectionPointMutationOptions = Apollo.BaseMutationOptions<SetInspectionPointMutation, SetInspectionPointMutationVariables>;
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
export const RenameDisplayDocument = gql`
    mutation RenameDisplay($uuid: String!, $name: String!) {
  renameDisplay(uuid: $uuid, name: $name) {
    uuid
    name
  }
}
    `;
export type RenameDisplayMutationFn = Apollo.MutationFunction<RenameDisplayMutation, RenameDisplayMutationVariables>;

/**
 * __useRenameDisplayMutation__
 *
 * To run a mutation, you first call `useRenameDisplayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameDisplayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameDisplayMutation, { data, loading, error }] = useRenameDisplayMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameDisplayMutation(baseOptions?: Apollo.MutationHookOptions<RenameDisplayMutation, RenameDisplayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameDisplayMutation, RenameDisplayMutationVariables>(RenameDisplayDocument, options);
      }
export type RenameDisplayMutationHookResult = ReturnType<typeof useRenameDisplayMutation>;
export type RenameDisplayMutationResult = Apollo.MutationResult<RenameDisplayMutation>;
export type RenameDisplayMutationOptions = Apollo.BaseMutationOptions<RenameDisplayMutation, RenameDisplayMutationVariables>;
export const SetDisplayFieldDocument = gql`
    mutation SetDisplayField($uuid: String!, $fieldId: Int) {
  setDisplayField(uuid: $uuid, fieldId: $fieldId) {
    uuid
    field {
      id
    }
  }
}
    `;
export type SetDisplayFieldMutationFn = Apollo.MutationFunction<SetDisplayFieldMutation, SetDisplayFieldMutationVariables>;

/**
 * __useSetDisplayFieldMutation__
 *
 * To run a mutation, you first call `useSetDisplayFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDisplayFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDisplayFieldMutation, { data, loading, error }] = useSetDisplayFieldMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useSetDisplayFieldMutation(baseOptions?: Apollo.MutationHookOptions<SetDisplayFieldMutation, SetDisplayFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDisplayFieldMutation, SetDisplayFieldMutationVariables>(SetDisplayFieldDocument, options);
      }
export type SetDisplayFieldMutationHookResult = ReturnType<typeof useSetDisplayFieldMutation>;
export type SetDisplayFieldMutationResult = Apollo.MutationResult<SetDisplayFieldMutation>;
export type SetDisplayFieldMutationOptions = Apollo.BaseMutationOptions<SetDisplayFieldMutation, SetDisplayFieldMutationVariables>;
export const StartTimeoutDocument = gql`
    mutation StartTimeout {
  startTimeout {
    endTime
  }
}
    `;
export type StartTimeoutMutationFn = Apollo.MutationFunction<StartTimeoutMutation, StartTimeoutMutationVariables>;

/**
 * __useStartTimeoutMutation__
 *
 * To run a mutation, you first call `useStartTimeoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartTimeoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startTimeoutMutation, { data, loading, error }] = useStartTimeoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useStartTimeoutMutation(baseOptions?: Apollo.MutationHookOptions<StartTimeoutMutation, StartTimeoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartTimeoutMutation, StartTimeoutMutationVariables>(StartTimeoutDocument, options);
      }
export type StartTimeoutMutationHookResult = ReturnType<typeof useStartTimeoutMutation>;
export type StartTimeoutMutationResult = Apollo.MutationResult<StartTimeoutMutation>;
export type StartTimeoutMutationOptions = Apollo.BaseMutationOptions<StartTimeoutMutation, StartTimeoutMutationVariables>;
export const CancelTimeoutDocument = gql`
    mutation cancelTimeout {
  cancelTimeout {
    endTime
  }
}
    `;
export type CancelTimeoutMutationFn = Apollo.MutationFunction<CancelTimeoutMutation, CancelTimeoutMutationVariables>;

/**
 * __useCancelTimeoutMutation__
 *
 * To run a mutation, you first call `useCancelTimeoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelTimeoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelTimeoutMutation, { data, loading, error }] = useCancelTimeoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useCancelTimeoutMutation(baseOptions?: Apollo.MutationHookOptions<CancelTimeoutMutation, CancelTimeoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelTimeoutMutation, CancelTimeoutMutationVariables>(CancelTimeoutDocument, options);
      }
export type CancelTimeoutMutationHookResult = ReturnType<typeof useCancelTimeoutMutation>;
export type CancelTimeoutMutationResult = Apollo.MutationResult<CancelTimeoutMutation>;
export type CancelTimeoutMutationOptions = Apollo.BaseMutationOptions<CancelTimeoutMutation, CancelTimeoutMutationVariables>;
export const MarkCheckinDocument = gql`
    mutation MarkCheckin($teamId: Int!, $status: Inspection!) {
  markCheckin(teamId: $teamId, status: $status) {
    id
    inspectionStatus
  }
}
    `;
export type MarkCheckinMutationFn = Apollo.MutationFunction<MarkCheckinMutation, MarkCheckinMutationVariables>;

/**
 * __useMarkCheckinMutation__
 *
 * To run a mutation, you first call `useMarkCheckinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkCheckinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markCheckinMutation, { data, loading, error }] = useMarkCheckinMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useMarkCheckinMutation(baseOptions?: Apollo.MutationHookOptions<MarkCheckinMutation, MarkCheckinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkCheckinMutation, MarkCheckinMutationVariables>(MarkCheckinDocument, options);
      }
export type MarkCheckinMutationHookResult = ReturnType<typeof useMarkCheckinMutation>;
export type MarkCheckinMutationResult = Apollo.MutationResult<MarkCheckinMutation>;
export type MarkCheckinMutationOptions = Apollo.BaseMutationOptions<MarkCheckinMutation, MarkCheckinMutationVariables>;
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
export const CompetitionMiniSettingsDocument = gql`
    query CompetitionMiniSettings {
  stage {
    stage
  }
  competitionInformation {
    automationEnabled
    autoAdvance
  }
  currentBlock {
    id
  }
  results {
    displayedResults {
      id
    }
    nextResults {
      id
    }
  }
  fields(isCompetition: true) {
    id
    canRunSkills
  }
  timeout {
    endTime
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
    inspectionStatus
    rank
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
export const DisplaysDocument = gql`
    query Displays {
  displays {
    uuid
    name
    field {
      id
      name
    }
  }
}
    `;

/**
 * __useDisplaysQuery__
 *
 * To run a query within a React component, call `useDisplaysQuery` and pass it any options that fit your needs.
 * When your component renders, `useDisplaysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDisplaysQuery({
 *   variables: {
 *   },
 * });
 */
export function useDisplaysQuery(baseOptions?: Apollo.QueryHookOptions<DisplaysQuery, DisplaysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DisplaysQuery, DisplaysQueryVariables>(DisplaysDocument, options);
      }
export function useDisplaysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DisplaysQuery, DisplaysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DisplaysQuery, DisplaysQueryVariables>(DisplaysDocument, options);
        }
export function useDisplaysSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DisplaysQuery, DisplaysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DisplaysQuery, DisplaysQueryVariables>(DisplaysDocument, options);
        }
export type DisplaysQueryHookResult = ReturnType<typeof useDisplaysQuery>;
export type DisplaysLazyQueryHookResult = ReturnType<typeof useDisplaysLazyQuery>;
export type DisplaysSuspenseQueryHookResult = ReturnType<typeof useDisplaysSuspenseQuery>;
export type DisplaysQueryResult = Apollo.QueryResult<DisplaysQuery, DisplaysQueryVariables>;
export const FieldDisplayDocument = gql`
    query FieldDisplay($uuid: String!) {
  timeout {
    endTime
  }
  display(uuid: $uuid) {
    uuid
    field {
      id
      name
      fieldControl {
        endTime
        mode
      }
      competition {
        stage
        isLive
        onFieldSitting {
          ...SittingWithTeams
        }
      }
      skills {
        fieldId
        stopTime
      }
    }
  }
}
    ${SittingWithTeamsFragmentDoc}`;

/**
 * __useFieldDisplayQuery__
 *
 * To run a query within a React component, call `useFieldDisplayQuery` and pass it any options that fit your needs.
 * When your component renders, `useFieldDisplayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFieldDisplayQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useFieldDisplayQuery(baseOptions: Apollo.QueryHookOptions<FieldDisplayQuery, FieldDisplayQueryVariables> & ({ variables: FieldDisplayQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FieldDisplayQuery, FieldDisplayQueryVariables>(FieldDisplayDocument, options);
      }
export function useFieldDisplayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FieldDisplayQuery, FieldDisplayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FieldDisplayQuery, FieldDisplayQueryVariables>(FieldDisplayDocument, options);
        }
export function useFieldDisplaySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FieldDisplayQuery, FieldDisplayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FieldDisplayQuery, FieldDisplayQueryVariables>(FieldDisplayDocument, options);
        }
export type FieldDisplayQueryHookResult = ReturnType<typeof useFieldDisplayQuery>;
export type FieldDisplayLazyQueryHookResult = ReturnType<typeof useFieldDisplayLazyQuery>;
export type FieldDisplaySuspenseQueryHookResult = ReturnType<typeof useFieldDisplaySuspenseQuery>;
export type FieldDisplayQueryResult = Apollo.QueryResult<FieldDisplayQuery, FieldDisplayQueryVariables>;
export const SkillsFieldsDocument = gql`
    query SkillsFields {
  fields(isEnabled: true) {
    id
    name
    canRunSkills
  }
}
    `;

/**
 * __useSkillsFieldsQuery__
 *
 * To run a query within a React component, call `useSkillsFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSkillsFieldsQuery(baseOptions?: Apollo.QueryHookOptions<SkillsFieldsQuery, SkillsFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SkillsFieldsQuery, SkillsFieldsQueryVariables>(SkillsFieldsDocument, options);
      }
export function useSkillsFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SkillsFieldsQuery, SkillsFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SkillsFieldsQuery, SkillsFieldsQueryVariables>(SkillsFieldsDocument, options);
        }
export function useSkillsFieldsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SkillsFieldsQuery, SkillsFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SkillsFieldsQuery, SkillsFieldsQueryVariables>(SkillsFieldsDocument, options);
        }
export type SkillsFieldsQueryHookResult = ReturnType<typeof useSkillsFieldsQuery>;
export type SkillsFieldsLazyQueryHookResult = ReturnType<typeof useSkillsFieldsLazyQuery>;
export type SkillsFieldsSuspenseQueryHookResult = ReturnType<typeof useSkillsFieldsSuspenseQuery>;
export type SkillsFieldsQueryResult = Apollo.QueryResult<SkillsFieldsQuery, SkillsFieldsQueryVariables>;
export const SkillsFieldDocument = gql`
    query SkillsField($fieldId: Int!) {
  field(fieldId: $fieldId) {
    id
    name
    fieldControl {
      mode
      endTime
    }
    skills {
      fieldId
      stopTime
    }
  }
}
    `;

/**
 * __useSkillsFieldQuery__
 *
 * To run a query within a React component, call `useSkillsFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsFieldQuery({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useSkillsFieldQuery(baseOptions: Apollo.QueryHookOptions<SkillsFieldQuery, SkillsFieldQueryVariables> & ({ variables: SkillsFieldQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SkillsFieldQuery, SkillsFieldQueryVariables>(SkillsFieldDocument, options);
      }
export function useSkillsFieldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SkillsFieldQuery, SkillsFieldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SkillsFieldQuery, SkillsFieldQueryVariables>(SkillsFieldDocument, options);
        }
export function useSkillsFieldSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SkillsFieldQuery, SkillsFieldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SkillsFieldQuery, SkillsFieldQueryVariables>(SkillsFieldDocument, options);
        }
export type SkillsFieldQueryHookResult = ReturnType<typeof useSkillsFieldQuery>;
export type SkillsFieldLazyQueryHookResult = ReturnType<typeof useSkillsFieldLazyQuery>;
export type SkillsFieldSuspenseQueryHookResult = ReturnType<typeof useSkillsFieldSuspenseQuery>;
export type SkillsFieldQueryResult = Apollo.QueryResult<SkillsFieldQuery, SkillsFieldQueryVariables>;
export const QueueDisplayDocument = gql`
    query QueueDisplay {
  fields(isEnabled: true, isCompetition: true) {
    id
    name
    competition {
      stage
      onFieldSitting {
        ...SittingWithTeams
      }
      onTableSitting {
        ...SittingWithTeams
      }
    }
  }
}
    ${SittingWithTeamsFragmentDoc}`;

/**
 * __useQueueDisplayQuery__
 *
 * To run a query within a React component, call `useQueueDisplayQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueueDisplayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueueDisplayQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueueDisplayQuery(baseOptions?: Apollo.QueryHookOptions<QueueDisplayQuery, QueueDisplayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueueDisplayQuery, QueueDisplayQueryVariables>(QueueDisplayDocument, options);
      }
export function useQueueDisplayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueueDisplayQuery, QueueDisplayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueueDisplayQuery, QueueDisplayQueryVariables>(QueueDisplayDocument, options);
        }
export function useQueueDisplaySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<QueueDisplayQuery, QueueDisplayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueueDisplayQuery, QueueDisplayQueryVariables>(QueueDisplayDocument, options);
        }
export type QueueDisplayQueryHookResult = ReturnType<typeof useQueueDisplayQuery>;
export type QueueDisplayLazyQueryHookResult = ReturnType<typeof useQueueDisplayLazyQuery>;
export type QueueDisplaySuspenseQueryHookResult = ReturnType<typeof useQueueDisplaySuspenseQuery>;
export type QueueDisplayQueryResult = Apollo.QueryResult<QueueDisplayQuery, QueueDisplayQueryVariables>;
export const GetNotCheckedInTeamsDocument = gql`
    query GetNotCheckedInTeams {
  teams(inspectionStatus: NOT_HERE) {
    id
    name
    number
  }
}
    `;

/**
 * __useGetNotCheckedInTeamsQuery__
 *
 * To run a query within a React component, call `useGetNotCheckedInTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotCheckedInTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotCheckedInTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotCheckedInTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetNotCheckedInTeamsQuery, GetNotCheckedInTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotCheckedInTeamsQuery, GetNotCheckedInTeamsQueryVariables>(GetNotCheckedInTeamsDocument, options);
      }
export function useGetNotCheckedInTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotCheckedInTeamsQuery, GetNotCheckedInTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotCheckedInTeamsQuery, GetNotCheckedInTeamsQueryVariables>(GetNotCheckedInTeamsDocument, options);
        }
export function useGetNotCheckedInTeamsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNotCheckedInTeamsQuery, GetNotCheckedInTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotCheckedInTeamsQuery, GetNotCheckedInTeamsQueryVariables>(GetNotCheckedInTeamsDocument, options);
        }
export type GetNotCheckedInTeamsQueryHookResult = ReturnType<typeof useGetNotCheckedInTeamsQuery>;
export type GetNotCheckedInTeamsLazyQueryHookResult = ReturnType<typeof useGetNotCheckedInTeamsLazyQuery>;
export type GetNotCheckedInTeamsSuspenseQueryHookResult = ReturnType<typeof useGetNotCheckedInTeamsSuspenseQuery>;
export type GetNotCheckedInTeamsQueryResult = Apollo.QueryResult<GetNotCheckedInTeamsQuery, GetNotCheckedInTeamsQueryVariables>;
export const ClearResultsDocument = gql`
    mutation ClearResults {
  clearResults {
    displayedResults {
      id
    }
  }
}
    `;
export type ClearResultsMutationFn = Apollo.MutationFunction<ClearResultsMutation, ClearResultsMutationVariables>;

/**
 * __useClearResultsMutation__
 *
 * To run a mutation, you first call `useClearResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearResultsMutation, { data, loading, error }] = useClearResultsMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearResultsMutation(baseOptions?: Apollo.MutationHookOptions<ClearResultsMutation, ClearResultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearResultsMutation, ClearResultsMutationVariables>(ClearResultsDocument, options);
      }
export type ClearResultsMutationHookResult = ReturnType<typeof useClearResultsMutation>;
export type ClearResultsMutationResult = Apollo.MutationResult<ClearResultsMutation>;
export type ClearResultsMutationOptions = Apollo.BaseMutationOptions<ClearResultsMutation, ClearResultsMutationVariables>;
export const PromoteResultsDocument = gql`
    mutation PromoteResults {
  promoteResults {
    displayedResults {
      id
    }
  }
}
    `;
export type PromoteResultsMutationFn = Apollo.MutationFunction<PromoteResultsMutation, PromoteResultsMutationVariables>;

/**
 * __usePromoteResultsMutation__
 *
 * To run a mutation, you first call `usePromoteResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePromoteResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [promoteResultsMutation, { data, loading, error }] = usePromoteResultsMutation({
 *   variables: {
 *   },
 * });
 */
export function usePromoteResultsMutation(baseOptions?: Apollo.MutationHookOptions<PromoteResultsMutation, PromoteResultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PromoteResultsMutation, PromoteResultsMutationVariables>(PromoteResultsDocument, options);
      }
export type PromoteResultsMutationHookResult = ReturnType<typeof usePromoteResultsMutation>;
export type PromoteResultsMutationResult = Apollo.MutationResult<PromoteResultsMutation>;
export type PromoteResultsMutationOptions = Apollo.BaseMutationOptions<PromoteResultsMutation, PromoteResultsMutationVariables>;
export const ResultsDocument = gql`
    query Results {
  results {
    displayedResults {
      id
      number
      redScore
      blueScore
      contest {
        id
        round
        number
        redTeams {
          ...TeamInformation
        }
        blueTeams {
          ...TeamInformation
        }
      }
    }
  }
}
    ${TeamInformationFragmentDoc}`;

/**
 * __useResultsQuery__
 *
 * To run a query within a React component, call `useResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResultsQuery({
 *   variables: {
 *   },
 * });
 */
export function useResultsQuery(baseOptions?: Apollo.QueryHookOptions<ResultsQuery, ResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResultsQuery, ResultsQueryVariables>(ResultsDocument, options);
      }
export function useResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResultsQuery, ResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResultsQuery, ResultsQueryVariables>(ResultsDocument, options);
        }
export function useResultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ResultsQuery, ResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ResultsQuery, ResultsQueryVariables>(ResultsDocument, options);
        }
export type ResultsQueryHookResult = ReturnType<typeof useResultsQuery>;
export type ResultsLazyQueryHookResult = ReturnType<typeof useResultsLazyQuery>;
export type ResultsSuspenseQueryHookResult = ReturnType<typeof useResultsSuspenseQuery>;
export type ResultsQueryResult = Apollo.QueryResult<ResultsQuery, ResultsQueryVariables>;
export const ScenesDocument = gql`
    query Scenes {
  scenes {
    id
    name
    key
  }
}
    `;

/**
 * __useScenesQuery__
 *
 * To run a query within a React component, call `useScenesQuery` and pass it any options that fit your needs.
 * When your component renders, `useScenesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScenesQuery({
 *   variables: {
 *   },
 * });
 */
export function useScenesQuery(baseOptions?: Apollo.QueryHookOptions<ScenesQuery, ScenesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScenesQuery, ScenesQueryVariables>(ScenesDocument, options);
      }
export function useScenesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScenesQuery, ScenesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScenesQuery, ScenesQueryVariables>(ScenesDocument, options);
        }
export function useScenesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ScenesQuery, ScenesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ScenesQuery, ScenesQueryVariables>(ScenesDocument, options);
        }
export type ScenesQueryHookResult = ReturnType<typeof useScenesQuery>;
export type ScenesLazyQueryHookResult = ReturnType<typeof useScenesLazyQuery>;
export type ScenesSuspenseQueryHookResult = ReturnType<typeof useScenesSuspenseQuery>;
export type ScenesQueryResult = Apollo.QueryResult<ScenesQuery, ScenesQueryVariables>;
export const EditSceneDocument = gql`
    mutation EditScene($id: Int!, $data: SceneEdit!) {
  editScene(id: $id, data: $data) {
    id
    name
  }
}
    `;
export type EditSceneMutationFn = Apollo.MutationFunction<EditSceneMutation, EditSceneMutationVariables>;

/**
 * __useEditSceneMutation__
 *
 * To run a mutation, you first call `useEditSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSceneMutation, { data, loading, error }] = useEditSceneMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditSceneMutation(baseOptions?: Apollo.MutationHookOptions<EditSceneMutation, EditSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditSceneMutation, EditSceneMutationVariables>(EditSceneDocument, options);
      }
export type EditSceneMutationHookResult = ReturnType<typeof useEditSceneMutation>;
export type EditSceneMutationResult = Apollo.MutationResult<EditSceneMutation>;
export type EditSceneMutationOptions = Apollo.BaseMutationOptions<EditSceneMutation, EditSceneMutationVariables>;
export const AddSceneDocument = gql`
    mutation AddScene {
  addScene {
    id
    name
  }
}
    `;
export type AddSceneMutationFn = Apollo.MutationFunction<AddSceneMutation, AddSceneMutationVariables>;

/**
 * __useAddSceneMutation__
 *
 * To run a mutation, you first call `useAddSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSceneMutation, { data, loading, error }] = useAddSceneMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddSceneMutation(baseOptions?: Apollo.MutationHookOptions<AddSceneMutation, AddSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSceneMutation, AddSceneMutationVariables>(AddSceneDocument, options);
      }
export type AddSceneMutationHookResult = ReturnType<typeof useAddSceneMutation>;
export type AddSceneMutationResult = Apollo.MutationResult<AddSceneMutation>;
export type AddSceneMutationOptions = Apollo.BaseMutationOptions<AddSceneMutation, AddSceneMutationVariables>;
export const RemoveSceneDocument = gql`
    mutation RemoveScene($id: Int!) {
  removeScene(id: $id) {
    id
    name
  }
}
    `;
export type RemoveSceneMutationFn = Apollo.MutationFunction<RemoveSceneMutation, RemoveSceneMutationVariables>;

/**
 * __useRemoveSceneMutation__
 *
 * To run a mutation, you first call `useRemoveSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSceneMutation, { data, loading, error }] = useRemoveSceneMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSceneMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSceneMutation, RemoveSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSceneMutation, RemoveSceneMutationVariables>(RemoveSceneDocument, options);
      }
export type RemoveSceneMutationHookResult = ReturnType<typeof useRemoveSceneMutation>;
export type RemoveSceneMutationResult = Apollo.MutationResult<RemoveSceneMutation>;
export type RemoveSceneMutationOptions = Apollo.BaseMutationOptions<RemoveSceneMutation, RemoveSceneMutationVariables>;
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