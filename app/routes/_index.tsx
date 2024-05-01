import { Link } from "@remix-run/react";

// _index.tsx
export default function Index() {
  return (
    <main>
      <h2>トップページ</h2>
      <Link to="todos">Todo一覧画面へ</Link>
    </main>
  );
}