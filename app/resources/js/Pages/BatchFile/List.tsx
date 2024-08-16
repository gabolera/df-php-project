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

interface ZipCodeDistance {
    id: number;
    from_id: number;
    to_id: number;
    distance: number;
    created_at: string;
    updated_at: string;
}

interface Item {
    id: number;
    batch_file_id: number;
    zip_code_from: string;
    zip_code_to: string;
    status: number;
    error_message: string | null;
    zip_code_distance_id: number | null;
    created_at: string;
    updated_at: string;
    zip_code_distance: ZipCodeDistance | null;
}

interface Batch {
    id: number;
    user_id: number;
    status: number;
    created_at: string;
    updated_at: string;
    items: Item[];
}

enum BatchFileItemStatusEnum {
    Pending = 0,
    Processing = 1,
    Processed = 2,
    Failed = 3,
}

export default function List({
    auth,
    batches,
}: PageProps<{ batches: Batch[] }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Minhas importações
                    </h2>
                    <Link href={route("batch.create")}>
                        <Button variant={"outline"}>
                            Importar dados em massa
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Distâncias Calculadas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {batches.length === 0 ? (
                                <p>Nenhuma distância calculada</p>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Items
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Data
                                            </th>
                                            <th className="px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                                        {batches.map((batch, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {batch.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 flex gap-1">
                                                    <p className="text-green-500">
                                                        {
                                                            batch.items.filter(
                                                                (a) =>
                                                                    a.status ===
                                                                    BatchFileItemStatusEnum.Processed
                                                            ).length
                                                        }
                                                    </p>
                                                    /
                                                    <p className="text-red-600">
                                                        {
                                                            batch.items.filter(
                                                                (a) =>
                                                                    a.status ===
                                                                    BatchFileItemStatusEnum.Failed
                                                            ).length
                                                        }
                                                    </p>
                                                    {` de ${
                                                        batch.items.length
                                                    }`}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {new Date(
                                                        batch.created_at
                                                    ).toLocaleString("pt-BR")}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={route(
                                                            "batch.show",
                                                            `${batch.id}`
                                                        )}
                                                    >
                                                        <Button
                                                            className="text-blue-500 hover:underline"
                                                            variant={"link"}
                                                        >
                                                            Ver detalhes
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
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
