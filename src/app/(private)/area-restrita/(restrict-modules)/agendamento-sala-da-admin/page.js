"use client";

import CardIntranet from "@/components/Card/Card";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { AgendaContainer, AgendaListContainer, DatepickerContainer, TableAgenda } from "./styles";
import { useEffect, useState } from "react";
import axios from "@/hooks/axiosInstance";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import AgendaLoad from "@/components/Loads/Agenda";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import ModalAgDaAdmin from "@/components/AgendaDaAdmin/Modal";

registerLocale("ptBR", ptBR);

const horarios = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "24:00",
    "24:30",
];
const weekDay = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const AgendaSalaDaAdmin = () => {
    const router = useRouter();
    const [selectedHour, setSelectedHour] = useState("");
    const [agenda, setAgenda] = useState([]);
    const [eventEdit, setEventEdit] = useState(null);
    const [modalView, setModalView] = useState(false);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());

    const fetchEventos = () => {
        setLoading(true);
        const selectedDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
            "0" + date.getDate()
        ).slice(-2)}`;
        axios
            .get(`/agenda-sala/2/${selectedDate}`)
            .then(({ data }) => {
                setAgenda(data);
            })
            .catch(() => {
                toast.error("Erro ao mostrar eventos. Contate o suporte");
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchEventos();
    }, [date]);

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleRowClick = async (e) => {
        if (e.target.className === "evento-box") {
            const clickedEvent = await agenda.filter((event) => event.id === parseInt(e.target.id))[0];
            await setEventEdit(clickedEvent);
            await setModalView(!modalView);
            return;
        }
        await setSelectedHour(e.target.id);
        setEventEdit(null);
        setModalView(!modalView);
    };

    return (
        <CardIntranet bigTitle cardTitle="Agendamento Sala D.A. Admin">
            <AgendaContainer>
                <DatepickerContainer>
                    <DatePicker locale="ptBR" inline onChange={handleDateChange} />
                </DatepickerContainer>
                <AgendaListContainer>
                    <CardIntranet
                        cardTitle={`${weekDay[date.getDay()]} - ${("0" + date.getDate()).slice(-2)}/${(
                            "0" +
                            (date.getMonth() + 1)
                        ).slice(-2)}/${date.getFullYear()}`}>
                        {loading ? (
                            <AgendaLoad />
                        ) : (
                            <TableAgenda bordered>
                                <tbody>
                                    {horarios.map((horario) => {
                                        const horarioFormat = horario.replace(":", "");
                                        return (
                                            <tr key={horario}>
                                                <td className={`hora`}>{horario}</td>
                                                <td id={horario} onClick={handleRowClick} className="clickable">
                                                    <div id={horario} className="flex-evento">
                                                        {agenda?.map((event) => {
                                                            const eventInicio = parseInt(
                                                                event?.hora_inicio?.replace(":", "")
                                                            );
                                                            const eventFim = parseInt(
                                                                event?.hora_fim?.replace(":", "")
                                                            );
                                                            if (
                                                                horarioFormat >= eventInicio &&
                                                                horarioFormat <= eventFim - 1
                                                            )
                                                                return (
                                                                    <span
                                                                        key={event.id}
                                                                        id={event.id}
                                                                        className="evento-box">
                                                                        {event.departamentos
                                                                            ? event.departamentos
                                                                                  ?.departamento_descricao
                                                                            : `${event.drads.drads_descricao} ${
                                                                                  event.drads
                                                                                      .drads_descricao_secundaria || ""
                                                                              }`}
                                                                    </span>
                                                                );
                                                        })}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </TableAgenda>
                        )}
                    </CardIntranet>
                </AgendaListContainer>
            </AgendaContainer>
            <ModalAgDaAdmin
                setView={setModalView}
                view={modalView}
                agendamento={eventEdit}
                start={selectedHour}
                day={date}
                agenda={agenda}
                setAgendaEvents={setAgenda}
                horariosNaoDisponiveis={agenda}
                horarios={horarios}
            />
            <Button onClick={() => router.push("/area-restrita")}>Voltar</Button>
        </CardIntranet>
    );
};

export default AgendaSalaDaAdmin;
