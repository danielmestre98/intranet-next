"use client";

import CardIntranet from "@/components/Card/Card";
import { useEffect } from "react";
import axios from "@/hooks/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import { ComunicadosItem } from "./styles";
import { useDispatch } from "react-redux";
import { removeNotif } from "@/app/Redux/user/slice";

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

const ComunicadoView = ({ params }) => {
    const [comunicado, setComunicado] = useState();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`/comunicados/view/${params.comId}`)
            .then(({ data }) => {
                setComunicado(data);
                dispatch(removeNotif(parseInt(params.comId)));
            })
            .catch(() => {
                toast.error(
                    "Falha ao recuperar comunicado, tente novamente. Caso o erro persista entre em contato com o suporte."
                );
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <CardIntranet cardTitle={"Comunicado"} bigTitle>
            <ComunicadosItem hidden={loading}>
                <div className="header">
                    <div className="dados">
                        <div className="info-group">
                            {comunicado?.enviar_como_depto === 0 ? (
                                <div className="imagem">
                                    <img
                                        src={
                                            comunicado?.users.usuario_img === 1
                                                ? `${process.env.NEXT_PUBLIC_UPLOADS_URL}/uploads/userimg/${comunicado?.users.usuario_id}.jpg`
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
                                    {comunicado?.enviar_como_depto === 0 ? (
                                        <>
                                            <span className="name">
                                                {capitalizeWords(comunicado?.users.usuario_nome)}
                                            </span>{" "}
                                            {/* - {comunicado?.users.departamentos.departamento_descricao} */}
                                        </>
                                    ) : (
                                        <span className="name">
                                            {comunicado?.users.departamentos.departamento_descricao}
                                        </span>
                                    )}
                                </p>
                                <p className="time">{formatDateTime(comunicado?.create_time)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="body" dangerouslySetInnerHTML={{ __html: comunicado?.descricao }} />
            </ComunicadosItem>
        </CardIntranet>
    );
};

export default ComunicadoView;
