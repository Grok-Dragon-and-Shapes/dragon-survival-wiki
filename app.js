const SOURCES = [
  { label: 'Dragon Survival на CurseForge', url: 'https://www.curseforge.com/minecraft/mc-mods/dragons-survival' },
  { label: 'Dragon Survival Wiki (fandom)', url: 'https://dragons-survival.fandom.com/wiki/Dragons' },
  { label: 'Исходный код DragonSurvivalTeam', url: 'https://github.com/DragonSurvivalTeam/DragonSurvival' }
];

// Запись: { name, kind: 'моб' | 'руда', biome, note, source }. Добавляем только с проверенным источником.
const ENTRIES = [];

const els = {
  search: document.getElementById('search'),
  kind: document.getElementById('kind'),
  list: document.getElementById('list'),
  empty: document.getElementById('empty'),
  sources: document.getElementById('sources')
};

function matches(entry, query, kind) {
  if (kind && entry.kind !== kind) return false;
  if (!query) return true;
  const hay = [entry.name, entry.biome, entry.note].join(' ').toLowerCase();
  return hay.includes(query);
}

function renderEntries() {
  const query = els.search.value.trim().toLowerCase();
  const kind = els.kind.value;
  const shown = ENTRIES.filter(e => matches(e, query, kind));

  els.list.replaceChildren(...shown.map(e => {
    const li = document.createElement('li');
    const h = document.createElement('h3');
    h.textContent = e.name;
    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = `${e.kind}${e.biome ? ' · ' + e.biome : ''}`;
    const note = document.createElement('p');
    note.textContent = e.note || '';
    const src = document.createElement('a');
    src.href = e.source;
    src.target = '_blank';
    src.rel = 'noopener noreferrer';
    src.textContent = 'Источник';
    li.append(h, meta, note, src);
    return li;
  }));

  if (ENTRIES.length === 0) {
    els.empty.textContent = 'Записей пока нет. Первые записи добавляются в ENTRIES в app.js, и только с источником из списка ниже.';
  } else {
    els.empty.textContent = shown.length === 0 ? 'Ничего не найдено.' : '';
  }
  els.empty.hidden = els.empty.textContent === '';
}

function renderSources() {
  els.sources.replaceChildren(...SOURCES.map(s => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = s.label;
    li.append(a);
    return li;
  }));
}

els.search.addEventListener('input', renderEntries);
els.kind.addEventListener('change', renderEntries);

renderSources();
renderEntries();
