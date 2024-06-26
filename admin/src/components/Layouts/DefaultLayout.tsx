"use client";
import React, { useState, ReactNode, useEffect, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getUserInfo } from "@/services/user";
import { ToastContainer, toast } from "react-toastify";
import { useLogged } from "@/store/zustand";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { user, fetch } = useLogged();
 
  
  useEffect(() => {
    const fetchAuthStatus = async () => {
      const loggedIn = await fetch();
      if (!user) {
        window.location.href='/auth/signin'
        // router.push('/auth/signin');
      }
    };

    fetchAuthStatus();
  }, [router, fetch]);

  if(!user) {
    window.location.href='/auth/signin'
  }
  if(user) {
    return (
      <>
      <ToastContainer />
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}
  
          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}
  
            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </>
    );
  }
  
}
