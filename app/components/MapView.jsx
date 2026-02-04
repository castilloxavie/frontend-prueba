"use client";
import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import { useProjectStore } from "@/store/projectStore";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export default function MapView () {
    const mapContainer = useRef(null)
    const map = useRef(null)

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

        projects.forEach((project) => {
            if(!project.location) return

            const {longitude, latitude} = project.location

            const marker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map.current)

            marker.getElement().addEventListener("click", () => {
                setSelectedProject(project)
            })
        })
    }, [projects, setSelectedProject])

    // centrar el mapa a seleccionar el proyecto deseado
    useEffect(() => {
        if(!selected?.location || !map.current) return

        const {longitude, latitude} = selected.location

        map.current.flyTo({
            center: [longitude, latitude],
            zoom: 12,
        })
    }, [selected])

    return (
        <div ref={mapContainer}
        style={{
            width: "100%",
            height: "400px",
            marginTop: "24px",
            borderRadius: "8px"
        }}
        >
        
        </div>
    )

}