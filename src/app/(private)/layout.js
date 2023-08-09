"use client";

import Navbar from "@/components/Navbar/Navbar";
import ProtectedRoute from "@/components/Routing/ProtectedRoute";
import { useState } from "react";
import { Container } from "react-bootstrap";

export default function PrivateLayout({ children }) {
    const [loading, setLoading] = useState(true);

    return (
        <ProtectedRoute setLoading={setLoading}>
            {loading ? (
                "Carregando"
            ) : (
                <Container>
                    <Navbar />
                    {children}
                </Container>
            )}
        </ProtectedRoute>
    );
}
