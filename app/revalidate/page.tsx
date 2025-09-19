// app/landing/page.tsx
export const revalidate = 60 * 60 * 24 * 7; // هر 7 روز یکبار بازسازی میشه

export default async function LandingPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    next: { tags: ['landing-data'] }, // این تگ برای کنترل کش استفاده میشه
    cache:"force-cache"
  });

  const data = await res.json();

  return (
    <div  className="pt-96 px-10">
      <h1>🚀 Landing Page (Next.js 15)</h1>
      <p><b>Title:</b> {data.title}</p>
      <p><b>Bodyyyy:</b> {data.body}</p>
      <small>این صفحه استاتیک هست و هر ۷ روز ری‌ولید میشه، ولی میشه دستی هم ری‌ولید کرد.</small>
    </div>
  );
}
