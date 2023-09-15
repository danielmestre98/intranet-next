"use client";

import CardIntranet from "@/components/Card/Card";
import { faFileAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import axios from "@/hooks/axiosInstance";
import { Button, Col, FormControl, Pagination } from "react-bootstrap";
import { PdfImage, TableControls, Table, NoRegistryFound } from "./styles";
import CurriculosModal from "@/components/Curriculos/Modal";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const BancoCurriculos = () => {
    const [loading, setLoading] = useState(true);
    const [modalView, setModalView] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const searchBox = useRef(null);

    useEffect(() => {
        axios
            .get(`/curriculos`)
            .then(({ data }) => {
                setTableData(data);
                setFilteredTableData(data);
            })
            .catch(() => {
                toast.error("Falha ao recuperar dados dos currículos, por favor entre em contato com o suporte.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setFilteredTableData(tableData);
        searchBox.value = "";
    }, [tableData]);

    const handleRowClick = (row) => {
        window.open(`${process.env.NEXT_PUBLIC_UPLOADS_URL}/uploads/curriculos/${row.nome_arquivo}`, "_blank");
    };

    const handleSearch = (e) => {
        const search = e.target.value;

        setFilteredTableData(
            tableData.filter((data) => {
                if (data.nome_view.includes(search)) {
                    return data;
                }
            })
        );
    };

    // Calcular o índice dos itens na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTableData.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular o número total de páginas
    const totalItems = filteredTableData.length;
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

    const handleDelete = (row) => {
        if (
            confirm(
                `Tem certeza que deseja excluir o curriculo "${row.nome_view}"? \n Essa ação não pode ser desfeita.`
            )
        ) {
            const id = toast.loading("Processando...");
            axios
                .delete(`/curriculos/${row.id}`)
                .then(() => {
                    setTableData((prevData) => {
                        return prevData.filter((item) => item !== row);
                    });
                    toast.update(id, {
                        render: "Curriculo excluído com sucesso!",
                        type: "success",
                        isLoading: false,
                        autoClose: 5000,
                        closeOnClick: true,
                    });
                })
                .catch(() => {
                    toast.update(id, {
                        render: "Falha ao excluir arquivo, contate o suporte.",
                        type: "error",
                        isLoading: false,
                        autoClose: 5000,
                        closeOnClick: true,
                    });
                });
        }
    };

    return (
        <>
            <CardIntranet cardTitle="Banco de Currículos" bigTitle>
                <TableControls>
                    <Col md={4}>
                        <FormControl ref={searchBox} onChange={handleSearch} placeholder="Pesquisar" />
                    </Col>
                    <Button onClick={() => setModalView(true)}>
                        <FontAwesomeIcon icon={faFileAlt} /> Enviar Currículo
                    </Button>
                </TableControls>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: "70%" }}>Nome</th>
                            <th>Enviado em</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3">
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <ReactLoading type="spin" color="#034ea2" height={"150px"} width={"150px"} />
                                    </div>
                                </td>
                            </tr>
                        ) : currentItems.length === 0 ? (
                            <tr>
                                <NoRegistryFound colSpan="3">Nenhum registro encontrado.</NoRegistryFound>
                            </tr>
                        ) : (
                            currentItems.map((row) => {
                                const createdAt = new Date(row.created_at);
                                return (
                                    <tr key={row.id}>
                                        <td onClick={() => handleRowClick(row)}>
                                            <PdfImage src="/img/assets/pdf.png" /> {row.nome_view}
                                        </td>
                                        <td onClick={() => handleRowClick(row)}>{`${("00" + createdAt.getDate()).slice(
                                            -2
                                        )}/${("00" + (createdAt.getMonth() + 1)).slice(
                                            -2
                                        )}/${createdAt.getFullYear()}`}</td>
                                        <td
                                            style={{
                                                textAlign: "center",
                                            }}>
                                            <Button onClick={() => handleDelete(row)} size="sm" variant="danger">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </Table>
                <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {generatePaginationWithEllipsis().map((pageNumber, index) => (
                        <Pagination.Item
                            key={index}
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
            <CurriculosModal setCurriculos={setTableData} setView={setModalView} view={modalView} />
        </>
    );
};

export default BancoCurriculos;
