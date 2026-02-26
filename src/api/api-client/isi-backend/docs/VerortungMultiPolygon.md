
# VerortungMultiPolygon


## Properties

Name | Type
------------ | -------------
`stadtbezirke` | [Set&lt;Stadtbezirk&gt;](Stadtbezirk.md)
`bezirksteile` | [Set&lt;Bezirksteil&gt;](Bezirksteil.md)
`viertel` | [Set&lt;Viertel&gt;](Viertel.md)
`gemarkungen` | [Set&lt;Gemarkung&gt;](Gemarkung.md)
`kitaplanungsbereiche` | [Set&lt;Kitaplanungsbereich&gt;](Kitaplanungsbereich.md)
`grundschulsprengel` | [Set&lt;Grundschulsprengel&gt;](Grundschulsprengel.md)
`mittelschulsprengel` | [Set&lt;Mittelschulsprengel&gt;](Mittelschulsprengel.md)
`multiPolygon` | [MultiPolygonGeometry](MultiPolygonGeometry.md)
`centroid` | [PointGeometry](PointGeometry.md)
`centroidUtm` | [Utm](Utm.md)

## Example

```typescript
import type { VerortungMultiPolygon } from ''

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
} satisfies VerortungMultiPolygon

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VerortungMultiPolygon
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


