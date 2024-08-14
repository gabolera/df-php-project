import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export default function Index({ auth }: PageProps) {
    const { data, post, setData } = useForm<{
        file: File | null;
    }>({
        file: null,
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Importar arquivo em lote
                </h2>
            }
        >
            <Head title="Importar arquivo em lote" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post(route("batch.import"), {
                                        onSuccess: () => {
                                            setData("file", null);
                                        },
                                    });
                                }}
                                encType="multipart/form-data"
                            >
                                <Input
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files.length > 0
                                        ) {
                                            setData("file", e.target.files[0]);
                                        }
                                    }}
                                />
                                <p className="text-sm text-gray-500 py-2">
                                    O arquivo deve estar no formato CSV, baixe o
                                    modelo
                                    <Button
                                        variant={"link"}
                                        className="p-1 text-blue-700 underline hover:no-underline"
                                    >
                                        clicando aqui
                                    </Button>
                                    .
                                </p>
                                <Button type="submit">Enviar lote</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
