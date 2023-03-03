import { CoordinatesDto, FlurstueckFeatureDto } from "@/api/api-client/isi-wfs-eai";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

const state = {
  // Als Key dient die flurstueckId des FlurstueckDtos
  flurstuecke: new Map<number, FlurstueckFeatureDto>(),
  coordinates: [] as CoordinatesDto[],
  verortung: {} as Verortung,
};

export type VerortungState = typeof state;

export type MultiPolygon = [number, number][][][];

export interface Verortung {
  fluerstuck: Flurstueck[];
  gemarkung: Gemarkung[];
  stadtbezirk: Stadtbezirk[];
}
export interface Gemarkung {
  nummer: number;
  name: string;
}
export interface Flurstueck {
  flurstueckNr: number;
  zaehler: number;
  nennner: number;
  flaeche: number;
  staedtischesEigentum: boolean;
}

export interface Stadtbezirk {
  nummer: number;
  name: string;
}

export default {
  namespaced: true,
  
  state,

  getters: {
    flurstuecke: (state: VerortungState): Map<number, FlurstueckFeatureDto> => {
      return state.flurstuecke;
    },
    coordinates: (state: VerortungState): CoordinatesDto[] => {
      return state.coordinates;
    },
    verortung: (state: VerortungState): Verortung => {
      return state.verortung;
    },
  },

  mutations: {
    addFlurstueck(state: VerortungState, flurstueck: FlurstueckFeatureDto): void {
      const flurstueckId = flurstueck.properties?.flurstueckId;
      if (flurstueckId !== undefined) {
        state.flurstuecke.set(flurstueckId, flurstueck);
      }
    },
    removeFlurstueck(state: VerortungState, flurstueckId: number): void {
      state.flurstuecke.delete(flurstueckId);
    },
    setCoordinates(state: VerortungState, coordinates: CoordinatesDto[]): void {
      state.coordinates = coordinates;
    },
    setVerortung(state: VerortungState, verortung: Verortung): void {
      state.verortung = verortung;
    },
  },

  actions: {
    addFlurstueck(context: ActionContext<VerortungState, RootState>, flurstueck: FlurstueckFeatureDto): void {
      context.commit("addFlurstueck", flurstueck);
    },
    removeFlurstueck(context: ActionContext<VerortungState, RootState>, flurstueckId: number): void {
      context.commit("removeFlurstueck", flurstueckId);
    },
    setCoordinates(context: ActionContext<VerortungState, RootState>, coordinates: CoordinatesDto[]): void {
      context.commit("setCoordinates", coordinates);
    },
    setVerortung(context: ActionContext<VerortungState, RootState>, verortung: Verortung): void {
      context.commit("setVerortung", verortung);
    },
  },
};
