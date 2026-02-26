
# SearchResultsDtoSearchResultsInner


## Properties

Name | Type
------------ | -------------
`type` | string
`coordinate` | [Wgs84Dto](Wgs84Dto.md)
`id` | string
`artAbfrage` | string
`name` | string
`stadtbezirke` | [Set&lt;StadtbezirkDto&gt;](StadtbezirkDto.md)
`statusAbfrage` | [StatusAbfrage](StatusAbfrage.md)
`fristBearbeitung` | Date
`standVerfahren` | string
`createdDateTime` | Date
`bauvorhaben` | string
`nameVorhaben` | string
`grundstuecksgroesse` | number
`umgriff` | [MultiPolygonGeometryDto](MultiPolygonGeometryDto.md)
`nameEinrichtung` | string
`infrastruktureinrichtungTyp` | string
`zugehoerigesBauvorhaben` | string

## Example

```typescript
import type { SearchResultsDtoSearchResultsInner } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "coordinate": null,
  "id": null,
  "artAbfrage": null,
  "name": null,
  "stadtbezirke": null,
  "statusAbfrage": null,
  "fristBearbeitung": null,
  "standVerfahren": null,
  "createdDateTime": null,
  "bauvorhaben": null,
  "nameVorhaben": null,
  "grundstuecksgroesse": null,
  "umgriff": null,
  "nameEinrichtung": null,
  "infrastruktureinrichtungTyp": null,
  "zugehoerigesBauvorhaben": null,
} satisfies SearchResultsDtoSearchResultsInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchResultsDtoSearchResultsInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


