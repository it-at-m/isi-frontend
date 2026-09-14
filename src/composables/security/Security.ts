import { computed } from "vue";
import { useUserinfoStore } from "@/stores/Userinfostore";

// eslint-disable-next-line
export function useSecurity() {
  const userinfoStore = useUserinfoStore();
  const isGuiWithoutSecurityContext = (import.meta.env.VITE_RUN_GUI_WITHOUT_SECURITY as string) === "true";

  const isRoleAdmin = computed(() => userinfoStore.hasRoleAdmin || isGuiWithoutSecurityContext);
  const isRoleAdminOrAbfrageerstellung = computed(() => isRoleAdmin.value || userinfoStore.hasRoleAbfrageerstellung);
  const isRoleAdminOrSachbearbeitung = computed(() => isRoleAdmin.value || userinfoStore.hasRoleSachbearbeitung);
  const isRoleAdminOrBedarfsmeldungKita = computed(() => isRoleAdmin.value || userinfoStore.hasRoleBedarfsmeldungKita);
  const isRoleAdminOrBedarfsmeldungSchule = computed(
    () => isRoleAdmin.value || userinfoStore.hasRoleBedarfsmeldungSchule,
  );
  const isRoleAdminOrFlaechenbedarfsmeldung = computed(
    () => isRoleAdmin.value || userinfoStore.hasRoleFlaechenbedarfsmeldung,
  );
  const isRoleAdminOrBedarfsmeldungSozialplanung = computed(
    () => isRoleAdmin.value || userinfoStore.hasRoleBedarfsmeldungSozialplanung,
  );
  // Schreibrecht am Status EINPFLEGEN_BEDARFSMELDUNG einer Abfrage (Kita/Schule/Sozialplanung).
  const isRoleAdminOrBedarfsmeldungSchreibend = computed(
    () =>
      isRoleAdmin.value ||
      isRoleAdminOrBedarfsmeldungKita.value ||
      isRoleAdminOrBedarfsmeldungSchule.value ||
      isRoleAdminOrBedarfsmeldungSozialplanung.value,
  );
  // Sichtbarkeit von Dokumenten/Kommentaren fuer irgendeine der vier Bedarfsmeldung-Rollen (lesend oder schreibend).
  const isRoleAdminOrBedarfsmeldungLesend = computed(
    () =>
      isRoleAdmin.value ||
      isRoleAdminOrBedarfsmeldungKita.value ||
      isRoleAdminOrBedarfsmeldungSchule.value ||
      isRoleAdminOrFlaechenbedarfsmeldung.value ||
      isRoleAdminOrBedarfsmeldungSozialplanung.value,
  );
  // Schreibrecht auf Infrastruktureinrichtungen ("Einrichtungen des RBS"): Kita/Schule/Flaechenbedarfsmeldung.
  const isRoleAdminOrInfrastruktureinrichtungSchreibend = computed(
    () =>
      isRoleAdmin.value ||
      isRoleAdminOrBedarfsmeldungKita.value ||
      isRoleAdminOrBedarfsmeldungSchule.value ||
      isRoleAdminOrFlaechenbedarfsmeldung.value,
  );
  const hasOnlyRoleAnwender = computed(() => userinfoStore.hasOnlyRoleAnwender);

  return {
    isRoleAdmin,
    isRoleAdminOrAbfrageerstellung,
    isRoleAdminOrSachbearbeitung,
    isRoleAdminOrBedarfsmeldungKita,
    isRoleAdminOrBedarfsmeldungSchule,
    isRoleAdminOrFlaechenbedarfsmeldung,
    isRoleAdminOrBedarfsmeldungSozialplanung,
    isRoleAdminOrBedarfsmeldungSchreibend,
    isRoleAdminOrBedarfsmeldungLesend,
    isRoleAdminOrInfrastruktureinrichtungSchreibend,
    hasOnlyRoleAnwender,
  };
}
