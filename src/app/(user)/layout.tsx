import Footer from "@/components/custom/Footer";
import MainMenu from "@/components/custom/MainMenu";
export const revalidate = 0;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainMenu />
      {children}
      <Footer />
    </div>
  );
}
