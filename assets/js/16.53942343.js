(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{296:function(e,n,t){"use strict";t.r(n);var a=t(6),r=Object(a.a)({},(function(){var e=this,n=e._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"technischer-setup"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#technischer-setup"}},[e._v("#")]),e._v(" Technischer Setup")]),e._v(" "),n("h2",{attrs:{id:"voraussetzungen"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#voraussetzungen"}},[e._v("#")]),e._v(" Voraussetzungen")]),e._v(" "),n("p",[e._v("Für den Bau des Services muss JDK 11 (oder neuer), Maven 3.8.1 (oder neuer) und npm 8.11.0 (oder neuer) installiert sein:")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("java -version\nmvn -version\nnpm -version\n")])])]),n("p",[e._v("Für diesen Service wird ein Backend unter "),n("a",{attrs:{href:"https://github.com/it-at-m/isi-backend",target:"_blank",rel:"noopener noreferrer"}},[e._v("isi-backend"),n("OutboundLink")],1),e._v(" bereitgestellt.")]),e._v(" "),n("h2",{attrs:{id:"source-code-holen"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#source-code-holen"}},[e._v("#")]),e._v(" Source Code holen")]),e._v(" "),n("p",[e._v("Sourcen auf den lokalen Rechner holen")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("git clone https://github.com/it-at-m/isi-frontend.git\ncd isi-frontend\n")])])]),n("p",[e._v("Die Sourcen sind in zwei Verzeichnissen abgelegt:")]),e._v(" "),n("ol",[n("li",[n("code",[e._v("apigateway")]),e._v(": Enthält die Sourcen des API Gateways.")]),e._v(" "),n("li",[n("code",[e._v("frontend")]),e._v(": Enthält die Sourcen der Oberfläche.")])]),e._v(" "),n("h2",{attrs:{id:"konfiguration-des-services"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#konfiguration-des-services"}},[e._v("#")]),e._v(" Konfiguration des Services")]),e._v(" "),n("p",[e._v("Für die lokale Umgebung erstellt man die Konfigurationsdatei")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("apigateway/src/main/resources/application-local.yml\n")])])]),n("p",[e._v("Das API Gateway startet standardmäßig mit dem Port "),n("code",[e._v("8082")]),e._v(". Dieser kann in der lokalen Umgebung über die\nKonfigurationsdatei umgestellt werden.")]),e._v(" "),n("p",[e._v("In der Konfigurationsdatei wird außerdem die Route zum Backend, die für den Zugriff auf das API Gateway erlaubten URLS und\noptional eine Anbindung an einen Identity Provider über OpenId Connect konfiguriert.")]),e._v(" "),n("p",[e._v("Ein Beispiel für eine Konfigurationsdatei befindet sich unter "),n("RouterLink",{attrs:{to:"/configuration/env/#lokale-umgebung"}},[e._v("Konfiguration lokaler Umgebung")]),e._v(".")],1),e._v(" "),n("p",[e._v("Diese konfiguriert den API Gateway Port, die Route zum Backend Service auf dem lokalen Rechner und die URLs des\nfür die Entwicklung lokal gestareten Frontends.")]),e._v(" "),n("h2",{attrs:{id:"build-und-start"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#build-und-start"}},[e._v("#")]),e._v(" Build und Start")]),e._v(" "),n("h3",{attrs:{id:"bau-des-services"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#bau-des-services"}},[e._v("#")]),e._v(" Bau des Services")]),e._v(" "),n("p",[e._v("Der Service wird mit folgendem Befehl gebaut")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("mvn clean install\n")])])]),n("h3",{attrs:{id:"start-des-services"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#start-des-services"}},[e._v("#")]),e._v(" Start des Services")]),e._v(" "),n("p",[e._v("Im Verzeichnis "),n("code",[e._v("apigateway")]),e._v(" befinden sich Scripts zum Start des API Gateways auf dem lokalen Rechner:")]),e._v(" "),n("ol",[n("li",[n("code",[e._v("runLocal.bat")]),e._v(" bzw. "),n("code",[e._v("runLocal.sh")]),e._v(": Die Benutzer*innen müssen sich über einen Identity Provider authentifizieren.")]),e._v(" "),n("li",[n("code",[e._v("runLocalNoSecurity.bat")]),e._v(" bzw. "),n("code",[e._v("runLocalNoSecurity.sh")]),e._v(": Die Anwendung kann ohne Authentifizierung bedient werden.")])]),e._v(" "),n("p",[e._v("Zum Start des API Gateways wird eines der Scripts im Verzeichnis "),n("code",[e._v("apigatway")]),e._v(" ausgeführt, z.B.:")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("cd apigateway\nrunLocalNoSecurity.sh\n")])])]),n("p",[e._v("Für die Entwicklung kann zusätzlich das Frontend gestartet werden. Dieses nutzt das lokale\nAPI Gateway für die Zugriffe auf das Backend. Zum Start des Frontends führt man folgende Befehle aus:")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("cd frontend\nnpm install\nnpm run dev\n")])])])])}),[],!1,null,null,null);n.default=r.exports}}]);