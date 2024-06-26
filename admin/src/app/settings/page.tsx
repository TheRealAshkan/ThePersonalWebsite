import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PortfolioForm from "@/components/PortfolioForm";
import SettingForm from "@/components/SettingForm";

export const metadata: Metadata = {
  title:"تنظیمات",
};

const PortfoliosPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="تنظیمات" />

      <div className="flex flex-col gap-10">
        <SettingForm />
      </div>
    </DefaultLayout>
  );
};

export default PortfoliosPage;
