export async function loadStores() {
  const modules = import.meta.glob('./**/*.store.{js,jsx,ts,tsx}');
  await Promise.all(Object.values(modules).map((mod) => mod()));
}
