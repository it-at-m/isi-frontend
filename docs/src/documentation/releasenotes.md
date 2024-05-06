# ReleaseNotes

## ISI Version 1.2.0

### Infrastrukturabfragen

Für die Infrastrukturabfragen sind die drei Abfragearten Bauleitplanverfahren, Baugenehmigungsverfahren und Weiteres Verfahren entstanden. Die Attribute der Oberfläche sind neu sortiert, gruppiert und teilweise umbenannt. Die Drop Down-Inhalte sind entsprechend der Abfrageart angepasst. Die Verwaltung der drei Infrastrukturabfragearten ist gewährleistet. Die Verwaltung umfasst das Erstellen, das Anzeigen, die Änderung, das Prüfen/Bewerten sowie das Löschen von Abfragen zur sozialen Infrastruktur.

Über die Abfrageart Weiteres Verfahren kann die Standortabfrage abgedeckt werden.

Neben den allgemeinen Informationen zu den Abfragen, können zusätzliche Anmerkungen sowie Dokumente zur Abfrage hinterlegt werden. Seitens der Rolle des Abfrageerstellenden muss mindestens eine und können bis zu fünf Abfragevarianten erstellt werden. Die Rolle der Sachbearbeitung PLAN darf ebenfalls die Abfrage um bis zu fünf Abfragevarianten ergänzen.
Die Abfragevarianten zeigen die Verteilung der Bauraten über mehrere Jahre an und geben Auskunft über die Verwendung verschiedener Fördermixe. Es können mehrere Abfragen mit Abfragevarianten für ein Bauvorhaben erstellt werden. Pro Abfrage kann eine Abfragevariante als relevant markiert werden. Eine Prüfung dieser Bedingung ist gegeben.

Abfragevarianten können über eine Hierarchie von Bauabschnitten, Baugebieten und Bauraten verfügen. Der hierarchische Aufbau erlaubt es, einzelne Ebenen wegzulassen, wenn diese nicht benötigt werden. So können die Bauraten auch direkt einer Abfragevariante untergeordnet sein.

Mit Angabe der Anzahl der geplanten Wohneinheiten oder der Geschossfläche des Bauvorhabens kann aktiv durch den Abfrageerstellenden eine automatische Berechnung der idealtypischen Bauraten angestoßen werden. Die Werte werden angezeigt. Eine manuelle Änderung der Verteilung der Bauraten ist weiterhin gewährleistet, wobei dabei eine Validierung hinterlegt ist, die die manuellen Eingaben auf Stimmigkeit mit der Angabe der Gesamtwohneinheiten des Bauvorhabens prüft. Bei Vorhandensein von Bauabschnitten und Baugebieten werden die idealtypischen Bauraten entsprechend der Hierarchie aggregiert.

Die Infrastrukturabfragen aller drei Abfragearten durchlaufen einen sogenannten Abfrageprozess in welchem die verschiedenen Rollen ihre entsprechenden Einträge vornehmen. Der Abfrageprozess wird durch Statusübergänge - Auslösen über Buttons - durchlaufen.

Für alle Abfragearten, ist die Datengrundlage für die Bauratendatei und Schülerpotenzialprognose geschaffen. Dabei werden Informationen zum Grund- und Mittelschulsprengel sowie zu den Vierteln aus der Verortung herausgelesen und automatisch in ISI befüllt. Eine manuelle Änderung ist möglich. Entsprechende Validierungsregeln sind umgesetzt.

Für alle Abfragearten, die eine Verbindung zu Vorgängen innerhalb der e-Akte haben, ist es möglich den entsprechenden Link zum Vorgang der e-Akte anzugeben.

### Berechnungen

