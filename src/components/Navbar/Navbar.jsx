"use client";

import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { NavbarIntranet, NavItem, NavDropdownHeader, RouterLink, RouterLinkDropdown } from "./styles";

const Navbar = () => (
    <Container className="mb-3">
        <NavbarIntranet>
            <Nav>
                <NavItem>
                    <RouterLink href="/">Início</RouterLink>
                </NavItem>
                <NavItem>
                    <RouterLink href="/assinatura">Assinatura</RouterLink>
                </NavItem>
                <NavItem>Links</NavItem>
                <NavDropdownHeader renderMenuOnMount={true} title="Procedimentos e Documentação">
                    <RouterLinkDropdown href="/teste">Teste</RouterLinkDropdown>
                </NavDropdownHeader>
                <NavDropdownHeader renderMenuOnMount={true} title="Programas">
                    <RouterLinkDropdown href="/teste">Teste</RouterLinkDropdown>
                </NavDropdownHeader>
                <NavItem>PEAS</NavItem>
                <NavItem>Área Restrita</NavItem>
            </Nav>
        </NavbarIntranet>
    </Container>
);

export default Navbar;
