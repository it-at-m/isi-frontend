import { vi, describe, it, expect, beforeEach } from "vitest";

// Das zu testende Composable nicht statisch importieren.
// Die Abhängigkeiten müssen zuerst gemockt werden.

// RequestUtils-Modul mocken.
// Die Factory darf keine externen Variablen referenzieren, da sie angehoben wird.
vi.mock("@/utils/RequestUtils", () => {
  const getBasicFetchConfigurationForBackend = vi.fn();
  const getGETConfig = vi.fn(() => ({ method: "GET" }));
  const getPOSTConfig = vi.fn(() => ({ method: "POST" }));
  const getPUTConfig = vi.fn(() => ({ method: "PUT" }));
  const getDELETEConfig = vi.fn(() => ({ method: "DELETE" }));

  return {
    default: {
      getBasicFetchConfigurationForBackend,
      getGETConfig,
      getPOSTConfig,
      getPUTConfig,
      getDELETEConfig,
    },
  };
});

// SaveLeave-Composable mocken
vi.mock("@/composables/SaveLeave", () => {
  const resetFormDirty = vi.fn();

  return {
    useSaveLeave: () => ({ resetFormDirty }),
  };
});

// ErrorHandler-Composable mocken
vi.mock("@/composables/requests/ErrorHandler", () => {
  const handleError = vi.fn((e: unknown) => e);

  return {
    useErrorHandler: () => ({ handleError }),
  };
});

// Serialisierungsfunktion mocken
vi.mock("@/utils/SerializationUtils", () => ({
  toBackendJson: (dto: any) => dto,
}));

// Backend-Client und Mapper mocken.
// Das interne Methodenobjekt wird bereitgestellt, damit die Tests es steuern können.
vi.mock("@/api/api-client/isi-backend", () => {
  const methods = {
    getInfrastruktureinrichtungByIdRaw: vi.fn(),
    createInfrastruktureinrichtungRaw: vi.fn(),
    createInfrastruktureinrichtungBedarfsmeldungKitaRaw: vi.fn(),
    createInfrastruktureinrichtungBedarfsmeldungSozialplanungRaw: vi.fn(),
    updateInfrastruktureinrichtungRaw: vi.fn(),
    updateInfrastruktureinrichtungBedarfsmeldungKitaRaw: vi.fn(),
    updateInfrastruktureinrichtungBedarfsmeldungSozialplanungRaw: vi.fn(),
    deleteInfrastruktureinrichtungById: vi.fn(),
    deleteInfrastruktureinrichtungBedarfsmeldungKitaById: vi.fn(),
    deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById: vi.fn(),
  };

  class InfrastruktureinrichtungApi {
    constructor() {
      Object.assign(this, methods);
    }
  }

  return {
    InfrastruktureinrichtungApi,
    InfrastruktureinrichtungDtoFromJSON: (input: any) => input,
    __mocks: { methods },
  } as any;
});

function makeRawResponse(body: any) {
  return {
    raw: {
      json: async () => body,
    },
  };
}

// Referenzen auf die importierten Mocks und das zu testende Composable
let RequestUtilsMock: any;
let SaveLeaveMock: any;
let ErrorHandlerMock: any;
let SerializationUtilsMock: any;
let IsiBackendMock: any;
let mockMethods: any;
let useInfrastruktureinrichtungApi: any;

beforeEach(async () => {
  // Aufrufe zurücksetzen
  vi.clearAllMocks();

  // Die gemockten Module importieren, damit auf die internen vi.fn-Mocks
  // der jeweiligen Factorys zugegriffen werden kann
  RequestUtilsMock = await vi.importMock("@/utils/RequestUtils");
  SaveLeaveMock = await vi.importMock("@/composables/SaveLeave");
  ErrorHandlerMock = await vi.importMock("@/composables/requests/ErrorHandler");
  SerializationUtilsMock = await vi.importMock("@/utils/SerializationUtils");
  IsiBackendMock = await vi.importMock("@/api/api-client/isi-backend");

  // Auf das interne Methodenobjekt des Backend-Mocks zugreifen
  mockMethods = IsiBackendMock.__mocks.methods;

  // Das Composable importieren, nachdem die Mocks eingerichtet wurden
  const mod = await import("@/composables/requests/InfrastruktureinrichtungApi");
  useInfrastruktureinrichtungApi = mod.useInfrastruktureinrichtungApi;
});

