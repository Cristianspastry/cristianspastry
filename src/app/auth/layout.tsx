export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary-50 via-white to-white">
      <div className="container mx-auto px-4 py-16">
        {children}
      </div>
    </div>
  );
}
