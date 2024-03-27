import { useUserinfoStore } from "@/stores/Userinfostore";

export function isRoleAdminOrAbfrageerstellung(): boolean {
  const userinfoStore = useUserinfoStore();
  return isRoleAdmin() || userinfoStore.hasRoleAbfrageerstellung;
}

export function isRoleAdminOrSachbearbeitung(): boolean {
  const userinfoStore = useUserinfoStore();
  userinfoStore.hasRoleSachbearbeitung;
  return isRoleAdmin() || userinfoStore.hasRoleSachbearbeitung;
}

export function isRoleAdmin(): boolean {
  const userinfoStore = useUserinfoStore();
  return userinfoStore.hasRoleAdmin || isGuiWithoutSecurityContext();
}

export function isGuiWithoutSecurityContext(): boolean {
  return (import.meta.env.VITE_RUN_GUI_WITHOUT_SECURITY as string) === "true";
}
