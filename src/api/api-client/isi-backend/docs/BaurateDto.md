
# BaurateDto


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`jahr` | number
`weGeplant` | number
`gfWohnenGeplant` | number
`foerdermix` | [FoerdermixDto](FoerdermixDto.md)

## Example

```typescript
import type { BaurateDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "jahr": null,
  "weGeplant": null,
  "gfWohnenGeplant": null,
  "foerdermix": null,
} satisfies BaurateDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BaurateDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


