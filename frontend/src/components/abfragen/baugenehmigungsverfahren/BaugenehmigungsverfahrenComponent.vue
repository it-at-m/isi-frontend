<template>
  <v-container>
    <abfrage-common-component
      id="abfrage_common_component"
      ref="abfrageCommonComponent"
      v-model="baugenehmigungsverfahren"
      :is-new="isNew"
      :is-editable-prop="isEditableByAbfrageerstellung()"
    />
    <allgemeine-informationen-baugenehmigungsverfahren-component
      id="allgemeine_informationen_baugenehmigungsverfahren-component"
      ref="allgemeineInformationenBaugenehmigungsverfahrenComponent"
      v-model="baugenehmigungsverfahren"
      :is-editable-prop="isEditableByAbfrageerstellung()"
    />
    <adresse-component
      id="adresse_component"
      ref="adresseComponent"
      :adresse-prop.sync="baugenehmigungsverfahren.adresse"
      :show-in-information-list-prop="true"
      :is-editable-prop="isEditableByAbfrageerstellung()"
    />
    <verortung
      id="verortung_component"
      ref="verortungComponent"
      v-model="baugenehmigungsverfahren.verortung"
      :context="context"
      :look-at="baugenehmigungsverfahren.adresse"
    />
    <allgemeine-informationen-zur-abfrage-baugenehmigungsverfahren-component
      id="allgemeine_informationen_zur_abfrage_baugenehmigunsverfahren-component"
      ref="allgemeineInformationenZurAbfrageBaugenehmigungsverfahrenComponent"
      v-model="baugenehmigungsverfahren"
      :look-at="baugenehmigungsverfahren"
      :is-editable-prop="isEditableByAbfrageerstellung()"
    />
    <dokumente
      id="dokumente_component"
      ref="dokumenteComponent"
      v-model="baugenehmigungsverfahren.dokumente"
      :name-root-folder="nameRootFolder"
      :is-dokumente-editable="isEditableByAbfrageerstellung()"
      @change="formChanged"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import AbfrageCommonComponent from "@/components/abfragen/AbfrageCommonComponent.vue";
import AllgemeineInformationenBaugenehmigungsverfahrenComponent from "@/components/abfragen/baugenehmigungsverfahren/AllgemeineInformationenBaugenehmigungsverfahrenComponent.vue";
import AllgemeineInformationenZurAbfrageBaugenehmigungsverfahrenComponent from "@/components/abfragen/baugenehmigungsverfahren/AllgemeineInformationenZurAbfrageBaugenehmigungsverfahrenComponent.vue";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
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
    AllgemeineInformationenBaugenehmigungsverfahrenComponent,
    AllgemeineInformationenZurAbfrageBaugenehmigungsverfahrenComponent,
    FieldGroupCard,
  },
})
export default class BaugenehmigungsverfahrenComponent extends Mixins(AbfrageSecurityMixin, SaveLeaveMixin) {
  @VModel({ type: BaugenehmigungsverfahrenModel }) baugenehmigungsverfahren!: BaugenehmigungsverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isNew!: boolean;

  private nameRootFolder = "baugenehmigungsverfahren";
}
</script>

<style></style>
