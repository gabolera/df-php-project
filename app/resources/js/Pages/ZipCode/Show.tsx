import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Icon } from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

interface Coordinates {
    latitude: any;
    longitude: any;
}

interface Distance {
    id: number;
    from: string;
    to: string;
    distance: number;
    coordinates: {
        [key: string]: Coordinates;
    }[];
    created_at: string;
    updated_at: string;
}

export default function Show({
    auth,
    distances,
}: PageProps<{ distances: Distance }>) {
    const fromCoordinate = distances.coordinates.filter(
        (c) => c[distances.from]
    )[0][distances.from];

    const toCoordinate = distances.coordinates.filter(
        (c) => c[distances.to]
    )[0][distances.to];

    const centerLatitude = (parseFloat(fromCoordinate.latitude) + parseFloat(toCoordinate.latitude)) / 2;
    const centerLongitude = (parseFloat(fromCoordinate.longitude) + parseFloat(toCoordinate.longitude)) / 2;

    const iconPin = new Icon({
        iconUrl : 'https://img.icons8.com/doodle/48/apple.png',
        iconSize : [35, 35],
        iconAnchor : [22, 94],
        popupAnchor : [-3, -76]
    })

    var zoom = 15;
    if(distances.distance > 100) {
        zoom = 7;
    }else if(distances.distance > 50) {
        zoom = 9;
    }else if(distances.distance > 20) {
        zoom = 11;
    }else if(distances.distance > 10) {
        zoom = 13;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Head title="Distância" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    A distância entre o cep {distances.from} e {distances.to} é
                    de {Math.round(distances.distance)} km.
                    {JSON.stringify(distances.coordinates[0].latitude)}
                    <MapContainer
                        attributionControl={false}
                        center={[
                            centerLatitude,
                            centerLongitude,
                        ]}
                        zoom={zoom}
                        scrollWheelZoom={true}
                        className="w-full h-96"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            position={[
                                fromCoordinate.latitude,
                                fromCoordinate.longitude,
                            ]}
                        >
                            <Popup>{distances.from}</Popup>
                        </Marker>
                        <Marker
                            // icon={iconPin}
                            position={[
                                toCoordinate.latitude,
                                toCoordinate.longitude,
                            ]}
                        >
                            <Popup>{distances.to}</Popup>
                        </Marker>
                        <Polyline
                        positions={[
                            [
                                fromCoordinate.latitude,
                                fromCoordinate.longitude,
                            ],
                            [
                                toCoordinate.latitude,
                                toCoordinate.longitude,
                            ],
                        ]}
                        />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}
