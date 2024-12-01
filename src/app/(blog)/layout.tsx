
import "../globals.css";
import Navbar from "@/presentation/components/(BLOG)/layout/navBar";
import Footer from "@/presentation/components/(BLOG)/layout/footer";



export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
       
   
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
        <Footer />
    
     </>
  );
}
