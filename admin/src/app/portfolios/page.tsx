import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PortfolioList from "@/components/Tables/PortfolioList";

export const metadata: Metadata = {
  title: "نمونه کار ها",
};

const PortfoliosPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="نمونه کار ها" />

      <div className="flex flex-col gap-10">
        <PortfolioList />
      </div>
    </DefaultLayout>
  );
};

export default PortfoliosPage;
