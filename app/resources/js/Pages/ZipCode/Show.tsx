import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Icon } from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

interface Coordinates {
    latitude: string
    longitude: string
}
interface ZipCode {
    cep: string;
    state: string;
    city: string;
    neighborhood: string | null;
    street: string | null;
    coordinates: Coordinates;
    created_at: string;
    updated_at: string;
}
interface Distance {
    from_id: string;
    to_id: string;
    distance: number;
    created_at: string;
    updated_at: string;
    cep: string;
    state: string;
    city: string;
    neighborhood: string | null;
    street: string | null;
    coordinates: string;
    from_zip_code: ZipCode;
    to_zip_code: ZipCode;
}

export default function Show({
    auth,
    distances,
}: PageProps<{ distances: Distance }>) {
    console.log(distances.to_zip_code.coordinates);
    //@ts-ignore
    const fromCoordinate = distances.from_zip_code.coordinates;
    //@ts-ignore
    const toCoordinate = distances.to_zip_code.coordinates;


    const centerLatitude = (parseFloat(fromCoordinate.latitude) + parseFloat(toCoordinate.latitude)) / 2;
    const centerLongitude = (parseFloat(fromCoordinate.longitude) + parseFloat(toCoordinate.longitude)) / 2;

    const iconPin = new Icon({
        iconUrl : 'https://img.icons8.com/doodle/48/apple.png',
        iconSize : [35, 35],
        iconAnchor : [22, 94],
        popupAnchor : [-3, -76]
    })

    const zoomLevels = [
        { distance: 2, zoom: 13 },
        { distance: 5, zoom: 12 },
        { distance: 10, zoom: 11 },
        { distance: 30, zoom: 10 },
        { distance: 60, zoom: 9.5 },
        { distance: 80, zoom: 8.5 },
        { distance: 100, zoom: 7 },
        { distance: 500, zoom: 6 },
    ];

    let zoom = 3; // Default zoom level
    for (const level of zoomLevels) {
        if (distances.distance < level.distance) {
            zoom = level.zoom;
            break;
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Head title="Distância" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col p-4 bg-white rounded-lg gap-3">
                        <h3 className="text-lg">
                        A distância entre {distances.from_zip_code.city} ({distances.from_zip_code.cep}) e {distances.to_zip_code.cep} ({distances.to_zip_code.cep}) é
                        de {distances.distance.toFixed(2)} km.
                        </h3>
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
                                    Number(fromCoordinate.latitude),
                                    Number(fromCoordinate.longitude),
                                ]}
                            >
                                <Popup>{distances.from_zip_code.city} ({distances.from_zip_code.cep})</Popup>
                            </Marker>
                            <Marker
                                // icon={iconPin}
                                position={[
                                    Number(toCoordinate.latitude),
                                    Number(toCoordinate.longitude),
                                ]}
                            >
                                <Popup>{distances.to_zip_code.city} ({distances.to_zip_code.cep})</Popup>
                            </Marker>
                            <Polyline
                            positions={[
                                [
                                    Number(fromCoordinate.latitude),
                                    Number(fromCoordinate.longitude),
                                ],
                                [
                                    Number(toCoordinate.latitude),
                                    Number(toCoordinate.longitude),
                                ],
                            ]}
                            />
                        </MapContainer>
                        <Link href="/" className="bg-gray-500 text-white font-bold p-4 rounded-lg text-center" >Nova Busca</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
