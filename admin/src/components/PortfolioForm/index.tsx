"use client";
import { api } from "@/services/api";
import { getPortfolio } from "@/services/portfolios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from 'yup';

interface PortfolioValues {
  title: string;
  description: string;
  image: string;
  status: string;
}
const validationSchema = Yup.object({
  title: Yup.string().required('عنوان نمونه کار ضروری است'),
  description: Yup.string().required('توضیحات ضروری است'),
});

const PortfolioForm = () => {
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  
  let [ formData , setFormData] = useState(
    {
      title: '',
      description: '',
      image: '',
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
      const getPortfolioData = async () => {
        let portfolio = await getPortfolio(lastSegment)
        setFormData({
          title: portfolio.data.title,
          description: portfolio.data.description,
          image: portfolio.data.image,
          status: portfolio.data.status ? 'true' : false,
        })
        if(portfolio.data.image != '') {
          setImagePreview(`http://localhost:3210/upload/${portfolio.data.image}`)
        }

      }

      
      getPortfolioData();
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
          console.log('submit va', values)
          if(values.status == "false") values.status = false;
          if(values.status == "true") values.status = true;

          const url = window.location.href;
          const segments = url.split('/');
          const lastSegment =  Number(segments.pop());
    
          if (lastSegment &&  typeof lastSegment == 'number' &&  lastSegment > 0) {
              const res = await api.put(`/portfolio/${lastSegment}` , values);
              console.log('test' ,res)
              toast.success('با موفقیت اطلاعات ویرایش شد')
          } else {
              const res = await api.post('/portfolio' , values);
              console.log('test' ,res)
              
              toast.success('با موفقیت نمونه کار ثبت شد')
              router.push(`/portfolios/form/${res.data.portfolio_id}`);
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

            <div className="flex border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className=" first-line:font-medium text-black dark:text-white">
                فرم اطلاعات نمونه کار
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
                <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="title"
                    >
                      عنوان نمونه کار
                    </label>
                      <Field
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        placeholder="عنوان نمونه کار"
                        onChange={(event) => {
                          handleFieldChange(event);
                          setFieldValue('title', event.target.value);
                        }}
                      />
                      <ErrorMessage name="title" component="div" />
                </div>

                <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="description"
                    >
                      توضیحات نمونه کار
                    </label>
                      <Field
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        as="textarea"
                        type="text"
                        name="description"
                        id="description"
                        value={formData.description}
                        placeholder="توضیحات نمونه کار"
                        onChange={(event) => {
                          handleFieldChange(event);
                          setFieldValue('description', event.target.value);
                        }}
                      />
                      <ErrorMessage name="description" component="div" />
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
                        تصویر نمونه کار
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

export default PortfolioForm;
