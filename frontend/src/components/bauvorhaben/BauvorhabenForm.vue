<template>
  <v-container>
    <field-group-card>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="bauvorhaben_standVerfahren_dropdown"
            v-model="bauvorhaben.standVerfahren"
            :items="standVerfahrenList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
            @change="formChanged"
          >
            <template #label> Stand des Verfahrens <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-text-field
              v-if="standVerfahrenFreieEingabeVisible"
              id="stand_verfahren_freie_eingabe_field"
              ref="standVerfahrenFreieEingabeField"
              v-model="bauvorhaben.standVerfahrenFreieEingabe"
              :disabled="!isEditable"
              label="Freie Eingabe für Stand des Verfahrens"
              maxlength="1000"
              @input="formChanged"
            />
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="bauvorhaben_grundstuecksgroesse"
            v-model="calcGrundstuecksgroesse"
            label="Grundstücksgröße"
            :suffix="fieldPrefixesSuffixes.squareMeter"
            :disabled="true"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhaben_bauvorhabenNummer"
            v-model="bauvorhaben.bauvorhabenNummer"
            disabled
            label="Bauvorhabennummer"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <adresse-component
      id="bauvorhaben_adresse_component"
      :adresse-prop.sync="bauvorhaben.adresse"
      :show-in-information-list-prop="true"
      :is-editable-prop="isEditable"
    />
    <verortung
      id="verortung_component"
      v-model="bauvorhaben.verortung"
      :context="context"
      :look-at="bauvorhaben.adresse"
    />
    <field-group-card :card-title="allgemeineInfoCardTitle">
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-autocomplete
            id="bauvorhaben_wesentliche_rechtsgrundlage_dropdown"
            v-model="bauvorhaben.wesentlicheRechtsgrundlage"
            :items="wesentlicheRechtsgrundlageList"
            item-value="key"
            item-text="value"
            multiple
            chips
            :rules="[fieldValidationRules.pflichtfeldMehrfachauswahl, fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
            @change="formChanged"
          >
            <template #label> Wesentliche Rechtsgrundlage <span class="secondary--text">*</span> </template>
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-text-field
              v-if="wesentlicheRechtsgrundlageFreieEingabeVisible"
              id="wesentliche_rechtsgrundlage_freie_eingabe_field"
              ref="wesentlicheRechtsgrundlageFreieEingabeField"
              v-model="bauvorhaben.wesentlicheRechtsgrundlageFreieEingabe"
              :disabled="!isEditable"
              label="Freie Eingabe für Wesentliche Rechtsgrundlage"
              maxlength="1000"
              @input="formChanged"
            />
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            id="bauvorhaben_artFnp_dropdown"
            v-model="bauvorhaben.artFnp"
            :items="artBaulicheNutzungList"
            item-value="key"
            item-text="value"
            multiple
            chips
            :rules="[fieldValidationRules.pflichtfeldMehrfachauswahl, fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
            @input="formChanged"
          >
            <template #label>
              Art der baulichen Nutzung
              <span class="secondary--text">*</span>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-slide-y-reverse-transition>
            <v-text-field
              v-if="artFnpFreieEingabeVisible"
              id="art_fnp_freie_eingabe_field"
              ref="artFnpFreieEingabeField"
              v-model="bauvorhaben.artFnpFreieEingabe"
              :disabled="!isEditable"
              label="Freie Eingabe für Art der baulichen Nutzung"
              maxlength="1000"
              @input="formChanged"
            />
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhaben_bebauungsplannummer"
            v-model="bauvorhaben.bebauungsplannummer"
            label="Bebauungsplannummer"
            maxlength="255"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhaben_fisnummer"
            v-model="bauvorhaben.fisNummer"
            label="FIS-Nummer"
            maxlength="255"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            id="bauvorhaben_anmerkung"
            v-model="bauvorhaben.anmerkung"
            label="Anmerkung"
            rows="1"
            auto-grow
            maxlength="1000"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <dokumente
      v-if="isDokumenteVisible(context)"
      id="bauvorhaben_dokumente_component"
      v-model="bauvorhaben.dokumente"
      :name-root-folder="nameRootFolder"
      :is-dokumente-editable="isEditable"
      @change="formChanged"
    />
    <field-group-card :card-title="sobonCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <tri-switch
            id="bauvorhaben_sobonRelevant_triswitch"
            v-model="bauvorhaben.sobonRelevant"
            off-text="Nein"
            on-text="Ja"
            :rules="[fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
          >
            <template #label> SoBoN-relevant <span class="secondary--text">*</span> </template>
          </tri-switch>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-select
              v-if="sobonJahrVisible"
              id="bauvorhaben_sobonJahr_dropdown"
              v-model="bauvorhaben.sobonJahr"
              :items="sobonVerfahrensgrundsaetzeJahrList"
              item-value="key"
              item-text="value"
              :rules="[fieldValidationRules.pflichtfeld]"
              :disabled="!isEditable"
              @change="formChanged"
            >
              <template #label>
                Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN <span class="secondary--text">*</span>
              </template>
            </v-select>
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="referencedObjectsCardTitle">
      <referenced-items-list />
    </field-group-card>
  </v-container>
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Mixins, Prop, VModel, Watch } from "vue-property-decorator";
import {
  LookupEntryDto,
  UncertainBoolean,
  GemarkungDto,
  FlurstueckDto,
  BauvorhabenDtoWesentlicheRechtsgrundlageEnum,
  BauvorhabenDtoStandVerfahrenEnum,
  BauvorhabenDtoArtFnpEnum,
} from "@/api/api-client/isi-backend";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import TriSwitch from "@/components/common/TriSwitch.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import SecurityMixin from "@/mixins/security/SecurityMixin";
import ReferencedItemsList from "@/components/bauvorhaben/ReferencedItemsList.vue";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";
import { Context } from "@/utils/Context";
import Verortung from "@/components/common/Verortung.vue";
import AdresseComponent from "@/components/common/AdresseComponent.vue";
import { useLookupStore } from "@/stores/LookupStore";
import DokumenteKommentareSecurityMixin from "@/mixins/security/DokumenteKommentareSecurityMixin";

