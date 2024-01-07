import fs from 'fs/promises';
import axios from 'axios';
import PageFile from './entities/PageFile.js';

export default (url, output) => {
  const file = new PageFile(url, output);

  return axios(url).then(({ data }) => fs.writeFile(file.path, data, 'utf-8'));
};
