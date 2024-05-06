import { getCurrentInstance } from "vue";

/**
 * Ein Workaround um auf this.$vuetify Instanz zuzugreifen.
 *
 * @returns aktuelle vuetify instnz
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useVuetify(): any {
  const vm = getCurrentInstance();
  return vm?.proxy?.$vuetify || undefined;
}
