import type { Plugin } from 'vite';
import { locate } from '@iconify/json';
import { getIconData } from '@iconify/utils';

import { readFileSync } from 'fs';

export default function (): Plugin {
  return {
    name: 'iconify-plugin',
    resolveId(id) {
      const match = /^virtual:icons\/(\S+):(\S+).svg$/.exec(id);
      if (match && match.length === 3) {
        return '\0icons-' + match[1] + ':' + match[2];
      }
    },
    load(id) {
      const match = /^icons-(\S+):(\S+)$/.exec(id.substring(1));
      if (match) {
        const filename = locate(match[1]);
        const iconSet = JSON.parse(readFileSync(filename, 'utf8'));
        const reducedIconSet = getIconData(iconSet, match[2]);
        if (!reducedIconSet) {
          throw new Error(
            `iconify-plugin: icon "virtual:icons/${match[1]}:${match[2]}.svg" does not exist.`
          );
        }
        return `export default ${JSON.stringify(reducedIconSet)};`;
      }
    },
  };
}
