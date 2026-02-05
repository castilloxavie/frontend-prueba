"use client";
import { useState } from "react";
import { useProjectStore } from "../store/projectStore";
import styles from "../styles/subheader.module.css";

export default function SubHeader() {
  const viewMode = useProjectStore((state) => state.viewMode);
  const setViewMode = useProjectStore((state) => state.setViewMode);
  const searchTerm = useProjectStore((state) => state.searchTerm);
  const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects);
  const setSearchTerm = useProjectStore((state) => state.setSearchTerm);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const totalProjects = getFilteredProjects().length;

  return (
    <div className={styles.subHeader}>
      <div className={styles.subHeaderContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Mis proyectos</h1>
          <span className={styles.counter}>{totalProjects} Proyectos</span>
        </div>

        <div className={styles.actionsSection}>
          <div className={styles.viewSelector}>
            <button
              className={`${styles.viewButton} ${viewMode === "list" ? styles.active : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="Vista de lista"
              title="Vista de lista"
            >
              List
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === "mixed" ? styles.active : ""}`}
              onClick={() => setViewMode("mixed")}
              aria-label="Vista mixta: Mapa y lista"
              title="Vista mixta"
            >
              Mixed
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === "map" ? styles.active : ""}`}
              onClick={() => setViewMode("map")}
              aria-label="Vista de mapa"
              title="Vista de mapa"
            >
              Map
            </button>
          </div>

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Buscar Proyecto"
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
              aria-label="Buscar proyecto"
            />
            <span className={styles.searchIcon}>Search</span>
          </div>

          <button className={styles.createButton}>
            + Crear proyecto
          </button>
        </div>
      </div>
    </div>
  );
}
