/* eslint-disable semi */
export default interface Service {
  displayName: string,
  scmUrl: string,
  infoPath: string,
  appendCommitHash: boolean,
  commitHash: string,
  active: boolean,
}
