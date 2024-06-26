"use client";
import { api } from "@/services/api";
import { getUser } from "@/services/user";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from 'yup';

interface UserValues {
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  password: string;
  confirm: string;
  role: number;
  status: string;
}
const validationSchema = Yup.object({
  firstName: Yup.string().required('نام ضروری است'),
  lastName: Yup.string().required('نام خانوادگی ضروری است'),
  email: Yup.string().email('ایمیل نامعتبر است').required('ایمیل ضروری است'),
  role: Yup.number().required('نقش ضروری است').integer('نقش باید عدد صحیح باشد'),
  password: Yup.lazy(value => {
    if (value && value.length > 0) {
      return Yup.string()
        .required('رمز عبور ضروری است')
        .min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد');
    }
    return Yup.string();
  }),
  confirm: Yup.lazy(value => {
    if (value && value.length > 0) {
      return Yup.string()
        .required('تایید رمز عبور ضروری است')
        .oneOf([Yup.ref('password'), null], 'رمز عبور مطابقت ندارد');
    }
    return Yup.string();
  }),

});

const UserForms = () => {
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  let [ formData , setFormData] = useState(
    {
      firstName: '',
      lastName: '',
      image: '',
      email: '',
      password: '',
      confirm: '',
      role: 1,
      status: 'false',
    }
  )
  
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
      setFieldValue('image', imageUrl);
      setFormData({ ...formData, image: imageUrl });
      // setImagePreview(imageUrl);
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
    const url = window.location.href;
    const segments = url.split('/');
    const lastSegment =  Number(segments.pop());

    if (lastSegment &&  typeof lastSegment == 'number' &&  lastSegment > 0) {
      const getUserData = async () => {
        let user = await getUser(lastSegment)
        setFormData({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          image: user.data.image,
          email: user.data.email,
          password: '',
          confirm: '',
          role: user.data.role,
          status: user.data.status ? 'true' : false,
        })
        if(user.data.image != '') {
          setImagePreview(`http://localhost:3210/upload/${user.data.image}`)
        }

      }

      
      getUserData();
    }
  }, [setFormData]);
  console.log('form',formData)
  return (
    <>
      <Formik
      validationSchema={validationSchema}
      enableReinitialize={true}
      initialValues={formData}
      onSubmit={async (values) => {
        try {
          // values.status = values.status == 0 ? false: true;
          if(values.password == '') {
            delete values.password
            delete values.confirm
          }
          console.log('post' , values)
          values.role = Number(values.role)

          if(values.status == "false") values.status = false;
          if(values.status == "true") values.status = true;

          const url = window.location.href;
          const segments = url.split('/');
          const lastSegment =  Number(segments.pop());
    
          if (lastSegment &&  typeof lastSegment == 'number' &&  lastSegment > 0) {
              const res = await api.put(`/user/${lastSegment}` , values);
              console.log('test' ,res)
              toast.success('با موفقیت اطلاعات ویرایش شد')
          } else {
              const res = await api.post('/user' , values);
              console.log('test' ,res)
              
              toast.success('با موفقیت ثبت نام شدید')
              router.push(`/users/form/${res.data.user_id}`);
          }
          console.log(values)
          
          
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
              {/* Hidden field to trick the browser's password manager */}
            <input type="text" name="fakeUsername" style={{ display: 'none' }} autoComplete="username" />
            <input type="password" name="fakePassword" style={{ display: 'none' }} autoComplete="new-password" />

            <div className="flex border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className=" first-line:font-medium text-black dark:text-white">
                فرم اطلاعات کاربر
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
                      htmlFor="firstName"
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
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        placeholder="نام"
                        onChange={(event) => {
                          handleFieldChange(event);
                          setFieldValue('firstName', event.target.value);
                        }}
                      />
                      <ErrorMessage name="firstName" component="div" />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="lastName"
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
                        name="lastName"
                        id="lastName"
                        placeholder="نام خانوادگی"
                        value={formData.lastName}
                        onChange={(event) => {
                          handleFieldChange(event);
                          setFieldValue('lastName', event.target.value);
                        }}
                      />
                      <ErrorMessage name="lastName" component="div" />
                    </div>
                  </div>
                </div>
      
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="email"
                  >
                    ایمیل
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
                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                    <Field
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="ایمیل"
                      value={formData.email}
                      onChange={(event) => {
                        handleFieldChange(event);
                        setFieldValue('email', event.target.value);
                      }}
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="password"
                  >
                    کلمه عبور
                  </label>
                  <div className="relative">
                      <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4.5 top-4 bg-none border-none">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <Field
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="کلمه عبور"
                        onChange={(event) => {
                          handleFieldChange(event);
                          setFieldValue('password', event.target.value);
                        }}
                      />
                      <ErrorMessage name="password" component="div" />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="confirm"
                  >
                    تکرار کلمه عبور
                  </label>
                  <div className="relative">
                      <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-4.5 top-4 bg-none border-none">
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <Field
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirm"
                        id="confirm"
                        placeholder="تکرار کلمه عبور"
                        onChange={(event) => {
                          handleFieldChange(event);
                          setFieldValue('confirm', event.target.value);
                        }}
                      />
                      <ErrorMessage name="confirm" component="div" />
                    </div>
                </div>


                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="confirm"
                  >
                    نوع کاربر
                  </label>
                

                  <Field
                        as="select"
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={(event) => {
                          handleFieldChange(event);
                          setFieldValue('role', event.target.value);
                        }}
                  >
                    <option value="1" >کاربر</option>
                    <option value="0" >ادمین</option>
                  </Field>
                  <ErrorMessage name="role" component="div" />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="confirm"
                  >
                    وضعیت
                  </label>
                

                  <Field
                        as="select"
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="status"
                        id="status"
                        value={formData.status}
                        onChange={(event) => {
                          handleFieldChange(event);
                          setFieldValue('status', event.target.value);
                        }}
                  >
                    <option value="true" >فعال</option>
                    <option value="false" >غیرفعال</option>
                  </Field>
                  <ErrorMessage name="status" component="div" />
                </div>
              </div>
              <div className="col-span-1 xl:col-span-2" >
                
                  <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="image"
                      >
                        تصویر پروفایل
                      </label>
                      
                      {imageLoading ? 
                      <>
                      Loading...
                      </>
                      : <>
                        {imagePreview && <img src={imagePreview} className="w-29 h-29 mb-3 rounded-full mx-auto" alt="پیش‌نمایش تصویر" width="100" height="100" />}
                        </>
                        }
                        
                        <Field
                          type="hidden"
                          name="image"
                          id="image"
                          value={formData.image}
                          onChange={(event) => {
                            handleFieldChange(event);
                            setFieldValue('image', event.target.value);
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

export default UserForms;
