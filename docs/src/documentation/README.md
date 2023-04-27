# Einführung

Die ISI Anwendung wird in der Microservice Architektur umgesetzt und in Github als Multi-Repos verwaltet.

Derzeit werden die folgenden Services in Github unter der MIT Lizenz Open Source zur Verfügung gestellt:

## ISI Frontend

Das [ISI Frontend](https://github.com/it-at-m/isi-frontend) liefert die Weboberfläche der ISI Anwendung aus, enthält
Funktionalität zur Authentifizierung der Benutzer\*innen und veröffentlicht die Schnittstelle der ISI Anwendung.

## ISI Backend

Das [ISI Backend](https://github.com/it-at-m/isi-backend) ist der zentrale Microservice zur Verarbeitung der Daten
der ISI Anwendung. Er benötigt eine Datenbank zur Speicherung der Daten.

## S3 Storage

Die ISI Anwendung verwendet den
[S3 Storage Service](https://github.com/it-at-m/digiwf-core/tree/dev/digiwf-integrations/digiwf-s3-integration)
des digiWF Projekts, um Dokumente in einem S3 Storage zu speichern.

<!--
[Kontaktieren Sie uns einfach per E-Mail](/contact).
-->
