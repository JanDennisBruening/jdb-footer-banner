/* Jan Dennis Brüning · Footer-Profil · Einbindung v1.2.0 */
(() => {
  'use strict';
  const script = document.currentScript;
  if (!script || !script.src) return;
  const key = Symbol.for('jdb.footerEmbed.v1');
  if (window[key]) return;
  window[key] = true;
  const popupBase = new URL('index.html', script.src);
  let active;

  function open(trigger) {
    if (active) { active.focus(); return; }
    const host = document.createElement('div');
    const shadow = host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      :host { all: initial; }
      dialog { box-sizing: border-box; position: fixed; inset: 0; margin: 0;
        width: 100vw; height: 100vh; height: 100dvh; max-width: none; max-height: none;
        padding: 0; border: 0; overflow: hidden; background: transparent; color: #014b6f; }
      dialog:not([open]) { display: none; }
      dialog::backdrop { background: transparent; }
      iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0;
        background: transparent; visibility: hidden; }
      iframe[data-ready] { visibility: visible; }
      .status { box-sizing: border-box; position: absolute; inset: 0; display: grid;
        place-content: center; gap: 16px; padding: 24px; background: rgba(1,6,12,.38); }
      .card { max-width: 360px; padding: 24px; border-radius: 18px; background: #fdf4e4;
        box-shadow: 0 12px 40px rgba(1,6,12,.2); font: 16px/1.5 system-ui, sans-serif; }
      p { margin: 0 0 16px; }
      a { display: block; margin-bottom: 16px; color: #014b6f; }
      button { padding: 8px 14px; border: 1px solid #014b6f; border-radius: 8px;
        font: inherit; color: #014b6f; background: transparent; cursor: pointer; }
      [hidden] { display: none !important; }
    `;
    const shell = document.createElement('dialog');
    shell.setAttribute('aria-label', 'Über Jan Dennis Brüning');
    shell.setAttribute('aria-busy', 'true');
    const status = document.createElement('div');
    status.className = 'status';
    const card = document.createElement('div');
    card.className = 'card';
    const message = document.createElement('p');
    message.setAttribute('role', 'status');
    message.textContent = 'Profil wird geladen …';
    const fallback = document.createElement('a');
    fallback.href = trigger.href;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.textContent = 'Website direkt öffnen';
    const dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.textContent = 'Schließen';
    dismiss.autofocus = true;
    card.append(message, fallback, dismiss);
    status.append(card);
    const frame = document.createElement('iframe');
    frame.title = 'Jan Dennis Brüning – Gestaltung und digitale Begleitung';
    frame.referrerPolicy = 'no-referrer';
    frame.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-to-custom-protocols');
    const channel = crypto.randomUUID ? crypto.randomUUID() : `jdb-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const popupURL = new URL(popupBase);
    popupURL.searchParams.set('embed', '1');
    popupURL.searchParams.set('channel', channel);
    popupURL.searchParams.set('v', Date.now().toString(36));
    shell.append(frame, status);
    shadow.append(style, shell);
    document.body.append(host);
    const bodyStyle = { overflow: document.body.style.overflow, paddingRight: document.body.style.paddingRight };
    const gutter = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    let ready = false;
    let closed = false;
    let closeTimer;
    let loadTimer;

    const cleanup = () => {
      if (closed) return;
      closed = true;
      clearTimeout(loadTimer);
      clearTimeout(closeTimer);
      window.removeEventListener('message', receive);
      shell.close();
      host.remove();
      document.body.style.overflow = bodyStyle.overflow;
      document.body.style.paddingRight = bodyStyle.paddingRight;
      trigger.setAttribute('aria-expanded', 'false');
      active = null;
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
    };
    const send = (type) => {
      // Der sandboxed iframe hat einen opaken Ursprung; Nachrichten enthalten nur Steuerbefehle.
      frame.contentWindow?.postMessage({ namespace: 'jdb-footer-v1', channel, type }, '*');
    };
    const close = () => {
      if (!ready) { cleanup(); return; }
      if (closeTimer) return;
      send('request-close');
      closeTimer = setTimeout(cleanup, 1200);
    };
    function receive(event) {
      // Quelle und Zufallskanal prüfen, da der sandboxed iframe den Ursprung "null" hat.
      if (closed || event.source !== frame.contentWindow || event.origin !== 'null') return;
      const data = event.data;
      if (!data || data.namespace !== 'jdb-footer-v1' || data.channel !== channel) return;
      if (data.type === 'ready' && !ready) {
        ready = true;
        clearTimeout(loadTimer);
        frame.setAttribute('data-ready', '');
        status.hidden = true;
        shell.setAttribute('aria-busy', 'false');
        frame.focus();
      } else if (data.type === 'closed' && ready) cleanup();
    }
    window.addEventListener('message', receive);
    frame.addEventListener('load', () => { if (!closed) send('init'); });
    dismiss.addEventListener('click', close);
    shell.addEventListener('cancel', (event) => { event.preventDefault(); close(); });
    try { shell.showModal(); }
    catch { cleanup(); return false; }
    active = shell;
    if (gutter) document.body.style.paddingRight = `${(parseFloat(getComputedStyle(document.body).paddingRight) || 0) + gutter}px`;
    document.body.style.overflow = 'hidden';
    trigger.setAttribute('aria-expanded', 'true');
    loadTimer = setTimeout(() => {
      if (closed || ready) return;
      message.textContent = 'Das Profil konnte nicht geladen werden. Du kannst meine Website direkt öffnen.';
      shell.setAttribute('aria-busy', 'false');
      frame.remove();
    }, 12000);
    frame.src = popupURL.href;
    return true;
  }

  function bind() {
    if (!document.querySelector('a[data-jdb-footer]')) {
      const credit = document.createElement('a');
      credit.href = 'https://janbruening.de/';
      credit.textContent = 'Gestaltung & Web: Jan Dennis Brüning';
      credit.className = 'jdb-footer-credit';
      credit.setAttribute('data-jdb-footer', '');
      credit.style.color = 'inherit';
      credit.style.font = 'inherit';
      if (script.closest('body')) script.before(credit);
      else (document.querySelector('footer') || document.body).append(credit);
    }
    if (typeof HTMLDialogElement === 'undefined' || typeof HTMLDialogElement.prototype.showModal !== 'function') return;
    document.querySelectorAll('a[data-jdb-footer]').forEach((trigger) => {
      if (trigger.dataset.jdbFooterBound) return;
      trigger.dataset.jdbFooterBound = 'true';
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        if (open(trigger) !== false) event.preventDefault();
      });
      trigger.addEventListener('keydown', (event) => {
        if (event.key === ' ') { event.preventDefault(); open(trigger); }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, { once: true });
  else bind();
})();
