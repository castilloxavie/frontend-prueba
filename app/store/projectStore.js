import { create } from "zustand"
import projectsData from "@/data/mock_data.json"

export const useProjectStore = create ((set, get) => ({
    //datos
    projects: projectsData,
    selectedProject: null,

    //estado de interfaz de  usuario 
    searchTerm: "",
    sortBy: "name",
    currentPage: 1,
    itemPerPage: 10,

    //acciones
    setSearchTerm: (term) => 
        set({ searchTerm: term, currentPage: 1 }),

    setSortBy: (value) =>
        set({ sortBy: value }),

    setPage: (page)  =>
        set({currentPage: page}),

    setSelectedProject: (project) =>
        set({selectedProject: project }),

    //paginacion(10 x pagina), del proyecto
    getPaginationProject: () => {
        const {
            projects,
            currentPage,
            itemPerPage,
        } = get();

        const start = (currentPage -1) * itemPerPage;
        const end = start + itemPerPage;

        return projects.slice(start, end)
    } 

}))