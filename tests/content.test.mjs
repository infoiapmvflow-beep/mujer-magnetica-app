import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { days, allPractices } from '../src/days.js';

test('hay 21 días, numerados sin huecos y cada práctica tiene contenido', () => {
 assert.equal(days.length, 21);
 for (const [i, day] of days.entries()) {
   assert.equal(day.day, i + 1);
   for (const field of ['title','affirmation','question','action','phase'])
     assert.ok(typeof day[field] === 'string' && day[field].trim(), `día ${day.day}: ${field}`);
   const practice = allPractices[day.day];
   assert.ok(practice, `falta práctica ${day.day}`);
   assert.ok(practice.reading.length >= 80);
   assert.ok(Array.isArray(practice.prompts) && practice.prompts.length >= 3);
   assert.ok(practice.ritual?.length && practice.close?.length);
 }
});

test('siete audios reales y legibles están incluidos para publicar', () => {
 for (let i=1;i<=7;i++) {
   const filename = `public/demo-audio/valentina-audio-0${i}.mp3`;
   assert.ok(existsSync(filename), `no existe ${filename}`);
   const bytes = readFileSync(filename);
   assert.ok(bytes.length > 10000, `audio vacío: ${filename}`);
   assert.ok(bytes.subarray(0,3).toString() === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0), `no parece MP3: ${filename}`);
 }
});

test('referencia de audio respeta la ruta base de GitHub Pages', () => {
 const source = readFileSync('src/main.jsx','utf8');
 assert.ok(source.includes('import.meta.env.BASE_URL}demo-audio/'));
});
