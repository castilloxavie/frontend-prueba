"use client";
import ProjectTable from "@/components/ProjectTable"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/SearchBar"
import Filter from "@/components/Filter"
import MapView from "@/components/MapView"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuthStore } from "@/store/authStore"

export default function Home() {
  const logout = useAuthStore((state) => state.logout)
  return(
    <main style={{padding: "24px"}}>
      <ProtectedRoute >
        <h1>Listado de Proyectos</h1>
          <button onClick={logout}>Cerrar sesión</button>
          <SearchBar />
          <Filter />
  
          <ProjectTable />
          <Pagination />

          <MapView />
      </ProtectedRoute>
    </main>
  )
}