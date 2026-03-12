
# VerortungMultiPolygonDto


## Properties

Name | Type
------------ | -------------
`stadtbezirke` | [Set&lt;StadtbezirkDto&gt;](StadtbezirkDto.md)
`bezirksteile` | [Set&lt;BezirksteilDto&gt;](BezirksteilDto.md)
`viertel` | [Set&lt;ViertelDto&gt;](ViertelDto.md)
`gemarkungen` | [Set&lt;GemarkungDto&gt;](GemarkungDto.md)
`kitaplanungsbereiche` | [Set&lt;KitaplanungsbereichDto&gt;](KitaplanungsbereichDto.md)
`grundschulsprengel` | [Set&lt;GrundschulsprengelDto&gt;](GrundschulsprengelDto.md)
`mittelschulsprengel` | [Set&lt;MittelschulsprengelDto&gt;](MittelschulsprengelDto.md)
`multiPolygon` | [MultiPolygonGeometryDto](MultiPolygonGeometryDto.md)
`centroid` | [PointGeometryDto](PointGeometryDto.md)
`centroidUtm` | [UtmDto](UtmDto.md)

## Example

```typescript
import type { VerortungMultiPolygonDto } from ''

// TODO: Update the object below with actual values
const example = {
  "stadtbezirke": null,
  "bezirksteile": null,
  "viertel": null,
  "gemarkungen": null,
  "kitaplanungsbereiche": null,
  "grundschulsprengel": null,
  "mittelschulsprengel": null,
  "multiPolygon": null,
  "centroid": null,
  "centroidUtm": null,
} satisfies VerortungMultiPolygonDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VerortungMultiPolygonDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


