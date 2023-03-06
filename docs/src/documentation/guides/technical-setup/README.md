# Technischer Setup

## Voraussetzungen

Für den Bau des Services muss JDK 11 (oder neuer), Maven 3.8.1 (oder neuer) und npm 8.11.0 (oder neuer) installiert sein:

    java -version
    mvn -version
    npm -version

Für diesen Service wird ein Backend unter [isi-backend](https://github.com/it-at-m/isi-backend) bereitgestellt.

## Source Code holen
Sourcen auf den lokalen Rechner holen

    git clone https://github.com/it-at-m/isi-frontend.git
    cd isi-frontend

Die Sourcen sind in zwei Verzeichnissen abgelegt:
1. `apigateway`: Enthält die Sourcen des API Gateways.
2. `frontend`: Enthält die Sourcen der Oberfläche.

## Konfiguration des Services

Für die lokale Umgebung erstellt man die Konfigurationsdatei 

    apigateway/src/main/resources/application-local.yml

Das API Gateway startet standardmäßig mit dem Port `8082`. Dieser kann in der lokalen Umgebung über die 
Konfigurationsdatei umgestellt werden.

In der Konfigurationsdatei wird außerdem die Route zum Backend, die für den Zugriff auf das API Gateway erlaubten URLS und
optional eine Anbindung an einen Identity Provider über OpenId Connect konfiguriert.

Ein Beispiel für eine Konfigurationsdatei befindet sich unter [Konfiguration lokaler Umgebung](/configuration/env/#lokale-umgebung).

Diese konfiguriert den API Gateway Port, die Route zum Backend Service auf dem lokalen Rechner und die URLs des
für die Entwicklung lokal gestareten Frontends.

## Build und Start

### Bau des Services

Der Service wird mit folgendem Befehl gebaut

    mvn clean install

### Start des Services

Im Verzeichnis `apigateway` befinden sich Scripts zum Start des API Gateways auf dem lokalen Rechner:

1. `runLocal.bat` bzw. `runLocal.sh`: Die Benutzer*innen müssen sich über einen Identity Provider authentifizieren.
2. `runLocalNoSecurity.bat` bzw. `runLocalNoSecurity.sh`: Die Anwendung kann ohne Authentifizierung bedient werden.

Zum Start des API Gateways wird eines der Scripts im Verzeichnis `apigatway` ausgeführt, z.B.:

    cd apigateway
    runLocalNoSecurity.sh

Für die Entwicklung kann zusätzlich das Frontend gestartet werden. Dieses nutzt das lokale
API Gateway für die Zugriffe auf das Backend. Zum Start des Frontends führt man folgende Befehle aus:

    cd frontend
    npm install
    npm run dev