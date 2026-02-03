import Navbar from "@/components/navigations/navbar";
import { SnapshotModeProvider } from "@/providers/snapshot-provider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SnapshotModeProvider>{children}</SnapshotModeProvider>
    </>
  );
}
