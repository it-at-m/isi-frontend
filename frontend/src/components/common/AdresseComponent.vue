<template>
  <v-container>
    <field-group-card :card-title="adressCardTitle">
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            v-model="allgemeineOrtsangabe"
            label="Allgemeine Ortsangabe"
            value="abfrage.allgemeineOrtsangabe"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="adresse.strasse"
            label="Strasse"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="adresse.hausnummer"
            :rules="[fieldValidationRules.hausnummer]"
            label="Hausnummer"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="adresse.plz"
            label="Postleitzahl"
            :rules="[fieldValidationRules.digits, fieldValidationRules.min5]"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="adresse.ort"
            label="Ort"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from "vue-property-decorator";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import AdresseModel from "@/types/model/common/AdresseModel";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";

@Component({
  components: {},
})
export default class AdresseComponent extends Mixins(
  SaveLeaveMixin,
  FieldValidationRulesMixin,
  FieldGroupCard
) {

  private adressCardTitle = "Adressinformationen";

  @Prop()
  private adresseProp!: AdresseModel;

  get adresse(): AdresseModel {
    return this.adresseProp;
  }

  set adresse(adresse: AdresseModel) {
    this.$emit('update:adresseProp', adresse);
  }

  @Prop()
  private allgemeineOrtsangabeProp!: string;

  get allgemeineOrtsangabe(): string {
    return this.allgemeineOrtsangabeProp;
  }

  set allgemeineOrtsangabe(allgemeineOrtsangabe: string) {
    this.$emit('update:allgemeineOrtsangabeProp', allgemeineOrtsangabe);
  }

}
</script>