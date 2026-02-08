"use client";
import { useProjectStore } from "@/store/projectStore";
import styles from "@/styles/filter.module.css"

//filtros y ordenamiento de proyectos
export default function Filter () {
    const statusFilter = useProjectStore((state) => state.statusFilter)
    const setStatusFilter = useProjectStore((state) => state.setStatusFilter)

    const sortBy = useProjectStore((state) => state.sortBy)
    const setSortBy = useProjectStore((state) => state.setSortBy)

    return (
        <div className={styles.container}>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivo</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Nombre</option>
                <option value="due">Orden de Fecha Por Vencer</option>
                <option value="incidents">Cantidad de Incidencias</option>
                <option value="rfi">Cantidad de RFI</option>
                <option value="tasks">Cantidad de Tareas</option>
            </select>
        </div>
    )

}
