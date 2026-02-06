"use client";
import { useProjectStore } from "@/store/projectStore";
import styles from "../styles/sidebar.module.css";

export default function Sidebar() {
  const projects = useProjectStore((state) => state.getFilterProject());

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

  // Safely calculate progress in degrees
  const getProgress = (value, total) => {
    return total > 0 ? `${(value / total) * 360}deg` : '0deg';
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.sidebarTitle}>Resumen</h3>
        <button className={styles.collapseBtn}></button>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>General</button>
        <button className={styles.tab}>Mis actualizaciones</button>
        <button className={styles.filterBtn}>Menu</button>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>Time</span>
          <h4>Proximos a vencer</h4>
          <a href="#" className={styles.viewAll}>Ver todos</a>
        </div>

        <div className={styles.donutCharts}>
          <div className={styles.donut}>
            <div className={styles.donutProgress} style={{'--progress': getProgress(dueItems.incidents, totalDue)}}>
              <span className={styles.donutNumber}>{dueItems.incidents}</span>
            </div>
            <span className={styles.donutLabel}>Incidencias</span>
          </div>
          <div className={styles.donut}>
            <div className={styles.donutProgress} style={{'--progress': getProgress(dueItems.rfi, totalDue)}}>
              <span className={styles.donutNumber}>{dueItems.rfi}</span>
            </div>
            <span className={styles.donutLabel}>RFI</span>
          </div>
          <div className={styles.donut}>
            <div className={styles.donutProgress} style={{'--progress': getProgress(dueItems.tasks, totalDue)}}>
              <span className={styles.donutNumber}>{dueItems.tasks}</span>
            </div>
            <span className={styles.donutLabel}>Tareas</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>Events</span>
          <h4>Proximos eventos</h4>
        </div>
        <div className={styles.eventsList}>
          <div className={styles.eventItem}>
            <div className={styles.eventAvatar}>A</div>
            <div className={styles.eventInfo}>
              <div className={styles.eventTitle}>Revision semanal</div>
              <div className={styles.eventMeta}>Proyecto Alpha - Hoy 14:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
