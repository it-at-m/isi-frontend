
# FilterSettingsDto


## Properties

Name | Type
------------ | -------------
`sortBy` | string
`sortOrder` | string
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
`stadtbezirkNummer` | Array&lt;string&gt;
`kitaplanungsbereichKitaPlbT` | Array&lt;string&gt;
`grundschulsprengelNummer` | Array&lt;number&gt;
`mittelschulsprengelNummer` | Array&lt;number&gt;
`realisierungsbeginnVon` | number
`realisierungsbeginnBis` | number
`nurEigeneAbfragen` | boolean
`statusAbfrage` | [Array&lt;StatusAbfrage&gt;](StatusAbfrage.md)
`sobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`weGesamtVon` | number
`weGesamtBis` | number
`gfWohnenGeplantVon` | number
`gfWohnenGeplantBis` | number
`verfahrensstand` | Array&lt;string&gt;
`infrastruktureinrichtungStatus` | Array&lt;string&gt;

## Example

```typescript
import type { FilterSettingsDto } from ''

// TODO: Update the object below with actual values
const example = {
  "sortBy": null,
  "sortOrder": null,
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
  "stadtbezirkNummer": null,
  "kitaplanungsbereichKitaPlbT": null,
  "grundschulsprengelNummer": null,
  "mittelschulsprengelNummer": null,
  "realisierungsbeginnVon": null,
  "realisierungsbeginnBis": null,
  "nurEigeneAbfragen": null,
  "statusAbfrage": null,
  "sobonRelevant": null,
  "weGesamtVon": null,
  "weGesamtBis": null,
  "gfWohnenGeplantVon": null,
  "gfWohnenGeplantBis": null,
  "verfahrensstand": null,
  "infrastruktureinrichtungStatus": null,
} satisfies FilterSettingsDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FilterSettingsDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


