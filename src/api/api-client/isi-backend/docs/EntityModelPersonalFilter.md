
# EntityModelPersonalFilter


## Properties

Name | Type
------------ | -------------
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`personalID` | string
`filterName` | string
`filterSettings` | [FilterSettings](FilterSettings.md)
`links` | [{ [key: string]: Link; }](Link.md)

## Example

```typescript
import type { EntityModelPersonalFilter } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "personalID": null,
  "filterName": null,
  "filterSettings": null,
  "links": null,
} satisfies EntityModelPersonalFilter

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntityModelPersonalFilter
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


