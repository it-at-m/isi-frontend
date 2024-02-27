<template>
  <div>
    <v-row>
      <v-col cols="12">
        <span
          v-if="isEditable"
          class="v-label theme--light"
          >{{ title }}</span
        >
        <span
          v-else
          class="v-label grey--text text--lighten-1"
          >{{ title }}</span
        >
      </v-col>
    </v-row>
    <v-row v-if="editModeTextFieldLinkEakte">
      <v-col
        cols="12"
        md="11"
      >
        <v-textarea
          id="e_akte_field"
          ref="eAkteField"
          v-model="editFieldLinkEakte"
          auto-grow
          rows="1"
          maxlength="8000"
          :disabled="!isEditable"
          @input="formChanged"
        />
      </v-col>
      <v-col
        cols="12"
        md="1"
      >
        <v-row class="justify-center">
          <v-btn
            id="link_eakte_uebernehmen_button"
            class="mt-3 mb-14"
            icon
            :disabled="!isEditable"
            @click="uebernehmenEakte"
          >
            <v-icon>mdi-checkbox-marked</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="!editModeTextFieldLinkEakte">
      <v-col
        cols="12"
        md="11"
      >
        <a
          v-show="isLinkEakteEmpty"
          target="_blank"
          :href="linkEakteFormatted"
        >
          {{ linkEakte }}<span class="mdi mdi-launch" />
        </a>
      </v-col>
      <v-col
        cols="12"
        md="1"
      >
        <v-row class="justify-center">
          <v-btn
            id="link_eakte_bearbeiten_button"
            class="mt-3 mb-14"
            icon
            :disabled="!isEditable"
            @click="editEakte"
          >
            <v-icon>mdi-pencil-box</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import { Component, VModel, Prop, Mixins } from "vue-property-decorator";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import _ from "lodash";

@Component
export default class Eakte extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  private readonly title = "Link eAkte";

  @VModel({ type: String }) linkEakte!: string | undefined;

  @Prop({ type: Boolean, default: false })
  private isEditable!: boolean;

  private textFieldLinkEakte = "";

  private editModeTextFieldLinkEakte = false;

  get editFieldLinkEakte(): string {
    return this.textFieldLinkEakte;
  }

  set editFieldLinkEakte(linkEakte: string) {
    this.textFieldLinkEakte = linkEakte;
  }

  get isLinkEakteEmpty(): boolean {
    return !_.isEmpty(this.linkEakte);
  }

  private uebernehmenEakte(): void {
    this.linkEakte = this.editFieldLinkEakte;
    this.editFieldLinkEakte = "";
    this.editModeTextFieldLinkEakte = false;
  }
  private editEakte(): void {
    this.editFieldLinkEakte = _.isNil(this.linkEakte) ? "" : this.linkEakte;
    this.editModeTextFieldLinkEakte = true;
  }

  get linkEakteFormatted(): string | undefined {
    if (!_.isNil(this.linkEakte) && !_.isEmpty(this.linkEakte)) {
      return this.linkEakte.toLowerCase().startsWith("http://") || this.linkEakte.toLowerCase().startsWith("https://")
        ? this.linkEakte
        : `https://${this.linkEakte}`;
    }
    return this.linkEakte;
  }
}
</script>
