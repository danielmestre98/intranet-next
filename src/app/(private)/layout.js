"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import RightBar from "@/components/RightBar/RightBar";
import ProtectedRoute from "@/components/Routing/ProtectedRoute";
import { useState } from "react";
import ReactLoading from "react-loading";
import { Container } from "react-bootstrap";
import { LoadingDiv, PagesContentDiv, PagesMainDiv, PagesMenuDiv } from "./styles";

export default function PrivateLayout({ children }) {
    const [loading, setLoading] = useState(true);

    return (
        <ProtectedRoute setLoading={setLoading}>
            {loading ? (
                <LoadingDiv>
                    <ReactLoading type="spin" color="#034ea2" height={"200px"} width={"200px"} />
                </LoadingDiv>
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
