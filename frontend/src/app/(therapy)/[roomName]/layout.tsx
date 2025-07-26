export default function TherapyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
