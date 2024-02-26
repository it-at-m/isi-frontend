<template>
  <div>
    <v-row v-if="isLinkEakteEditable">
      <v-col cols="10">
        <v-textarea
          id="e_akte_field"
          ref="eAkteField"
          v-model="editFieldLinkEakte"
          label="eAkte"
          auto-grow
          rows="3"
          maxlength="8000"
          @input="formChanged"
        />
      </v-col>
      <v-col cols="2">
        <v-btn
          id="link_eakte_uebernehmen_button"
          class="text-wrap"
          title="Übernehmen"
          @click="uebernehmenEakte"
        >
          <v-icon> mdi-checkbox-marked-outline </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div>
      <v-row v-if="!isLinkEakteEditable">
        <v-col cols="12">
          <span class="v-label theme--light">eAkte</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10">
          <a
            v-show="isLinkEakteVisible"
            target="_blank"
            :href="linkEakteFormatted"
          >
            {{ linkEakte }}<span class="mdi mdi-launch" />
          </a>
        </v-col>
        <v-col cols="2">
          <v-btn
            v-show="isEditable && !isLinkEakteEditable"
            id="link_eakte_bearbeiten_button"
            class="text-wrap"
            title="Bearbeiten"
            @click="editEakte"
          >
            <v-icon> mdi-pencil-box-outline </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import { Component, VModel, Prop, Mixins } from "vue-property-decorator";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import _ from "lodash";

@Component
export default class Eakte extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
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
  get isLinkEakteEditable(): boolean {
    return this.isEditable && this.editModeTextFieldLinkEakte;
  }

  get isLinkEakteVisible(): boolean {
    return !_.isEmpty(this.linkEakte) && !this.isLinkEakteEditable;
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
