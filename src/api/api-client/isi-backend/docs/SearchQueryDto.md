
# SearchQueryDto


## Properties

Name | Type
------------ | -------------
`searchQuery` | string
`selectBauleitplanverfahren` | boolean
`selectBaugenehmigungsverfahren` | boolean
`selectWeiteresVerfahren` | boolean
`selectBauvorhaben` | boolean
`selectGrundschule` | boolean
`selectGsNachmittagBetreuung` | boolean
`selectHausFuerKinder` | boolean
`selectKindergarten` | boolean
`selectKinderkrippe` | boolean
`selectMittelschule` | boolean
`filterStadtbezirkNummer` | Array&lt;string&gt;
`filterKitaplanungsbereichKitaPlbT` | Array&lt;string&gt;
`filterGrundschulsprengelNummer` | Array&lt;number&gt;
`filterMittelschulsprengelNummer` | Array&lt;number&gt;
`filterRealisierungsbeginnVon` | number
`filterRealisierungsbeginnBis` | number
`filterNurEigeneAbfragen` | boolean
`filterStatusAbfrage` | [Array&lt;StatusAbfrage&gt;](StatusAbfrage.md)
`filterSobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`filterWeGesamtVon` | number
`filterWeGesamtBis` | number
`filterGfWohnenGeplantVon` | number
`filterGfWohnenGeplantBis` | number
`filterStandVerfahren` | Array&lt;string&gt;
`filterInfrastruktureinrichtungStatus` | Array&lt;string&gt;
`page` | number
`pageSize` | number

## Example

```typescript
import type { SearchQueryDto } from ''

// TODO: Update the object below with actual values
const example = {
  "searchQuery": null,
  "selectBauleitplanverfahren": null,
  "selectBaugenehmigungsverfahren": null,
  "selectWeiteresVerfahren": null,
  "selectBauvorhaben": null,
  "selectGrundschule": null,
  "selectGsNachmittagBetreuung": null,
  "selectHausFuerKinder": null,
  "selectKindergarten": null,
  "selectKinderkrippe": null,
  "selectMittelschule": null,
  "filterStadtbezirkNummer": null,
  "filterKitaplanungsbereichKitaPlbT": null,
  "filterGrundschulsprengelNummer": null,
  "filterMittelschulsprengelNummer": null,
  "filterRealisierungsbeginnVon": null,
  "filterRealisierungsbeginnBis": null,
  "filterNurEigeneAbfragen": null,
  "filterStatusAbfrage": null,
  "filterSobonRelevant": null,
  "filterWeGesamtVon": null,
  "filterWeGesamtBis": null,
  "filterGfWohnenGeplantVon": null,
  "filterGfWohnenGeplantBis": null,
  "filterStandVerfahren": null,
  "filterInfrastruktureinrichtungStatus": null,
  "page": null,
  "pageSize": null,
} satisfies SearchQueryDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchQueryDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


