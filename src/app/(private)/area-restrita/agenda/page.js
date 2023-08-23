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
import AgendaModal from "@/components/Agenda/Modal";

registerLocale("ptBR", ptBR);

const horarios = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
];
const weekDay = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const Agenda = () => {
    const [selectedHour, setSelectedHour] = useState("");
    const [events, setEvents] = useState([]);
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
            .get(`/agenda/${selectedDate}`)
            .then(({ data }) => {
                setEvents(data);
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
            const clickedEvent = await events.filter((event) => event.id === parseInt(e.target.id))[0];
            await setEventEdit(clickedEvent);
            setModalView(!modalView);
            return;
        }
        setSelectedHour(e.target.id);
        await setEventEdit(null);
        setModalView(!modalView);
    };

    return (
        <CardIntranet bigTitle cardTitle="Agendamento de eventos">
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
                                        const today = new Date();
                                        const now = today.getHours();
                                        const time = parseInt(horario.slice(0, 2));
                                        var show = false;
                                        var agora = false;
                                        if (
                                            date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() ===
                                            today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear()
                                        ) {
                                            if (now >= time) {
                                                show = true;
                                            }
                                            if (now + 1 === time) {
                                                agora = true;
                                            }
                                        }
                                        return (
                                            <tr key={horario}>
                                                <td className={`hora ${show ? "passada" : ""} ${agora ? "agora" : ""}`}>
                                                    {horario}
                                                </td>
                                                <td id={horario} onClick={handleRowClick} className="clickable">
                                                    <div id={horario} className="flex-evento">
                                                        {events?.map((event) => {
                                                            if (event.inicio.slice(0, 2) === horario.slice(0, 2))
                                                                return (
                                                                    <span
                                                                        key={event.id}
                                                                        id={event.id}
                                                                        className="evento-box">
                                                                        {event.titulo}
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
            <AgendaModal
                setView={setModalView}
                view={modalView}
                event={eventEdit}
                inicio={selectedHour}
                day={date}
                setEvents={setEvents}
            />
        </CardIntranet>
    );
};

export default Agenda;
