"use client";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import ProjectTable from "@/components/ProjectTable";
import Pagination from "@/components/Pagination";
import MapView from "@/components/MapView";
import Filter from "@/components/Filter";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useProjectStore } from "@/store/projectStore";
import styles from "@/styles/page.module.css";

export default function Home() {
  const viewMode = useProjectStore((state) => state.viewMode);

  return (
    <ProtectedRoute>
      <>
        <Header />
        <SubHeader />

        <main className={styles.main}>
          {/* Vista 1: Solo Lista */}
          {viewMode === "list" && (
            <div className={styles.listView}>
              <div className={styles.container}>
                <Filter />
                <div className={styles.tableWrapper}>
                  <ProjectTable />
                  <Pagination />
                </div>
              </div>
            </div>
          )}

          {/* Vista 2: Mixta (Mapa + Tabla + Sidebar) */}
          {viewMode === "mixed" && (
            <div className={styles.mixedView}>
              <div className={styles.container}>
                <div className={styles.content}>
                  <div className={styles.mapSection}>
                    <MapView />
                  </div>
                  <div className={styles.tableSection}>
                    <Filter />
                    <ProjectTable />
                    <Pagination />
                  </div>
                </div>
                <Sidebar />
              </div>
            </div>
          )}

          {/* Vista 3: Solo Mapa */}
          {viewMode === "map" && (
            <div className={styles.mapOnlyView}>
              <div className={styles.container}>
                <MapView />
              </div>
            </div>
          )}
        </main>
      </>
    </ProtectedRoute>
  );
}
