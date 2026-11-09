import {
  SublevelDefinition,
  LevelDefinition,
  SublevelType,
  Tier,
  CURRICULUM_CATALOG,
} from './curriculumData';

// Re-export core types
export * from './curriculumData';

// Master lookup helper
export function getSublevelById(id: number): SublevelDefinition | undefined {
  for (const lvl of CURRICULUM_CATALOG) {
    const found = lvl.sublevels.find((s) => s.id === id);
    if (found) return found;
  }
  return undefined;
}

export function getAllSublevels(): SublevelDefinition[] {
  const result: SublevelDefinition[] = [];
  for (const lvl of CURRICULUM_CATALOG) {
    result.push(...lvl.sublevels);
  }
  return result;
}

