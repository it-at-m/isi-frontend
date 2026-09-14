import { describe, expect, beforeEach, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useUserinfoStore } from "@/stores/Userinfostore";
import { Userinfo } from "@/types/common/Userinfo";

describe("Userinfo Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("setUserinfo updates the userinfo correctly", () => {
    const userinfoStore = useUserinfoStore();
    const newUserinfo: Userinfo = {
      givenname: "Testing",
      roles: ["anwender", "admin"],
      surname: "Testing",
      department: "Coole Abteilung",
      email: "meister@meister.de",
    };
    userinfoStore.setUserinfo(newUserinfo);
    expect(userinfoStore.userinfo).toEqual(newUserinfo);
  });

  describe("Role-based getters", () => {
    test("hasRoleAdmin returns true if the user has admin role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender", "admin"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleAdmin).toBe(true);
    });

    test("hasRoleAbfrageerstellung returns true if the user has abfrageerstellung role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender", "abfrageerstellung"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleAbfrageerstellung).toBe(true);
    });

    test("hasRoleAbfrageerstellung returns false if the user has not abfrageerstellung role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleAbfrageerstellung).toBe(false);
    });

    test("hasRoleSachbearbeitung returns true if the user has sachbearbeitung role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender", "sachbearbeitung"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleSachbearbeitung).toBe(true);
    });

    test("hasRoleSachbearbeitung returns false if the user has not sachbearbeitung role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleSachbearbeitung).toBe(false);
    });

    test("hasRoleBedarfsmeldungKita returns true if the user has bedarfsmeldung-kita role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender", "bedarfsmeldung-kita"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleBedarfsmeldungKita).toBe(true);
    });

    test("hasRoleBedarfsmeldungKita returns false if the user has not bedarfsmeldung-kita role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleBedarfsmeldungKita).toBe(false);
    });

    test("hasRoleBedarfsmeldungSchule returns true if the user has bedarfsmeldung-schule role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender", "bedarfsmeldung-schule"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleBedarfsmeldungSchule).toBe(true);
    });

    test("hasRoleBedarfsmeldungSchule returns false if the user has not bedarfsmeldung-schule role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleBedarfsmeldungSchule).toBe(false);
    });

    test("hasRoleFlaechenbedarfsmeldung returns true if the user has flaechenbedarfsmeldung role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender", "flaechenbedarfsmeldung"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleFlaechenbedarfsmeldung).toBe(true);
    });

    test("hasRoleFlaechenbedarfsmeldung returns false if the user has not flaechenbedarfsmeldung role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleFlaechenbedarfsmeldung).toBe(false);
    });

    test("hasRoleBedarfsmeldungSozialplanung returns true if the user has bedarfsmeldung-sozialplanung role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender", "bedarfsmeldung-sozialplanung"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleBedarfsmeldungSozialplanung).toBe(true);
    });

    test("hasRoleBedarfsmeldungSozialplanung returns false if the user has not bedarfsmeldung-sozialplanung role", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasRoleBedarfsmeldungSozialplanung).toBe(false);
    });

    test("hasOnlyRoleAnwender returns true if anwender is the only role of the user", () => {
      const userinfoStore = useUserinfoStore();
      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasOnlyRoleAnwender).toBe(true);

      userinfoStore.setUserinfo({
        givenname: "Testing",
        roles: ["anwender", "admin"],
        surname: "Testing",
        department: "Coole Abteilung",
        email: "meister@meister.de",
      });
      expect(userinfoStore.hasOnlyRoleAnwender).toBe(false);
    });
  });
});
