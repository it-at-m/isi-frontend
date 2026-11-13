import { computed, type ComputedRef } from "vue";
import { useUserinfoStore } from "@/stores/Userinfostore";
import { getStartseitenKonfiguration, type StartseitenKonfiguration } from "@/utils/StartseitenKonfiguration";

/**
 * Liefert die personalisierte Startseite des angemeldeten Nutzers oder `undefined` für die Standard-Startseite.
 */
export function useStartseitenKonfiguration(): ComputedRef<StartseitenKonfiguration | undefined> {
  const userinfoStore = useUserinfoStore();
  return computed(() => getStartseitenKonfiguration(userinfoStore));
}
