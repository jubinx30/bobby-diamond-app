/**
 * Strips punctuation, accents, and extra whitespace for fuzzy search matching.
 * By default, removes apostrophes so contractions like "can't", "don't", "ain't"
 * match searches with or without apostrophes ("cant", "dont", "aint").
 */
export function normalizeText(str, removeApostrophes = true) {
  if (!str) return '';
  let cleaned = str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // remove diacritics

  if (removeApostrophes) {
    cleaned = cleaned.replace(/['’]/g, '');
  }

  return cleaned
    .replace(/['’"`\.,\-\/#!$%\^&\*;:{}=\-_~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generates alternate name permutations, e.g.:
 * "Beatles, The" -> ["the beatles", "beatles the", "beatles"]
 * "Adams, Bryan" -> ["bryan adams", "adams bryan", "adams", "bryan"]
 * "Presley, Elvis" -> ["elvis presley", "presley elvis", "elvis", "presley"]
 */
export function generateNameVariants(name) {
  if (!name) return [];
  const normalizedWithApos = normalizeText(name, false);
  const normalizedNoApos = normalizeText(name, true);

  const variants = new Set([normalizedWithApos, normalizedNoApos]);

  // Check "Lastname, Firstname" format
  if (name.includes(',')) {
    const parts = name.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length === 2) {
      const [last, first] = parts;
      const firstNoApos = normalizeText(first, true);
      const lastNoApos = normalizeText(last, true);
      const firstWithApos = normalizeText(first, false);
      const lastWithApos = normalizeText(last, false);

      variants.add(`${firstNoApos} ${lastNoApos}`.trim());
      variants.add(`${lastNoApos} ${firstNoApos}`.trim());
      variants.add(`${firstWithApos} ${lastWithApos}`.trim());
      variants.add(`${lastWithApos} ${firstWithApos}`.trim());
      variants.add(firstNoApos);
      variants.add(lastNoApos);
    }
  }

  // Check "The Band" or "Band, The"
  for (const item of Array.from(variants)) {
    if (item.endsWith(' the')) {
      const withoutThe = item.replace(/\s+the$/, '').trim();
      variants.add(`the ${withoutThe}`);
      variants.add(withoutThe);
    } else if (item.startsWith('the ')) {
      const withoutThe = item.replace(/^the\s+/, '').trim();
      variants.add(`${withoutThe} the`);
      variants.add(withoutThe);
    }
  }

  return Array.from(variants);
}
