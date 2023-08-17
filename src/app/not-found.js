"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const Error = () => {
    const router = useRouter();

    return (
        <div
            style={{
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}>
            <h2>404 - Não encontrado</h2>
            <p>Essa página não existe</p>
            <Button onClick={() => router.push("/")} size="lg">
                Retornar a página inicial
            </Button>
        </div>
    );
};

export default Error;
