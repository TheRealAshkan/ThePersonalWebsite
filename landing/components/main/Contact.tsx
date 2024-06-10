'use client'
import React from "react";

const Contact = async () => {
 
  function sendContact(formData: FormData) {
    console.log(formData)
  
     // mutate data
     // revalidate cache
  }

  return (
    <div
      className="flex flex-col items-center justify-center py-10"
      id="contact"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
       تماس با من 
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
       <form className="mx-auto">
          <div>
            <span className="uppercase text-sm text-slate-50 font-bold">نام و نام خانوادگی</span>
            <input className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="fullname" type="text" placeholder="نام و نام خانوادگی خود را وارد نمایید" />
          </div>
          <div className="mt-8">
            <span className="uppercase text-sm text-slate-50 font-bold">عنوان پیام</span>
            <input className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="title" type="text" />
          </div>
          <div className="mt-8">
            <span className="uppercase text-sm text-slate-50 font-bold">پیام</span>
            <textarea
             name="message" className="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="mt-8">
            <button
              className="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
             ثبت اطلاعات
            </button>
          </div>
          
       </form>
        
      </div>
    </div>
  );
};

export default Contact;
