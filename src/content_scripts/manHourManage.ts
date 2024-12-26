import { Tooltip } from 'bootstrap';

const fillEvent = (event: MouseEvent) => {
  event.preventDefault();

  const editMenuContents = document.getElementById('edit-menu-contents');
  if (!editMenuContents) {
    return;
  }
  const tbody = editMenuContents.querySelector('tbody');
  if (!tbody) {
    return;
  }

  // Calculates an unentered time.
  const hiddenTime = document.getElementById('hiddenTime') as HTMLInputElement;
  let unenterdTime = Number(hiddenTime.value);
  Array.from(tbody.querySelectorAll<HTMLInputElement>('input[name="hiddenMinutes[]"]')).forEach(
    (_) => (unenterdTime -= Number(_.value))
  );
  if (unenterdTime == 0) {
    return;
  }

  // Retrieves rows where the time is either not entered or is set to 0:00.
  const trs = Array.from(tbody.querySelectorAll('tr[data-index]')).filter((tr) => {
    const input = tr.querySelector<HTMLInputElement>('input[name="hiddenMinutes[]"]');
    return Number(input?.value ?? '0') == 0;
  });
  const len = trs.length;
  if (len == 0) {
    return;
  }

  // Set to evenly distribute the unentered time.
  for (let i = 0; i < len; i++) {
    const input = trs[i].querySelector<HTMLInputElement>('input[name="minutes[]"]');
    if (!input) {
      continue;
    }

    const time = Math.floor((unenterdTime + len - i - 1) / len);
    const hh = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const mm = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    input.value = `${hh}:${mm}`;
    // Fires the `onchange` event.
    input.dispatchEvent(new Event('change'));
  }
};

const editMenuObserverCallback: MutationCallback = () => {
  const selectTemplate = document.getElementById('select-template');
  if (!selectTemplate) {
    return;
  }

  const fillButton = document.createElement('button');
  fillButton.className = 'btn jbc-btn-secondary';
  fillButton.innerText = chrome.i18n.getMessage('fillButtonText');
  fillButton.addEventListener('click', fillEvent);
  new Tooltip(fillButton, { placement: 'top', title: chrome.i18n.getMessage('fillButtonTooltip') });

  const saveButton = document.getElementById('save');
  saveButton?.parentElement?.insertBefore(fillButton, saveButton);
};
const editMenuObserver = new MutationObserver(editMenuObserverCallback);
const editMenu = document.getElementById('edit-menu');
if (editMenu) {
  editMenuObserver.observe(editMenu, { attributes: true });
}
