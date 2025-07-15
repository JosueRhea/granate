import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export const HeaderNav = () => {
  return (
    <div className="flex items-center w-full justify-between">
      <OrganizationSwitcher />
      <UserButton />
    </div>
  );
};
