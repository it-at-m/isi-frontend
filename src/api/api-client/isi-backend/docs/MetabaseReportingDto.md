
# MetabaseReportingDto


## Properties

Name | Type
------------ | -------------
`reportBauratendatei` | string
`reportKitaplanungsbereichKrippe` | string
`reportKitaplanungsbereichKiga` | string
`reportAndere` | string
`url` | string
`reportErgebnissePlanungsursaechlich` | string
`reportErgebnisseSobonUrsaechlich` | string
`reportWohneinheiten` | string

## Example

```typescript
import type { MetabaseReportingDto } from ''

// TODO: Update the object below with actual values
const example = {
  "reportBauratendatei": null,
  "reportKitaplanungsbereichKrippe": null,
  "reportKitaplanungsbereichKiga": null,
  "reportAndere": null,
  "url": null,
  "reportErgebnissePlanungsursaechlich": null,
  "reportErgebnisseSobonUrsaechlich": null,
  "reportWohneinheiten": null,
} satisfies MetabaseReportingDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MetabaseReportingDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


