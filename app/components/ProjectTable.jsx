"use client";
import { useProjectStore } from "@/store/projectStore";
import styles from "../styles/table.module.css";

const countItemsByType = (incidents, type) => {
    return incidents.filter(
        (item) => item.item === type && item.status === "active"
    ).length;
};

// Mapeo de plan a español
const getPlanLabel = (plan) => {
    const planMap = {
        "big": "Premium",
        "small": "Pequeño",
        "advanced": "Avanzado"
    };
    return planMap[plan] || plan;
};

// Mapeo de status a español
const getStatusLabel = (status) => {
    const statusMap = {
        "active": "Activo",
        "inactive": "Inactivo",
        "suspended": "Suspendido",
        "completed": "Completado"
    };
    return statusMap[status] || status;
};

// Componente Badge para Plan
const PlanBadge = ({ plan }) => {
    const label = getPlanLabel(plan);
    const planClass = {
        "big": styles.planPremium,
        "small": styles.planSmall,
        "advanced": styles.planAdvanced
    }[plan] || styles.planAdvanced;

    return <span className={`${styles.badge} ${planClass}`}>{label}</span>;
};

// Componente Badge para Status
const StatusBadge = ({ status }) => {
    const label = getStatusLabel(status);
    const statusClass = {
        "active": styles.statusActive,
        "inactive": styles.statusInactive,
        "suspended": styles.statusSuspended,
        "completed": styles.statusCompleted
    }[status] || styles.statusInactive;

    return <span className={`${styles.badge} ${statusClass}`}>{label}</span>;
};

// Componente para mostrar avatares del equipo
const TeamAvatars = ({ users, maxDisplay = 5 }) => {
    const displayUsers = users?.slice(0, maxDisplay) || [];
    const extraCount = (users?.length || 0) - maxDisplay;

    return (
        <div className={styles.teamContainer}>
            <div className={styles.avatarGroup}>
                {displayUsers.map((user, idx) => {
                    const initials = `${user.name?.[0] || 'U'}${user.lastName?.[0] || 'U'}`.toUpperCase();
                    return (
                        <div 
                            key={idx}
                            className={styles.avatar}
                            title={`${user.name} ${user.lastName}`}
                        >
                            {initials}
                        </div>
                    );
                })}
                {extraCount > 0 && (
                    <div className={styles.avatar} title={`+${extraCount} mas`}>
                        +{extraCount}
                    </div>
                )}
            </div>
        </div>
    );
};

// Componente para Items por vencer
const DueItems = ({ incidents, rfi, tasks }) => {
    const items = [
        { label: "Incidencias", count: incidents, emoji: "X" },
        { label: "RFI", count: rfi, emoji: "X" },
        { label: "Tareas", count: tasks, emoji: "X" }
    ];

    return (
        <div className={styles.dueItemsContainer}>
            {items.map((item, idx) => (
                <div key={idx} className={styles.dueItem}>
                    <div className={styles.dueEmoji}>X</div>
                    <div className={styles.dueContent}>
                        <div className={styles.dueLabel}>{item.label}</div>
                        <div className={styles.dueCount}>{item.count}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function ProjectTable(){
    const getPaginationProject = useProjectStore((state) => state.getPaginationProject);
    const searchTerm = useProjectStore((state) => state.searchTerm);
    const sortBy = useProjectStore((state) => state.sortBy);
    const currentPage = useProjectStore((state) => state.currentPage);
    const itemPerPage = useProjectStore((state) => state.itemPerPage);
    const setSelectedProject = useProjectStore((state) => state.setSelectedProject);
    const selectedProject = useProjectStore((state) => state.selectedProject);
    const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects);
    const setViewMode = useProjectStore((state) => state.setViewMode);

    const projects = getPaginationProject();
    const totalProject = getFilteredProjects().length;
    const totalPages = Math.ceil(totalProject / itemPerPage);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        // Cambiar automáticamente a vista mixed para mostrar el mapa
        setViewMode("mixed");
    };

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
                            onClick={() => handleProjectClick(project)} 
                            className={`${styles.row} ${isSelected ? styles.selected : ''}`}
                        >
                            <td className={styles.projectName}>{project.title}</td>
                            <td>
                                <PlanBadge plan={project.projectPlanData?.plan} />
                            </td>
                            <td>
                                <StatusBadge status={project.status} />
                            </td>
                            <td>
                                <TeamAvatars users={project.users} />
                            </td>
                            <td>
                                <DueItems incidents={incidents} rfi={rfi} tasks={task} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}
