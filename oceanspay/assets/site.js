(() => {
  const trigger = document.querySelector('.mobile-menu-trigger');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const closeButton = drawer?.querySelector('.mobile-drawer-head button');
  const drawerLinks = drawer ? [...drawer.querySelectorAll('a')] : [];

  if (!trigger || !drawer || !backdrop) return;

  const setOpen = (open) => {
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    drawer.setAttribute('aria-hidden', String(!open));
    drawer.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    drawerLinks.forEach((link) => link.setAttribute('tabindex', open ? '0' : '-1'));
    if (open) closeButton?.focus();
  };

  trigger.addEventListener('click', () => {
    setOpen(trigger.getAttribute('aria-expanded') !== 'true');
  });
  closeButton?.addEventListener('click', () => setOpen(false));
  backdrop.addEventListener('click', () => setOpen(false));
  drawerLinks.forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      trigger.focus();
    }
  });
})();

(() => {
  const form = document.querySelector('.bd-form[action="send-form.php"]');
  if (!form) return;

  const returnTo = form.querySelector('input[name="return_to"]');
  if (returnTo) returnTo.value = `${window.location.pathname}#demo-form`;

  const status = form.querySelector('[data-form-status]');
  const result = new URLSearchParams(window.location.search).get('lead');
  if (!status || !result) return;

  status.hidden = false;
  if (result === 'sent') {
    status.classList.add('is-success');
    status.textContent = 'Thank you. Your request has been sent successfully. We’ll be in touch shortly.';
  } else {
    status.classList.add('is-error');
    status.innerHTML = 'Sorry, your request could not be sent. Please try again or email <a href="mailto:info@ocean-across.com">info@ocean-across.com</a>.';
  }

  status.focus({ preventScroll: true });
  const cleanUrl = `${window.location.pathname}${window.location.hash || '#demo-form'}`;
  window.history.replaceState({}, document.title, cleanUrl);
})();
