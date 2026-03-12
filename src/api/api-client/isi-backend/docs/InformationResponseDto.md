
# InformationResponseDto


## Properties

Name | Type
------------ | -------------
`type` | string
`timestamp` | Date
`traceId` | string
`spanId` | string
`httpStatus` | number
`originalException` | string
`messages` | Array&lt;string&gt;

## Example

```typescript
import type { InformationResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "timestamp": null,
  "traceId": null,
  "spanId": null,
  "httpStatus": null,
  "originalException": null,
  "messages": null,
} satisfies InformationResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as InformationResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


