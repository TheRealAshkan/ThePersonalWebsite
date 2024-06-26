import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserList from "@/components/Tables/UserList";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "کاربران",
};

const UsersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="کاربران" />

      <div className="flex flex-col gap-10">
        <UserList />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
