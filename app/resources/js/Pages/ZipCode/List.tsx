import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";

interface Coordinates {
    latitude: string;
    longitude: string;
}

interface ZipCode {
    id: number;
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
    from_id: number;
    to_id: number;
    distance: number;
    created_at: string;
    updated_at: string;
    from_zip_code: ZipCode;
    to_zip_code: ZipCode;
}

export default function List({
    auth,
    zipCodeDistances,
}: PageProps<{ zipCodeDistances: Distance[] }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Distâncias Calculadas
                </h2>
            }
        >
            <Head title="Distâncias Calculadas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {zipCodeDistances.length === 0 ? (
                                <p>Nenhuma distância calculada</p>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                CEP Origem
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                CEP Destino
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Distância
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                                        {zipCodeDistances.map(
                                            (distance, index) => (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                        {`${distance.from_zip_code.city}, ${distance.from_zip_code.state} (${distance.from_zip_code.cep})`}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                        {`${distance.to_zip_code.city}, ${distance.to_zip_code.state} (${distance.to_zip_code.cep})`}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                        {distance.distance
                                                            ? distance.distance +
                                                              "km"
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        {distance.distance && (
                                                            <Link
                                                                href={route(
                                                                    "zipcode.show",
                                                                    `${distance.from_zip_code.cep}-${distance.to_zip_code.cep}`
                                                                )}
                                                            >
                                                                <Button
                                                                    className="text-blue-500 hover:underline"
                                                                    variant={
                                                                        "link"
                                                                    }
                                                                >
                                                                    Ver no mapa
                                                                </Button>
                                                            </Link>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
