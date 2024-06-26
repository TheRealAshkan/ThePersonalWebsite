import ClassicDashboard from "@/components/Dashboard/ClassicDashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "داشبورد"
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ClassicDashboard />
      </DefaultLayout>
    </>
  );
}
