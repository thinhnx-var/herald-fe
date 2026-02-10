import { RESET_LAYOUT_EVENT } from "@/pages/home";

function resetDashboardLayout() {
  window.dispatchEvent(new CustomEvent(RESET_LAYOUT_EVENT));
}

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 px-4 py-2 border-b">
      <h1>Header</h1>
      <button
        type="button"
        onClick={resetDashboardLayout}
        className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
      >
        Reset layout
      </button>
    </header>
  );
}