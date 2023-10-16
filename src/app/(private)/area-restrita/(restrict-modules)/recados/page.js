"use client";

import CardIntranet from "@/components/Card/Card";
import React, { useState } from "react";
import axios from "@/hooks/axiosInstance";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TableControls, TableStyled } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, FormControl, Pagination } from "react-bootstrap";
import { useRouter } from "next/navigation";

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

const Recados = () => {
    const regex = /(<([^>]+)>)/gi;
    const [recados, setRecados] = useState([]);
    const [recadosFiltrado, setRecadosFiltrado] = useState([]);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        axios
            .get("/notes")
            .then(({ data }) => {
                setRecados(data);
                setRecadosFiltrado(data);
            })
            .catch(() => {
                toast.error(
                    "Falha ao recuperar recados tente novamente. Se o erro persistir entre em contato com o suporte"
                );
            });
    }, []);

    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();

        setRecadosFiltrado(
            recados.filter((data) => {
                if (data.descricao.toLowerCase().includes(search)) {
                    return data;
                }
            })
        );
    };

    const handleRowClick = (row) => {
        const item = document.getElementById(`row${row.id}`);
        if (item.style.display == "block") item.style.display = "none";
        else item.style.display = "block";
    };

    // Calcular o índice dos itens na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = recadosFiltrado.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular o número total de páginas
    const totalItems = recadosFiltrado.length;
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
        <CardIntranet cardTitle="Recados Importantes" bigTitle>
            <TableControls>
                <Col md={4}>
                    <FormControl onChange={handleSearch} placeholder="Pesquisar" />
                </Col>

                <Button onClick={() => router.push("/area-restrita/recados/new")}>
                    <FontAwesomeIcon icon={faPlus} /> Novo Recado
                </Button>
            </TableControls>
            <TableStyled hover bordered>
                <thead>
                    <tr>
                        <th>Comunicado</th>
                        <th>Departamento</th>
                        <th width="16%">Data de Criação</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => {
                        var previewDescription = item.descricao;
                        previewDescription = previewDescription.replace(regex, "");
                        if (previewDescription.length > 25) {
                            previewDescription = previewDescription.slice(0, 25) + "...";
                        }
                        return (
                            <React.Fragment key={item.id}>
                                <tr onClick={() => handleRowClick(item)} className="accordion-toggle">
                                    <td dangerouslySetInnerHTML={{ __html: previewDescription }}></td>
                                    <td>{item.users?.departamentos?.departamento_descricao}</td>
                                    <td>{formatDateTime(item.created_at)}</td>
                                </tr>
                                <tr>
                                    <td className="expandable" colSpan="4">
                                        <div
                                            dangerouslySetInnerHTML={{ __html: item.descricao }}
                                            className="hiddenRow"
                                            id={`row${item.id}`}></div>
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

export default Recados;
