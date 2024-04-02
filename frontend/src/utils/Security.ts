import store from "@/store/index";

export function isRoleAdminOrAbfrageerstellung(): boolean {
  return isRoleAdmin() || store.getters["userinfo/hasRoleAbfrageerstellung"];
}

export function isRoleAdminOrSachbearbeitung(): boolean {
  return isRoleAdmin() || store.getters["userinfo/hasRoleSachbearbeitung"];
}

export function isRoleAdmin(): boolean {
  return store.getters["userinfo/hasRoleAdmin"] || isGuiWithoutSecurityContext();
}

export function isGuiWithoutSecurityContext(): boolean {
  return (import.meta.env.VITE_RUN_GUI_WITHOUT_SECURITY as string) === "true";
}
