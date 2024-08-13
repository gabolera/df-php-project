import { useForm } from "@inertiajs/react";

export default function Index() {
    const { data, post, setData } = useForm<{
        file: File | null;
    }>({
        file: null,
    });

    return (
        <div>
            <h1>Batch File</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post("/batch", {
                        onSuccess: () => {
                            setData("file", null);
                        },
                    });
                }}
                encType="multipart/form-data"
            >
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setData("file", e.target.files[0]);
                        }
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
