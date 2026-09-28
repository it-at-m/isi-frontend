# Release Notes

## ISI 2.0 Juli 2026 Version 2.0.0

### Infrastrukturabfragen

Die Begriffe im **Bauleitplanverfahren** sind standardisiert und gewährleisten die Kompatibilität mit dem Objektartenkatalog des Standards Xplanung. In der Abfrage wurde das Feld "Stand des Verfahrens“ umbenannt in "Verfahrensstand". Außerdem wurde in der Abfragevariante der Begriff „Wesentliche Rechtsgrundlage“ in „Planart“ geändert. Die bisherigen zur Verfügung stehenden Optionen im Dropdownfeld wurden in beiden Feldern angepasst.

Die Dropdown-Menüs im Verfahren **Baugenehmigungsverfahren** wurden in Anlehnung an ProLBK zur Verbesserung der Kommunikation mit der HA IV bzw. der Begutachtung der HAII angepasst. In der Abfrage wurde das Feld „Stand des Verfahrens“ umbenannt in "Verfahrensstand" und die Optionen im Dropdownfeld an die Gegebenheiten des Baugenehmigungsverfahren angepasst. In der Abfragevariante wurden die Optionen des Dropdownfeldes "Wesentliche Rechtsgrundlage" abgestimmt. Zur besseren Übersicht wurde das Menü zum Fördermix an die Gegebenheiten der Abfrageart Baugenehmigungsverfahren angepasst.

Die entsprechenden Begriffe der Abfrageart **Weiteres Verfahren** wurden entsprechen der Änderungen der Begrifflichkeiten im Bauleitplan- bzw. Baugenehmigungsverfahren angepasst.

Alle Abfragearten haben ein neues Symbol erhalten, dieses wird in allen Formularen und in erstellten Objekten angezeigt, um während der Bearbeitung immer zu erkennen, um welche Abfrageart es sich handelt. Außerdem ist es für die Nutzenden möglich, über das neue Icon zu "hovern", um die Abfrageart angezeigt zu bekommen. In der Abfragevariante aller Abfragearten wurden zur Vermeidung von Missverständnissen Informationen zu den Sonderwohnformen verändert.

### Vorhaben (ehemals Bauvorhaben)

Für ein gemeinsames Verständnis wurde der Begriff Bauvorhaben in Vorhaben verändert. Im Vorhaben erfolgte ein Abgleich der Begrifflichkeiten zu allen Abfragearten. Sobald ein neuer Kommentar im Vorhaben verfasst wird, wird eine E-Mail mit Informationen zu Name und Link des Vorhabens, alle verknüpften Abfragen sowie Text und Datum des Kommentars an eine Gruppen E-Mail für die Sachbearbeitung gesandt. Das Datumsfeld ist standardmäßig mit dem Erstellungsdatum versehen, kann jedoch weiterhin verändert werden.

### Verortung

In der Karte zur Verortung können nun neben den Flurstücken auch die Umgriffe der Baublöcke und Bebauungspläne für eine Verortung zur Auswahl herangezogen werden. Es wurde der Förderschulsprengel in der Karte als Geodatenlayer integriert.

### Benutzerfreundlichkeit

Die Informations-E-Mails zum Vorliegen eines Arbeitsauftrags für alle Rollen wurden um einen Link, der direkt zur entsprechenden Abfrage führt, ergänzt. Neben dem Link erhält man zusätzlich Informationen zur Bearbeitungsfrist. Das Feld Fördermix wurde als Pflichtfeld entsprechend gekennzeichnet. Für die Sachbearbeitung ist es möglich, aus einer Abfrage mit einem Klick in ein verknüpftes Vorhaben springen, um die Kommentare im Vorhaben schnell lesen zu können. Das Vorhaben wird dabei in einem neuen Fenster geöffnet. Bei nachträglicher Veränderung des Attributes "Realisierung von" können die Bauraten in Anlehnung an die Veränderung neu ermittelt werden.

### Stammdaten

Die Bevölkerungs- und Prognosedaten wurden entsprechend der neuen Vorgaben angepasst. Das hinterlegte Schema zur Berechnung der idealtypischen Bauraten in den Stammdaten wird gemäß der den neuen Vorgaben aktualisiert und für die Berechnungen genutzt. Im Vergleich zu den bisher hinterlegten idealtypischen Bauraten wird der idealtypische Realisierungszeitraum in jeder Bauvorhabengröße um bis zu 2 Jahre verlängert und umfasst nun bis zu 9 Jahre. Bei der SoBoN-Berechnung erfolgte eine Aktualisierung bei der Aufteilung der Wohneinheiten auf Bauraten.

Die Stammdaten zu den städtebaulichen SoBoN-Orientierungswerten (Geschossfläche und Einwohneranzahl) sind an die neuen Stadtratsvorgaben angepasst. Dabei wurde ein neues Feld "Start 4.2-Verfahren" im Formular der Abfrageart Bauleitplanverfahren im Kasten "Allgemeine Informationen zum Verfahren" implementiert und ein weiteres Feld "Datum unbekannt" steht als Tickbox zur Verfügung, wobei diese beiden Felder bilden in Kombination (entweder oder) Pflichtfelder. Eine neues Dropdown-Menü "Bauratenmethodik" ist im Formular der Abfrageart Bauleitplanverfahren implementiert.

### Technische Anpassungen

Ein dedizierter Entwicklungsbranch wurde eingerichtet werden, um die zukünftige Entwicklung sauber vom aktuellen Stand zu trennen und eine strukturierte Weiterentwicklung zu ermöglichen. Außerdem wurden zwei neue Datenbank Instanzen auf Test für die Test- und die Demoumgebung erstellt, auf die ein Zugriff möglich ist.

Zur besseren Verwaltung der Reporte sind diese in einem einfachen lesbaren SQL-Abfrage migriert. Dabei werden auch mehrfach genutzte Logiken in spezielle Fragen ausgelagert (Modularisierung).
