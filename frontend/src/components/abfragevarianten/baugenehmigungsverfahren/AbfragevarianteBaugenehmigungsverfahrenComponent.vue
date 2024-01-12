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
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <common-baugenehmigungsverfahren-component
          id="common_baugenehmigungsverfahren_component"
          ref="commonBaugenehmigungsverfahrenComponent"
          v-model="abfragevariante"
          :is-editable="isEditable"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <geplante-geschossflaeche-wohnen-baugenehmigungsverfahren-component
          id="geplante_geschossflaeche_wohnen_baugenehmigungsverfahren_component"
          ref="geplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent"
          v-model="abfragevariante"
          :is-editable="isEditable"
        />
      </v-col>
    </v-row>
    <geplante-anzahl-wohneinheiten-baugenehmigungsverfahren-component
      id="geplante_anzahl_wohneinheiten_baugenehmigungsverfahren_component"
      ref="geplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <bauraten-aggregiert-component :aggregate-bauraten="abfragevariante" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <sachbearbeitung-component
          id="sachbearbeitung_component"
          ref="sachbearbeitungComponent"
          v-model="abfragevariante"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <bedarfsmeldung-component
          id="bedarfsmeldung_fachreferate_component"
          ref="bedarfsmeldungFachreferateComponent"
          v-model="abfragevariante.bedarfsmeldungFachreferate"
          :is-editable="isEditableByBedarfsmeldung()"
          :bedarfsmeldung-title="bedarfsmeldungFachreferate"
        />
      </v-col>
    </v-row>
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
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <bedarfsmeldung-component
          id="bedarfsmeldung_abfrageerstellung_component"
          ref="bedarfsmeldungAbfrageerstellungComponent"
          v-model="abfragevariante.bedarfsmeldungAbfrageersteller"
          :is-editable="isBedarfsmeldungEditableByAbfrageerstellung()"
          :bedarfsmeldung-title="bedarfsmeldungAbfrageerstellung"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import CommonBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/CommonBaugenehmigungsverfahrenComponent.vue";
import GeplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/GeplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent.vue";
import GeplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/GeplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent.vue";
import SachbearbeitungComponent from "@/components/abfragevarianten/SachbearbeitungComponent.vue";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import BedarfsmeldungComponent, {
  BedarfsmeldungTitle,
} from "@/components/abfragevarianten/BedarfsmeldungComponent.vue";
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import _ from "lodash";

@Component({
  components: {
    FieldGroupCard,
    CommonBaugenehmigungsverfahrenComponent,
    GeplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent,
    GeplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent,
    SachbearbeitungComponent,
    BedarfsmeldungComponent,
    BauratenAggregiertComponent,
  },
})
export default class AbfragevarianteBaugenehmigungsverfahrenComponent extends Mixins(
  AbfrageSecurityMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: AbfragevarianteBaugenehmigungsverfahrenModel })
  abfragevariante!: AbfragevarianteBaugenehmigungsverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop()
  private anzeigeContextAbfragevariante!: AnzeigeContextAbfragevariante;

  get headline(): string {
    const headline = `Abfragevariante ${new AbfragevarianteBaugenehmigungsverfahrenModel(
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
