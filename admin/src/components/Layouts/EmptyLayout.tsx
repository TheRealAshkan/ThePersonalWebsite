"use client";
import { getUserInfo } from "@/services/user";
import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmptyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}
