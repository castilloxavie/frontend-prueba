"use client";
import { useProjectStore } from "@/store/projectStore";

//filtros
export default function Filter () {
    const statusFilter = useProjectStore((state) => state.statusFilter)
    const setStatusFilter = useProjectStore((state) => state.setStatusFilter)

    const sortBy = useProjectStore((state) => state.sortBy)
    const setSortBy = useProjectStore((state) => state.setSortBy)

    return (
        <div style={{marginBottom: "16px", display: "flex", gap:"12px"}}>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivo</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Nombre</option>
                <option value="due">Orden de Fecha Por Vencer</option>
            </select>
        </div>
    )

}