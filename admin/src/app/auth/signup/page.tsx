import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import EmptyLayout from "@/components/Layouts/EmptyLayout";
import SignUpForm from "@/components/AuthForms/Signup";

export const metadata: Metadata = {
  title: "ثبت نام",
};

const SignUp: React.FC = () => {
  return (
    <EmptyLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex w-1/2 mx-auto flex-col h-full py-22 flex-wrap flex-column items-center">
     
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                ثبت نام
              </h2>
<SignUpForm />
              
          
        </div>
      </div>
    </EmptyLayout>
  );
};

export default SignUp;
