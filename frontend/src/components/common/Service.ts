/* eslint-disable semi */

/**
 * Wird von VersionInfo benutzt, um Informationen zu einem ISI-Service zu gruppieren.
 */
export default interface Service {
  displayName: string;
  scmUrl: string;
  infoPath: string;
  appendCommitHash: boolean;
  commitHash: string;
  active: boolean;
}
