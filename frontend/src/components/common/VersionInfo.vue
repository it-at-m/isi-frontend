<template>
  <v-dialog
    :value="value"
    width="40%"
    @input="$emit('update:value', $event.target.value)"
  >
    <v-card class="pb-4">
      <v-card-title>
        Versionen der ISI-Services
      </v-card-title>
      <v-simple-table class="mx-8">
        <template #default>
          <tbody>
            <tr
              v-for="service in services"
              :key="service.name"
            >
              <td class="font-weight-bold">
                {{ service.displayName }}
              </td>
              <td>
                <a
                  :href="getCommitUrl(service)"
                  target="_blank"
                >
                  {{ service.commitHash }}
                </a>
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
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
interface Service {
  name: string,
  displayName: string,
  internal: boolean,
  commitHash: string,
  active: boolean,
}

export default {
  name: "VersionInfo",
  props: {
    value: Boolean
  },
  setup(): unknown {
    const services: Service[] = [
      { name: "isi-frontend", displayName: "Frontend", internal: false, commitHash: "123456",  active: true },
      { name: "isi-backend", displayName: "Backend", internal: false, commitHash: "123456", active: true },
      { name: "isi-wfs-eai", displayName: "WFS-EAI", internal: true, commitHash: "123456", active: false },
      { name: "isi-master-eai", displayName: "MAstER-EAI", internal: true, commitHash: "123456", active: false },
      { name: "isi-document-storage", displayName: "Dokument-EAI", internal: true, commitHash: "123456", active: true },
    ];

    function getCommitUrl(service: Service): string {
      let baseUrl = service.internal ? "https://git.muenchen.de/isi" : "https://github.com/it-at-m";
      let page = service.internal ? "-/network/main?utf8=%E2%9C%93&extended_sha1=" : "network";
      
      return `${baseUrl}/${service.name}/${page}${service.commitHash}`;
    }
    
    return { services, getCommitUrl };
  },
};
</script>
