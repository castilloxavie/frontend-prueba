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
    statusFilter: "all",

    //acciones
    setSearchTerm: (term) => 
        set({ searchTerm: term, currentPage: 1 }),

    setSortBy: (value) =>
        set({ sortBy: value }),

    setPage: (page)  =>
        set({currentPage: page}),

    setSelectedProject: (project) =>
        set({selectedProject: project }),

    setStatusFilter: (status) => 
        set({ statusFilter: status, currentPage: 1 }),

    //paginacion(10 x pagina), del proyecto
    getPaginationProject: () => {
        const {
            currentPage,
            itemPerPage,
            sortBy,
        } = get();

        let data = [...get().getFilterProject()]

        // Función auxiliar para contar ítems por tipo
        const countItemsByType = (incidents, type) => {
            const now = new Date();
            return incidents.filter(
                (item) =>
                    item.item === type && item.status === "active" && new Date(item.limitDate) > now
            ).length;
        };

        //ordeno
        if(sortBy === "name") {
            data.sort((a, b) => a.title.localeCompare(b.title))
        }

        if(sortBy === "due"){
            const countDue = (project) =>{
                const now = new Date();
                return (project.incidents || []).filter(
                    (item) =>
                        item.status === "active" && new Date(item.limitDate) > now
                ).length
            }

            data.sort((a, b) => countDue(b) - countDue(a))
        }

        if(sortBy === "incidents") {
            data.sort((a, b) => countItemsByType(b.incidents || [], "incidents") - countItemsByType(a.incidents || [], "incidents"))
        }

        if(sortBy === "rfi") {
            data.sort((a, b) => countItemsByType(b.incidents || [], "RFI") - countItemsByType(a.incidents || [], "RFI"))
        }

        if(sortBy === "tasks") {
            data.sort((a, b) => countItemsByType(b.incidents || [], "task") - countItemsByType(a.incidents || [], "task"))
        }

        const start = (currentPage - 1) * itemPerPage
        const end = start + itemPerPage

        return data.slice(start, end)
    },

    //filtros para la budqueda de proyecto
    getFilterProject: () => {
        const {projects, searchTerm, statusFilter} = get()
        let result = [...projects]

        //filtrar por estados
        if(statusFilter !== "all"){
            result = result.filter(
                projects => projects.status === statusFilter
            )
        }

        //busqueda

        if(searchTerm.trim()){
            result = result.filter(
                projects => 
                    projects.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            )
        }

        return result;
    }

}))
