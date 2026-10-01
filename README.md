# Jan Footer-Popup

Version 1.1.0 · 1. Oktober 2026

Zentral gepflegtes Profilfenster für den Footer von Kundenwebsites. Die Gestaltung beruht auf der hochgeladenen Datei `Jan-Footer-Popup.html`; Dosis und Inter sowie die Schriftlizenzangaben sind weiterhin eingebettet.

## Einmalige Veröffentlichung

Das Repository ist für statisches Hosting vorbereitet. Für GitHub Pages im Repository unter **Settings → Pages** einstellen:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**
- **Save**

Nach erfolgreicher Veröffentlichung lautet die Standardadresse:

https://jandennisbruening.github.io/jdb-footer-banner/

Die Aktivierung von GitHub Pages ist eine Einstellung des Repositorys; das Vorhandensein dieser Dateien aktiviert den Dienst noch nicht. Alternativ können dieselben Dateien auf einem eigenen HTTPS-Webspace liegen. Der Einbindungscode muss dann auf die dortige `embed.js` zeigen.

## Footer-Code

```html
<a href="https://janbruening.de/" data-jdb-footer>
  Gestaltung &amp; Web: Jan Dennis Brüning
</a>
<script defer
  src="https://jandennisbruening.github.io/jdb-footer-banner/embed.js">
</script>
```

Der Code liegt auch in `Einbindung.html`. Einmal im Footer jeder Kundenwebsite einfügen. In WordPress beispielsweise in einem HTML-Widget des Footer-Templates; JavaScript muss dort zugelassen sein. Der Linktext übernimmt die Kundengestaltung und kann angepasst werden. Das Popup verwendet die zentrale Gestaltung. Ein zusätzliches Plugin ist nicht erforderlich.

## Verhalten

- `index.html` ohne Einbettungsparameter zeigt die eigenständige Vorschau.
- `embed.js` lädt das Profil erst nach Klick auf einen Link mit `data-jdb-footer` in einen abgeschotteten iframe. Die kleine JavaScript-Datei wird bereits mit der Kundenwebsite abgerufen.
- Intro- und Outroanimationen bleiben erhalten; bei reduzierter Bewegung werden sie übersprungen.
- Kreuz, Escape und Klick außerhalb des Profilfensters schließen es. Anschließend werden Fokus und Scrollverhalten wiederhergestellt.
- Website und E-Mail bleiben https://janbruening.de/ und digital@janbruening.de.
- Ohne JavaScript beziehungsweise ohne Dialogunterstützung bleibt der normale Link zur Website erhalten. Bei einem fehlgeschlagenen Abruf erscheint nach spätestens zwölf Sekunden ein Hinweis mit einem direkten Website-Link und einer Schließen-Schaltfläche.
- Die Nachrichten zwischen Rahmen und Kundenwebsite werden über Absenderfenster und einen zufälligen Kanal geprüft. Der iframe hat durch die Sandbox einen opaken Ursprung.
- Die Schriftdateien liegen im HTML; das Profil setzt selbst keine Tracking-Cookies. Der Hostinganbieter kann technisch notwendige Zugriffsdaten verarbeiten.

## Zentrale Änderungen

Gestaltung und Inhalte werden in `index.html` aktualisiert. GitHub Pages veröffentlicht Änderungen an `main`, sobald der Dienst eingerichtet ist und der Veröffentlichungsprozess erfolgreich läuft. Ein neues Öffnen lädt das Profil erneut mit einer neuen Abrufadresse. Bereits geöffnete Fenster werden nicht live verändert.

GitHub nennt für die Veröffentlichung eine mögliche Wartezeit von bis zu zehn Minuten. Die Einbindungsdatei `embed.js` kann zusätzlich im Browser beziehungsweise beim Hostinganbieter zwischengespeichert werden. Änderungen am Einbindungsprotokoll müssen daher mit früheren Fassungen kompatibel bleiben.

Beim Übernehmen einer neuen eigenständigen Gestaltung müssen der Einbettungsmodus im Dokumentkopf und die Nachrichtenverbindung am Dokumentende erhalten bleiben. Die Kundenwebsites brauchen für normale Inhalts- und Gestaltungsänderungen keine Anpassung.

## Technische Voraussetzung

Die Kundenwebsite muss das Laden der Einbindungsdatei und des iframe vom zentralen Hosting erlauben. Bei einer Content-Security-Policy betrifft das insbesondere `script-src` und `frame-src`. Das Profil benötigt kein WordPress-Backend und kann unter verschiedenen Website-Systemen eingesetzt werden.
