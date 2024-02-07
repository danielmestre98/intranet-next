"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useState } from "react";
import axios from "@/hooks/axiosInstance";
import Nav from "react-bootstrap/Nav";
import {
    NavbarIntranet,
    NavItem,
    NavDropdownHeader,
    RouterLink,
    RouterLinkDropdown,
    NavSearch,
    SearchDiv,
    SearchInput,
    SearchResults,
} from "./styles";
import { useRouter } from "next/navigation";
import SearchLoad from "../Loads/SearchLoad";

const Navbar = () => {
    const searchInput = useRef();
    const router = useRouter();
    const [showSearch, setShowSearch] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    function isValidURL(str) {
        // Regular expression for a valid URL
        var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        return urlRegex.test(str);
    }

    const clickHandler = (e) => {
        if (
            e.target.id !== "search-input" &&
            e.target.id !== "search-results" &&
            e.target.parentNode.parentNode.id !== "search-results" &&
            e.target.parentNode.parentNode.parentNode.id !== "search-results"
        ) {
            hideSearchInput();
            searchInput.current.value = "";
        }
    };

    const formatResults = (results) => {
        let formattedResults = [];

        if (results.length > 0) {
            results.forEach((element) => {
                formattedResults.push({
                    id: element.id,
                    linkName: element["link-text"],
                    linkDescription: element.text,
                    link: element.url,
                    pointer: element.references,
                });
            });
        }

        setSearchResults(formattedResults);
    };

    const handleSearchInputChange = debounce((e) => {
        setLoading(true);
        if (e.target.value !== "") {
            axios
                .post(`/search`, {
                    search: e.target.value,
                })
                .then(({ data }) => {
                    formatResults(data);
                })
                .finally(() => {
                    setLoading(false);
                });
            setShowSearchResults(true);
        } else setShowSearchResults(false);
    }, 450);

    const hideSearchInput = (e) => {
        document.body.removeEventListener("mousedown", clickHandler);
        setShowSearch(false);
        setShowSearchResults(false);
    };
    const showSearchInput = (e) => {
        document.body.addEventListener("mousedown", clickHandler);

        setShowSearch(true);
    };

    const redirectUser = (e) => {
        e.preventDefault();
        let url = e.target.getAttribute("href");
        let pointer = e.target.getAttribute("name");

        if (isValidURL(url)) window.open(url);
        else router.push(`${url}${pointer || ""}`);

        hideSearchInput();
    };

    return (
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
                <SearchDiv hidden={!showSearch}>
                    <SearchInput
                        autocomplete="off"
                        onChange={handleSearchInputChange}
                        ref={searchInput}
                        id="search-input"
                        placeholder="Buscar na intranet..."
                    />
                </SearchDiv>
                <SearchResults id="search-results" hidden={!showSearchResults}>
                    {loading ? (
                        <SearchLoad />
                    ) : searchResults.length === 0 ? (
                        <div className="results no-results">
                            <p>Nenhum resultado encontrado.</p>
                        </div>
                    ) : (
                        <div className="results">
                            {searchResults.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <a
                                            className="link-name"
                                            onClick={redirectUser}
                                            name={item.pointer}
                                            href={item.link}>
                                            {item.linkName}
                                        </a>
                                        <p className="link-text">{item.linkDescription}</p>
                                        <p className="link-url">{item.link + (item.pointer || "")}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </SearchResults>
                <NavSearch onClick={showSearchInput}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </NavSearch>
            </Nav>
        </NavbarIntranet>
    );
};

export default Navbar;
