import { useUserinfoStore } from "@/stores/Userinfostore";

// eslint-disable-next-line
export function useSecurity() {
  const userinfoStore = useUserinfoStore();
  const isGuiWithoutSecurityContext = (import.meta.env.VITE_RUN_GUI_WITHOUT_SECURITY as string) === "true";

  const isRoleAdmin = computed(() => userinfoStore.hasRoleAdmin || isGuiWithoutSecurityContext);
  const isRoleAdminOrAbfrageerstellung = computed(() => isRoleAdmin.value || userinfoStore.hasRoleAbfrageerstellung);
  const isRoleAdminOrSachbearbeitung = computed(() => isRoleAdmin.value || userinfoStore.hasRoleSachbearbeitung);
  const isRoleAdminOrBedarfsmeldung = computed(() => isRoleAdmin.value || userinfoStore.hasRoleBedarfsmeldung);
  const hasOnlyRoleAnwender = computed(() => userinfoStore.hasOnlyRoleAnwender);

  return {
    isRoleAdmin,
    isRoleAdminOrAbfrageerstellung,
    isRoleAdminOrSachbearbeitung,
    isRoleAdminOrBedarfsmeldung,
    hasOnlyRoleAnwender,
  };
}
