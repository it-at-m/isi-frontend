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
    <common-baugenehmigungsverfahren-component
      id="common_baugenehmigungsverfahren_component"
      ref="commonBaugenehmigungsverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-geschossflaeche-wohnen-baugenehmigungsverfahren-component
      id="geplante_geschossflaeche_wohnen_baugenehmigungsverfahren_component"
      ref="geplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-anzahl-wohneinheiten-baugenehmigungsverfahren-component
      id="geplante_anzahl_wohneinheiten_baugenehmigungsverfahren_component"
      ref="geplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent"
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
import CommonBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/CommonBaugenehmigungsverfahrenComponent.vue";
import GeplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/GeplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent.vue";
import GeplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/GeplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent.vue";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import { AnzeigeContextAbfragevariante } from "@/types/common/Abfrage";
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import { BedarfsmeldungTitle } from "@/utils/Factories";
import _ from "lodash";

interface Props {
  isEditable?: boolean;
  anzeigeContextAbfragevariante: AnzeigeContextAbfragevariante;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false });
const abfragevariante = defineModel<AbfragevarianteBaugenehmigungsverfahrenModel>({ required: true });
const { isBedarfsmeldungEditableByAbfrageerstellung, isEditableByBedarfsmeldung } = useAbfrageSecurity();
const { formChanged } = useSaveLeave();

const headline = computed(() => {
  const headline = `Abfragevariante ${new AbfragevarianteBaugenehmigungsverfahrenModel(
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