In allen Abfragearten können in den einzelnen Varianten Berechnungen für planungsursächliche Bedarfen an Kinderbetreuungsplätzen vorgenommen werden. Die Abfragearten Bauleitplanverfahren und weitere Verfahren bieten zusätzlich die Möglichkeit eine Berechnung für die SoBoN-Bedarfe (Sozialgerechte Bodennutzung) durchzuführen. Dabei gilt es zu unterscheiden, dass eine planungsursächliche Berechnung für jede Abfragevariante erfolgen muss, eine SoBoN-Berechnung nur für bestimmte Varianten ausgelöst werden darf.

Bei der Berechnung greift ISI auf die in der Anwendung hinterlegten Stammdaten zurück als auch auf Information, die vorab durch die Rolle Abfrageerstellung eingegeben bzw. durch ISI ermittelt worden sind, z.B. idealtypischen Bauraten, Förderarten mit unterschiedlichen Fördermixen.

Da es nicht für alle Förderarten Orientierungswerte aus der SoBoN-Grundlagenuntersuchung gibt, wurde auch eine so genannte Umlegung der Förderarten innerhalb von ISI berücksichtigt. Dadurch ist gewährleistet, dass die in ISI hinterlegten Fördermixe für die planungsursächliche und SoBoN-ursächliche Bedarfsberechnung genutzt werden können.

Für den Fall, dass alleinig die Geschossfläche Wohnen und nicht die Wohneinheiten bekannt sind, erfolgt für die planungsursächliche Bedarfsberechnung automatisch eine Umrechnung der Geschossfläche Wohnen in die Wohneinheiten je Förderart.

Die Ermittlung der Bedarfe erfordert verschiedene Berechnungen, die zu einem Teil in ISI erfolgen, zu einem anderen Teil in Metabase durchgeführt werden. Die Anzeige der Ergebnisse für die Berechnungen werden als Report in Metabase zur Verfügung gestellt, wobei der Zugriff auf die Reporte in ISI über einen Link gewährleistet ist.

### Schülerpotenzialprognose

Die Daten für die Bauratendatei, die als Grundlage für das Erstellen der Schülerpotentialprognose sowie die kleinräumige Bevölkerungsprognose dienen, können in ISI eingetragen werden.
Die Inhalte für die Attribute Grundschul-, Mittelschulsprengel und Viertel werden aus der Verortung ermittelt und angezeigt. Es können mehrere Grundschul-, Mittelschulsprengel und Viertel angezeigt werden. Die Anzahl der Wohneinheiten je Baurate und Wohnungstyp werden aus den Bauraten ermittelt. Eine manuelle Änderung der Daten ist gegeben. Dabei ist ebenfalls eine Validierung nach manueller Anpassung gewährleistet.

### Benachrichtigungen

Die Rollen Abfrageerstellung, Sachbearbeitung und Bedarfsmeldung erhalten jeweils eine Nachricht, wenn ein Arbeitsauftrag vorliegt. Für die Rollen Sachbearbeitung und Bedarfsmeldung wurde ein E-Mail-Verteiler eingerichtet, damit eine Gruppe von bestimmten Adressaten die Nachricht erhält. Die Nachricht wird über den E-Mail-Verteiler in das persönliche Postfach übertragen. Die Rolle Abfrageersteller erhält die Nachricht über den Arbeitsauftrag direkt (ohne E-Mail-Verteiler) an das persönliche Postfach.

### Bauvorhaben

Die Festlegung der Fläche der Bauvorhaben zur Visualisierung auf einer Karte erfolgt interaktiv durch Anklicken und Zusammenführen von Flächen. Dadurch ergibt sich eine geographische Verortung des Bauvorhabens.

Informationen zum Bauvorhaben erfolgen in einem Formular. Die Verwaltung von Bauvorhaben betrifft das Anlegen, Auflisten, Lesen und Ändern von Bauvorhaben sowohl graphisch als auch formularseitig, beispielsweise Änderung des Bebauungsplanumgriffs, Änderung der Rechtsgrundlage zur Planung, Änderung des Namens oder des Status des Bauvorhabens. Alternativ können Informationen aus Abfragen, die für das Bauvorhaben von Bedeutung sind, aus einer Abfrage importiert werden. Neben den allgemeinen Informationen zu den Bauvorhaben, können zusätzliche Anmerkungen sowie Dokumente zum Bauvorhaben hinterlegt werden.

