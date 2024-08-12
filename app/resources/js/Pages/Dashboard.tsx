import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import FormCalculateZip from "./ZipCode/components/FormCalculateZip";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 gap-3 flex flex-col">
                            <div className="flex flex-row gap-3 justify-between">
                                <Link
                                    href={route("zipcode.list")}
                                    className="text-blue-500 hover:underline"
                                >
                                    <Button>
                                        Ver lista de calculos de distâncias
                                    </Button>
                                </Link>
                                <Link href={"#"}>
                                    <Button variant={"outline"}>
                                        Importar dados em massa
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex w-full">
                                <div className="flex mx-auto m-8">
                                    <FormCalculateZip />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
