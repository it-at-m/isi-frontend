<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <span class="text-h6 font-weight-bold">{{ headline }}</span>
      </v-col>
    </v-row>
    <common-bauleitplanverfahren-component
      id="common_bauleitplanverfahren_component"
      ref="commonBauleitplanverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-geschossflaeche-wohnen-bauleitplanverfahren-component
      id="geplante_geschossflaeche_wohnen_bauleitplanverfahren_component"
      ref="geplanteGeschossflaecheWohnenBauleitplanverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-anzahl-wohneinheiten-bauleitplanverfahren-component
      id="geplante_anzahl_wohneinheiten_bauleitplanverfahren_component"
      ref="geplanteAnzahlWohneinheitenBauleitplanverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <bauraten-aggregiert-component :aggregate-bauraten="abfragevariante" />
    <sachbearbeitung-component
      id="sachbearbeitung_component"
      ref="sachbearbeitungComponent"
      v-model="abfragevariante"
    />
    <bedarfsmeldung-component
      id="bedarfsmeldung_fachreferate_component"
      ref="bedarfsmeldungFachreferateComponent"
      v-model="abfragevariante"
      :is-fachreferat="true"
      :is-editable="isEditableByBedarfsmeldung"
      :bedarfsmeldung-title="bedarfsmeldungFachreferate"
    />
    <v-toolbar
      color="transparent"
      density="compact"
      flat
    >
      <v-spacer />
      <v-btn
        id="bedarfsmeldungenUebernehmenButton"
        color="primary"
        variant="flat"
        style="width: 450px"
        density="default"
        :disabled="!bedarfsmeldungenUebernehmenEnabled"
        @click="bedarfsmeldungenUebernehmen()"
      >
        Bedarfsmeldungen der Fachreferate übernehmen
      </v-btn>
      <v-spacer />
    </v-toolbar>
    <bedarfsmeldung-component
      id="bedarfsmeldung_abfrageerstellung_component"
      ref="bedarfsmeldungAbfrageerstellungComponent"
      v-model="abfragevariante"
      :is-editable="isBedarfsmeldungEditableByAbfrageerstellung"
      :bedarfsmeldung-title="bedarfsmeldungAbfrageerstellung"
    />
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BedarfsmeldungComponent from "@/components/abfragevarianten/BedarfsmeldungComponent.vue";
import SachbearbeitungComponent from "@/components/abfragevarianten/SachbearbeitungComponent.vue";
import CommonBauleitplanverfahrenComponent from "@/components/abfragevarianten/bauleitplanverfahren/CommonBauleitplanverfahrenComponent.vue";
import GeplanteAnzahlWohneinheitenBauleitplanverfahrenComponent from "@/components/abfragevarianten/bauleitplanverfahren/GeplanteAnzahlWohneinheitenBauleitplanverfahrenComponent.vue";
import GeplanteGeschossflaecheWohnenBauleitplanverfahrenComponent from "@/components/abfragevarianten/bauleitplanverfahren/GeplanteGeschossflaecheWohnenBauleitplanverfahrenComponent.vue";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import { AnzeigeContextAbfragevariante } from "@/types/common/Abfrage";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import { BedarfsmeldungTitle } from "@/utils/Factories";
import _ from "lodash";

interface Props {
  isEditable?: boolean;
  anzeigeContextAbfragevariante: AnzeigeContextAbfragevariante;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false });
const abfragevariante = defineModel<AbfragevarianteBauleitplanverfahrenModel>({ required: true });
const { isBedarfsmeldungEditableByAbfrageerstellung, isEditableByBedarfsmeldung } = useAbfrageSecurity();
const { formChanged } = useSaveLeave();

const headline = computed(() => {
  const headline = `Abfragevariante ${new AbfragevarianteBauleitplanverfahrenModel(
    abfragevariante.value,
  ).getAbfragevariantenNrForContextAnzeigeAbfragevariante(props.anzeigeContextAbfragevariante)} - `;
  return headline.concat(`${abfragevariante.value.name}`);
});

const bedarfsmeldungFachreferate = computed(() => BedarfsmeldungTitle.FACHREFERATE);

const bedarfsmeldungAbfrageerstellung = computed(() => BedarfsmeldungTitle.ABFRAGEERSTELLUNG);

const bedarfsmeldungenUebernehmenEnabled = computed(() => {
  return (
    isBedarfsmeldungEditableByAbfrageerstellung.value &&
    !_.isEmpty(abfragevariante.value.bedarfsmeldungFachreferate) &&
    _.isEmpty(abfragevariante.value.bedarfsmeldungAbfrageersteller)
  );
});

function bedarfsmeldungenUebernehmen(): void {
  abfragevariante.value.bedarfsmeldungAbfrageersteller = _.clone(abfragevariante.value.bedarfsmeldungFachreferate);
  abfragevariante.value.bedarfsmeldungAbfrageersteller?.forEach((bedarfsmeldung) => {
    bedarfsmeldung.id = "";
    bedarfsmeldung.version = undefined;
    bedarfsmeldung.createdDateTime = undefined;
    bedarfsmeldung.lastModifiedDateTime = undefined;
  });
  formChanged();
}
</script>
