"use client";

import CardIntranet from "@/components/Card/Card";
import axios from "@/hooks/axiosInstance";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Col, FormControl, FormSelect, Pagination, Row } from "react-bootstrap";
import { TableControls, TableStyled } from "./styles";

function capitalizeWords(str) {
    // Divida a string em palavras
    let words = str.split(" ");

    // Mapeie cada palavra e capitalize a primeira letra
    let capitalizedWords = words.map((word) => {
        let lowerWord = word.toLowerCase();
        return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
    });

    // Junte as palavras de volta em uma única string
    return capitalizedWords.join(" ");
}

function formatDateTime(inputDateTime) {
    // Create a Date object from the input date string
    const dateObj = new Date(inputDateTime);

    // Check if the Date object is valid
    if (isNaN(dateObj.getTime())) {
        return "Invalid Date"; // Handle invalid input
    }

    // Define options for formatting the date and time
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };

    // Format the Date object as "d/m/Y H:i"
    const formattedDateTime = dateObj.toLocaleDateString("pt-BR", options);

    return formattedDateTime;
}

const Comunicados = () => {
    const presetDestinos = ["Todos", "SEDS", "DRADS"];
    const regexImg = /<img.*?>/g;
    const regex = /(<([^>]+)>)/gi;
    const [departamentos, setDepartamentos] = useState([]);
    const [comunicados, setComunicados] = useState([]);
    const [comunicadosFiltrado, setComunicadosFiltrado] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const router = useRouter();

    useEffect(() => {
        axios.get("/comunicados").then(({ data }) => {
            setComunicados(data);
            setComunicadosFiltrado(data);
        });
        axios.get("/departamentos").then(({ data }) => {
            setDepartamentos(data);
        });
    }, []);

    const handleRowClick = (row) => {
        const item = document.getElementById(`row${row.comunicado?.id}`);
        if (item.style.display == "block") item.style.display = "none";
        else item.style.display = "block";
    };

    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();

        setComunicadosFiltrado(
            comunicados.filter((data) => {
                if (data.comunicado.descricao.toLowerCase().includes(search)) {
                    return data;
                }
            })
        );
    };

    const handleSearchDepto = (e) => {
        const search = e.target.value;

        setComunicadosFiltrado(
            comunicados.filter((data) => {
                if (data.comunicado?.users?.departamentos?.departamento_descricao.includes(search)) {
                    return data;
                }
            })
        );
    };

    // Calcular o índice dos itens na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = comunicadosFiltrado.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular o número total de páginas
    const totalItems = comunicadosFiltrado.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Função para lidar com a mudança de página
    const handlePageChange = (page) => setCurrentPage(page);

    // Gerar os números de página
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Função para gerar os números de página com Ellipsis
    const generatePaginationWithEllipsis = () => {
        const maxPagesToShow = 5; // Número máximo de páginas a serem exibidas

        if (totalPages <= maxPagesToShow) {
            return pageNumbers;
        }

        const pages = [];
        let startPage, endPage;

        if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(maxPagesToShow / 2);
            endPage = currentPage + Math.floor(maxPagesToShow / 2);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (startPage > 1) {
            pages.unshift("...");
        }

        if (endPage < totalPages) {
            pages.push("...");
        }

        return pages;
    };

    return (
        <CardIntranet bigTitle cardTitle="Gerenciar Comunicados">
            <TableControls>
                <Col md={4}>
                    <FormControl onChange={handleSearch} placeholder="Pesquisar" />
                </Col>
                <Col md={4}>
                    <FormSelect onChange={handleSearchDepto}>
                        <option value="">Selecione a opção desejada...</option>
                        {departamentos.map((departamento) => {
                            return (
                                <option key={departamento.departamento_id} value={departamento.departamento_descricao}>
                                    {departamento.departamento_descricao}
                                </option>
                            );
                        })}
                    </FormSelect>
                </Col>

                <Button onClick={() => router.push("/area-restrita/comunicados/new")}>
                    <FontAwesomeIcon icon={faPlus} /> Novo Comunicado
                </Button>
            </TableControls>
            <TableStyled hover bordered>
                <thead>
                    <tr>
                        <th>Comunicado</th>
                        <th>Departamento</th>
                        <th>Destino</th>
                        <th width="16%">Data de Criação</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => {
                        var previewDescription = item.comunicado.descricao.replace(regexImg, "[Imagem]");
                        previewDescription = previewDescription.replace(regex, "");
                        if (previewDescription.length > 25) {
                            previewDescription = previewDescription.slice(0, 25) + "...";
                        }
                        return (
                            <React.Fragment key={item.comunicado?.id}>
                                <tr onClick={() => handleRowClick(item)} className="accordion-toggle">
                                    <td dangerouslySetInnerHTML={{ __html: previewDescription }}></td>
                                    <td>{item.comunicado?.users?.departamentos?.departamento_descricao}</td>
                                    <td>
                                        {item.comunicado?.destino == 0 ||
                                        item.comunicado?.destino == 1 ||
                                        item.comunicado?.destino == 2
                                            ? presetDestinos[item.comunicado?.destino]
                                            : capitalizeWords(item.destinos.slice(0, -2))}
                                    </td>
                                    <td>{formatDateTime(item.comunicado?.create_time)}</td>
                                </tr>
                                <tr>
                                    <td className="expandable" colSpan="4">
                                        <div
                                            dangerouslySetInnerHTML={{ __html: item.comunicado?.descricao }}
                                            className="hiddenRow"
                                            id={`row${item.comunicado?.id}`}></div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </TableStyled>
            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {generatePaginationWithEllipsis().map((pageNumber, index) => (
                    <Pagination.Item
                        key={index}
                        disabled={pageNumber === "..."}
                        active={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber)}>
                        {pageNumber}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
        </CardIntranet>
    );
};

export default Comunicados;
