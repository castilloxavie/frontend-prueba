"use client";
import { useProjectStore } from "@/store/projectStore";
import styles from "../styles/table.module.css";

const countItemsByType = (incidents, type) => {
    const now = new Date();
    return incidents.filter(
        (item) =>
            item.item === type && item.status === "active" && new Date(item.limitDate) > now
    ).length;
};

export default function ProjectTable(){
    const getPaginationProject = useProjectStore((state) => state.getPaginationProject);
    const currentPage = useProjectStore((state) => state.currentPage);
    const itemPerPage = useProjectStore((state) => state.itemPerPage);
    const setSelectedProject = useProjectStore((state) => state.setSelectedProject);
    const selectedProject = useProjectStore((state) => state.selectedProject);
    const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects);

    const projects = getPaginationProject();
    const totalProject = getFilteredProjects().length;
    const totalPages = Math.ceil(totalProject / itemPerPage);

    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Proyecto</th>
                    <th>Plan</th>
                    <th>Estado</th>
                    <th>Equipo</th>
                    <th>Por vencer</th>
                </tr>
            </thead>

            <tbody>
                {projects && projects.map((project) => {
                    const incidents = countItemsByType(project.incidents || [], "incidents");
                    const rfi = countItemsByType(project.incidents || [], "RFI");
                    const task = countItemsByType(project.incidents || [], "task");
                    
                    const isSelected = selectedProject?._id === project._id;

                    return(
                        <tr 
                            key={project._id} 
                            onClick={() => setSelectedProject(project)} 
                            className={`${styles.row} ${isSelected ? styles.selected : ''}`}
                        >
                            <td>{project.title}</td>
                            <td>{project.projectPlanData?.plan ?? "N/A"}</td>
                            <td>{project.status}</td>
                            <td>{project.users?.length ?? 0}</td>
                            <td>{incidents + rfi + task}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}
