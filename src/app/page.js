import Image from "next/image";
import { XlsxManager } from "./components/XlsxManager";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Excel Import/Export Demo</h1>
      <XlsxManager />
    </main>
  );
}
