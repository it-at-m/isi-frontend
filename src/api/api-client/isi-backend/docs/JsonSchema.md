
# JsonSchema


## Properties

Name | Type
------------ | -------------
`title` | string
`description` | string
`properties` | [{ [key: string]: AbstractJsonSchemaPropertyObject; }](AbstractJsonSchemaPropertyObject.md)
`requiredProperties` | Array&lt;string&gt;
`definitions` | [{ [key: string]: Item; }](Item.md)
`type` | string
`$schema` | string

## Example

```typescript
import type { JsonSchema } from ''

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "description": null,
  "properties": null,
  "requiredProperties": null,
  "definitions": null,
  "type": null,
  "$schema": null,
} satisfies JsonSchema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JsonSchema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