Außerdem wird verdeutlicht, ob Abfragen oder Infrastruktureinrichtungen diesem Bauvorhaben zugeordnet sind. Dabei ist gewährleistet, dass Bauvorhaben erst dann gelöscht werden können (falls nötig), wenn zugeordnete Abfragen bzw. Infrastruktureinrichtungen vorab gelöst wurden.

Für die Rolle Sachbearbeitung PLAN ist ein neuer Rahmen für interne Kommentare hinterlegt. Mit Datum können nun beliebig viele interne Anmerkungen und pro Anmerkung bis zu 20 Dokumente hinzugefügt werden.

### Infrastruktureinrichtungen

Die Verwaltung der Infrastruktureinrichtungen ist gewährleistet. Änderungen, die eine Verwaltung der z. B. Kindertageseinrichtungen erfordern, können bei bestehenden Kindertageseinrichtungen beispielsweise eine Adressänderung, die Änderungen der bestehenden Plätze oder ein Trägerwechsel sein. Infrastruktureinrichtungen können eingestellt, aufgelistet, nach Typ sortiert, gelesen und verändert bzw. gelöscht werden. Vom Typ werden die Infrastruktureinrichtungen zwischen Kinderkrippe, Kindergarten, Grund- und Mittelschule, Nachmittagsbetreuung für Grundschulkinder und dem Haus für Kinder unterschieden. Die im Formular enthaltenen gemeinsamen Attribute sind zum Beispiel "Name der Einrichtung". Je nach Typ werden im weiteren Formular die den Typ entsprechenden Attribute (Eingabefelder) angezeigt, zum Beispiel "Anzahl Gruppen" versus "Anzahl Klassen".

Die Verortung der Infrastruktureinrichtungen ist umgesetzt. Die Rolle Sachbearbeitung PLAN kann - wenn keine Adresse bekannt - manuell eine Koordinate setzen. Sobald die Eingabe einer korrekten Adresse erfolgt, wird die manuell eingegebene Koordinate durch die korrekte Adresskoordinate ersetzt.

Setzen der roten Stecknadel in der Verortungskarte
Nach Bestätigung einer korrekten Adresse wird in der Verortungskarte eine rote Stecknadel als Markierung der Infrastruktureinrichtung gesetzt. Die Koordinate und administrative Informationen zu den Einrichtungen werden ergänzt.

Für die Rolle Sachbearbeitung PLAN ist ein neuer Rahmen für interne Kommentare hinterlegt. Mit Datum können nun beliebig viele interne Anmerkungen und pro Anmerkung bis zu 20 Dokumente hinzugefügt werden.

### Dokumente

Dokumente in einer Vielzahl von Dateiformaten können an Abfragen, Bauvorhaben und Infrastruktureinrichtungen hinzugefügt werden. Zur leichteren Kategorisierung kann für jedes Dokument noch die Dokumentenart (E-Mail, Beschluss usw.) bestimmt werden. Pro Abfrage oder Bauvorhaben können bis zu 20 Dokumente
hochgeladen werden. Über ein internen Kommentarrahmen innerhalb der Bauvorhaben und Infrastruktureinrichtungen können pro Anmerkung weitere 20 Dokumente hinzugefügt werden. Außerdem wird ein Hochladen von Dokumente von bis zu 50 MB ermöglicht.

### Rechte, Rollen

Das Registrieren erfolgt über Single Sign-On. Ein Rollen und Rechtekonzept ermöglicht es Nutzer\*innen über Rollen zu definieren, die es gestatten, gewisse Inhalte zu erstellen, zu lesen und/oder zu ändern.

In den Objekten Infrastrukturabfrage, Bauvorhaben und Infrastruktureinrichtungen ist es möglich, Informationen zu den Bearbeiter\*innen zu erhalten, um einen Ansprechpartner\*in für (inhaltliche) Fragen zu haben.

