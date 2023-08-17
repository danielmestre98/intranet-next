"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import RightBar from "@/components/RightBar/RightBar";
import ProtectedRoute from "@/components/Routing/ProtectedRoute";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { PagesContentDiv, PagesMainDiv, PagesMenuDiv } from "./styles";

export default function PrivateLayout({ children }) {
    const [loading, setLoading] = useState(true);

    return (
        <ProtectedRoute setLoading={setLoading}>
            {loading ? (
                "Carregando"
            ) : (
                <>
                    <Container>
                        <Navbar />
                        <PagesMainDiv>
                            <PagesContentDiv>{children}</PagesContentDiv>
                            <PagesMenuDiv>
                                <RightBar />
                            </PagesMenuDiv>
                        </PagesMainDiv>
                    </Container>
                    <Footer />
                </>
            )}
        </ProtectedRoute>
    );
}
