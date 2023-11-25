export async function loadComponents() {
  const modules = import.meta.glob('./**/*.component.{js,jsx,ts,tsx}');
  await Promise.all(Object.values(modules).map((mod) => mod()));
}
