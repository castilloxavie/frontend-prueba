"use client";
import { useProjectStore } from "@/store/projectStore";
import styles from "../styles/table.module.css";

//contar los elementos por tipos
const countItemsByType = (incidents, type) => {
    const now = new Date();

    return incidents.filter(
        (item) =>
            item.item === type && item.status === "active" && new Date(item.limitDate) > now
    ).length;
};

export default function ProjectTable(){
    const projects = useProjectStore((state) => state.projects);
    const setSelectedProject = useProjectStore(
        (state) => state.setSelectedProject
    );

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
                {projects.map((project) => {
                    const incidents = countItemsByType(project.incidents || [], "incidents");
                    const rfi = countItemsByType(project.incidents || [], "RFI");
                    const task = countItemsByType(project.incidents || [], "task");

                    return(
                        <tr key={project._id} onClick={() => setSelectedProject(project)} className={styles.row}>
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
