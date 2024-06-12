<template>
  <v-container>
    <abfrage-common-component
      id="abfrage_common_component"
      ref="abfrageCommonComponent"
      v-model="weiteresVerfahren"
      :is-new="isNew"
      :is-editable-prop="isEditableByAbfrageerstellung()"
    />
    <allgemeine-informationen-weiteres-verfahren-component
      id="allgemeine_informationen_weiteres_verfahren_component"
      ref="allgemeineInformationenWeiteresVerfahrenComponent"
      v-model="weiteresVerfahren"
      :is-editable-prop="isEditableByAbfrageerstellung()"
    />
    <adresse-component
      id="adresse_component"
      ref="adresseComponent"
      :adresse-prop.sync="weiteresVerfahren.adresse"
      :show-in-information-list-prop="true"
      :is-editable-prop="isEditableByAbfrageerstellung()"
    />
    <verortung
      id="verortung_component"
      ref="verortungComponent"
      v-model="weiteresVerfahren.verortung"
      :context="context"
      :look-at="weiteresVerfahren.adresse"
    />
    <allgemeine-informationen-zur-abfrage-weiteres-verfahren-component
      id="allgemeine_informationen_zur_abfrage_weiteres_verfahren-component"
      ref="allgemeineInformationenZurAbfrageWeiteresVerfahrenComponent"
      v-model="weiteresVerfahren"
      :look-at="weiteresVerfahren"
      :is-editable-prop="isEditableByAbfrageerstellung()"
      :is-eakte-editable-prop="isEditableByAbfrageerstellung() || isEditableBySachbearbeitung()"
    />
    <dokumente
      v-if="isDokumenteVisible(context)"
      id="dokumente_component"
      ref="dokumenteComponent"
      v-model="weiteresVerfahren.dokumente"
      :name-root-folder="nameRootFolder"
      :is-dokumente-editable="isEditableByAbfrageerstellung()"
      @change="formChanged"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import AbfrageCommonComponent from "@/components/abfragen/AbfrageCommonComponent.vue";
import AllgemeineInformationenWeiteresVerfahrenComponent from "@/components/abfragen/weiteresVerfahren/AllgemeineInformationenWeiteresVerfahrenComponent.vue";
import AllgemeineInformationenZurAbfrageWeiteresVerfahrenComponent from "@/components/abfragen/weiteresVerfahren/AllgemeineInformationenZurAbfrageWeiteresVerfahrenComponent.vue";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import DokumenteKommentareSecurityMixin from "@/mixins/security/DokumenteKommentareSecurityMixin";
import { Context } from "@/utils/Context";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AllgemeineInformationenZurAbfrageBauleitplanverfahrenComponent from "@/components/abfragen/bauleitplanverfahren/AllgemeineInformationenZurAbfrageBauleitplanverfahrenComponent.vue";

@Component({
  computed: {
    context() {
      return Context.ABFRAGE;
    },
  },
  components: {
    AllgemeineInformationenZurAbfrageBauleitplanverfahrenComponent,
    Dokumente,
    AbfrageCommonComponent,
    AllgemeineInformationenWeiteresVerfahrenComponent,
    AllgemeineInformationenZurAbfrageWeiteresVerfahrenComponent,
    FieldGroupCard,
  },
})
export default class WeiteresVerfahrenComponent extends Mixins(
  AbfrageSecurityMixin,
  DokumenteKommentareSecurityMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: WeiteresVerfahrenModel }) weiteresVerfahren!: WeiteresVerfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isNew!: boolean;

  private nameRootFolder = "weiteresVerfahren";
}
</script>

<style></style>
