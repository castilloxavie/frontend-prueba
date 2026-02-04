"use client";
import { useProjectStore } from "@/store/projectStore";

export default function SearcBar () {
    const searchTerm = useProjectStore((state) => state.searchTerm);
    const setSearchTerm = useProjectStore((state) => state.setSearchTerm);

    return (
        <input type="text" placeholder="Buscar Proyecto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        style={{
            marginBottom: "1px",
            padding: "8px",
            width: "100%",
            maxWidth: "320px"
        }}
         />
    )
}
