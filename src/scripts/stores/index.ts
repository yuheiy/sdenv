export async function loadStores() {
  const modules = import.meta.glob('./**/*.store.{js,ts,jsx,tsx}');
  await Promise.all(Object.values(modules).map((mod) => mod()));
}
