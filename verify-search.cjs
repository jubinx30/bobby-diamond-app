const fs = require('fs');
const songs = JSON.parse(fs.readFileSync('./src/data/songs.json', 'utf8'));
console.log('✓ Total songs count:', songs.length);
if (songs.length !== 1254) throw new Error('Expected 1254 songs');

const { normalizeText, generateNameVariants } = require('./src/utils/normalizeText.js');
const { buildSongSearchIndex, matchSong } = require('./src/utils/searchSongs.js');

const indexed = songs.map(s => ({ ...s, _searchIndex: buildSongSearchIndex(s) }));

// Test 1: Inverted artist search 'elvis presley'
const elvisTokens = normalizeText('elvis presley').split(' ');
const elvisResults = indexed.filter(s => matchSong(s, elvisTokens, 'All'));
console.log('✓ "elvis presley" matches:', elvisResults.length, '(e.g. ' + elvisResults[0].title + ' by ' + elvisResults[0].artist + ')');
if (elvisResults.length === 0) throw new Error('Elvis Presley search failed');

// Test 2: Inverted artist search 'frank sinatra' in Artist field
const sinatraTokens = normalizeText('frank sinatra').split(' ');
const sinatraResults = indexed.filter(s => matchSong(s, sinatraTokens, 'Artist'));
console.log('✓ "frank sinatra" in Artist matches:', sinatraResults.length);
if (sinatraResults.length === 0) throw new Error('Frank Sinatra search failed');

// Test 3: Medley item search 'california girls'
const medleyTokens = normalizeText('california girls').split(' ');
const medleyResults = indexed.filter(s => matchSong(s, medleyTokens, 'Title'));
console.log('✓ "california girls" in Title matches medley:', medleyResults.map(s => s.title));
if (!medleyResults.some(s => s.title.includes('Beach Boys Medley'))) throw new Error('Medley search failed');

// Test 4: Apostrophe removal 'cant help'
const cantHelpTokens = normalizeText('cant help').split(' ');
const cantHelpResults = indexed.filter(s => matchSong(s, cantHelpTokens, 'Title'));
console.log('✓ "cant help" without apostrophe matches:', cantHelpResults.map(s => s.title));
if (cantHelpResults.length === 0) throw new Error('Apostrophe normalization failed');

console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
