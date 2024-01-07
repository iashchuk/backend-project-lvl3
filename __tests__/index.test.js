import path from 'node:path';
import fs from 'fs/promises';
import os from 'os';
import nock from 'nock';
import loader from '../src/index.js';

let expected;
let tmpdir;

beforeAll(async () => {
  const fixture = path.join(process.cwd(), '__fixtures__', 'index.html');
  expected = await fs.readFile(fixture, 'utf-8');
});

beforeEach(async () => {
  tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});

nock.disableNetConnect();

test('correct download for base case: root path', async () => {
  nock('https://iashchuk.ru').persist().get('/').reply(200, expected);

  await loader('https://iashchuk.ru', tmpdir);

  const actual = await fs.readFile(
    path.join(tmpdir, 'iashchuk-ru.html'),
    'utf-8',
  );

  expect(actual).toEqual(expected);
});

test('correct download for base case: subdirectory path', async () => {
  nock('https://ru.hexlet.io').persist().get('/courses').reply(200, expected);

  await loader('https://ru.hexlet.io/courses', tmpdir);

  const actual = await fs.readFile(
    path.join(tmpdir, 'ru-hexlet-io-courses.html'),
    'utf-8',
  );

  expect(actual).toEqual(expected);
});
