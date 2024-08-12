import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Toaster } from "@/Components/ui/toaster";
import { useToast } from "@/Components/ui/use-toast";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function FormCalculateZip() {
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
        <form
            onSubmit={calculateOnSubmit}
            className="flex flex-col items-center mt-8 gap-3"
        >
            <Toaster />
            <div className="flex gap-3 align-middle items-center">
                <Input
                    name="zipCodeFrom"
                    value={data.from}
                    onChange={(e) => setData("from", e.target.value)}
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
                    onChange={(e) => setData("to", e.target.value)}
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
    );
}
