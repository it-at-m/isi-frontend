<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <span
          class="text-h6 font-weight-bold"
          v-text="headline"
        />
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
      :is-editable="isEditableByBedarfsmeldung()"
      :bedarfsmeldung-title="bedarfsmeldungFachreferate"
    />
    <v-row>
      <v-col
        cols="12"
        md="4"
      />
      <v-col
        cols="12"
        md="4"
      >
        <v-btn
          id="bedarfsmeldungenUebernehmenButton"
          class="text-wrap"
          block
          :disabled="!bedarfsmeldungenUebernehmenEnabled"
          @click="bedarfsmeldungenUebernehmen()"
          v-text="'Bedarfsmeldungen der Fachreferate übernehmen'"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      />
    </v-row>
    <bedarfsmeldung-component
      id="bedarfsmeldung_abfrageerstellung_component"
      ref="bedarfsmeldungAbfrageerstellungComponent"
      v-model="abfragevariante"
      :is-editable="isBedarfsmeldungEditableByAbfrageerstellung()"
      :bedarfsmeldung-title="bedarfsmeldungAbfrageerstellung"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import CommonBauleitplanverfahrenComponent from "@/components/abfragevarianten/bauleitplanverfahren/CommonBauleitplanverfahrenComponent.vue";
import GeplanteGeschossflaecheWohnenBauleitplanverfahrenComponent from "@/components/abfragevarianten/bauleitplanverfahren/GeplanteGeschossflaecheWohnenBauleitplanverfahrenComponent.vue";
import GeplanteAnzahlWohneinheitenBauleitplanverfahrenComponent from "@/components/abfragevarianten/bauleitplanverfahren/GeplanteAnzahlWohneinheitenBauleitplanverfahrenComponent.vue";
import SachbearbeitungComponent from "@/components/abfragevarianten/SachbearbeitungComponent.vue";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import BedarfsmeldungComponent, {
  BedarfsmeldungTitle,
} from "@/components/abfragevarianten/BedarfsmeldungComponent.vue";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import _ from "lodash";

@Component({
  components: {
    FieldGroupCard,
    CommonBauleitplanverfahrenComponent,
    GeplanteGeschossflaecheWohnenBauleitplanverfahrenComponent,
    GeplanteAnzahlWohneinheitenBauleitplanverfahrenComponent,
    SachbearbeitungComponent,
    BedarfsmeldungComponent,
    BauratenAggregiertComponent,
  },
})
export default class AbfragevarianteBauleitplanverfahrenComponent extends Mixins(AbfrageSecurityMixin, SaveLeaveMixin) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevariante!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop()
  private anzeigeContextAbfragevariante!: AnzeigeContextAbfragevariante;

  get headline(): string {
    const headline = `Abfragevariante ${new AbfragevarianteBauleitplanverfahrenModel(
      this.abfragevariante,
    ).getAbfragevariantenNrForContextAnzeigeAbfragevariante(this.anzeigeContextAbfragevariante)} - `;
    return headline.concat(`${this.abfragevariante.name}`);
  }

  get bedarfsmeldungFachreferate(): BedarfsmeldungTitle {
    return BedarfsmeldungTitle.FACHREFERATE;
  }

  get bedarfsmeldungAbfrageerstellung(): BedarfsmeldungTitle {
    return BedarfsmeldungTitle.ABFRAGEERSTELLUNG;
  }

  get bedarfsmeldungenUebernehmenEnabled(): boolean {
    return (
      this.isBedarfsmeldungEditableByAbfrageerstellung() &&
      !_.isEmpty(this.abfragevariante.bedarfsmeldungFachreferate) &&
      _.isEmpty(this.abfragevariante.bedarfsmeldungAbfrageersteller)
    );
  }

  private bedarfsmeldungenUebernehmen(): void {
    this.abfragevariante.bedarfsmeldungAbfrageersteller = _.clone(this.abfragevariante.bedarfsmeldungFachreferate);
    this.abfragevariante.bedarfsmeldungAbfrageersteller?.forEach((bedarfsmeldung) => {
      bedarfsmeldung.id = "";
      bedarfsmeldung.version = undefined;
      bedarfsmeldung.createdDateTime = undefined;
      bedarfsmeldung.lastModifiedDateTime = undefined;
    });
    this.formChanged();
  }
}
</script>

<style></style>
