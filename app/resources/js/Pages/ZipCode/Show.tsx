import { PageProps } from "@/types";

interface Coordinates {
    latitude: string;
    longitude: string;
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
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    A distância entre o cep {distances.from} e {distances.to} é de {Math.round(distances.distance)} km.
                </div>
            </div>
        </div>
    );
}
