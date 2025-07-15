import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  return children;
};

export default DashboardLayout;
