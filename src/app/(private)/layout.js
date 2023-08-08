"use client";

import ProtectedRoute from "@/components/Routing/ProtectedRoute";
import { useState } from "react";

export default function PrivateLayout({ children }) {
    const [loading, setLoading] = useState(true);

    return <ProtectedRoute setLoading={setLoading}>{loading ? "Carregando" : <div>{children}</div>}</ProtectedRoute>;
}
