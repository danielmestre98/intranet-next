"use client";

import PublicRoute from "@/components/Routing/PublicRoute";
import { useState } from "react";

export default function PublicLayout({ children }) {
    const [loading, setLoading] = useState(true);

    return <PublicRoute setLoading={setLoading}>{loading ? "Carregando" : <div>{children}</div>}</PublicRoute>;
}
