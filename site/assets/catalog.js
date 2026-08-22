import { renderMarkdown } from './markdown.js';

const grid = document.querySelector('#mod-grid');
const status = document.querySelector('#catalog-status');
const empty = document.querySelector('#catalog-empty');
const dialog = document.querySelector('#mod-detail');
const closeButton = document.querySelector('#detail-close');

const absoluteUrl = (value) => (value ? new URL(value, window.location.href).href : null);

function textRow(label, value) {
  if (value === undefined || value === null || value === '') return;
  const term = document.createElement('dt');
  const detail = document.createElement('dd');
  term.textContent = label;
  detail.textContent = value;
  document.querySelector('#detail-meta').append(term, detail);
}

function releaseUrl(mod) {
  if (mod.update_check === 'ok' && mod.latest?.zip?.url) return mod.latest.zip.url;
  return mod.downloadURL || null;
}

function renderCard(mod) {
  const card = document.createElement('article');
  card.className = 'framed neutral mod-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View ${mod.title}`);

  if (mod.thumbnail) {
    const thumb = document.createElement('img');
    thumb.className = 'thumb';
    thumb.src = absoluteUrl(mod.thumbnail);
    thumb.alt = `${mod.title} preview`;
    card.append(thumb);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'thumb placeholder';
    placeholder.textContent = 'GEN1RECOMP MOD';
    card.append(placeholder);
  }

  const title = document.createElement('h3');
  title.textContent = mod.title;
  const version = mod.latest?.version || mod.version || '?';
  const byline = document.createElement('p');
  byline.className = 'byline';
  byline.textContent = `v${version} · by ${mod.author || 'ishhodaszi'}`;
  const summary = document.createElement('p');
  summary.className = 'summary';
  summary.textContent = mod.summary || '';
  const badges = document.createElement('div');
  badges.className = 'badges';
  for (const category of mod.categories || []) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = category;
    badges.append(badge);
  }

  card.append(title, byline, summary, badges);
  card.addEventListener('click', () => showDetail(mod));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showDetail(mod);
    }
  });
  return card;
}

async function showDetail(mod) {
  document.querySelector('#detail-title').textContent = mod.title;
  document.querySelector('#detail-summary').textContent = mod.summary || '';
  const meta = document.querySelector('#detail-meta');
  meta.replaceChildren();
  textRow('Version', mod.latest?.version || mod.version || '?');
  textRow('Author', mod.author);
  textRow('Categories', (mod.categories || []).join(', '));
  textRow('Game versions', (mod.games || []).join(', ').toUpperCase());
  textRow('License', mod.license);
  textRow('Permissions', (mod.permissions || []).join(', ') || 'none');

  const download = document.querySelector('#detail-download');
  const downloadUrl = releaseUrl(mod);
  download.hidden = !downloadUrl;
  if (downloadUrl) download.href = downloadUrl;

  const repo = document.querySelector('#detail-repo');
  repo.hidden = !mod.repo;
  if (mod.repo) repo.href = mod.repo;

  const body = document.querySelector('#detail-body');
  body.textContent = 'Loading description…';
  dialog.showModal();

  try {
    const response = await fetch(absoluteUrl(mod.description_url));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    body.innerHTML = renderMarkdown(await response.text());
  } catch (error) {
    body.textContent = `The full description could not be loaded (${error.message}).`;
  }
}

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

try {
  const response = await fetch('data/index.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const index = await response.json();
  for (const mod of index.mods || []) grid.append(renderCard(mod));
  const count = index.mods?.length || 0;
  status.classList.remove('spin');
  status.textContent = `${count} mod${count === 1 ? '' : 's'}`;
  empty.hidden = count !== 0;
} catch (error) {
  status.classList.remove('spin');
  status.textContent = 'Catalogue unavailable';
  empty.hidden = false;
  empty.textContent = `The index could not be loaded (${error.message}).`;
}
