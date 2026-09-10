// Deterministic pseudo-random layout so a given set of notes always renders
// in the same "random-looking" but evenly spread positions (no team clustering,
// no re-shuffle jitter on every render).

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

function shuffle(array, rand) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// items: array of objects with stable `.id`
// seedKey: string, e.g. `board-${questionId}`
// returns array of { ...item, top, left, rotate } where top/left are percentages
export function layoutNotes(items, seedKey) {
  const count = items.length;
  if (count === 0) return [];

  const sorted = items.slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  const cols = Math.max(1, Math.ceil(Math.sqrt(count * 1.6)));
  const rows = Math.max(1, Math.ceil(count / cols));
  const totalCells = cols * rows;

  const rand = mulberry32(seedFromString(seedKey));
  const cellOrder = shuffle(
    Array.from({ length: totalCells }, (_, i) => i),
    rand
  );

  const topMargin = 20; // reserve top area for the blackboard title
  const bottomMargin = 6;
  const sideMargin = 5;
  const usableHeight = 100 - topMargin - bottomMargin;
  const usableWidth = 100 - sideMargin * 2;

  const cellW = usableWidth / cols;
  const cellH = usableHeight / rows;

  return sorted.map((item, idx) => {
    const cell = cellOrder[idx % totalCells];
    const cellRow = Math.floor(cell / cols);
    const cellCol = cell % cols;

    const jitterX = (rand() - 0.5) * cellW * 0.5;
    const jitterY = (rand() - 0.5) * cellH * 0.5;
    const rotate = (rand() - 0.5) * 18;

    const left = sideMargin + cellCol * cellW + cellW / 2 + jitterX;
    const top = topMargin + cellRow * cellH + cellH / 2 + jitterY;

    return {
      ...item,
      top: Math.min(96, Math.max(topMargin - 2, top)),
      left: Math.min(96, Math.max(2, left)),
      rotate,
    };
  });
}
