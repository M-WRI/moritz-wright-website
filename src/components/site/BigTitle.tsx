export function BigTitle({
  as: Tag = "h2",
  children,
  pin = false,
}: {
  as?: "h1" | "h2";
  children: string;
  pin?: boolean;
}) {
  if (!pin) {
    return (
      <Tag data-reveal className="display-title px-5 pt-[18vh] pb-8 md:px-10">
        {children}
      </Tag>
    );
  }

  return (
    <>
      <div className="h-[18vh]" />
      <div className="display-title pointer-events-none sticky top-[calc(50dvh-0.41em)] z-0 w-full">
        <Tag data-reveal className="display-title px-5 md:px-10">
          {children}
        </Tag>
      </div>
    </>
  );
}
