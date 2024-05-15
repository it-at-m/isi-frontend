/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Bezirksteil } from './Bezirksteil';
import {
    BezirksteilFromJSON,
    BezirksteilFromJSONTyped,
    BezirksteilToJSON,
} from './Bezirksteil';
import type { Gemarkung } from './Gemarkung';
import {
    GemarkungFromJSON,
    GemarkungFromJSONTyped,
    GemarkungToJSON,
} from './Gemarkung';
import type { Grundschulsprengel } from './Grundschulsprengel';
import {
    GrundschulsprengelFromJSON,
    GrundschulsprengelFromJSONTyped,
    GrundschulsprengelToJSON,
} from './Grundschulsprengel';
import type { Kitaplanungsbereich } from './Kitaplanungsbereich';
import {
    KitaplanungsbereichFromJSON,
    KitaplanungsbereichFromJSONTyped,
    KitaplanungsbereichToJSON,
} from './Kitaplanungsbereich';
import type { Mittelschulsprengel } from './Mittelschulsprengel';
import {
    MittelschulsprengelFromJSON,
    MittelschulsprengelFromJSONTyped,
    MittelschulsprengelToJSON,
} from './Mittelschulsprengel';
import type { MultiPolygonGeometry } from './MultiPolygonGeometry';
import {
    MultiPolygonGeometryFromJSON,
    MultiPolygonGeometryFromJSONTyped,
    MultiPolygonGeometryToJSON,
} from './MultiPolygonGeometry';
import type { PointGeometry } from './PointGeometry';
import {
    PointGeometryFromJSON,
    PointGeometryFromJSONTyped,
    PointGeometryToJSON,
} from './PointGeometry';
import type { Stadtbezirk } from './Stadtbezirk';
import {
    StadtbezirkFromJSON,
    StadtbezirkFromJSONTyped,
    StadtbezirkToJSON,
} from './Stadtbezirk';
import type { Utm } from './Utm';
import {
    UtmFromJSON,
    UtmFromJSONTyped,
    UtmToJSON,
} from './Utm';
import type { Viertel } from './Viertel';
import {
    ViertelFromJSON,
    ViertelFromJSONTyped,
    ViertelToJSON,
} from './Viertel';

/**
 * 
 * @export
 * @interface VerortungMultiPolygon
 */
export interface VerortungMultiPolygon {
    /**
     * 
     * @type {Set<Stadtbezirk>}
     * @memberof VerortungMultiPolygon
     */
    stadtbezirke?: Set<Stadtbezirk>;
    /**
     * 
     * @type {Set<Bezirksteil>}
     * @memberof VerortungMultiPolygon
     */
    bezirksteile?: Set<Bezirksteil>;
    /**
     * 
     * @type {Set<Viertel>}
     * @memberof VerortungMultiPolygon
     */
    viertel?: Set<Viertel>;
    /**
     * 
     * @type {Set<Gemarkung>}
     * @memberof VerortungMultiPolygon
     */
    gemarkungen?: Set<Gemarkung>;
    /**
     * 
     * @type {Set<Kitaplanungsbereich>}
     * @memberof VerortungMultiPolygon
     */
    kitaplanungsbereiche?: Set<Kitaplanungsbereich>;
    /**
     * 
     * @type {Set<Grundschulsprengel>}
     * @memberof VerortungMultiPolygon
     */
    grundschulsprengel?: Set<Grundschulsprengel>;
    /**
     * 
     * @type {Set<Mittelschulsprengel>}
     * @memberof VerortungMultiPolygon
     */
    mittelschulsprengel?: Set<Mittelschulsprengel>;
    /**
     * 
     * @type {MultiPolygonGeometry}
     * @memberof VerortungMultiPolygon
     */
    multiPolygon?: MultiPolygonGeometry;
    /**
     * 
     * @type {PointGeometry}
     * @memberof VerortungMultiPolygon
     */
    centroid?: PointGeometry;
    /**
     * 
     * @type {Utm}
     * @memberof VerortungMultiPolygon
     */
    centroidUtm?: Utm;
}

/**
 * Check if a given object implements the VerortungMultiPolygon interface.
 */
export function instanceOfVerortungMultiPolygon(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function VerortungMultiPolygonFromJSON(json: any): VerortungMultiPolygon {
    return VerortungMultiPolygonFromJSONTyped(json, false);
}

export function VerortungMultiPolygonFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerortungMultiPolygon {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'stadtbezirke': !exists(json, 'stadtbezirke') ? undefined : (new Set((json['stadtbezirke'] as Array<any>).map(StadtbezirkFromJSON))),
        'bezirksteile': !exists(json, 'bezirksteile') ? undefined : (new Set((json['bezirksteile'] as Array<any>).map(BezirksteilFromJSON))),
        'viertel': !exists(json, 'viertel') ? undefined : (new Set((json['viertel'] as Array<any>).map(ViertelFromJSON))),
        'gemarkungen': !exists(json, 'gemarkungen') ? undefined : (new Set((json['gemarkungen'] as Array<any>).map(GemarkungFromJSON))),
        'kitaplanungsbereiche': !exists(json, 'kitaplanungsbereiche') ? undefined : (new Set((json['kitaplanungsbereiche'] as Array<any>).map(KitaplanungsbereichFromJSON))),
        'grundschulsprengel': !exists(json, 'grundschulsprengel') ? undefined : (new Set((json['grundschulsprengel'] as Array<any>).map(GrundschulsprengelFromJSON))),
        'mittelschulsprengel': !exists(json, 'mittelschulsprengel') ? undefined : (new Set((json['mittelschulsprengel'] as Array<any>).map(MittelschulsprengelFromJSON))),
        'multiPolygon': !exists(json, 'multiPolygon') ? undefined : MultiPolygonGeometryFromJSON(json['multiPolygon']),
        'centroid': !exists(json, 'centroid') ? undefined : PointGeometryFromJSON(json['centroid']),
        'centroidUtm': !exists(json, 'centroidUtm') ? undefined : UtmFromJSON(json['centroidUtm']),
    };
}

export function VerortungMultiPolygonToJSON(value?: VerortungMultiPolygon | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'stadtbezirke': value.stadtbezirke === undefined ? undefined : (Array.from(value.stadtbezirke as Set<any>).map(StadtbezirkToJSON)),
        'bezirksteile': value.bezirksteile === undefined ? undefined : (Array.from(value.bezirksteile as Set<any>).map(BezirksteilToJSON)),
        'viertel': value.viertel === undefined ? undefined : (Array.from(value.viertel as Set<any>).map(ViertelToJSON)),
        'gemarkungen': value.gemarkungen === undefined ? undefined : (Array.from(value.gemarkungen as Set<any>).map(GemarkungToJSON)),
        'kitaplanungsbereiche': value.kitaplanungsbereiche === undefined ? undefined : (Array.from(value.kitaplanungsbereiche as Set<any>).map(KitaplanungsbereichToJSON)),
        'grundschulsprengel': value.grundschulsprengel === undefined ? undefined : (Array.from(value.grundschulsprengel as Set<any>).map(GrundschulsprengelToJSON)),
        'mittelschulsprengel': value.mittelschulsprengel === undefined ? undefined : (Array.from(value.mittelschulsprengel as Set<any>).map(MittelschulsprengelToJSON)),
        'multiPolygon': MultiPolygonGeometryToJSON(value.multiPolygon),
        'centroid': PointGeometryToJSON(value.centroid),
        'centroidUtm': UtmToJSON(value.centroidUtm),
    };
}

