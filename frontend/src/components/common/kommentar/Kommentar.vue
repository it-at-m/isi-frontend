<template></template>

<script lang="ts">
import KommentarApiRequestMixin from "@/mixins/requests/KommentarApiRequestMixin";
import { Component, Mixins, VModel, Emit } from "vue-property-decorator";
import KommentarModel from "@/types/model/common/KommentarModel";

@Component({})
export default class Kommentar extends Mixins(KommentarApiRequestMixin) {
  @VModel({ type: KommentarModel }) kommentar!: KommentarModel;

  @Emit()
  private saveKommentar(): KommentarModel {
    return this.kommentar;
  }

  private deleteKommentar(): KommentarModel {
    return this.kommentar;
  }
}
</script>

<style scoped></style>
