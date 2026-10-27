const SOURCES = [
  { label: 'Dragon Survival на CurseForge', url: 'https://www.curseforge.com/minecraft/mc-mods/dragons-survival' },
  { label: 'Dragon Survival Wiki (fandom)', url: 'https://dragons-survival.fandom.com/wiki/Dragons' },
  { label: 'Исходный код DragonSurvivalTeam', url: 'https://github.com/DragonSurvivalTeam/DragonSurvival' }
];

// Запись: { name, kind: 'моб' | 'руда' | 'предмет', biome, note, source }. Добавляем только с проверенным источником.
const ENTRIES = [
  {
    name: 'Рыцарь-охотник (Armored Knight)',
    kind: 'моб',
    biome: 'рядом с драконами под эффектом «Злой дракон» и возле деревень',
    note: 'Главный охотник на драконов, ведёт группу: Squire, Hunter, Knight Hound. По вики: 40 здоровья, 10 брони, 8 урона, скорость 0.35, шанс щита 10%. Атакует злых драконов и игроков с «Дурным знамением»; если игрок-человек убьёт рыцаря, ему на 5 минут выдаётся «Дурное знамение». Дроп: шлем рыцаря (10%), части железного сета, изумруды, золото и железо, узорчатый щит. Расхождение: в конфиге на той же странице knightDamage = 12.0, а в тексте вики 8 урона.',
    source: 'https://dragons-survival.fandom.com/wiki/Armored_Knight'
  },
  {
    name: 'Пыль древнего дракона (Elder dragon dust)',
    kind: 'предмет',
    biome: 'руды угля, лазурита, изумруда, алмаза и красного камня; сундуки; торговля с принцем и принцессой',
    note: 'Основной ресурс драконов. Для алтаря дракона нужно 9 пыли: из неё крафтится кость дракона, которой бьют по блоку (камень, дуб, песчаник или замшелый булыжник). Из пыли делают древнюю кость дракона, лакомства, память для маяков и сокровища дракона, а также заряжают Источник Магии. Людям выпадает реже, чем драконам; шансы меняются в конфигах.',
    source: 'https://dragons-survival.fandom.com/wiki/Elder_dragon_dust'
  }
];

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
