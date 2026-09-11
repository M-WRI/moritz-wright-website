export function BigTitle({
  as: Tag = "h1",
  children,
}: {
  as?: "h1" | "h2" | "p";
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border px-5 py-10 md:px-8 md:py-14">
      <Tag className="display-section">{children}</Tag>
    </div>
  );
}