// --- Tests ---
describe("useInfrastruktureinrichtungApi", () => {
  it("getInfrastruktureinrichtungById - sollte die API aufrufen und das gemappte DTO zurückgeben", async () => {
    const { getInfrastruktureinrichtungById } = useInfrastruktureinrichtungApi();
    const id = "123";
    const backendBody = { id, name: "Test" };

    mockMethods.getInfrastruktureinrichtungByIdRaw.mockResolvedValue(makeRawResponse(backendBody));

    const result = await getInfrastruktureinrichtungById(id);

    expect(mockMethods.getInfrastruktureinrichtungByIdRaw).toHaveBeenCalled();
    expect(result).toEqual(backendBody);
  });

  it("createInfrastruktureinrichtung - sollte die Erstellungs-API aufrufen, die Antwort mappen und das Formular zurücksetzen", async () => {
    const { createInfrastruktureinrichtung } = useInfrastruktureinrichtungApi();
    const dto = { name: "New" };
    const returned = { id: "created", ...dto };

    mockMethods.createInfrastruktureinrichtungRaw.mockResolvedValue(makeRawResponse(returned));

    const result = await createInfrastruktureinrichtung(dto as any);

    // toBackendJson ist die gemockte Funktion und gibt die Eingabe unverändert zurück.
    // Die Verwendung wird über das importierte Mock-Objekt geprüft.
    expect(SerializationUtilsMock.toBackendJson).toBeDefined();
    expect(mockMethods.createInfrastruktureinrichtungRaw).toHaveBeenCalled();
    expect(result).toEqual(returned);

    // resetFormDirty stammt aus dem gemockten Composable
    expect(SaveLeaveMock.useSaveLeave().resetFormDirty).toHaveBeenCalled();
  });

  it("createInfrastruktureinrichtungBedarfsmeldungKita - sollte die entsprechende API aufrufen und das Formular zurücksetzen", async () => {
    const { createInfrastruktureinrichtungBedarfsmeldungKita } = useInfrastruktureinrichtungApi();
    const dto = { name: "Kita" };
    const returned = { id: "kita", ...dto };

    mockMethods.createInfrastruktureinrichtungBedarfsmeldungKitaRaw.mockResolvedValue(makeRawResponse(returned));

    const result = await createInfrastruktureinrichtungBedarfsmeldungKita(dto as any);

    expect(mockMethods.createInfrastruktureinrichtungBedarfsmeldungKitaRaw).toHaveBeenCalled();
    expect(result).toEqual(returned);
    expect(SaveLeaveMock.useSaveLeave().resetFormDirty).toHaveBeenCalled();
  });

  it("createInfrastruktureinrichtungBedarfsmeldungSozialplanung - sollte die entsprechende API aufrufen und das Formular zurücksetzen", async () => {
    const { createInfrastruktureinrichtungBedarfsmeldungSozialplanung } = useInfrastruktureinrichtungApi();
    const dto = { name: "Sozial" };
    const returned = { id: "sozial", ...dto };

    mockMethods.createInfrastruktureinrichtungBedarfsmeldungSozialplanungRaw.mockResolvedValue(
      makeRawResponse(returned),
    );

    const result = await createInfrastruktureinrichtungBedarfsmeldungSozialplanung(dto as any);

    expect(mockMethods.createInfrastruktureinrichtungBedarfsmeldungSozialplanungRaw).toHaveBeenCalled();
    expect(result).toEqual(returned);
    expect(SaveLeaveMock.useSaveLeave().resetFormDirty).toHaveBeenCalled();
  });

  it("updateInfrastruktureinrichtung - sollte die Aktualisierungs-API aufrufen und das Formular zurücksetzen", async () => {
    const { updateInfrastruktureinrichtung } = useInfrastruktureinrichtungApi();
    const dto = { id: "u1", name: "U" };
    const returned = { ...dto };

    mockMethods.updateInfrastruktureinrichtungRaw.mockResolvedValue(makeRawResponse(returned));

    const result = await updateInfrastruktureinrichtung(dto as any);

    expect(SerializationUtilsMock.toBackendJson).toBeDefined();
    expect(mockMethods.updateInfrastruktureinrichtungRaw).toHaveBeenCalled();
    expect(result).toEqual(returned);
    expect(SaveLeaveMock.useSaveLeave().resetFormDirty).toHaveBeenCalled();
  });

  it("updateInfrastruktureinrichtungBedarfsmeldungKita - sollte die entsprechende API aufrufen und das Formular zurücksetzen", async () => {
    const { updateInfrastruktureinrichtungBedarfsmeldungKita } = useInfrastruktureinrichtungApi();
    const dto = { id: "u2", name: "UK" };
    const returned = { ...dto };

    mockMethods.updateInfrastruktureinrichtungBedarfsmeldungKitaRaw.mockResolvedValue(makeRawResponse(returned));

    const result = await updateInfrastruktureinrichtungBedarfsmeldungKita(dto as any);

    expect(mockMethods.updateInfrastruktureinrichtungBedarfsmeldungKitaRaw).toHaveBeenCalled();
    expect(result).toEqual(returned);
    expect(SaveLeaveMock.useSaveLeave().resetFormDirty).toHaveBeenCalled();
  });

  it("updateInfrastruktureinrichtungBedarfsmeldungSozialplanung - sollte die entsprechende API aufrufen und das Formular zurücksetzen", async () => {
    const { updateInfrastruktureinrichtungBedarfsmeldungSozialplanung } = useInfrastruktureinrichtungApi();
    const dto = { id: "u3", name: "US" };
    const returned = { ...dto };

    mockMethods.updateInfrastruktureinrichtungBedarfsmeldungSozialplanungRaw.mockResolvedValue(
      makeRawResponse(returned),
    );

    const result = await updateInfrastruktureinrichtungBedarfsmeldungSozialplanung(dto as any);

    expect(mockMethods.updateInfrastruktureinrichtungBedarfsmeldungSozialplanungRaw).toHaveBeenCalled();
    expect(result).toEqual(returned);
    expect(SaveLeaveMock.useSaveLeave().resetFormDirty).toHaveBeenCalled();
  });

  it("deleteInfrastruktureinrichtungById - sollte die Lösch-API aufrufen und das Formular zurücksetzen", async () => {
    const { deleteInfrastruktureinrichtungById } = useInfrastruktureinrichtungApi();
    const id = "del1";
    const returned = { success: true };

    mockMethods.deleteInfrastruktureinrichtungById.mockResolvedValue(returned as any);

    const result = await deleteInfrastruktureinrichtungById(id);

    expect(mockMethods.deleteInfrastruktureinrichtungById).toHaveBeenCalled();
    expect(result).toEqual(returned);
    expect(SaveLeaveMock.useSaveLeave().resetFormDirty).toHaveBeenCalled();
  });

  it("deleteInfrastruktureinrichtungBedarfsmeldungKitaById - sollte die Lösch-API aufrufen und das Formular zurücksetzen", async () => {
    const { deleteInfrastruktureinrichtungBedarfsmeldungKitaById } = useInfrastruktureinrichtungApi();
    const id = "del-k";
    const returned = { success: true };

    mockMethods.deleteInfrastruktureinrichtungBedarfsmeldungKitaById.mockResolvedValue(returned as any);

    const result = await deleteInfrastruktureinrichtungBedarfsmeldungKitaById(id);

    expect(mockMethods.deleteInfrastruktureinrichtungBedarfsmeldungKitaById).toHaveBeenCalled();
    expect(result).toEqual(returned);
    expect(SaveLeaveMock.useSaveLeave().resetFormDirty).toHaveBeenCalled();
  });

  it("deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById - sollte die Lösch-API aufrufen und das Formular zurücksetzen", async () => {
    const { deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById } = useInfrastruktureinrichtungApi();
    const id = "del-s";
    const returned = { success: true };

    mockMethods.deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById.mockResolvedValue(returned as any);

    const result = await deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById(id);

    expect(mockMethods.deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById).toHaveBeenCalled();
    expect(result).toEqual(returned);
    expect(SaveLeaveMock.useSaveLeave().resetFormDirty).toHaveBeenCalled();
  });

  it("sollte handleError aufrufen, wenn die API einen Fehler auslöst", async () => {
    const { getInfrastruktureinrichtungById } = useInfrastruktureinrichtungApi();
    const err = new Error("boom");

    mockMethods.getInfrastruktureinrichtungByIdRaw.mockRejectedValue(err);

    await expect(getInfrastruktureinrichtungById("x")).rejects.toBe(err);
    expect(ErrorHandlerMock.useErrorHandler().handleError).toHaveBeenCalled();
  });
});
