export async function loadStores() {
  const modules = import.meta.glob('./**/*.store.ts');
  await Promise.all(Object.values(modules).map((mod) => mod()));
}
