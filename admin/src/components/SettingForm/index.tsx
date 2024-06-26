"use client";
import { api } from "@/services/api";
import { getSetting } from "@/services/settings"
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from 'yup';

const SettingForm = () => {
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  
  let [ formData , setFormData ] = useState({
    firstname : '',
    lastname : '',
    mobile : '',
    email : '',
    position : '',
    telegram : '',
    about_me : '',
    instagram : '',
    person_image : '',
  })
  
  const handleImageChange = async (event, setFieldValue) => {
    setImageLoading(true)
    const file = event.currentTarget.files[0];
    const formUploadData = new FormData();
    formUploadData.append('file', file);
    console.log('upload start')
    try {
      const response = await api.post('/upload/image', formUploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data.filename;
      setFieldValue('person_image', imageUrl);
      setFormData({ ...formData, person_image: imageUrl });
      console.log('res', response.data)
      setImagePreview(`http://localhost:3210/upload/${imageUrl}`)
      console.log('upload end')
      setImageLoading(false)
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageLoading(false)
    }
  };



  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  
  useEffect(() => {
      const getSettingData = async () => {
        let setting = await api.get('/setting')
        setFormData(setting.data)
        
        let tempForm = {
          firstname : '',
          lastname : '',
          mobile : '',
          email : '',
          position : '',
          telegram : '',
          about_me : '',
          instagram : '',
          person_image : '',
        }
        setting.data.map((item , index) => {
          switch (item.key) {
            case 'firstname':
              tempForm.firstname = item.value;
            break;
            case 'lastname':
              tempForm.lastname = item.value;  
            break;
            case 'mobile':
              tempForm.mobile = item.value;  
            break;
            case 'email':
              tempForm.email = item.value;  
            break;
            case 'position':
              tempForm.position = item.value;  
            break;
            case 'telegram':
              tempForm.telegram = item.value;  
            break;
            case 'about_me':
              tempForm.about_me = item.value;  
            break;
            case 'instagram':
              tempForm.instagram = item.value;  
            break;
            case 'person_image':
              if(item.value != '') {
                setImagePreview(`http://localhost:3210/upload/${item.value}`)
              }
              tempForm.person_image = item.value;  
            break;
          }
          setFormData(tempForm)
        })
      }
      getSettingData();
  
  }, [setFormData]);
  console.log('form',formData)


  return (
    <>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={async (values) => {
          console.log('vas', values)  

          try {
              let saveData = [
                {
                  key: "person_image",
                  value:values.person_image
                },
                {
                  key: "firstname",
                  value:values.firstname
                },
                {
                  key: "lastname",
                  value:values.lastname
                },
                {
                  key: "email",
                  value:values.email
                },
                {
                  key: "mobile",
                  value:values.mobile
                },
                {
                  key: "position",
                  value:values.position
                },
                {
                  key: "about_me",
                  value:values.about_me
                },
                {
                  key: "telegram",
                  value:values.telegram
                },
                {
                  key: "instagram",
                  value:values.instagram
                }
              ]
              const res = await api.post('/setting/editSetting' , saveData);
              console.log('test' ,res)

              toast.success('با موفقیت تنظیمات ذخیره شد')
          } catch (e:any) {
            console.log(e.response)
            if(typeof e.response.data.message == 'object') {
                e.response.data.message.map((item: string) =>{
                    console.log(item)
                    toast.error(item)
                })
            } else {
                toast.error(e.response.data.message)
            }
          }
        }}
        className="grid grid-cols-1 gap-8">
        {({ setFieldValue, isSubmitting }) => (
          <Form className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

            <div className="flex border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className=" first-line:font-medium text-black dark:text-white">
                تنظیمات
              </h3>
              <button
                className="flex mr-auto justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
                disabled={isSubmitting}
              >
                ذخیره
              </button>
            </div>
            <div className="p-7 grid grid-cols-5">
              <div className="col-span-5 xl:col-span-3 pl-8">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="firstname"
                        >
                          نام
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <Field
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={formData?.firstname}
                            placeholder="نام"
                            onChange={(event) => {
                              handleFieldChange(event);
                              setFieldValue('firstname', event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="lastname"
                        >
                          نام خانوادگی
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <Field
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="نام خانوادگی"
                            value={formData.lastname}
                            onChange={(event) => {
                              handleFieldChange(event);
                              setFieldValue('lastname', event.target.value);
                            }}
                          />
                        </div>
                      </div>
                </div>
                
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="email"
                        >
                          ایمیل
                        </label>
                          <Field
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="email"
                            id="email"
                            value={formData?.email}
                            placeholder="ایمیل"
                            onChange={(event) => {
                              handleFieldChange(event);
                              setFieldValue('email', event.target.value);
                            }}
                          />
                        
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="mobile"
                        >
                          موبایل
                        </label>
                          <Field
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="mobile"
                            id="mobile"
                            value={formData?.mobile}
                            placeholder="موبایل"
                            onChange={(event) => {
                              handleFieldChange(event);
                              setFieldValue('mobile', event.target.value);
                            }}
                          />
                        
                      </div>
                </div>
                

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="telegram"
                        >
                          تلگرام
                        </label>
                          <Field
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="telegram"
                            id="telegram"
                            value={formData?.telegram}
                            placeholder="تلگرام"
                            onChange={(event) => {
                              handleFieldChange(event);
                              setFieldValue('telegram', event.target.value);
                            }}
                          />
                        
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="instagram"
                        >
                          اینستاگرام
                        </label>
                          <Field
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="instagram"
                            id="instagram"
                            value={formData?.instagram}
                            placeholder="اینستاگرام"
                            onChange={(event) => {
                              handleFieldChange(event);
                              setFieldValue('instagram', event.target.value);
                            }}
                          />
                        
                      </div>
                </div>
                

                <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="position"
                    >
                      موقعیت شغلی
                    </label>
                    <Field
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="position"
                      id="position"
                      value={formData?.position}
                      placeholder="موقعیت شعلی"
                      onChange={(event) => {
                        handleFieldChange(event);
                        setFieldValue('position', event.target.value);
                      }}
                    />
                </div>


                <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="about_me"
                    >
                      درباره من
                    </label>
                      <Field
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        as="textarea"
                        type="text"
                        name="about_me"
                        id="about_me"
                        value={formData.about_me ? formData.about_me : ''}
                        placeholder="درباره من"
                        onChange={(event) => {
                          handleFieldChange(event);
                          setFieldValue('description', event.target.value);
                        }}
                      />
                </div>

              </div>
              <div className="col-span-1 xl:col-span-2" >
                
                  <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="image"
                      >
                        تصویر من
                      </label>
                      
                      {imageLoading ? 
                      <>
                      Loading...
                      </>
                      : <>
                        {imagePreview && <img src={imagePreview} className="w-full h-auto mb-3 mx-auto" alt="پیش‌نمایش تصویر" />}
                        </>
                        }
                        
                        <Field
                          type="hidden"
                          name="person_image"
                          id="person_image"
                          value={formData.person_image}
                          onChange={(event) => {
                            handleFieldChange(event);
                            setFieldValue('person_image', event.target.value);
                          }}
                        />
                         <input 
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="file"
                          name="profile"
                          id="profile"
                          placeholder="آپلود"
                          onChange={(event) => {
                            handleImageChange(event, setFieldValue)
                          }}
                        /> 
                  
                  </div>
              </div>
                

          
              
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SettingForm;
