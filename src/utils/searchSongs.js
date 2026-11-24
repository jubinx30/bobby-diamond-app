import { normalizeText, generateNameVariants } from './normalizeText.js';

/**
 * Precomputes search index for a song across all searchable fields.
 */
export function buildSongSearchIndex(song) {
  const titleNorm = normalizeText(song.title);
  const genreNorm = normalizeText(song.genre);
  const artistVariants = generateNameVariants(song.artist);

  const medleyTerms = (song.medley || [])
    .map((m) => normalizeText(m))
    .join(' ');

  const artistIndex = artistVariants.join(' ');
  const titleIndex = `${titleNorm} ${medleyTerms}`.trim();

  return {
    all: `${titleNorm} ${artistIndex} ${genreNorm} ${medleyTerms}`.trim(),
    title: titleIndex,
    artist: artistIndex,
    genre: genreNorm
  };
}

/**
 * Checks if a song matches query tokens and field criteria.
 * Query tokens are pre-normalized words. All tokens must match target string.
 */
export function matchSong(song, queryTokens, searchField = 'All') {
  if (!queryTokens || queryTokens.length === 0) return true;

  const index = song._searchIndex || buildSongSearchIndex(song);

  let target = index.all;
  if (searchField === 'Title') {
    target = index.title;
  } else if (searchField === 'Artist') {
    target = index.artist;
  } else if (searchField === 'Genre') {
    target = index.genre;
  }

  return queryTokens.every((token) => target.includes(token));
}
