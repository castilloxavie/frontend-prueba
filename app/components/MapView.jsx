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

        projects.forEach((project) => {
            const pos = project.position || project.location
            if(!pos) return

            const lng = pos.lng ?? pos.longitude
            const lat = pos.lat ?? pos.latitude

            const marker = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map.current)
            markersRef.current.push(marker)

            marker.on("click", () => {
                setSelectedProject(project)
            })
        })

        // Los marcadores se agregan al mapa global sin ajustar bounds
    }, [projects, setSelectedProject])

    // centrar el mapa a seleccionar el proyecto deseado y resaltar el marcador
    useEffect(() => {
        if(!selected || !map.current) return

        const pos = selected.position || selected.location
        if(!pos) return

        const lng = pos.lng ?? pos.longitude
        const lat = pos.lat ?? pos.latitude

        map.current.flyTo({
            center: [lng, lat],
            zoom: 2,  
        })

        // Resaltar el marcador seleccionado cambiando su color
        markersRef.current.forEach(marker => {
            const markerElement = marker.getElement()
            if (marker._lngLat.lng === lng && marker._lngLat.lat === lat) {
                markerElement.style.backgroundColor = 'red'  
            } else {
                markerElement.style.backgroundColor = '' 
            }
        })
    }, [selected])

    return (
        <div ref={mapContainer}
        className={styles.mapContainer}
        >
        
        </div>
    )

}
