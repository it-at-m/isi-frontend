import { FlurstueckFeatureDto } from "@/api/api-client/isi-wfs-eai";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

// Speichert die ausgewählten Flurstücke in einer Map mit der flurstueckId als Key
const state = {
  flurstuecke: new Map<number, FlurstueckFeatureDto>(),
};

export type CityMapState = typeof state;

export default {
  namespaced: true,
  
  state,

  getters: {
    flurstuecke: (state: CityMapState): Map<number, FlurstueckFeatureDto> => {
      return state.flurstuecke;
    },
  },

  mutations: {
    addFlurstueck(state: CityMapState, flurstueck: FlurstueckFeatureDto): void {
      const flurstueckId = flurstueck.properties?.flurstueckId;
      if (flurstueckId !== undefined) {
        state.flurstuecke.set(flurstueckId, flurstueck);
      }
    },
    removeFlurstueck(state: CityMapState, flurstueckId: number): void {
      state.flurstuecke.delete(flurstueckId);
    },
  },

  actions: {
    addFlurstueck(context: ActionContext<CityMapState, RootState>, flurstueck: FlurstueckFeatureDto): void {
      context.commit("addFlurstueck", flurstueck);
    },
    removeFlurstueck(context: ActionContext<CityMapState, RootState>, flurstueckId: number): void {
      context.commit("removeFlurstueck", flurstueckId);
    },
  }
};
