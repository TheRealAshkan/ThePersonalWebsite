import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserList from "@/components/Tables/UserList";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserForms from "@/components/UserForms";

export const metadata: Metadata = {
  title: "ثبت کاربر جدید",
};

const UsersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ثبت کاربر جدید" />

      <div className="flex flex-col gap-10">
        <UserForms />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
