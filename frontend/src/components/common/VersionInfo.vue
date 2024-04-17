<template>
  <v-dialog
    :value="visible"
    width="40%"
    @click:outside="visible = false"
  >
    <v-card class="pb-4">
      <v-app-bar
        flat
        color="primary"
        class="mb-4"
      >
        <span class="text-h6 white--text"> Versionen der ISI-Services </span>
        <v-spacer />
        <v-btn
          text
          fab
          @click="visible = false"
        >
          <v-icon class="white--text"> mdi-close </v-icon>
        </v-btn>
      </v-app-bar>
      <v-simple-table
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
                <v-tooltip bottom>
                  <template #activator="{ on }">
                    <span v-on="on">
                      {{ service.active ? "🟢" : "🔴" }}
                    </span>
                  </template>
                  <span>{{ service.active ? "aktiv" : "inaktiv" }}</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <loading-spinner
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

import RequestUtils from "@/utils/RequestUtils";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import Service from "@/types/common/Service";
import _ from "lodash";
import { defineModel } from "@/utils/Vue";

interface Props {
  value: boolean;
}

interface Emits {
  (event: "input", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const visible = defineModel(props, emit);
const services = ref<Service[]>([]);
const fetchSuccess = ref<boolean | undefined>(undefined);

watch(visible, async () => {
  if (visible) {
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
});

async function fetchServices(): Promise<Service[]> {
  const fetchServicesUrl = import.meta.env.VITE_VUE_APP_API_URL + "/actuator/info";
  let services: Service[] = [];

  try {
    const response = await fetch(fetchServicesUrl, RequestUtils.getGETConfig());
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    const object = json?.application?.services;
    if (!_.isNil(object)) {
      // JS interpretiert die Antwort als Objekt, weshalb sie hier in ein Array umgewandelt wird
      services = Object.values(object);
    }
  } catch (error) {
    fetchSuccess.value = false;
  }

  return services;
}

async function fetchCommitHash(service: Service): Promise<string> {
  let commitHash = "";
  const serviceInfoUrl = import.meta.env.VITE_VUE_APP_API_URL + service.infoPath;

  try {
    const response = await fetch(serviceInfoUrl, RequestUtils.getGETConfig());
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    const string = json?.application?.commitHash;
    if (!_.isNil(string)) {
      commitHash = string;
    }
  } catch (error) {
    return Promise.reject(error);
  }

  return commitHash;
}

function getCommitUrl(service: Service): string {
  if (service.appendCommitHash) {
    return service.scmUrl + service.commitHash;
  } else {
    return service.scmUrl;
  }
}
</script>
