<template>
  <v-container>
    <abfrage-common-component
      id="abfrage_common_component"
      ref="abfrageCommonComponent"
      v-model="bauleitplanverfahren.name"
    />
    <allgemeine-informationen-component
      id="allgemeine_informationen_component"
      ref="allgemeineInformationenComponent"
      v-model="bauleitplanverfahren"
    />
    <adresse-component
      id="adresse_component"
      ref="adresseComponent"
      :adresse-prop.sync="bauleitplanverfahren.adresse"
      :show-in-information-list-prop="true"
      :is-editable-prop="isEditableByAbfrageerstellung()"
    />
    <verortung
      id="verortung_component"
      ref="verortungComponent"
      v-model="bauleitplanverfahren.verortung"
      :context="context"
      :look-at="bauleitplanverfahren.adresse"
    />
    <allgemeine-informationen-zur-abfrage-component
      id="allgemeine_informationen_zur_abfrage_component"
      ref="allgemeineInformationenZurAbfrageComponent"
      v-model="bauleitplanverfahren"
      :look-at="bauleitplanverfahren"
    />
    <dokumente
      id="dokumente_component"
      ref="dokumenteComponent"
      v-model="bauleitplanverfahren.dokumente"
      :name-root-folder="nameRootFolder"
      :is-dokumente-editable="isEditableByAbfrageerstellung()"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import AbfrageCommonComponent from "@/components/abfragen/AbfrageCommonComponent.vue";
import AllgemeineInformationenComponent from "@/components/abfragen/AllgemeineInformationenComponent.vue";
import AllgemeineInformationenZurAbfrageComponent from "@/components/abfragen/AllgemeineInformationenZurAbfrageComponent.vue";
import BauleitplanverfahrenModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import { Context } from "@/utils/Context";

@Component({
  computed: {
    context() {
      return Context.ABFRAGE;
    },
  },
  components: {
    AbfrageCommonComponent,
    AllgemeineInformationenComponent,
    AllgemeineInformationenZurAbfrageComponent,
    FieldGroupCard,
  },
})
export default class BauleitplanverfahrenComponent extends Mixins(AbfrageSecurityMixin) {
  @VModel({ type: BauleitplanverfahrenModel }) bauleitplanverfahren!: BauleitplanverfahrenModel;

  private nameRootFolder = "bauleitplanverfahren";
}
</script>

<style></style>
