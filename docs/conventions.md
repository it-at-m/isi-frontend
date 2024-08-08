# Konventionen

## Sprache

Die Dokumentationssprache ist deutsch.

Im Code wird die englische Sprache verwendet. Fachliche Begriffe werden jedoch in Deutsch benannt
(z. B. `calculateBedarf()`).

## Namenskonventionen

Attribute, Variablen, Methodenparameter und Methodennamen sind im Code der GUI sowie im backendseitigen
Code grundsätzlich in [camelCase](https://en.wikipedia.org/wiki/Camel_case) zu schreiben, z.B. `gesamtanzahlWe`.

Alle Variablen und Parameter sind wenn möglich als `final` und `private` zu deklarieren.

Konstanten sind als `private`, `static` und `final` sowie in **UPPER_CASE** zu definieren.

Das Java-Sprachfeature `var` kann verwendet werden, wenn der Datentyp eindeutig bei der
Zuweisung erkennbar ist.

## Frontend Coding Guidelines

-   Die Bezeichner von Custom Components werden in HTML im kebab-case geschrieben, z.B.: `<abfrage-component/>`
-   Wo möglich sollen die Typescript Decorator für Vue verwendet werden, siehe auch https://github.com/strantr/vuety
-   Alle Objekte, die in Komponenten benötigt werden, sind im Vuex-Store vorzuhalten und von dort zu holen.
-   Statusänderungen eines Objektes sind über den Vuex-Store vorzunehmen und nicht über Events an übergeordnete Komponenten zurückzuspiegeln.
