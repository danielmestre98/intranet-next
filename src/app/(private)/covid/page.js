"use client";

import CardIntranet from "@/components/Card/Card";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GridItems } from "./styles";

const Covid = () => {
    const handleFileClick = (fileName) => {
        window.open(`/documents/covid/${fileName}`);
    };

    return (
        <CardIntranet bigTitle cardTitle="Coronavírus (COVID-19)">
            <h4 style={{ color: "red" }}>Atenção!</h4>
            <p>
                Disponibilizamos 3 arquivos com informações completas sobre o Coronavírus (COVID-19) para que você
                entenda formas de contágio e métodos para prevenção.
            </p>
            <GridItems>
                <div title="Informativo COVID-19 V1" onClick={() => handleFileClick("coronavirus1.pdf")}>
                    <FontAwesomeIcon size="4x" icon={faFilePdf} />
                    <p>Informativo COVID-19 V1</p>
                </div>
                <div title="Informativo COVID-19 V1" onClick={() => handleFileClick("coronavirus2.pdf")}>
                    <FontAwesomeIcon size="4x" icon={faFilePdf} />
                    <p>Informativo COVID-19 V2</p>
                </div>
                <div title="Informativo COVID-19 V1" onClick={() => handleFileClick("coronavirus3.pdf")}>
                    <FontAwesomeIcon size="4x" icon={faFilePdf} />
                    <p>Informativo COVID-19 Perguntas e Respostas</p>
                </div>
            </GridItems>
        </CardIntranet>
    );
};

export default Covid;
