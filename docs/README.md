# ISI Dokumentation

## Source Code holen

Sourcen auf den lokalen Rechner holen und ins docs-Verzeichnis wechseln

    git clone https://github.com/it-at-m/isi-frontend.git
    cd isi-frontend/docs

## Mit lokaler node Installation

```bash
npm install
npm run dev
```

<!--
## Ohne lokale node Installation

Um Node / NPM und die notwendigen Module auf dem lokalen Rechner zu installieren, führt man diesen Befehl einmalig aus:
```bash
mvn install -Pdocs
```

Für die lokale Entwicklung der Dokumentation nutzt man diesen Befehl:
```bash
mvn -Pdocs -Pdev package
```
-->

Die Vorschau der Dokumentation ist über http://localhost:8080/ erreichbar.

## Ändern der Dokumentation

### Hinzufügen neuer Seiten

Neue Seiten im seitlichen Menü müssen in der Datei [src/.vuepress/config.js](src/.vuepress/config.js) hinzugefügt werden.
Siehe [vuepress docs](https://v1.vuepress.vuejs.org/theme/default-theme-config.html#sidebar) für weitere Informationen.

<!--
## Document new features and bugfixes

You should add new features to [src/features/index.md](src/features/index.md) with a title and a description
that users can see all capabilities of the DigiWF plattform at once.

Additionally, you should add new features, bugfix and every other change to the list in [src/features/changes/index.md](src/features/changes/index.md).
This list may be published as release notes and is the summary of the CHANGELOG.md.

> Note: The CHANGELOG.md keeps track of all changes the DigiWF plattform is undergoing.
> The main peer group of the CHANGELOG.md are software developers that use (components of) the DigiWF plattform
> and need detailed information about every change.

### Adding element-templates and examples

You can add element-templates and example processes to [src/.vuepress/public](src/.vuepress/public)
and list them in the according files under [src/modeling/templates](src/modeling/templates).

-->
