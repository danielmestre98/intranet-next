"use client";

import CardIntranet from "@/components/Card/Card";
import { faFileExcel, faFilePdf, faFilePowerpoint, faFileWord } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, DivVideos, GridButtons, GridItems } from "./styles";
import axios from "@/hooks/axiosInstance";
import { toast } from "react-toastify";

const defaultImagePath = "/img/drh";
const defaultFilePath = "/documents/drh";
const curriculosPath = `${process.env.NEXT_PUBLIC_UPLOADS_URL}/uploads/curriculos/`;

const Drh = () => {
    const [modalView, setModalView] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [content, setContent] = useState([
        {
            id: 1,
            name: "Apresentação",
            menuName: "Apresentação PDI",
            image: "DRH_PDI.jpg",
            type: "files",
            files: [
                {
                    path: "/apresentacao/PDI.ppt",
                    displayName: "PDI",
                    icon: "pptx",
                },
                {
                    path: "/apresentacao/ADI1080Comando2021.xlsx",
                    displayName: "Formulário PDI Comando 2021",
                    icon: "xlsx",
                },
                {
                    path: "/apresentacao/ADI1080Elementar2021.xlsx",
                    displayName: "Formulário PDI Elementar 2021",
                    icon: "xlsx",
                },
                {
                    path: "/apresentacao/ADI1080Intermediario2021.xlsx",
                    displayName: "Formulário PDI Intermediário 2021",
                    icon: "xlsx",
                },
                {
                    path: "/apresentacao/ADI1080Universitario2021.xlsx",
                    displayName: "Formulário PDI Universitário 2021",
                    icon: "xlsx",
                },
            ],
        },
        {
            id: 2,
            name: "Encontros e Reuniões",
            image: "ENCONTROS E REUNIÕES.jpg",
            type: "files",
            files: [
                {
                    path: "/encontros/Apresentação DRH atual_Encontro Drads_27.04.22.pptx",
                    displayName: "Apresentação DRH atual_Encontro Drads_27.04.22",
                    icon: "pptx",
                },
            ],
        },
        {
            id: 3,
            name: "Legislação",
            image: "legislacao.png",
            type: "files",
            files: [
                {
                    path: "/legislacao/Decreto nº 57.781, de 10.02.2012.pdf",
                    displayName: "Decreto 57.781, de 10.02.2012",
                    icon: "pdf",
                },
            ],
        },
        {
            id: 4,
            name: "Acervo DRH",
            image: "acervo.png",
            type: "files",
            files: [
                {
                    path: "/acervo/Benefícios da Leitura.pdf",
                    displayName: "Benefícios da Leitura",
                    icon: "pdf",
                },
                {
                    path: "/acervo/Leitura e Pandemia.pdf",
                    displayName: "Leitura e Pandemia",
                    icon: "pdf",
                },
                {
                    path: "/acervo/Mulheres em  Pandemia.pdf",
                    displayName: "Mulheres na Pandemia",
                    icon: "pdf",
                },
            ],
        },
        {
            id: 5,
            name: "Requerimentos/Formulários",
            image: "requerimentos.png",
            type: "filesSub",
            files: [
                {
                    subName: "Requerimentos",
                    items: [
                        {
                            path: "/requerimentos/Requerimento - Alteração do Nome.doc",
                            displayName: "Alteração do Nome",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento - Alteração do número do RG.doc",
                            displayName: "Alteração do Número do RG",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento - Horário Especial de Estudante.doc",
                            displayName: "Horário Especial de Estudante",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento - Licença-Prêmio em Pecunia.doc",
                            displayName: "Licença-Prêmio em Pecunia",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento - Pedido de Transferência.doc",
                            displayName: "Pedido de Transferência",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento de gozo de Licença-Prêmio.doc",
                            displayName: "Requerimento de gozo de Licença-Prêmio",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento para Certidão de Tempo de Serviço e Contribuição.doc",
                            displayName: "Requerimento para Certidão de Tempo de Serviço e Contribuição",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento para Incorporação da Gratificação de Representação.doc",
                            displayName: "Requerimento para Incorporação da Gratificação de Representação",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento para Incorporação de Décimos do Artigo 133.doc",
                            displayName: "Requerimento para Incorporação de Décimos do Artigo 133",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento para solicitação de Férias.doc",
                            displayName: "Requerimento para solicitação de Férias",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento para solicitar a indenização de Férias Pecúnia - em branco.doc",
                            displayName: "Requerimento para solicitar a indenização de Férias Pecúnia - em branco",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento para solicitar a indenização de Férias Pecúnia.doc",
                            displayName: "Requerimento para solicitar a indenização de Férias Pecúnia",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento para solicitar Aposentadoria.doc",
                            displayName: "Requerimento para solicitar Aposentadoria",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento LP em pecunia Modelo 1080-2008.docx",
                            displayName: "Requerimento LP em pecunia Modelo 1080-2008",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento LP em pecunia Modelo 1157-2011.docx",
                            displayName: "Requerimento LP em pecunia Modelo 1157-2011",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento de substituição.docx",
                            displayName: "Requerimento de substituição",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento para solicitar exoneração - Cargo efetivo.doc",
                            displayName: "Requerimento para solicitar exoneração - Cargo efetivo",
                            icon: "docx",
                        },
                        {
                            path: "/requerimentos/Requerimento para solicitar exoneração - Cargo em comissão.doc",
                            displayName: "Requerimento para solicitar exoneração - Cargo em comissão",
                            icon: "docx",
                        },
                    ],
                },
                {
                    subName: "Formulários",
                    items: [
                        {
                            path: "/formularios/FORMULÁRIO_ Sexta  Parte.doc",
                            displayName: "Sexta Parte",
                            icon: "docx",
                        },
                        {
                            path: "/formularios/FORMULÁRIO_Apost. ATS  LC.1.157 -.doc",
                            displayName: "Apost. ATS LC.1.157",
                            icon: "docx",
                        },
                        {
                            path: "/formularios/FORMULÁRIO_Apost. ATS  LC.854.doc",
                            displayName: "Apost. ATS LC.854",
                            icon: "docx",
                        },
                        {
                            path: "/formularios/FORMULÁRIO_Apost. ATS LC 1080.doc",
                            displayName: "Apost. ATS LC 1080",
                            icon: "docx",
                        },
                        {
                            path: "/formularios/FORMULÁRIO_Certidão Licença - Prêmio.doc",
                            displayName: "Certidão Licença - Prêmio",
                            icon: "docx",
                        },
                        {
                            path: "/formularios/FORMULÁRIO_FICHA 101_ATUAL.xls",
                            displayName: "FICHA 101_ATUAL",
                            icon: "xlsx",
                        },
                    ],
                },
                {
                    subName: "Instruções",
                    items: [
                        {
                            path: "/instrucoes/INSTRUÇÃO_ ATS.doc",
                            displayName: "ATS",
                            icon: "docx",
                        },
                        {
                            path: "/instrucoes/INSTRUÇÃO_ AUDESP alteração ou exclusão de cadastros.pdf",
                            displayName: "AUDESP alteração ou exclusão de cadastros",
                            icon: "pdf",
                        },
                        {
                            path: "/instrucoes/INSTRUÇÃO_ Licença prêmio - atualizada 2.doc",
                            displayName: "Licença prêmio - atualizada 2",
                            icon: "docx",
                        },
                        {
                            path: "/instrucoes/INSTRUÇÃO_Abono Permanência atualizado.doc",
                            displayName: "Abono Permanência atualizado",
                            icon: "docx",
                        },
                        {
                            path: "/instrucoes/INSTRUÇÃO_Documentos do PUCT.doc",
                            displayName: "Documentos do PUCT",
                            icon: "docx",
                        },
                        {
                            path: "/instrucoes/INSTRUÇÃO_Licença Prêmio atualizada 1.doc",
                            displayName: "Licença Prêmio atualizada 1",
                            icon: "docx",
                        },
                        {
                            path: "/instrucoes/Novas regras de Aposentadoria.pdf",
                            displayName: "Novas regras de Aposentadoria",
                            icon: "pdf",
                        },
                    ],
                },
            ],
        },
        {
            id: 6,
            name: "Vídeos",
            image: "drh_videos.png",
            type: "videos",
            videos: [
                {
                    text: "Gestão do cuidado no trabalho",
                    link: "https://www.youtube.com/embed/NUxPEakjW0Y",
                },
                {
                    text: "A dimensão da pandemia no 'Pós-COVID-19'",
                    link: "https://www.youtube.com/embed/13zxB8xUISo",
                },
                {
                    text: "As possibilidades da escuta no trabalho",
                    link: "https://www.youtube.com/embed/HOS6tV66gdc",
                },
                {
                    text: "A Pandemia e os Lutos: como agir?",
                    link: "https://www.youtube.com/embed/4Z2jC-dO4wk",
                },
                {
                    text: "Estratégias de Promoção de Saúde Mental",
                    link: "https://www.youtube.com/embed/sVcva41caHQ",
                },
                {
                    text: "Os caminhos para o Autocuidado",
                    link: "https://www.youtube.com/embed/9Hjubgv3jdE",
                },
            ],
        },
        {
            id: 7,
            name: "Banco de Currículos",
            image: "Banco de Curriculos.png",
            type: "files",
            files: [],
        },
        {
            id: 8,
            name: "FAQ",
            image: "FAQ.png",
            type: "files",
            files: [],
        },
        {
            id: 9,
            name: "IAMSPE",
            image: "IAMSPE.png",
            type: "files",
            files: [
                {
                    path: "/iamspe/CARTILHA - IAMSPE.pdf",
                    displayName: "Cartilha - IAMSPE",
                    icon: "pdf",
                },
                {
                    path: "/iamspe/DOCUMENTAÇÃO PARA INSCRIÇÃO AGREGADO - PAI E MÃE.docx",
                    displayName: "Documentação para inscrição agregado - Pai e Mãe",
                    icon: "docx",
                },
                {
                    path: "/iamspe/DOCUMENTAÇÃO PARA INSCRIÇÃO IAMSPE - FILHO INCAPACITADO.docx",
                    displayName: "Documentação para inscrição IAMSPE - Filho incapacitado",
                    icon: "docx",
                },
                {
                    path: "/iamspe/DOCUMENTAÇÃO PARA INSCRIÇÃO IAMSPE.docx",
                    displayName: "Documentação para inscrição IAMSPE",
                    icon: "docx",
                },
                {
                    path: "/iamspe/IAMSPE-ORIENTAÇÃO.pdf",
                    displayName: "IAMSPE - Orientação",
                    icon: "pdf",
                },
                {
                    path: "/iamspe/MANUAL IAMSPE.pdf",
                    displayName: "Manual IAMSPE",
                    icon: "pdf",
                },
                {
                    path: "/iamspe/PORTAL - IAMSPE.pdf",
                    displayName: "Portal IAMSPE",
                    icon: "pdf",
                },
                {
                    path: "/iamspe/TERMO - AGREGADO.pdf",
                    displayName: "Termo - Agregado",
                    icon: "pdf",
                },
                {
                    path: "/iamspe/TERMO - COMPANHEIRO - NÃO ESTÁVEL.pdf",
                    displayName: "Termo - Companheiro não estável",
                    icon: "pdf",
                },
                {
                    path: "/iamspe/TERMO - CONTRIBUENTE.pdf",
                    displayName: "Termo - Contribuente",
                    icon: "pdf",
                },
            ],
        },
    ]);

    const iconTypes = {
        xlsx: faFileExcel,
        pdf: faFilePdf,
        pptx: faFilePowerpoint,
        docx: faFileWord,
    };

    const handleModalClose = () => {
        setModalView(false);
        setSelectedItem(null);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setModalView(true);
    };

    const handleFileClick = (item) => {
        if (selectedItem.id === 7) {
            window.open(`${curriculosPath}${item.path}`, "_blank");
        } else {
            window.open(`${defaultFilePath}${item.path}`, "_blank");
        }
    };

    useEffect(() => {
        axios
            .get("/curriculos")
            .then(({ data }) => {
                setContent((prevContent) => {
                    const index = prevContent.findIndex((item) => item.id === 7);
                    prevContent[index].files = [];
                    data.forEach((dataItem) => {
                        prevContent[index].files.push({
                            path: dataItem.nome_arquivo,
                            displayName: dataItem.nome_view,
                            icon: dataItem.extensao,
                        });
                    });
                    return prevContent;
                });
            })
            .catch(() => {
                toast.error("Erro ao carregar currículos. Entre em contato com o suporte.");
            });
    }, []);

    return (
        <>
            <CardIntranet cardTitle="DRH" bigTitle>
                <GridButtons>
                    {content.map((card) => {
                        return (
                            <Button key={card.id} onClick={() => handleItemClick(card)}>
                                <img src={`${defaultImagePath}/${card.image}`} alt="..." />
                                <p>{card.name}</p>
                            </Button>
                        );
                    })}
                </GridButtons>
            </CardIntranet>
            <Modal size="xl" show={modalView} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItem?.menuName || selectedItem?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem?.type === "files" ? (
                        <>
                            <GridItems>
                                {selectedItem?.files?.map((item) => {
                                    return (
                                        <div
                                            key={item.path}
                                            title={item.displayName}
                                            onClick={() => handleFileClick(item)}>
                                            <FontAwesomeIcon size="4x" icon={iconTypes[item.icon]} />
                                            <p>
                                                {item.displayName.length > 36
                                                    ? `${item.displayName.slice(0, 35)}...`
                                                    : item.displayName}
                                            </p>
                                        </div>
                                    );
                                })}
                            </GridItems>
                        </>
                    ) : selectedItem?.type === "filesSub" ? (
                        <>
                            {selectedItem?.files?.map((category) => {
                                return (
                                    <div key={category.subName}>
                                        <p className="lead" style={{ textAlign: "center" }}>
                                            {category.subName}
                                        </p>

                                        <GridItems>
                                            {category?.items.map((item) => {
                                                return (
                                                    <div
                                                        key={item.path}
                                                        title={item.displayName}
                                                        onClick={() => handleFileClick(item)}>
                                                        <FontAwesomeIcon size="4x" icon={iconTypes[item.icon]} />
                                                        <p>
                                                            {item.displayName.length > 34
                                                                ? `${item.displayName.slice(0, 34)}...`
                                                                : item.displayName}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </GridItems>
                                        <hr />
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <DivVideos>
                            {selectedItem?.videos?.map((item) => {
                                return (
                                    <div key={item.link}>
                                        <span>{item.text}</span>
                                        <br />
                                        <iframe width="400" height="350" src={item.link} allowFullScreen></iframe>
                                    </div>
                                );
                            })}
                        </DivVideos>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Drh;
