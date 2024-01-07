import process from 'node:process';
import path from 'node:path';

class PageFile {
  replacedSymbols = /[^a-zA-Z0-9\s]/g;

  constructor(url, output = process.cwd()) {
    this.url = url;
    this.output = output;
  }

  get filename() {
    const { host, pathname } = new URL(this.url);
    const name = `${host}${pathname === '/' ? '' : pathname}`.replaceAll(
      this.replacedSymbols,
      '-',
    );

    return `${name}.html`;
  }

  get path() {
    return path.resolve(this.output, this.filename);
  }
}

export default PageFile;
