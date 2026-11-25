// Laufzeit-Konfiguration des Frontends (siehe src/utils/RuntimeConfig.ts).
// Im OpenShift wird diese Datei je Umgebung durch eine ConfigMap ersetzt (isi-infrastructure-helm, values-isi-frontend-*.yaml).
// Fehlende oder leere Werte fallen auf die Werte aus der .env-Datei zurück.
window.__ISI_CONFIG__ = {};
