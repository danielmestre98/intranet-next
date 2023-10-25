"use client";

import Nav from "react-bootstrap/Nav";
import { NavbarIntranet, NavItem, NavDropdownHeader, RouterLink, RouterLinkDropdown } from "./styles";

const Navbar = () => (
    <NavbarIntranet className="mb-3">
        <Nav>
            <NavItem>
                <RouterLink href="/">Início</RouterLink>
            </NavItem>
            <NavItem>
                <RouterLink href="/assinatura">Assinatura</RouterLink>
            </NavItem>
            <NavItem>
                <RouterLink href="/links">Links</RouterLink>
            </NavItem>
            <NavDropdownHeader renderMenuOnMount={true} title="Procedimentos e Documentação">
                <RouterLinkDropdown href="/documentacao/legislacao">Legislação</RouterLinkDropdown>
                <RouterLinkDropdown href="/documentacao/formularios">Formulários</RouterLinkDropdown>
                <RouterLinkDropdown href="/documentacao/recadastramento">Recadastramento</RouterLinkDropdown>
                <RouterLinkDropdown href="/documentacao/grupostrabalho">Grupos de Trabalho</RouterLinkDropdown>
                <RouterLinkDropdown target="_blank" href="/documents/guia_nova_ortografia.pdf">
                    Nova Ortografia
                </RouterLinkDropdown>
                <RouterLinkDropdown
                    target="_blank"
                    href="http://diariooficial.imprensaoficial.com.br/nav_v4/index.asp?c=4">
                    Diário Oficial
                </RouterLinkDropdown>
                <RouterLinkDropdown href="/documentacao/sala-situacao">Sala de Situação</RouterLinkDropdown>
                <RouterLinkDropdown href="/documentacao/identidade-visual">Identidade Visual</RouterLinkDropdown>
                <RouterLinkDropdown target="_blank" href="/documents/Manual_SEI_SP.pdf">
                    Manual SEI-SP
                </RouterLinkDropdown>
            </NavDropdownHeader>
            <NavDropdownHeader renderMenuOnMount={true} title="Programas">
                <RouterLinkDropdown target="_blank" href="http://www.rendacidada.sp.gov.br/">
                    Renda Cidadã
                </RouterLinkDropdown>
                <RouterLinkDropdown target="_blank" href="http://www.acaojovem.sp.gov.br/">
                    Ação Jovem
                </RouterLinkDropdown>
                <RouterLinkDropdown target="_blank" href="http://www.pmas.sp.gov.br/">
                    PMAS
                </RouterLinkDropdown>
                <RouterLinkDropdown target="_blank" href="http://www.prosocial.sp.gov.br/">
                    Pró-Social
                </RouterLinkDropdown>
                <RouterLinkDropdown target="_blank" href="http://www.amigoidoso.seds.sp.gov.br/">
                    Amigo do Idoso
                </RouterLinkDropdown>
                <RouterLinkDropdown target="_blank" href="https://pan1.vivaleite.sp.gov.br/sistema/">
                    Vivaleite
                </RouterLinkDropdown>
                <RouterLinkDropdown
                    target="_blank"
                    href="https://www.desenvolvimentosocial.sp.gov.br/acoes-de-protecao-social/prospera-familia/">
                    Prospera Família
                </RouterLinkDropdown>
                <RouterLinkDropdown
                    target="_blank"
                    href="https://www.desenvolvimentosocial.sp.gov.br/acoes-de-protecao-social/prospera-jovem/">
                    Prospera Jovem
                </RouterLinkDropdown>
            </NavDropdownHeader>
            <NavItem>
                <RouterLink href="/peas">PEAS</RouterLink>
            </NavItem>
            <NavItem className="botao-area-restrita">
                <RouterLink href="/area-restrita">Área Restrita</RouterLink>
            </NavItem>
        </Nav>
    </NavbarIntranet>
);

export default Navbar;
