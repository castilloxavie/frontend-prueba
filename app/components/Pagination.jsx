"use client";
import { useProjectStore } from "@/store/projectStore"

//paginacion 
export default function Pagination () {
    const projects = useProjectStore((state) => state.projects);
    const currentPage = useProjectStore((state) => state.currentPage)
    const itemPerPage = useProjectStore((state) => state.itemPerPage)
    const setPage = useProjectStore((state) => state.setPage)
    const totalPages = Math.ceil(projects.length / itemPerPage);

    if(totalPages <= 1) return null;

    return (
        <div style={{marginTop: "16px"}}>
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setPage(page)}
                style={{
                    marginRight: "8px",
                    padding: "6px 10px",
                    fontWeight: page === currentPage ? "bold": "normal"
                }}
                >{page}</button>
            ))}
        </div>
    )
}