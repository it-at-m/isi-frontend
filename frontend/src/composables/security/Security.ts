import { useUserinfoStore } from "@/stores/Userinfostore";

// eslint-disable-next-line
export function useSecurity() {
  const userinfoStore = useUserinfoStore();
  const isGuiWithoutSecurityContext = (import.meta.env.VITE_RUN_GUI_WITHOUT_SECURITY as string) === "true";

  function isRoleAdmin(): boolean {
    return userinfoStore.hasRoleAdmin || isGuiWithoutSecurityContext;
  }

  function isRoleAdminOrAbfrageerstellung(): boolean {
    return isRoleAdmin() || userinfoStore.hasRoleAbfrageerstellung;
  }

  function isRoleAdminOrSachbearbeitung(): boolean {
    return isRoleAdmin() || userinfoStore.hasRoleSachbearbeitung;
  }

  function isRoleAdminOrBedarfsmeldung(): boolean {
    return isRoleAdmin() || userinfoStore.hasRoleBedarfsmeldung;
  }

  function hasOnlyRoleAnwender(): boolean {
    return userinfoStore.hasOnlyRoleAnwender;
  }

  return {
    isRoleAdmin,
    isRoleAdminOrAbfrageerstellung,
    isRoleAdminOrSachbearbeitung,
    isRoleAdminOrBedarfsmeldung,
    hasOnlyRoleAnwender,
  };
}
