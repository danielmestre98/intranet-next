"use client";

import CardIntranet from "@/components/Card/Card";
import RamaisLoad from "@/components/Loads/Ramais";
import axios from "@/hooks/axiosInstance";
import { faBuilding, faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Col, FormControl, FormSelect, Pagination, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { RamaisDiv, RamalCard } from "./styles";

function capitalizeWords(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}

const Ramais = () => {
    const [ramais, setRamais] = useState([]);
    const [ramaisFiltro, setRamaisFiltro] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [departamentos, setDepartamentos] = useState([]);
    const searchDepto = useRef();
    const searchName = useRef();

    useEffect(() => {
        axios
            .get("/departamentos-drads")
            .then(({ data }) => {
                setDepartamentos(data);
            })
            .catch(() => {
                toast.error(
                    "Falha ao recuperar departamentos, tente novamente. Caso o erro persista entre em contato com o suporte."
                );
            });

        axios
            .get("/ramais")
            .then(({ data }) => {
                setRamais(data);
                setRamaisFiltro(data);
            })
            .catch(() => {
                toast.error(
                    "Falha ao recuperar ramais, tente novamente. Caso o erro persista entre em contato com o suporte."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSearch = async () => {
        const nomeFiltro = searchName.current.value.toLowerCase();
        const departamentoFiltro = searchDepto.current.value;
        var departamento;
        const ramaisFiltrados = ramais.filter((ramal) => {
            const nome = ramal.usuario_nome.toLowerCase();
            if (ramal.local === "SEDS") {
                departamento = ramal?.departamentos?.departamento_descricao;
            } else {
                departamento = `DRADS ${ramal?.drads?.drads_descricao} ${
                    ramal?.drads.drads_descricao_secundaria || ""
                }`;
            }

            // Verifique se o nome corresponde ao filtro de nome (se houver um filtro)
            // e se o departamento corresponde ao filtro de departamento (se houver um filtro)
            return (
                (nomeFiltro === "" || nome.includes(nomeFiltro)) &&
                (departamentoFiltro === "" ||
                    departamento.replaceAll(" ", "") === departamentoFiltro.replaceAll(" ", ""))
            );
        });

        setRamaisFiltro(ramaisFiltrados);
        setCurrentPage(1); // Reinicie a página para a primeira quando você fizer uma nova pesquisa.
    };

    // Calcular o índice dos itens na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ramaisFiltro.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular o número total de páginas
    const totalItems = ramaisFiltro.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Função para lidar com a mudança de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
        <CardIntranet cardTitle={"Ramais"} bigTitle>
            <Row>
                <Col md="4">
                    <FormControl id="nome" onChange={handleSearch} ref={searchName} placeholder="Pesquisa..." />
                </Col>
                <Col md="4">
                    <FormSelect id="departamento" onChange={handleSearch} ref={searchDepto}>
                        <option value="">Selecione o departamento...</option>
                        {departamentos?.map((departamento) => (
                            <option key={departamento} value={departamento}>
                                {departamento}
                            </option>
                        ))}
                    </FormSelect>
                </Col>
            </Row>
            {loading ? <RamaisLoad /> : ""}
            <RamaisDiv>
                {currentItems.map((item) => {
                    return (
                        <RamalCard key={item.usuario_id}>
                            <div className="user-img">
                                <img
                                    src={
                                        item?.usuario_img
                                            ? `${process.env.NEXT_PUBLIC_UPLOADS_URL}/uploads/userimg/${item?.usuario_id}.jpg`
                                            : "/img/assets/default-user-image.png"
                                    }
                                    alt="imagem do usuário"
                                />
                            </div>
                            <div className="infos">
                                <div className="nome">
                                    <p>{capitalizeWords(item?.usuario_nome)}</p>
                                </div>
                                <div className="sub-infos">
                                    <p>
                                        <FontAwesomeIcon icon={faBuilding} />{" "}
                                        {item?.local === "SEDS"
                                            ? item?.departamentos?.departamento_descricao
                                            : `${item?.drads?.drads_descricao} ${
                                                  item?.drads?.drads_descricao_secundaria || ""
                                              }`}
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {item?.local}
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faPhone} /> {item?.ramais?.ramal_numero}
                                    </p>
                                    {item.usuario_email ? (
                                        <p>
                                            <FontAwesomeIcon icon={faEnvelope} />{" "}
                                            <a href={`mailto:${item.usuario_email}`}>{item.usuario_email}</a>
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </RamalCard>
                    );
                })}
            </RamaisDiv>
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

export default Ramais;
