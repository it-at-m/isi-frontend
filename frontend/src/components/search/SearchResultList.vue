<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { SearchQueryForEntitiesDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";

@Component({})
export default class SearchResultList extends Mixins(SearchApiRequestMixin) {}
</script>

<style scoped></style>
