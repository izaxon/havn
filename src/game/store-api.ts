import type { ReactElement } from "react";
import type { MatchRole } from "./match";
import {
  HavnTable as HavnTableRaw,
  onGuestAction as onGuestActionRaw,
  onPublish as onPublishRaw,
  useGame as useGameRaw,
} from "./game";

export type MatchStatus = "idle" | "connecting" | "waiting" | "live" | "failed" | "full";

export interface GameStore {
  state: unknown;
  buildMode: string | null;
  muted: boolean;
  hydrated: boolean;
  error: string | null;
  matchRole: MatchRole;
  matchRoom: string | null;
  matchStatus: MatchStatus;
  matchPeerName: string | null;
  inviteOpen: boolean;
  viewerId: number;
  hydrate: () => void;
  start: (opts: { seats: unknown }) => void;
  startInvite: (seats: unknown) => string;
  continueSave: () => void;
  toMenu: () => void;
  dispatch: (action: unknown) => void;
  adoptRemote: (state: unknown) => boolean;
  claimSeat: (seat: number, name: string) => boolean;
  releaseSeat: (seat: number) => void;
  fillEmptySeats: (seats: number[]) => void;
  setMatch: (
    patch: Partial<
      Pick<GameStore, "matchRole" | "matchRoom" | "matchStatus" | "matchPeerName" | "inviteOpen" | "viewerId">
    >,
  ) => void;
  resetMatch: () => void;
  setBuildMode: (mode: string | null) => void;
  toggleMute: () => void;
  tickAi: () => void;
}

type Selector<T> = (state: GameStore) => T;

interface UseGame {
  <T>(selector: Selector<T>): T;
  getState: () => GameStore;
  setState: (partial: Partial<GameStore>) => void;
}

export const useGame = useGameRaw as unknown as UseGame;
export const onPublish = onPublishRaw as (fn: (state: unknown) => void) => () => void;
export const onGuestAction = onGuestActionRaw as (fn: (action: unknown) => void) => () => void;
export const HavnTable = HavnTableRaw as (props: { onLeaveMatch?: () => void }) => ReactElement;
