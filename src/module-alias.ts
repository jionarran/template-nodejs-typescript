import { resolve, join } from 'path';
import moduleAlias from 'module-alias';

const rootPath = resolve(__dirname, '..');

moduleAlias.addAliases({
  '@src': join(rootPath, 'src'),
  '@test': join(rootPath, 'test'),
});

export default moduleAlias;
