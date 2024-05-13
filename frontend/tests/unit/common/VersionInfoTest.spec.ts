import { beforeEach, describe, expect, test, vi } from "vitest";
import { type VueWrapper, mount } from "@vue/test-utils";
import VersionInfo from "@/components/common/VersionInfo.vue";

const servicesEndpoint = "/info";
const commitHashEndpoint = "/hash";
const testCommitHash = "0000000";

const testService1 = {
  displayName: "Test 1",
  scmUrl: "",
  infoPath: commitHashEndpoint,
  appendCommitHash: false,
  commitHash: "",
  active: false,
};

const testService2 = {
  displayName: "Test 2",
  scmUrl: "",
  infoPath: commitHashEndpoint,
  appendCommitHash: false,
  commitHash: "",
  active: false,
};

let versionInfo: VueWrapper<any, any>;

describe("VersionInfoTest.spec.ts", () => {
  beforeEach(() => {
    versionInfo = mount(VersionInfo, { shallow: true, props: { modelValue: true } });
  });

  test("Positivfall", async () => {
    global.fetch = vi.fn((url: string) => {
      if (url.endsWith(servicesEndpoint)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ application: { services: [testService1, testService2] } }),
        });
      }

      if (url.endsWith(commitHashEndpoint)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ application: { commitHash: testCommitHash } }),
        });
      }
    }) as any;

    await versionInfo.vm.updateServices();
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(versionInfo.vm.fetchSuccess).toEqual(true);
    expect(versionInfo.vm.services.length).toEqual(2);
    expect(versionInfo.vm.services).toContainEqual(testService1);
    expect(versionInfo.vm.services).toContainEqual(testService2);
    expect(testService1.active).toEqual(true);
    expect(testService2.active).toEqual(true);
    expect(testService1.commitHash).toEqual(testCommitHash);
    expect(testService2.commitHash).toEqual(testCommitHash);
  });

  test("Negativefall ohne Service-Endpoint", async () => {
    global.fetch = vi.fn((url: string) => {
      if (url.endsWith(servicesEndpoint)) {
        return Promise.resolve({
          ok: false,
        });
      }
    }) as any;

    await versionInfo.vm.updateServices();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(versionInfo.vm.fetchSuccess).toEqual(false);
    expect(versionInfo.vm.services.length).toEqual(0);
  });

  test("Negativefall ohne Services", async () => {
    global.fetch = vi.fn((url: string) => {
      if (url.endsWith(servicesEndpoint)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(),
        });
      }
    }) as any;

    await versionInfo.vm.updateServices();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(versionInfo.vm.fetchSuccess).toEqual(true);
    expect(versionInfo.vm.services.length).toEqual(0);
  });

  test("Negativfall ohne CommitHash-Endpoint", async () => {
    global.fetch = vi.fn((url: string) => {
      if (url.endsWith(servicesEndpoint)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ application: { services: [testService1, testService2] } }),
        });
      }

      if (url.endsWith(commitHashEndpoint)) {
        return Promise.resolve({
          ok: false,
        });
      }
    }) as any;

    await versionInfo.vm.updateServices();
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(versionInfo.vm.fetchSuccess).toEqual(true);
    expect(versionInfo.vm.services.length).toEqual(2);
    expect(versionInfo.vm.services).toContainEqual(testService1);
    expect(versionInfo.vm.services).toContainEqual(testService2);
    expect(testService1.active).toEqual(false);
    expect(testService2.active).toEqual(false);
    expect(testService1.commitHash).toEqual("");
    expect(testService2.commitHash).toEqual("");
  });

  test("Negativfall ohne CommitHashes", async () => {
    global.fetch = vi.fn((url: string) => {
      if (url.endsWith(servicesEndpoint)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ application: { services: [testService1, testService2] } }),
        });
      }

      if (url.endsWith(commitHashEndpoint)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(),
        });
      }
    }) as any;

    await versionInfo.vm.updateServices();
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(versionInfo.vm.fetchSuccess).toEqual(true);
    expect(versionInfo.vm.services.length).toEqual(2);
    expect(versionInfo.vm.services).toContainEqual(testService1);
    expect(versionInfo.vm.services).toContainEqual(testService2);
    expect(testService1.active).toEqual(true);
    expect(testService2.active).toEqual(true);
    expect(testService1.commitHash).toEqual("");
    expect(testService2.commitHash).toEqual("");
  });
});
