"use client";

import CardIntranet from "@/components/Card/Card";
import { useEffect, useState, useRef } from "react";
import axios from "@/hooks/axiosInstance";
import { toast } from "react-toastify";
import { ComunicadosItem, ComunicadosList } from "./styles";
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import AnimateHeight from "react-animate-height";
import { useDispatch } from "react-redux";
import { removeNotif } from "@/app/Redux/user/slice";
import ComunicadosLoad from "@/components/Loads/Comunicados";

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

const Comunicados = () => {
    const [comunicados, setComunicados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [height, setHeight] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // console.log(currentUser);
    const regexImg = /<img.*?>/g;
    const regex = /(<([^>]+)>)/gi;

    useEffect(() => {
        axios
            .get("/comunicados/get-user")
            .then(({ data }) => {
                setComunicados(data);
                data.forEach((item) => {
                    setHeight((prevHeights) => {
                        return { ...prevHeights, [item.id]: 0 };
                    });
                });
            })
            .catch(() => {
                toast.error(
                    "Falha ao recuperar comunicados. Tente novamente, caso o erro persista entre em contato com o suporte."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Calcular o índice dos itens na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = comunicados.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular o número total de páginas
    const totalItems = comunicados.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Função para lidar com a mudança de página
    const handlePageChange = (page) => {
        comunicados.forEach((item) => {
            setHeight((prevHeights) => {
                return { ...prevHeights, [item.id]: 0 };
            });
        });
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

    const toggleComunicado = (comunicado) => {
        let header = document.getElementById(`header-${comunicado.id}`);
        let body = document.getElementById(`body-${comunicado.id}`);
        if (header.classList.contains("show")) {
            header.classList.remove("show");
            body.classList.remove("show");
            setHeight((prevHeights) => {
                return { ...prevHeights, [comunicado.id]: 0 };
            });
            return;
        }
        setHeight((prevHeights) => {
            return { ...prevHeights, [comunicado.id]: "auto" };
        });
        header.classList.add("show");
        body.classList.add("show");
        if (!header.classList.contains("read")) {
            header.classList.add("read");
            dispatch(removeNotif(comunicado.id));
            axios
                .post("/comunicados/read", { comunicado: comunicado.id })
                .then(() => {
                    setComunicados((prevComunicados) => {
                        const index = comunicados.findIndex((item) => comunicado === item);
                        prevComunicados[index].confirm_leitura.push("sim");
                        return prevComunicados;
                    });
                })
                .catch(() => {
                    toast.error("Falha ao marcar comunicado como lido. Entre em contato com o suporte.");
                });
        }
        return;
    };

    return (
        <CardIntranet cardTitle={"Comunicados"} bigTitle>
            <ComunicadosList>
                {!loading || <ComunicadosLoad />}
                {currentItems.map((item) => {
                    var previewDescription = item.descricao.replace(regexImg, "[Imagem]");
                    previewDescription = previewDescription.replace(regex, "");
                    previewDescription = previewDescription.replace(/\s+/g, " ");
                    if (previewDescription.length > 98) {
                        previewDescription = previewDescription.slice(0, 50) + "...";
                    }
                    return (
                        <ComunicadosItem key={item.id}>
                            <div
                                onClick={() => toggleComunicado(item)}
                                id={`header-${item.id}`}
                                className={`header ${item.confirm_leitura.length > 0 ? "read" : ""}`}>
                                <div className="dados">
                                    <div className="info-group">
                                        {item.enviar_como_depto === 0 ? (
                                            <div className="imagem">
                                                <img
                                                    src={
                                                        item.users.usuario_img === 1
                                                            ? `${process.env.NEXT_PUBLIC_UPLOADS_URL}/uploads/userimg/${item.users.usuario_id}.jpg`
                                                            : "/img/assets/default-user-image.png"
                                                    }
                                                    alt="..."
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="text">
                                            <p>
                                                {item.enviar_como_depto === 0 ? (
                                                    <>
                                                        <span className="name">
                                                            {capitalizeWords(item.users.usuario_nome)}
                                                        </span>{" "}
                                                        {/* - {item.users.departamentos.departamento_descricao} */}
                                                    </>
                                                ) : (
                                                    <span className="name">
                                                        {item.users.departamentos.departamento_descricao}
                                                    </span>
                                                )}
                                            </p>
                                            <p className="time">{formatDateTime(item.create_time)}</p>
                                        </div>
                                    </div>
                                    <p>
                                        <b>{previewDescription}</b>
                                    </p>
                                </div>
                                <div className="arrow">
                                    <FontAwesomeIcon
                                        size="2x"
                                        icon={height[item.id] === 0 ? faChevronDown : faChevronUp}
                                    />
                                </div>
                            </div>
                            <AnimateHeight
                                duration={500}
                                height={height[item.id]}
                                id={`body-${item.id}`}
                                className="body">
                                <div
                                    className="body-content"
                                    dangerouslySetInnerHTML={{ __html: item.descricao }}></div>
                            </AnimateHeight>
                        </ComunicadosItem>
                    );
                })}
            </ComunicadosList>
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