@Component({
  computed: {
    context() {
      return Context.BAUVORHABEN;
    },
  },
  components: {
    AdresseComponent,
    Verortung,
    FieldGroupCard,
    Dokumente,
    NumField,
    TriSwitch,
    ReferencedItemsList,
  },
})
export default class BauvorhabenForm extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  SecurityMixin,
  DokumenteKommentareSecurityMixin,
  BauvorhabenApiRequestMixin,
) {
  @VModel({ type: BauvorhabenModel })
  bauvorhaben!: BauvorhabenModel;

  private sobonCardTitle = "SoBoN";

  private sobonJahrVisible = false;

  private standVerfahrenFreieEingabeVisible = false;

  private artFnpFreieEingabeVisible = false;

  private nameRootFolder = "bauvorhaben";

  private allgemeineInfoCardTitle = "Allgemeine Informationen zum Bauvorhaben";

  private referencedObjectsCardTitle = "Zugehörige Infrastruktureinrichtungen und Abfragen";

  private wesentlicheRechtsgrundlageFreieEingabeVisible = false;

  private lookupStore = useLookupStore();

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get standVerfahrenList(): LookupEntryDto[] {
    return this.lookupStore.standVerfahren;
  }

  get wesentlicheRechtsgrundlageList(): LookupEntryDto[] {
    return this.lookupStore.wesentlicheRechtsgrundlage;
  }

  get artBaulicheNutzungList(): LookupEntryDto[] {
    return this.lookupStore.artBaulicheNutzungBauvorhaben;
  }

  get sobonVerfahrensgrundsaetzeJahrList(): LookupEntryDto[] {
    return this.lookupStore.sobonVerfahrensgrundsaetzeJahr;
  }

  set calcGrundstuecksgroesse(grundstuecksgroesse: number) {
    // do nothing
  }

  get calcGrundstuecksgroesse(): number | undefined {
    this.bauvorhaben.grundstuecksgroesse = Number.NaN;

    if (this.bauvorhaben.verortung) {
      this.bauvorhaben.grundstuecksgroesse = 0;
      this.bauvorhaben.verortung.gemarkungen.forEach((gemarkung: GemarkungDto) => {
        gemarkung.flurstuecke.forEach((flurstueck: FlurstueckDto) => {
          if (!_.isNil(flurstueck.flaecheQm)) {
            if (_.isNil(this.bauvorhaben.grundstuecksgroesse)) {
              this.bauvorhaben.grundstuecksgroesse = 0;
            }
            this.bauvorhaben.grundstuecksgroesse += flurstueck.flaecheQm;
          }
        });
      });
    }

    return this.bauvorhaben.grundstuecksgroesse;
  }

  @Watch("bauvorhaben.sobonRelevant", { immediate: true })
  private sobonRelevantChanged(value: UncertainBoolean): void {
    if (value === UncertainBoolean.True) {
      this.sobonJahrVisible = true;
    } else {
      this.sobonJahrVisible = false;
      this.bauvorhaben.sobonJahr = undefined;
    }
  }

  @Watch("bauvorhaben.wesentlicheRechtsgrundlage", { immediate: true })
  private wesentlicheRechtsgrundlageChanged(): void {
    if (
      this.bauvorhaben.wesentlicheRechtsgrundlage?.includes(BauvorhabenDtoWesentlicheRechtsgrundlageEnum.FreieEingabe)
    ) {
      this.wesentlicheRechtsgrundlageFreieEingabeVisible = true;
    } else {
      this.bauvorhaben.wesentlicheRechtsgrundlageFreieEingabe = undefined;
      this.wesentlicheRechtsgrundlageFreieEingabeVisible = false;
    }
  }

  @Watch("bauvorhaben.standVerfahren", { immediate: true })
  private standVerfahrenChanged(): void {
    if (this.bauvorhaben.standVerfahren?.includes(BauvorhabenDtoStandVerfahrenEnum.FreieEingabe)) {
      this.standVerfahrenFreieEingabeVisible = true;
    } else {
      this.bauvorhaben.standVerfahrenFreieEingabe = undefined;
      this.standVerfahrenFreieEingabeVisible = false;
    }
  }

  @Watch("bauvorhaben.artFnp", { immediate: true })
  private artFnpChanged(): void {
    if (this.bauvorhaben.artFnp?.includes(BauvorhabenDtoArtFnpEnum.FreieEingabe)) {
      this.artFnpFreieEingabeVisible = true;
    } else {
      this.bauvorhaben.artFnpFreieEingabe = undefined;
      this.artFnpFreieEingabeVisible = false;
    }
  }
}
</script>
