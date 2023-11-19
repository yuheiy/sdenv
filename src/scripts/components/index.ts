export async function loadComponents() {
  const modules = import.meta.glob('./**/*.component.ts');
  await Promise.all(Object.values(modules).map((mod) => mod()));
}
