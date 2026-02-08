"use client";
import { useProjectStore } from "@/store/projectStore";
import styles from "../styles/sidebar.module.css";

//barras laterales con detalles del proyecto seleccionado, como cantidad de items por vencer, ubicación y equipo asignado
export default function Sidebar() {
  const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects);
  const selectedProject = useProjectStore((state) => state.selectedProject);

  const projects = getFilteredProjects();

  // Calcular items por vencer
  const getDueItems = () => {
    const now = new Date();
    const dueItems = { incidents: 0, rfi: 0, tasks: 0 };

    projects.forEach(project => {
      if (project.incidents) {
        project.incidents.forEach(item => {
          if (item.status === "active" && new Date(item.limitDate) > now) {
            if (item.item === "incidents") dueItems.incidents++;
            else if (item.item === "RFI") dueItems.rfi++;
            else if (item.item === "task") dueItems.tasks++;
          }
        });
      }
    });

    return dueItems;
  };

  const dueItems = getDueItems();
  const totalDue = dueItems.incidents + dueItems.rfi + dueItems.tasks;

  if (!selectedProject) {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.emptyState}>
          <p>Selecciona un proyecto para ver detalles</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>{selectedProject.title}</h2>
          <p className={styles.subtitle}>Detalles del proyecto</p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Por Vencer</h3>
          <div className={styles.dueGrid}>
            <div className={styles.dueItem}>
              <span className={styles.label}>Incidencias</span>
              <span className={styles.count}>{dueItems.incidents}</span>
            </div>
            <div className={styles.dueItem}>
              <span className={styles.label}>RFI</span>
              <span className={styles.count}>{dueItems.rfi}</span>
            </div>
            <div className={styles.dueItem}>
              <span className={styles.label}>Tareas</span>
              <span className={styles.count}>{dueItems.tasks}</span>
            </div>
          </div>
          <div className={styles.totalDue}>
            <strong>Total:</strong> {totalDue} items
          </div>
        </div>

        {selectedProject.city && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Ubicación</h3>
            <p className={styles.city}>{selectedProject.city}</p>
          </div>
        )}

        {selectedProject.users && selectedProject.users.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Equipo</h3>
            <div className={styles.userList}>
              {selectedProject.users.map((user, idx) => (
                <div key={idx} className={styles.user}>
                  <span>{user.name} {user.lastName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
