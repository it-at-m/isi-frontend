# Technischer Setup

## Voraussetzungen

Für den Bau des Frontend Services muss JDK 11 (oder neuer), Maven 3.8.1 (oder neuer) und npm 8.11.0 (oder neuer) installiert sein:

    java -version
    mvn -version
    npm -version

Für den Bau des Backend Services muss JDK 11 (oder neuer) und Maven 3.8.1 (oder neuer) installiert sein:

    java -version
    mvn -version

## Source Code des Frontends holen

Sourcen auf den lokalen Rechner holen

    git clone https://github.com/it-at-m/isi-frontend.git
    cd isi-frontend

Die Sourcen sind in zwei Verzeichnissen abgelegt:

1. `apigateway`: Enthält die Sourcen des API Gateways.
2. `frontend`: Enthält die Sourcen der Oberfläche.

## Source Code des Backends holen

Sourcen auf den lokalen Rechner holen

    git clone https://github.com/it-at-m/isi-backend.git
    cd isi-backend

## Konfiguration des Services

### Frontend

Für die lokale Umgebung erstellt man die Konfigurationsdatei.

    apigateway/src/main/resources/application-local.yml

Das API Gateway startet standardmäßig mit dem Port `8082`. Dieser kann in der lokalen Umgebung über die
Konfigurationsdatei umgestellt werden.

In der Konfigurationsdatei wird außerdem die Route zum Backend, die für den Zugriff auf das API Gateway erlaubten URLS und
optional eine Anbindung an einen Identity Provider über OpenId Connect konfiguriert.

Ein Beispiel für eine Konfigurationsdatei befindet sich unter [Konfiguration lokaler Umgebung](/configuration/env/#lokale-umgebung).

Diese konfiguriert den API Gateway Port, die Route zum Backend Service auf dem lokalen Rechner und die URLs des
für die Entwicklung lokal gestareten Frontends.

### Backend

Für die lokale Umgebung erstellt man die Konfigurationsdatei

    src/main/resources/application-local.yml

Der Backend Service startet standardmäßig mit dem Port `8080` und sollte in der lokalen Umgebung umgestellt werden.

Zusätzlich wird die Datenbank, die Anbindung an einen
[S3 Storages Service](https://github.com/it-at-m/digiwf-core/tree/dev/digiwf-integrations/digiwf-s3-integration)
mit zulässigen MIME-Types für das Dateihandling und
optional eine Anbindung an einen Identity Provider über OpenId Connect in der Konfigurationsdatei konfiguriert.

Ein Beispiel für eine Konfigurationsdatei befindet sich unter [Konfiguration lokaler Umgebung](/configuration/env/#lokale-umgebung).

Diese konfiguriert den Server Port, eine HSQL Datenbank, einen lokalen Service zur Anbindung eines
[S3 Storages Services](https://github.com/it-at-m/digiwf-core/tree/dev/digiwf-integrations/digiwf-s3-integration) und
die für den Dateiupload zulässigen MIME-Types pdf und png.

## Build und Start

### Bau der Services

Die Services werden mit folgendem Befehl gebaut

    mvn clean install

### Start der Services

Es befinden sich die folgenden Scripts zum Start der Services auf dem lokalen Rechner:

1. `runLocal.bat` bzw. `runLocal.sh`: Die Benutzer\*innen müssen sich über einen Identity Provider authentifizieren.
2. `runLocalNoSecurity.bat` bzw. `runLocalNoSecurity.sh`: Die Anwendung kann ohne Authentifizierung bedient werden.

Bei isi-frontend wird das API Gateway mit dem integrierten Frontend gestartet. Diese Scripts befinden sich deshalb im Verzeichnis `apigateway`.

Beim Backend befinden sich die Scripts im Wurzelverzeichnis `.`.

Zum Start eines Services wird eines der Scripts ausgeführt, z.B. zum Start des API Gateways:

    cd apigateway
    runLocalNoSecurity.sh

Für die Entwicklung kann zusätzlich das Frontend separat gestartet werden. Dieses nutzt das lokale
API Gateway für die Zugriffe auf das Backend. Zum Start des Frontends führt man folgende Befehle aus:

    cd frontend
    npm install
    npm run dev
