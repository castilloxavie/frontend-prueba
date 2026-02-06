"use client"
import { useState } from "react";
import { useProjectStore } from "../store/projectStore";
import styles from "../styles/subheader.module.css";
import filterStyles from "../styles/filter.module.css";

export default function SubHeader() {
  const viewMode = useProjectStore((state) => state.viewMode);
  const setViewMode = useProjectStore((state) => state.setViewMode);
  const searchTerm = useProjectStore((state) => state.searchTerm);
  const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects);
  const setSearchTerm = useProjectStore((state) => state.setSearchTerm);
  const sortBy = useProjectStore((state) => state.sortBy);
  const setSortBy = useProjectStore((state) => state.setSortBy);

  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortOption = (sortOption) => {
    setSortBy(sortOption);
    setShowSortDropdown(false);
  };

  const totalProjects = getFilteredProjects().length;

  // Iconos SVG
  const ListIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );

  const GridIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  );

  const MapIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  );

  const FilterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  );

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
              <ListIcon />
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === "mixed" ? styles.active : ""}`}
              onClick={() => setViewMode("mixed")}
              aria-label="Vista de cuadricula"
              title="Vista de cuadricula"
            >
              <GridIcon />
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === "map" ? styles.active : ""}`}
              onClick={() => setViewMode("map")}
              aria-label="Vista de mapa"
              title="Vista de mapa"
            >
              <MapIcon />
            </button>
          </div>

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
              aria-label="Buscar proyecto"
            />
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
          </div>

          <div className={filterStyles.dropdown} style={{ position: 'relative' }}>
            <button
              className={filterStyles.dropdownButton}
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              aria-label="Ordenar por"
              title="Opciones de ordenamiento"
            >
              <FilterIcon />
            </button>
            <div className={`${filterStyles.dropdownContent} ${showSortDropdown ? filterStyles.show : ''}`}>
              <button
                className={filterStyles.dropdownOption}
                onClick={() => handleSortOption('name')}
              >
                Orden alfabetico
              </button>
              <button
                className={filterStyles.dropdownOption}
                onClick={() => handleSortOption('incidents')}
              >
                Numero de Incidencias
              </button>
              <button
                className={filterStyles.dropdownOption}
                onClick={() => handleSortOption('rfi')}
              >
                Numero de RFI
              </button>
              <button
                className={filterStyles.dropdownOption}
                onClick={() => handleSortOption('tasks')}
              >
                Numero de Tareas
              </button>
            </div>
          </div>

          <button className={styles.createButton}>
            + Crear proyecto
          </button>
        </div>
      </div>
    </div>
  );
}
