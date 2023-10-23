"use client";

import CardIntranet from "@/components/Card/Card";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Button, Pagination, Tooltip, OverlayTrigger } from "react-bootstrap";
import { ButtonsRow, TableChamados } from "./styles";
import axios from "@/hooks/axiosInstance";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ChamadosLoad from "@/components/Loads/ChamadosLoad";

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

const Chamados = () => {
    const [loading, setLoading] = useState(true);
    const [chamados, setChamados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const { currentUser } = useSelector((reducer) => reducer.userReducer);
    const router = useRouter();

    useEffect(() => {
        axios
            .get("/chamados/get")
            .then(({ data }) => {
                setChamados(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Calcular o índice dos itens na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = chamados.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular o número total de páginas
    const totalItems = chamados.length;
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

    const handleRowClick = (row) => {
        if (row.tipo === "Suporte") {
            window.open(
                `http://10.22.0.38:83/redesocial/?lnk=helpdesk&view=detalhamento&id=${btoa(row.chamado_id)}&l=${btoa(
                    currentUser.usuario_login
                )}`,
                "_blank"
            );
        } else {
            window.open(
                `http://10.22.0.38:83/redesocial/?lnk=manutencao&view=detalhamento&id=${btoa(row.chamado_id)}&l=${btoa(
                    currentUser.usuario_login
                )}`,
                "_blank"
            );
        }
    };

    return (
        <CardIntranet cardTitle={"Meus chamados"} bigTitle>
            <ButtonsRow>
                <Button onClick={() => router.push("/chamados/novo-chamado")} size="sm">
                    <FontAwesomeIcon icon={faPlus} /> Novo chamado suporte
                </Button>

                <Button onClick={() => router.push("/chamados/novo-chamado-manut")} size="sm">
                    <FontAwesomeIcon icon={faPlus} /> Novo chamado manutenção
                </Button>
            </ButtonsRow>
            <TableChamados className="chamados" size="sm">
                <thead>
                    <tr>
                        <th>Nº Chamado</th>
                        <th>Data</th>
                        <th>Responsável</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((chamado) => {
                        if (chamado?.status.length === 0) return;
                        return (
                            <OverlayTrigger
                                key={chamado?.chamado_id}
                                placement="bottom"
                                delay={{ show: 250, hide: 0 }}
                                overlay={<Tooltip>{chamado?.chamado_descricao}</Tooltip>}>
                                <tr
                                    onClick={() => handleRowClick(chamado)}
                                    className={`custom status-${
                                        chamado?.status[chamado.status.length - 1]?.status_type?.status_id
                                    }`}>
                                    <td>{`${chamado.tipo} - ${chamado.chamado_id}`}</td>
                                    <td>{formatDateTime(chamado.chamado_data)}</td>
                                    <td>{chamado?.status[chamado.status.length - 1]?.tecnicos?.tecnico_nome}</td>
                                    <td>{chamado?.status[chamado.status.length - 1]?.status_type?.status_descricao}</td>
                                </tr>
                            </OverlayTrigger>
                        );
                    })}
                </tbody>
            </TableChamados>
            {loading ? <ChamadosLoad /> : ""}
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

export default Chamados;
