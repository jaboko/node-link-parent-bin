import mkdirp from 'mkdirp';
import { promises as fs } from 'fs';
import path from 'path';

export class FSUtils {
  static mkdirp = mkdirp;

  /**
   * Reads dirs only
   */
  static readDirs = async (location: string): Promise<string[]> => {
    const files = await fs.readdir(location);
    const filesWithStats = await Promise.all(
      files.map((name) =>
        fs.stat(path.resolve(location, name)).then((stat) => ({ name, stat })),
      ),
    );
    return filesWithStats
      .filter((f) => f.stat.isDirectory())
      .map(({ name: file }) => file);
  };
}
