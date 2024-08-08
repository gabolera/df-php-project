import { Link, Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Toaster } from "@/Components/ui/toaster";
import { useToast } from "@/Components/ui/use-toast";

export default function Welcome({ auth }: PageProps) {
    const { toast } = useToast();
    const { post, data, setData } = useForm({
        from: "",
        to: "",
    });

    const calculateOnSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!data.from || !data.to) {
            return toastError("Os CEPs não podem ser vazios");
        }
        if (data.from.length !== 8 || data.to.length !== 8) {
            return toastError("Os CEPs devem ter 8 dígitos");
        }
        if (data.from === data.to) {
            return toastError("Os CEPs não podem ser iguais");
        }

        post(route("zipcode.store"), {
            onError: (error) => {
                console.log(error.length);
                return toastError(error[0]);
            },
        });
    };

    const toastError = (message: string) => {
        toast({
            title: "Erro ao consultar CEP",
            description: message,
            duration: 5000,
            variant: "destructive",
        });
    };

    return (
        <>
            <Head title="Calcule" />
            <Toaster />
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
                        <form
                            onSubmit={calculateOnSubmit}
                            className="flex flex-col items-center mt-8 gap-3"
                        >
                            <div className="flex gap-3 align-middle items-center">
                                <Input
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
                                <span className="text-xl">até</span>
                                <Input
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
                            </div>
                            <Button type="submit" className="w-full mt-5">
                                Calcular
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
