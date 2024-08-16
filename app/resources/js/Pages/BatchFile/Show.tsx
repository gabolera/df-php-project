import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Circle, CircleHelp } from "lucide-react";

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

export default function Show({ auth, batch }: PageProps<{ batch: Batch }>) {
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
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            CEP Origem
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            CEP Destino
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Distância
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider flex justify-center">
                                            Ver no mapa
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                                    {batch.items.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {item.zip_code_from}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {item.zip_code_to}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {item.zip_code_distance?.distance ? `${item.zip_code_distance?.distance.toFixed(2)} km` : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center">
                                                {item.status ===
                                                BatchFileItemStatusEnum.Processed ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Processado
                                                    </span>
                                                ) : item.status ===
                                                  BatchFileItemStatusEnum.Processing ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        Processando
                                                    </span>
                                                ) : item.status ===
                                                  BatchFileItemStatusEnum.Failed ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        Falhou
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                        Pendente
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {item.status ===
                                                    BatchFileItemStatusEnum.Processed && item.zip_code_distance?.distance && (
                                                    <Link
                                                        href={route(
                                                            "zipcode.show",
                                                            `${item.zip_code_from}-${item.zip_code_to}`
                                                        )}
                                                    >
                                                        <Button
                                                            className="text-blue-500 hover:underline"
                                                            variant={"link"}
                                                        >
                                                            Ver no mapa
                                                        </Button>
                                                    </Link>
                                                )}
                                                {item.status ===
                                                    BatchFileItemStatusEnum.Failed && (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger className="flex w-full justify-center items-center gap-1 ">
                                                                <CircleHelp
                                                                    className=""
                                                                    size={16}
                                                                />
                                                            </TooltipTrigger>
                                                            <TooltipContent className="flex max-w-xs break-words text-center">
                                                                <p className="whitespace-normal">
                                                                    {
                                                                        item.error_message
                                                                    }
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
