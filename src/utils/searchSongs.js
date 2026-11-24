import { normalizeText, generateNameVariants } from './normalizeText.js';

/**
 * Precomputes search index for a song across all searchable fields.
 */
export function buildSongSearchIndex(song) {
  const titleNoApos = normalizeText(song.title, true);
  const titleWithApos = normalizeText(song.title, false);
  const titleFull = `${titleNoApos} ${titleWithApos}`;

  const genreNoApos = normalizeText(song.genre, true);
  const genreWithApos = normalizeText(song.genre, false);
  const genreFull = `${genreNoApos} ${genreWithApos}`;

  const artistVariants = generateNameVariants(song.artist);

  const medleyTerms = (song.medley || [])
    .flatMap((m) => [normalizeText(m, true), normalizeText(m, false)])
    .join(' ');

  const artistIndex = artistVariants.join(' ');
  const titleIndex = `${titleFull} ${medleyTerms}`.trim();

  return {
    all: `${titleIndex} ${artistIndex} ${genreFull}`.trim(),
    title: titleIndex,
    artist: artistIndex,
    genre: genreFull
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
