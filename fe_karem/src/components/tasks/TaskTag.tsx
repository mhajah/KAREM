export function TaskTag({ tag }: { tag: string }) {
  return (
    <span
      key={tag}
      className="inline-block bg-slate-800 text-white rounded-md py-0.5 px-2.5 border border-transparent text-sm shadow-sm"
    >
      {tag}
    </span>
  );
}
