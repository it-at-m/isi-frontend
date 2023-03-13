import {
  convertDateForFrontend,
  convertDateForBackend,
  convertIntForFrontend,
  convertIntForBackend,
  convertDecimalForFrontend,
  convertDecimalForBackend,
} from "@/utils/Formatter";

describe("FormatterTest.spec.ts", () => {
  test("Test convertDateForFrontend", () => {
    expect(convertDateForFrontend("1900-02-01")).toEqual("01.02.1900");
    expect(convertDateForFrontend("2022-12-31")).toEqual("31.12.2022");
    expect(convertDateForFrontend(undefined)).toEqual("");
  });

  test("Test convertDateForBackend", () => {
    expect(convertDateForBackend("01.02.1900")).toEqual("1900-02-01");
    expect(convertDateForBackend("31.12.2022")).toEqual("2022-12-31");
    expect(convertDateForBackend(undefined)).toBeUndefined();
  });

  test("Test convertIntForFrontend", () => {
    expect(convertIntForFrontend(2022)).toEqual("2022");
    expect(convertIntForFrontend(0)).toEqual("0");
    expect(convertIntForFrontend(undefined)).toEqual("");
  });

  test("Test convertIntForBackend", () => {
    expect(convertIntForBackend("2022")).toEqual(2022);
    expect(convertIntForBackend("0")).toEqual(0);
    expect(convertIntForBackend("")).toBeUndefined();
  });

  test("Test convertDecimalForFrontend", () => {
    expect(convertDecimalForFrontend(123.45)).toEqual("123,45");
    expect(convertDecimalForFrontend(67.0)).toEqual("67");
    expect(convertDecimalForFrontend(undefined)).toEqual("");
  });

  test("Test convertDecimalForBackend", () => {
    expect(convertDecimalForBackend("123,45")).toEqual(123.45);
    expect(convertDecimalForBackend("67")).toEqual(67.0);
    expect(convertDecimalForBackend("67,00")).toEqual(67.0);
    expect(convertDecimalForBackend("")).toBeUndefined();
  });
});
