"use client";
import { useProjectStore } from "@/store/projectStore"
import styles from "@/styles/pagination.module.css"

//paginacion 
export default function Pagination () {
    const projects = useProjectStore((state) => state.projects);
    const currentPage = useProjectStore((state) => state.currentPage)
    const itemPerPage = useProjectStore((state) => state.itemPerPage)
    const setPage = useProjectStore((state) => state.setPage)
    const totalPages = Math.ceil(projects.length / itemPerPage);

    if(totalPages <= 1) return null;

    return (
        <div className={styles.container}>
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setPage(page)}
                className={page === currentPage ? styles.active : styles.button}
                >{page}</button>
            ))}
        </div>
    )
}