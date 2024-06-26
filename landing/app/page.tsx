import Hero from "@/components/main/Hero";
import Projects from "@/components/main/Projects";
import Contact from "@/components/main/Contact";
import Skills from "@/components/main/Skills";
import { getAllData } from "@/services";
import Image from "next/image";

export default async function Home() {
  const data = await getAllData()

  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero firstname={data?.firstname} 
          lastname={data?.lastname} 
          email={data?.email}
          mobile={data?.mobile}
          about_me={data?.about_me}
          position={data?.position}
          person_image = {data?.person_image}
          />
          
        <Projects portfolios={data.portfolio} />
      </div>
    </main>
  );
}