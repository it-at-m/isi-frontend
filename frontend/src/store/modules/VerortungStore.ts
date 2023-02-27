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
  gemarkung: Gemarkung[];
  stadtbezirk: Stadtbezirk[];
}
export interface Gemarkung {
  nummer: number;
  name: string;
  fluerstuck: Flurstueck[];
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
      // context.dispatch("updateVereinigung");
    },
    removeFlurstueck(context: ActionContext<VerortungState, RootState>, flurstueckId: number): void {
      context.commit("removeFlurstueck", flurstueckId);
      // context.dispatch("updateVereinigung");
    },
    setCoordinates(context: ActionContext<VerortungState, RootState>, coordinates: CoordinatesDto[]): void {
      context.commit("setCoordinates", coordinates);
      // context.dispatch("updateVereinigung");
    },
    /*
    updateVereinigung(context: ActionContext<VerortungState, RootState>): void {
      const flurstuecke = context.getters["flurstuecke"] as VerortungState["flurstuecke"];
      const vereinigung: Vereinigung = {
        flaeche: 0,
        coordinates: [],
      };
      
      for (const flurstueck of flurstuecke.values()) {
        const flaeche = flurstueck.properties?.flaecheQm;
        if (flaeche) {
          vereinigung.flaeche + flaeche;
        }

        const coordinates = flurstueck.geometry?.coordinates as MultiPolygon;
        if (coordinates) {
          vereinigung.coordinates.push(...coordinates);
        }
      }

      context.commit("setVereinigung", vereinigung);
    }
    */
  }
};
