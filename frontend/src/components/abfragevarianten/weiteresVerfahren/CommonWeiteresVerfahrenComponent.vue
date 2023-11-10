<template>
  <v-container>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="name_field"
            ref="nameField"
            v-model.trim="abfragevariante.name"
            :disabled="!isEditable"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="30"
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Name der Abfragevariante <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="12"
        >
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-autocomplete
            id="wesentliche_rechtsgrundlage_dropdown"
            ref="wesentlicheRechtsgrundlageDropdown"
            v-model="abfragevariante.wesentlicheRechtsgrundlage"
            :items="wesentlicheRechtsgrundlageList"
            item-value="key"
            item-text="value"
            multiple
            chips
            :rules="[fieldValidationRules.pflichtfeldMehrfachauswahl, fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
            @input="formChanged"
          >
            <template #label>
              Wesentliche Rechtsgrundlage
              <span class="secondary--text">*</span>
            </template>
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
              v-model="abfragevariante.wesentlicheRechtsgrundlageFreieEingabe"
              :disabled="!isEditable"
              label="freie Eingabe"
              maxlength="255"
              @input="formChanged"
            />
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungvon"
            v-model="abfragevariante.realisierungVon"
            :disabled="!isEditable"
            label="Realisierung von (JJJJ)"
            year
            maxlength="4"
            required
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungBis"
            v-model="calcRealisierungBis"
            :disabled="true"
            label="Realisierung bis (JJJJ)"
            year
            maxlength="4"
            help="Nach Angabe bzw. Berechnung der Bauraten wird das Feld automatisch befüllt."
          />
        </v-col>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script lang="ts">
import { Component, VModel, Mixins, Watch, Prop } from "vue-property-decorator";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import DisplayMode from "@/types/common/DisplayMode";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import {
  AbfragevarianteBaugenehmigungsverfahrenDtoWesentlicheRechtsgrundlageEnum,
  LookupEntryDto,
} from "@/api/api-client/isi-backend";
import _ from "lodash";

@Component({ components: { FieldGroupCard } })
export default class CommonWeiteresVerfahrenComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: AbfragevarianteWeiteresVerfahrenModel })
  abfragevariante!: AbfragevarianteWeiteresVerfahrenModel;

  private wesentlicheRechtsgrundlageFreieEingabeVisible = false;

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get wesentlicheRechtsgrundlageBaugenehmigungsverfahrenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/wesentlicheRechtsgrundlage"];
  }

  get calcRealisierungBis(): number | undefined {
    let jahre: Array<number> | undefined = this.abfragevariante.bauabschnitte
      ?.flatMap((bauabschnitt) => bauabschnitt.baugebiete)
      .flatMap((baugebiet) => baugebiet.bauraten)
      .map((baurate) => baurate.jahr);
    return _.max(jahre);
  }

  @Watch("abfragevariante.wesentlicheRechtsgrundlage", { immediate: true })
  private wesentlicheRechtsgrundlageChanged(): void {
    if (
      this.abfragevariante.wesentlicheRechtsgrundlage?.includes(
        AbfragevarianteBaugenehmigungsverfahrenDtoWesentlicheRechtsgrundlageEnum.FreieEingabe,
      )
    ) {
      this.wesentlicheRechtsgrundlageFreieEingabeVisible = true;
    } else {
      this.abfragevariante.wesentlicheRechtsgrundlageFreieEingabe = undefined;
      this.wesentlicheRechtsgrundlageFreieEingabeVisible = false;
    }
  }
}
</script>

<style></style>
