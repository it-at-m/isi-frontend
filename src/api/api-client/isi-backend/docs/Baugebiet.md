
# Baugebiet


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`bezeichnung` | string
`artBaulicheNutzung` | string
`artBaulicheNutzungFreieEingabe` | string
`realisierungVon` | number
`gfWohnenGeplant` | number
`gfWohnenBaurechtlichGenehmigt` | number
`gfWohnenBaurechtlichFestgesetzt` | number
`weGeplant` | number
`weBaurechtlichGenehmigt` | number
`weBaurechtlichFestgesetzt` | number
`bauraten` | [Array&lt;Baurate&gt;](Baurate.md)
`technical` | boolean

## Example

```typescript
import type { Baugebiet } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "bezeichnung": null,
  "artBaulicheNutzung": null,
  "artBaulicheNutzungFreieEingabe": null,
  "realisierungVon": null,
  "gfWohnenGeplant": null,
  "gfWohnenBaurechtlichGenehmigt": null,
  "gfWohnenBaurechtlichFestgesetzt": null,
  "weGeplant": null,
  "weBaurechtlichGenehmigt": null,
  "weBaurechtlichFestgesetzt": null,
  "bauraten": null,
  "technical": null,
} satisfies Baugebiet

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Baugebiet
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


