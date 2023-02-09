import VersionInfo from "@/components/common/VersionInfo.vue";

const versionInfo = new VersionInfo() as {
  fetchCommitHash: (service: {infoPath: string}) => Promise<string>
};

describe("VersionInfoTest.spec.ts", () => {
  
  test("fetchCommitHash: Positivfall", async() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ application: { commitHash: "0000000" } }),
      })
    ) as any;

    const commitHash = await versionInfo.fetchCommitHash({infoPath: ""});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(commitHash).toEqual("0000000");
  });

  test("fetchCommitHash: Negativfall mit ok", async() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    ) as any;

    const commitHash = await versionInfo.fetchCommitHash({infoPath: ""});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(commitHash).toEqual("");
  });

  test("fetchCommitHash: Negativfall ohne ok", async() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as any;

    const commitHash = await versionInfo.fetchCommitHash({infoPath: ""});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(commitHash).toEqual("");
  });

});
