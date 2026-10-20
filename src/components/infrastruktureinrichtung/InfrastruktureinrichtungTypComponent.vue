<template>
  <div>
    <field-group-card>
      <v-row
        v-if="isNewInfrastruktureinrichtung"
        justify="center"
      >
        <v-col cols="6">
          <v-select
            id="infrastruktureinrichtung_infrastruktureinrichtungart_dropdown"
            v-model="infrastruktureinrichtungArt"
            class="mx-3"
            :items="infrastruktureinrichtungArtList"
            variant="underlined"
            item-value="key"
            item-title="value"
            :rules="[pflichtfeld, notUnspecified]"
            :disabled="!isEditable"
            @update:model-value="formChanged"
          >
            <template #label> Infrastruktureinrichtung Art <span class="text-secondary">*</span> </template>
          </v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            id="infrastruktureinrichtung_infrastruktureinrichtungtyp_dropdown"
            v-model="infrastruktureinrichtungTyp"
            class="mx-3"
            :items="infrastruktureinrichtungTypList"
            variant="underlined"
            item-value="key"
            item-title="value"
            :rules="[pflichtfeld, notUnspecified]"
            :disabled="!isEditable || infrastruktureinrichtungArtList.length === 0"
            @update:model-value="formChanged"
          >
            <template #label> Infrastruktureinrichtung Typ <span class="text-secondary">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row
        v-if="!isNewInfrastruktureinrichtung"
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="infrastruktureinrichtung_infrastruktureinrichtungtyp_darstellung"
            v-model="infrastruktureinrichtungTypDisplay"
            label="Typ der Infrastruktureinrichtung"
            readonly
            maxlength="255"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="infrastruktureinrichtung_infrastruktureinrichtungtyp_ldfNr_darstellung"
            v-model="lfdNrInfrastruktureinrichtung"
            label="Lfd. Nr."
            readonly
            maxlength="255"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import {
  InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum,
  type LookupEntryDto,
} from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import DisplayMode from "@/types/common/DisplayMode";
import _ from "lodash";
import { useLookupStore } from "@/stores/LookupStore";
import { useSaveLeave } from "@/composables/SaveLeave";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import { useSecurity } from "@/composables/security/Security";

interface Props {
  lfdNr?: string;
  isEditable?: boolean;
  mode?: DisplayMode;
}

const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const props = withDefaults(defineProps<Props>(), { isEditable: false });

const infrastruktureinrichtungTyp = defineModel<string>({ required: true });
const lfdNrInfrastruktureinrichtung = computed(() => props.lfdNr);
const isNewInfrastruktureinrichtung = computed(() => props.mode === DisplayMode.NEU);
const { isRoleAdmin, isRoleAdminOrBedarfsmeldungSozialplanung } = useSecurity();
const infrastruktureinrichtungArt = ref<string>("");
const einrichtungen = ref<LookupEntryDto[][]>([]);

function getLookupValue(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
  return !_.isUndefined(list) && !_.isNil(key)
    ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value
    : key;
}

onUnmounted(() => {
  createEinrichtungenAuswahl();
});

const infrastruktureinrichtungArtList = computed(() => {
  if (isRoleAdmin.value) {
    return lookupStore.infrastruktureinrichtungArt;
  }
  if (isRoleAdminOrBedarfsmeldungSozialplanung.value) {
    return lookupStore.infrastruktureinrichtungArt.filter(
      (infrastruktureinrichtungArt) =>
        infrastruktureinrichtungArt.key === "UNSPECIFIED" ||
        infrastruktureinrichtungArt.key === "SOZIALE_EINRICHTUNGEN",
    );
  }
  // Alle anderen sehen alle ohne Soziale Einrichtungen
  return lookupStore.infrastruktureinrichtungArt.filter(
    (infrastruktureinrichtungArt) => infrastruktureinrichtungArt.key !== "SOZIALE_EINRICHTUNGEN",
  );
});

const infrastruktureinrichtungTypList = computed(() => {
  if (infrastruktureinrichtungArt.value !== "UNSPECIFIED") {
    return infrastruktureinrichtungTypByPermission.value.filter((infrastruktureinrichtungTyp: LookupEntryDto) => {
      einrichtungen.value[infrastruktureinrichtungArt.value].some(
        (einrichtungTyp) => einrichtungTyp.key === infrastruktureinrichtungTyp.key,
      );
    });
  } else return [];
});

const infrastruktureinrichtungTypByPermission = computed(() => {
  // BedarfsmeldungSozialplanung sieht nur Nachbarschaftstreff und Unspecified
  if (isRoleAdmin.value) {
    return lookupStore.infrastruktureinrichtungTyp;
  }
  if (isRoleAdminOrBedarfsmeldungSozialplanung.value) {
    return lookupStore.infrastruktureinrichtungTyp.filter(
      (infrastruktureinrichtungTyp) =>
        infrastruktureinrichtungTyp.key ===
          InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Nachbarschaftstreff ||
        infrastruktureinrichtungTyp.key === InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Unspecified,
    );
  }
  // Alle anderen sehen alle ohne Nachbarschaftstreff
  return lookupStore.infrastruktureinrichtungTyp.filter(
    (infrastruktureinrichtungTyp) =>
      infrastruktureinrichtungTyp.key !==
      InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Nachbarschaftstreff,
  );
});

const infrastruktureinrichtungTypDisplay = computed(() => {
  if (!_.isNil(infrastruktureinrichtungTyp)) {
    const lookupValue = getLookupValue(infrastruktureinrichtungTyp.value, lookupStore.infrastruktureinrichtungTyp);
    return !_.isNil(lookupValue) ? lookupValue : "";
  } else {
    return "";
  }
});

function createEinrichtungenAuswahl(): void {
  // InfrastrukturArt als 1. Dimension füllen
  einrichtungen.value.push(lookupStore.infrastruktureinrichtungArt);
  // Konfiguration für die Zuordnungen Infrastrukturypen zu Infrastrukturarten
  const zuordnungen = [
    {
      artKey: "KINDERTAGSBETREUUNG",
      typKeys: ["HAUS_FUER_KINDER", "KINDERKRIPPE", "KINDERGARTEN"],
    },
    {
      artKey: "GANZTAGSBETREUUNG_GRUNDSCHULKINDER",
      typKeys: ["HAUS_FUER_KINDER"],
    },
    {
      artKey: "SCHULEN",
      typKeys: ["GRUNDSCHULE", "MITTELSCHULE"],
    },
    {
      artKey: "SOZIALE_EINRICHTUNGEN",
      typKeys: ["NACHBARSCHAFTSTREFF"],
    },
  ];
  // Zuordnungen für die Infrastruktureinrichtungen anwenden
  zuordnungen.forEach(({ artKey, typKeys }) => {
    const artIndex = einrichtungen.value.findIndex((lookupEntryArray) =>
      lookupEntryArray.some((lookupEntry) => lookupEntry.key === artKey),
    );
    if (artIndex !== -1) {
      const typ = lookupStore.infrastruktureinrichtungTyp.find(
        (typ: LookupEntryDto) => typ?.key && typKeys.includes(typ.key as string),
      );
      if (typ) {
        einrichtungen.value[artIndex].push(typ);
      }
    }
  });
}
</script>
