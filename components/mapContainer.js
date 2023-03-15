import * as React from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {icon} from 'leaflet'

const _MapContainer = ({ charters }) => {

    return <MapContainer
    style={{ height: "800px", width: "100%" }} center={[38, -96]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
            charters.map(i => 
                <Marker position={[i.lat, i.long]} icon={icon({
                    iconUrl: "/marker.svg",
                    iconSize: [32, 32],
                    iconAnchor: [16, 32]
                  })} >
                    <Popup>
                        <span className="font-bold text-lg">{ i.name }</span><br />
                        <span className="font-normal text-md">{ i.description }</span>
                    </Popup>
                </Marker>)
        }
    </MapContainer>
}

export default _MapContainer
