# Jan Footer-Popup

Version 1.2.0 · 1. Oktober 2026

Zentral gepflegtes Profilfenster von Jan Dennis Brüning für den Footer von Kundenwebsites.

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
<script defer
  src="https://jandennisbruening.github.io/jdb-footer-banner/embed.js">
</script>
```

Diese Skriptzeile einmal an der gewünschten Stelle im Footer einfügen. Sie erzeugt dort automatisch den anklickbaren Hinweis **„Gestaltung & Web: Jan Dennis Brüning“**. Ein zusätzliches HTML-Element oder Plugin ist nicht erforderlich. Der Hinweis übernimmt Schrift und Farbe seiner Umgebung; das Profilfenster verwendet die zentrale Gestaltung.

Der Code liegt auch in `Einbindung.html`. In WordPress kann er beispielsweise in einem HTML-Widget des Footer-Templates stehen; JavaScript muss dort zugelassen sein.

Bereits eingebundene Links mit `data-jdb-footer` werden weiterhin unterstützt. Wenn solche Links vorhanden sind, erzeugt das Skript keinen zusätzlichen Hinweis.

## Verhalten

- `index.html` ohne Einbettungsparameter zeigt die eigenständige Vorschau.
- `embed.js` erzeugt den Footer-Hinweis und lädt das Profil erst nach dessen Anklicken in einen abgeschotteten iframe. Die kleine JavaScript-Datei wird bereits mit der Kundenwebsite abgerufen.
- Intro- und Outroanimationen bleiben erhalten; bei reduzierter Bewegung werden sie übersprungen.
- Kreuz, Escape und Klick außerhalb des Profilfensters schließen es. Anschließend werden Fokus und Scrollverhalten wiederhergestellt.
- Ohne JavaScript oder bei einem fehlgeschlagenen Skriptabruf kann die reine Skripteinbindung keinen Hinweis erzeugen. Ohne Dialogunterstützung führt der erzeugte Hinweis direkt zur Website. Bereits separat angelegte Links funktionieren auch ohne JavaScript. Bei einem fehlgeschlagenen Profilabruf erscheint nach spätestens zwölf Sekunden ein Hinweis mit einem direkten Website-Link und einer Schließen-Schaltfläche.
- Die Nachrichten zwischen Rahmen und Kundenwebsite werden über Absenderfenster und einen zufälligen Kanal geprüft. Der iframe hat durch die Sandbox einen opaken Ursprung.
- Dosis und Inter sowie ihre Schriftlizenzangaben sind im HTML eingebettet. Das Profil setzt selbst keine Tracking-Cookies. Der Hostinganbieter kann technisch notwendige Zugriffsdaten verarbeiten.

## Zentrale Änderungen

Gestaltung und Inhalte werden in `index.html` aktualisiert. GitHub Pages veröffentlicht Änderungen an `main`, sobald der Dienst eingerichtet ist und der Veröffentlichungsprozess erfolgreich läuft. Ein neues Öffnen lädt das Profil erneut mit einer neuen Abrufadresse. Bereits geöffnete Fenster werden nicht live verändert.

Veröffentlichung und Zwischenspeicherung können die Auslieferung neuer Versionen verzögern. Änderungen am Einbindungsprotokoll müssen daher mit früheren Fassungen kompatibel bleiben.

Beim Übernehmen einer neuen eigenständigen Gestaltung müssen der Einbettungsmodus im Dokumentkopf und die Nachrichtenverbindung am Dokumentende erhalten bleiben. Die Kundenwebsites brauchen für normale Inhalts- und Gestaltungsänderungen keine Anpassung.

## Technische Voraussetzung

Die Kundenwebsite muss das Laden der Einbindungsdatei und des iframe vom zentralen Hosting erlauben. Bei einer Content-Security-Policy betrifft das insbesondere `script-src` und `frame-src`. Das Profil benötigt kein WordPress-Backend und kann unter verschiedenen Website-Systemen eingesetzt werden.
