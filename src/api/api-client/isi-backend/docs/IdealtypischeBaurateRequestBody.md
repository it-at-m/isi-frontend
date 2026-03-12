
# IdealtypischeBaurateRequestBody


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`von` | number
`bisExklusiv` | number
`typ` | string
`jahresraten` | [Array&lt;Jahresrate&gt;](Jahresrate.md)

## Example

```typescript
import type { IdealtypischeBaurateRequestBody } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "von": null,
  "bisExklusiv": null,
  "typ": null,
  "jahresraten": null,
} satisfies IdealtypischeBaurateRequestBody

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as IdealtypischeBaurateRequestBody
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


