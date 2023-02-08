<template>
  <v-dialog
    :value="visible"
    width="40%"
  >
    <v-card class="pb-4">
      <v-card-title>
        Versionen der ISI-Services
      </v-card-title>
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
                  {{ service.commitHash.substring(0, 7) }}
                </a>
                <span v-else>
                  Version unbekannt
                </span>
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
      <div
        v-else
        class="d-flex justify-center align-center"
        style="height: 100%"
      >
        <span
          v-if="fetchSuccess === true"
          class="text-h6"
        >Keine Services vorhanden</span>
        <span
          v-else-if="fetchSuccess === false"
          class="text-h6"
        >Ein Fehler ist aufgetreten</span>
        <v-progress-circular
          v-else
          indeterminate
          color="grey lighten-1"
          size="50"
          width="5"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, VModel, Vue, Watch} from "vue-property-decorator";
import RequestUtils from "@/utils/RequestUtils";
import _ from "lodash";

interface Service {
  displayName: string,
  scmUrl: string,
  infoPath: string,
  appendCommitHash: boolean,
  commitHash: string,
  active: boolean,
}

@Component
export default class VersionInfo extends Vue {
  
  @VModel({ type: Boolean })
  visible!: boolean;

  private services: Service[] = [];

  private fetchSuccess: boolean | null = null;

  @Watch("visible")
  private async updateServices(): Promise<void> {
    if (this.visible) {
      const services = await this.fetchServices();

      for (const service of services) {
        await this.fetchCommitHash(service)
          .then(commitHash => {
            service.commitHash = commitHash;
            service.active = true;
          })
          .catch(() => {
            service.commitHash = "";
            service.active = false;
          });
      }

      this.services = services;
    }
  }

  private async fetchServices(): Promise<Service[]> {
    const fetchServicesUrl = import.meta.env.VITE_VUE_APP_API_URL + "/actuator/info";
    let services: Service[] = [];
    
    await fetch(fetchServicesUrl, RequestUtils.getGETConfig())
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (!_.isNil(json.application.services)) {
          // JS interpretiert die Antwort als Objekt, weshalb sie hier in ein Array umgewandelt wird
          services = Object.values(json.application.services);
        }
        this.fetchSuccess = true;
      })
      .catch(() => {
        this.fetchSuccess = false;
      });

    return services;
  }

  private async fetchCommitHash(service: Service): Promise<string> {
    let commitHash = "";
    const serviceInfoUrl = import.meta.env.VITE_VUE_APP_API_URL + service.infoPath;
    
    await fetch(serviceInfoUrl, RequestUtils.getGETConfig())
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (!_.isNil(json.application.commitHash)) {
          commitHash = json.application.commitHash;
        }
      });
    
    return commitHash;
  }

  private getCommitUrl(service: Service): string {
    if (service.appendCommitHash) {
      return service.scmUrl + service.commitHash;
    } else {
      return service.scmUrl;
    }
  }
}
</script>
