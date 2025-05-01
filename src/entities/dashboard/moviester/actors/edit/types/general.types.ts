import type { MoviesterActor } from "@/shared/api/moviester/dto/actors.dto";

export interface MoviesterActorEditState {
  actor: MoviesterActor | null;
  actorCopy: MoviesterActor | null;
  isUpdated: boolean;
  isDeleted: boolean;
}
