
export interface Identifiable {
  id: string;
}

export function findPropertyById<T extends Identifiable, K extends keyof T>(
  items: T[],
  id: string,
  property: K,
  defaultValue: any = '—'
): T[K] | typeof defaultValue {
  const item = items.find(i => i.id === id);
  return item ? item[property] : defaultValue;
}


export function findNameById<T extends Identifiable & { name: string }>(
  items: T[],
  id: string,
  defaultValue: string = '—'
): string {
  return findPropertyById(items, id, 'name', defaultValue);
}


export function findById<T extends Identifiable>(
  items: T[],
  id: string
): T | undefined {
  return items.find(i => i.id === id);
}
