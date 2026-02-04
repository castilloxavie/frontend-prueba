"use client";
import ProjectTable from "@/components/ProjectTable"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/SearchBar"
import Filter from "@/components/Filter"

export default function Home() {
  return(
    <main style={{padding: "24px"}}>
      <h1>Listado de Proyectos</h1>
      <SearchBar />
      <Filter />
      
      <ProjectTable />
      <Pagination />
    </main>
  )
}