"use client";
import ProjectTable from "@/components/ProjectTable"


export default function Home() {
  return(
    <main style={{padding: "24px"}}>
      <h1>Listado de Proyectos</h1>
      <ProjectTable />
    </main>
  )
}