Die Sichtrechte für die Reporte wurden ebenfalls nach den entsprechenden Rollen unterschieden.

Für die Rolle Nutzer, wurden die Sichtrechte eingeschränkt. Die Rolle hat nur noch auf Abfragen im Status "Erledigt" ein Sichtrecht.

### Status

Eine Abfrage befindet sich während ihrer Erstellung und Bearbeitung jeweils in einem Status. Über das Rollen- und Rechtekonzept wird geregelt, dass ein Statusübergang nur von der jeweils berechtigten Rolle ausgeführt werden darf. Mit dem Statusübergang geht die Abfrage in die nächste Bearbeitungsphase über. Aus der Kombination Status der Abfrage und Rolle der Nutzer\*innen ergeben sich auch die Sicht- und Bearbeitbarkeit bestimmter Eingabefelder.

### Verortung

Unter dem Register Karte wird eine Gesamtkarte dargestellt, die die Landeshauptstadt München (LHM) und ihre Randgebiete wiedergibt. Eine Karte zur Verortung ist in den Abfrage-, Bauvorhaben und Infrastruktureinrichtungsformularen bereits integriert. Die Lage der Infrastruktureinrichtungen, der Bauvorhaben bzw. der Abfragen ist über eine Verortung gewährleistet.

Zur Eingabe von Adressinformationen wird ein Suchfeld angeboten, mit welchem sich jede existierende Adresse der Stadt finden lässt. Ein zusätzliches Freitextfeld ermöglicht Angaben von noch nicht real bestehenden Adressen. Die Verortung ermöglicht es, innerhalb der Karte, Flurstücke auszuwählen und die Auswahl zu einem Multipolygon zusammenzuführen. Mit Bestätigung der Verortung werden Informationen zu den entsprechenden Stadtbezirken, die Gemarkungen und die betroffenen Eigentümer (städtisch bzw. nicht-städtisch) der Flurstücke angezeigt.

Die Karte verfügt über grundlegende Funktionen wie das "Verschieben" und "Zoomen" und der Möglichkeit, zusätzliche Ebenen von Informationen (z.B. Stadtbezirksgrenzen) ein- und ausblenden zu können.

Die Einstiegskarte ist um die administrativen Layer Bezirksteile, Viertel, Kitaplanungsbereiche, Grund- und Mittelschulsprengel sowie der Flächennutzungsplan ergänzt worden. Diese können über ein Klick ein- und ausgeblendet werden.

### Suche und Filterung sowie Anzeige in der Karte

Die Objekte Abfragen, Bauvorhaben und Infrastruktureinrichtung können über die Suche gefunden und in der Karte angezeigt werden. Die Abfragen werden als grüne, die Infrastruktureinrichtungen als rote und die Bauvorhaben als blaue Stecknadel angezeigt. Ein Tooltip mit weiteren Informationen ist an jede Stecknadel gebunden. Bei Klick auf die Nadel gelangt man zur Formularansicht des entsprechenden Objektes.

Eine Filterung nach den drei Abfragearten und den Bauvorhaben ist gewährleistet. Dabei kann noch nach Erstellungsdatum und Änderungsdatum sortiert werden. Über das Filtersymbol ist ersichtlich, ob ein Filter aktiviert ist. Eingestellte Filter können zurückgesetzt werden.

### Stammdaten

Die Grundlagen zur Berechnung der idealtypischen Bauraten sind als Stammdaten in ISI hinterlegt. Ebenfalls integriert sind die verschiedenen Kombinationen der einzelnen Fördermixe.

Die städtebaulichen SoBoN-Orientierungswerte und die SoBoN-Orientierungswerte für soziale Infrastruktur, sind als Stammdaten in ISI hinterlegt.

Ebenfalls liegen die vorgegebenen Werte für die Versorgungsquote und die Gruppenstärke der jeweiligen Altersgruppen als Stammdaten in ISI vor.
