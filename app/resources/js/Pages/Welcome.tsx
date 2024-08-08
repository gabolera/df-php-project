import { Link, Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";

export default function Welcome({ auth }: PageProps) {
    const { post, data, setData } = useForm({
        from: "",
        to: "",
    });

    const calculateOnSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("zipcode.store"), {
            data,
        });
    };

    return (
        <>
            <Head title="Calcule" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 h-screen">
                <div className="container mx-auto flex flex-col justify-center items-center h-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col items-center">
                            <h1 className="text-6xl font-bold">
                                Calculadora de distância
                            </h1>
                            <p className="text-2xl">A simple calculator</p>
                        </div>
                        <form
                            onSubmit={calculateOnSubmit}
                            className="flex flex-col items-center mt-8 gap-3"
                        >
                            <input
                                type="number"
                                name="zipCodeFrom"
                                value={data.from}
                                onChange={(e) =>
                                    setData("from", e.target.value)
                                }
                                id="from"
                                placeholder="CEP de origem"
                                className="input"
                                maxLength={8}
                                minLength={8}
                            />
                            <input
                                type="number"
                                name="zipCodeTo"
                                value={data.to}
                                onChange={(e) =>
                                    setData("to", e.target.value)
                                }
                                id="to"
                                placeholder="CEP de destino"
                                className="input"
                                maxLength={8}
                                minLength={8}
                            />
                            <button type="submit" className="p-4 bg-green-500 text-white rounded-lg">
                                Calcular
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
