/**
 * Werte, die erst zur Laufzeit je Umgebung gesetzt werden.
 * Das Image wird nur einmal gebaut und von dev über test und demo bis prod weitergereicht. Unterschiedliche Werte
 * je Umgebung kommen daher aus der Datei "config.js", die im OpenShift durch eine ConfigMap ersetzt wird
 * (siehe isi-infrastructure-helm, values-isi-frontend-*.yaml). Lokal liegt die Datei unverändert in "public/".
 */
export interface RuntimeConfig {
  VITE_ARCGIS_URL?: string;
}

declare global {
  interface Window {
    __ISI_CONFIG__?: RuntimeConfig;
  }
}

/**
 * Liefert den Wert aus der Laufzeit-Konfiguration. Fehlt er dort oder ist er leer, wird der beim Build
 * gesetzte Wert aus der .env-Datei verwendet.
 */
export function getRuntimeConfigValue(key: keyof RuntimeConfig): string {
  const runtimeValue = window.__ISI_CONFIG__?.[key];
  if (runtimeValue !== undefined && runtimeValue.trim() !== "") {
    return runtimeValue;
  }
  return (import.meta.env[key] as string | undefined) ?? "";
}
