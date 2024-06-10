import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = async (portfolios: any) => {
  console.log(portfolios.portfolios)
  const projects = []
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        نمونه کار های من
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        {portfolios.portfolios.map((item: any , index:number) => <ProjectCard
            key={index}
            src={`http://localhost:3210/upload/${item.image}`}
            title={item.title}
            description={item.title}
          />)}
        
      </div>
    </div>
  );
};

export default Projects;
