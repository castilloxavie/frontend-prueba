"use client";
import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import { useProjectStore } from "@/store/projectStore";
import styles from "@/styles/mapView.module.css"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export default function MapView () {
    const mapContainer = useRef(null)
    const map = useRef(null)
    const markersRef = useRef([])

    const projects = useProjectStore((state) => state.projects)
    const selected = useProjectStore((state) => state.selectedProject)
    const setSelectedProject = useProjectStore((state) => state.setSelectedProject)

    //inicializar el mapa.
    useEffect(() => {
        if(map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-74.08175, 4.60971],
            zoom: 5,
        })
    }, [])

    //agregar marcadores.
    useEffect(() => {
        if(!map.current) return

        markersRef.current.forEach(m => m.remove())
        markersRef.current = []

        let bounds = null

        projects.forEach((project) => {
            const pos = project.position || project.location
            if(!pos) return

            const lng = pos.lng ?? pos.longitude
            const lat = pos.lat ?? pos.latitude

            const marker = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map.current)
            markersRef.current.push(marker)

            marker.getElement().addEventListener("click", () => {
                setSelectedProject(project)
            })

            if(bounds === null) {
                bounds = new mapboxgl.LngLatBounds([lng, lat], [lng, lat])
            } else {
                bounds.extend([lng, lat])
            }
        })

        if(bounds) {
            map.current.fitBounds(bounds, { padding: 40, maxZoom: 5 })
        }
    }, [projects, setSelectedProject])

    // centrar el mapa a seleccionar el proyecto deseado
    useEffect(() => {
        if(!selected || !map.current) return

        const pos = selected.position || selected.location
        if(!pos) return

        const lng = pos.lng ?? pos.longitude
        const lat = pos.lat ?? pos.latitude

        map.current.flyTo({
            center: [lng, lat],
            zoom: 10,
        })
    }, [selected])

    return (
        <div ref={mapContainer}
        className={styles.mapContainer}
        >
        
        </div>
    )

}
