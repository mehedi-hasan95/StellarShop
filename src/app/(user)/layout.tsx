import MainMenu from "@/components/custom/MainMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainMenu />
      {children}
    </div>
  );
}
