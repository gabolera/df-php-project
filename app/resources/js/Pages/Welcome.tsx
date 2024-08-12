import { Link, Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import FormCalculateZip from "./ZipCode/components/FormCalculateZip";

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Calcule" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 h-screen">
                <div className="container mx-auto flex flex-col justify-center items-center h-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col items-center">
                            <h1 className="text-4xl font-bold">
                                Calculadora de distância
                            </h1>
                            <p className="text-xl">
                                Calcule a distância entre dois ceps
                            </p>
                        </div>
                        <FormCalculateZip />
                        <div className="flex w-full p-4 items-center justify-center">
                            <Link
                                href={"/login"}
                                className="text-blue-500 hover:underline"
                            >
                                <Button
                                    type="button"
                                    className=""
                                    variant={"link"}
                                >
                                    Entrar
                                </Button>
                            </Link>
                            ou
                            <Link
                                href={"/register"}
                                className="text-blue-500 hover:underline"
                            >
                                <Button
                                    type="button"
                                    className=""
                                    variant={"link"}
                                >
                                    Cadastre-se
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
