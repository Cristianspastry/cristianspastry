export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative blurred blob for a warm baked feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 py-16">
        {children}
      </div>
    </div>
  );
}
