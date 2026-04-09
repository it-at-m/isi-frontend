<template>
  <v-dialog
    :model-value="visible"
    width="40%"
    @click:outside="visible = false"
  >
    <v-card class="pb-4">
      <v-toolbar
        title="Versionen der ISI-Services"
        flat
        color="primary"
        class="mb-4"
      >
        <v-btn
          variant="text"
          icon="mdi-close"
          @click="visible = false"
        >
        </v-btn>
      </v-toolbar>
      <v-table
        v-if="services.length !== 0"
        class="mx-8"
      >
        <template #default>
          <tbody>
            <tr
              v-for="service in services"
              :key="service.displayName"
            >
              <td class="font-weight-bold">
                {{ service.displayName }}
              </td>
              <td>
                <a
                  v-if="service.commitHash !== ''"
                  :href="getCommitUrl(service)"
                  target="_blank"
                >
                  <!--
                    In der verkürzten Darstellung sind Git Commit Hashes meistens sieben Zeichen lang.
                    Doch unter Umständen werden sie auch mit acht Zeichen dargestellt, also wurde die größere Länge gewählt.
                  -->
                  {{ service.commitHash.substring(0, 8) }}<span class="mdi mdi-launch" />
                </a>
                <span v-else> Version unbekannt </span>
              </td>
              <td>
                <v-tooltip location="bottom">
                  <template #activator="{ props: activatorProps }">
                    <span v-bind="activatorProps">
                      {{ service.active ? "🟢" : "🔴" }}
                    </span>
                  </template>
                  <span>{{ service.active ? "aktiv" : "inaktiv" }}</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-table>
      <loading
        v-else
        :success="fetchSuccess"
        name="Services"
      />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
/*
 * VersionInfo zeigt den Namen, aktuellen Commit-Hash und Status (aktiv/inaktiv) aller bekannten Services an.
 *
 * Es wird angenommen, dass beim API-Gateway der Pfad "/actuator/info" existiert.
 * Dieser sollte ein Objekt namens "application" liefern, welches (neben anderen Daten) etwas Derartiges enthält:
 * services:
 *   - displayName: Beispiel
 *     infoPath: beispiel-projekt/actuator/info
 *     scmUrl: https://github.com/beispiel/beispiel-projekt
 *     appendCommitHash: false
 *   - ...
 *
 * Die einzelnen Felder haben folgenden Zweck:
 * - displayName: Anzeigename des Services.
 * - infoPath: Unter welchem Pfad beim API-Gateway man den Commit-Hash erhält.
 * - scmUrl: Wohin der CommitHash verlinken soll.
 * - appendCommitHash: Ob der CommitHash an die scmUrl angehängt werden soll.
 *
 * Ebenfalls wird angenommen, dass die Antwort vom infoPath auch ein "application"-Objekt liefert.
 * Dort sollte sich das String-Feld "commitHash" finden.
 *
 * Props:
 * - value (boolean): Ob der Dialog sichtbar ist.
 */

import { ref, watch } from "vue";
import type Service from "@/types/common/Service";
import RequestUtils from "@/utils/RequestUtils";
import Loading from "@/components/common/Loading.vue";
import _ from "lodash";

const visible = defineModel<boolean>({ required: true });
const services = ref<Service[]>([]);
const fetchSuccess = ref<boolean | undefined>(undefined);
const base = (import.meta.env.VITE_VUE_APP_API_URL ?? "").trim();

watch(visible, updateServices);

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

async function updateServices(): Promise<void> {
  if (visible.value) {
    fetchSuccess.value = undefined;
    const fetchedServices = await fetchServices();

    for (const service of fetchedServices) {
      try {
        const commitHash = await fetchCommitHash(service);
        service.commitHash = commitHash;
        service.active = true;
      } catch (error) {
        service.commitHash = "";
        service.active = false;
      }
    }

    services.value = fetchedServices;

    /*
    Ohne diese Abfrage könnte fetchSuccess=true gesetzt werden, obwohl die Request vorher fehlgeschlagen ist.
    Es wird ein strikter Vergleich mit false verwendet, da der Wert auch null sein könnte.
    */
    if (fetchSuccess.value !== false) {
      fetchSuccess.value = true;
    }
  }
}

async function fetchServices(): Promise<Service[]> {
  const fetchServicesUrl = joinUrl(base, "/actuator/info");
  let services: Service[] = [];

  try {
    const response = await fetch(fetchServicesUrl, RequestUtils.getGETConfig());
    if (!response.ok) {
      throw new Error(
        `Request failed (${response.status}) for ${fetchServicesUrl}: ${response.statusText || "no status text"}`,
      );
    }

    const json = await response.json();
    const object = json?.application?.services;
    if (!_.isNil(object)) {
      services = Object.values(object);
    }
  } catch (error) {
    fetchSuccess.value = false;
    console.error("Fehler beim Laden der Services:", error);
  }

  return services;
}

async function fetchCommitHash(service: Service): Promise<string> {
  const serviceInfoUrl = joinUrl(base, service.infoPath);

  const response = await fetch(serviceInfoUrl, RequestUtils.getGETConfig());
  if (!response.ok) {
    throw new Error(
      `Request failed (${response.status}) for ${serviceInfoUrl}: ${response.statusText || "no status text"}`,
    );
  }

  const json = await response.json();
  return json?.application?.commitHash ?? "";
}

function getCommitUrl(service: Service): string {
  if (service.appendCommitHash) {
    return service.scmUrl + service.commitHash;
  } else {
    return service.scmUrl;
  }
}
</script>
