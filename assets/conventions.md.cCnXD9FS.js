import{_ as e,c as n,o as t,a4 as a}from"./chunks/framework.DpC1ZpOZ.js";const _=JSON.parse('{"title":"Konventionen","description":"","frontmatter":{},"headers":[],"relativePath":"conventions.md","filePath":"conventions.md"}'),o={name:"conventions.md"},i=a('<h1 id="konventionen" tabindex="-1">Konventionen <a class="header-anchor" href="#konventionen" aria-label="Permalink to &quot;Konventionen&quot;">​</a></h1><h2 id="sprache" tabindex="-1">Sprache <a class="header-anchor" href="#sprache" aria-label="Permalink to &quot;Sprache&quot;">​</a></h2><p>Die Dokumentationssprache ist deutsch.</p><p>Im Code wird die englische Sprache verwendet. Fachliche Begriffe werden jedoch in Deutsch benannt (z. B. <code>calculateBedarf()</code>).</p><h2 id="namenskonventionen" tabindex="-1">Namenskonventionen <a class="header-anchor" href="#namenskonventionen" aria-label="Permalink to &quot;Namenskonventionen&quot;">​</a></h2><p>Attribute, Variablen, Methodenparameter und Methodennamen sind im Code der GUI sowie im backendseitigen Code grundsätzlich in <a href="https://en.wikipedia.org/wiki/Camel_case" target="_blank" rel="noreferrer">camelCase</a> zu schreiben, z.B. <code>gesamtanzahlWe</code>.</p><p>Alle Variablen und Parameter sind wenn möglich als <code>final</code> und <code>private</code> zu deklarieren.</p><p>Konstanten sind als <code>private</code>, <code>static</code> und <code>final</code> sowie in <strong>UPPER_CASE</strong> zu definieren.</p><p>Das Java-Sprachfeature <code>var</code> kann verwendet werden, wenn der Datentyp eindeutig bei der Zuweisung erkennbar ist.</p><h2 id="frontend-coding-guidelines" tabindex="-1">Frontend Coding Guidelines <a class="header-anchor" href="#frontend-coding-guidelines" aria-label="Permalink to &quot;Frontend Coding Guidelines&quot;">​</a></h2><ul><li>Die Bezeichner von Custom Components werden in HTML im kebab-case geschrieben, z.B.: <code>&lt;abfrage-component/&gt;</code></li><li>Wo möglich sollen die Typescript Decorator für Vue verwendet werden, siehe auch <a href="https://github.com/strantr/vuety" target="_blank" rel="noreferrer">https://github.com/strantr/vuety</a></li><li>Alle Objekte, die in Komponenten benötigt werden, sind im Vuex-Store vorzuhalten und von dort zu holen.</li><li>Statusänderungen eines Objektes sind über den Vuex-Store vorzunehmen und nicht über Events an übergeordnete Komponenten zurückzuspiegeln.</li></ul>',11),r=[i];function d(s,c,l,h,u,p){return t(),n("div",null,r)}const b=e(o,[["render",d]]);export{_ as __pageData,b as default};
