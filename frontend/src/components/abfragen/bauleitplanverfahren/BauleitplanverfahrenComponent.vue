npm
<template>
  <v-container>
    <abfrage-common-component
      id="abfrage_common_component"
      ref="abfrageCommonComponent"
      v-model="bauleitplanverfahren"
      :is-new="isNew"
      :is-editable-prop="isEditableByAbfrageerstellung()"
    />
    <allgemeine-informationen-bauleitplanverfahren-component
      id="allgemeine_informationen_bauleitplanverfahren-component"
      ref="allgemeineInformationenBauleitplanverfahrenComponent"
      v-model="bauleitplanverfahren"
      :is-editable-prop="isEditableByAbfrageerstellung()"
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
    <allgemeine-informationen-zur-abfrage-bauleitplanverfahren-component
      id="allgemeine_informationen_zur_abfrage_bauleitplanverfahren-component"
      ref="allgemeineInformationenZurAbfrageBauleitplanverfahrenComponent"
      v-model="bauleitplanverfahren"
      :look-at="bauleitplanverfahren"
      :is-editable-prop="isEditableByAbfrageerstellung()"
      :is-eakte-editable-prop="isEditableByAbfrageerstellung() || isEditableBySachbearbeitung()"
    />
    <dokumente
      v-if="isDokumenteVisible(context)"
      id="dokumente_component"
      ref="dokumenteComponent"
      v-model="bauleitplanverfahren.dokumente"
      :name-root-folder="nameRootFolder"
      :is-dokumente-editable="isEditableByAbfrageerstellung()"
      @change="formChanged"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import AbfrageCommonComponent from "@/components/abfragen/AbfrageCommonComponent.vue";
import AllgemeineInformationenBauleitplanverfahrenComponent from "@/components/abfragen/bauleitplanverfahren/AllgemeineInformationenBauleitplanverfahrenComponent.vue";
import AllgemeineInformationenZurAbfrageBauleitplanverfahrenComponent from "@/components/abfragen/bauleitplanverfahren/AllgemeineInformationenZurAbfrageBauleitplanverfahrenComponent.vue";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import DokumenteKommentareSecurityMixin from "@/mixins/security/DokumenteKommentareSecurityMixin";
import { Context } from "@/utils/Context";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component({
  computed: {
    context() {
      return Context.ABFRAGE;
    },
  },
  components: {
    Dokumente,
    AbfrageCommonComponent,
    AllgemeineInformationenBauleitplanverfahrenComponent,
    AllgemeineInformationenZurAbfrageBauleitplanverfahrenComponent,
    FieldGroupCard,
  },
})
export default class BauleitplanverfahrenComponent extends Mixins(
  AbfrageSecurityMixin,
  DokumenteKommentareSecurityMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: BauleitplanverfahrenModel }) bauleitplanverfahren!: BauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isNew!: boolean;

  private nameRootFolder = "bauleitplanverfahren";
}
</script>

<style></style>
