export interface UserState {
  username: string | undefined;
  authorities: string[];
}

export default {
  namespaced: true,
  state: {
    username: "",
  } as UserState,
  getters: {},
  mutations: {
    SET_USERNAME(state: UserState, username: string): void {
      state.username = username;
    },
    SET_LEVEL(state: UserState, authorities: string[]): void {
      state.authorities = authorities;
    },
  },
};
