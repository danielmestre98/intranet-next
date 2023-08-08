"use client";

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/teste");
    };

    return (
        <div>
            <button onClick={handleClick}>Teste</button>
        </div>
    );
}
