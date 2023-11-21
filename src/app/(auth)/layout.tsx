import MyProfile from "@/components/custom/MyProfile";
import Logo from "@/components/custom/Logo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Logo />
        <MyProfile />
      </div>
      {children}
    </div>
  );
}
