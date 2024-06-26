import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserList from "@/components/Tables/UserList";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PortfolioForm from "@/components/PortfolioForm";

export const metadata: Metadata = {
  title: "ثبت نمونه کار جدید",
};

const PortfoliosPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ثبت نمونه کار جدید" />

      <div className="flex flex-col gap-10">
        <PortfolioForm />
      </div>
    </DefaultLayout>
  );
};

export default PortfoliosPage;
