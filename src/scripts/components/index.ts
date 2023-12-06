export async function loadComponents() {
  const modules = import.meta.glob('./**/*.component.{js,ts,jsx,tsx}');
  await Promise.all(Object.values(modules).map((mod) => mod()));
}
