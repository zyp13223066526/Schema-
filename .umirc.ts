import { defineConfig } from 'dumi';
import path from 'path';
const resolvePath = (dir) => path.join(__dirname, dir);
export default defineConfig({
  title: 'schema',
  favicon:
    'https://file.ecai.hooshine.com/2022/1/25/1643078827-20220125104738290.jpg',
  logo: 'https://file.ecai.hooshine.com/2022/1/25/1643078827-20220125104738290.jpg',
  outputPath: 'docs-dist',
  alias: {
    demos: resolvePath('src/AddSchema'),
  },
  // more config: https://d.umijs.org/config
});
