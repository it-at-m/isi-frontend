
# NachbarschaftstreffDto


## Properties

Name | Type
------------ | -------------
`kooperation` | string
`kooperationFreieEingabe` | string
`sobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`dokumente` | [Array&lt;DokumentDto&gt;](DokumentDto.md)

## Example

```typescript
import type { NachbarschaftstreffDto } from ''

// TODO: Update the object below with actual values
const example = {
  "kooperation": null,
  "kooperationFreieEingabe": null,
  "sobonRelevant": null,
  "dokumente": null,
} satisfies NachbarschaftstreffDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NachbarschaftstreffDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


