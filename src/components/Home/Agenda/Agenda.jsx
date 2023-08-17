"use client";

import { faChevronLeft, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "../../../hooks/axiosInstance";
import ModalAg from "./ModalAg";
import {
    ButtonAgenda,
    ButtonGroup,
    DayBlock,
    DetailsBlock,
    EventContainer,
    EventsBlock,
    HeaderAgenda,
    LeftArrow,
    LinkCreateEvent,
    NoEventsDiv,
    RightArrow,
} from "./styles";

const nomeMeses = ["JAN.", "FEV.", "MAR.", "ABR.", "MAI.", "JUN.", "JUL.", "AGO.", "SET.", "OUT.", "NOV.", "DEZ."];
const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

const Agenda = () => {
    const [modalView, setModalView] = useState(false);
    const [eventoView, setEventoView] = useState();
    const [filters, setFilters] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [radioValue, setRadioValue] = useState("today");
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        axios.get(`/agenda/home/today`).then(({ data }) => {
            setEvents(data);
            setFilteredEvents(data);
        });
        axios.get(`/departamentos-drads`).then(({ data }) => {
            setFilters(data);
        });
    }, []);

    const slideRight = () => {
        document.getElementById("button-group").scrollLeft += 100;
        setShowArrow(!showArrow);
    };

    const slideLeft = () => {
        document.getElementById("button-group").scrollLeft -= 100;
        setShowArrow(!showArrow);
    };

    const handlePeriodClick = (e) => {
        if (e.target.id) {
            setRadioValue(e.target.id);
            axios.get(`/agenda/home/${e.target.id}`).then(({ data }) => {
                setEvents(data);
                setFilteredEvents(data);
            });
        }
    };

    const filterEvents = (e) => {
        var filtered;
        if (e.target.value) {
            filtered = events.filter(
                (event) =>
                    (event.departamento_descricao === e.target.value && event.local === "SEDS") ||
                    (`DRADS ${event.drads_descricao}${
                        event.drads_descricao_secundaria ? ` ${event.drads_descricao_secundaria}` : ""
                    }` === e.target.value &&
                        event.local === "DRADS")
            );
        } else {
            filtered = events;
        }
        setFilteredEvents(filtered);
    };

    const handleEventClick = (evento) => {
        setEventoView(evento);
        setModalView(true);
    };

    return (
        <>
            <HeaderAgenda>
                <p>
                    <b>Agenda</b>
                </p>
                <Form.Select onChange={filterEvents} size="sm">
                    <option value="">Filtrar por departamento ou DRADS...</option>
                    {filters.map((filter) => (
                        <option key={filter} value={filter}>
                            {filter}
                        </option>
                    ))}
                </Form.Select>
                <LinkCreateEvent href="/area-restrita/agenda">
                    <FontAwesomeIcon icon={faPlus} /> Criar evento
                </LinkCreateEvent>
            </HeaderAgenda>
            <LeftArrow onClick={slideLeft} hidden={!showArrow}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </LeftArrow>
            <ButtonGroup onClick={handlePeriodClick} id="button-group">
                <ButtonAgenda type="radio" checked={radioValue === "today"} variant="outline-primary" id="today">
                    Hoje
                </ButtonAgenda>
                <ButtonAgenda type="radio" checked={radioValue === "tomorrow"} variant="outline-primary" id="tomorrow">
                    Amanhã
                </ButtonAgenda>
                <ButtonAgenda type="radio" checked={radioValue === "week"} variant="outline-primary" id="week">
                    Esta semana
                </ButtonAgenda>
                <ButtonAgenda type="radio" checked={radioValue === "month"} variant="outline-primary" id="month">
                    Este mês
                </ButtonAgenda>
                <ButtonAgenda
                    type="radio"
                    checked={radioValue === "next-month"}
                    variant="outline-primary"
                    id="next-month">
                    Próximo mês
                </ButtonAgenda>
                <ButtonAgenda type="radio" checked={radioValue === "all"} variant="outline-primary" id="all">
                    Tudo
                </ButtonAgenda>
            </ButtonGroup>
            <RightArrow onClick={slideRight} hidden={showArrow}>
                <FontAwesomeIcon icon={faChevronRight} />
            </RightArrow>
            <hr style={{ marginBottom: "0px" }} />
            <EventsBlock>
                {filteredEvents && filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => {
                        var eventType = ["acao-formativa", "evento-comum", "feriado"];
                        const day = new Date(event.dia_evento.replace(/-/g, "/"));
                        return (
                            <div key={event.id_evento}>
                                <EventContainer title={event.titulo} onClick={() => handleEventClick(event)}>
                                    <DayBlock className={eventType[event.tipo - 1]}>
                                        <span className="dia">{("0" + day.getDate()).slice(-2)}</span>
                                        <span className="mes">{nomeMeses[day.getMonth()]}</span>
                                        <span className="nome-dia">{diasSemana[day.getDay()]}</span>
                                    </DayBlock>
                                    <DetailsBlock>
                                        <span className="titulo">
                                            {event.titulo.length > 39
                                                ? `${event.titulo.slice(0, 39)}...`
                                                : event.titulo}
                                        </span>
                                        <span className="horas">
                                            {event.hora_inicio.slice(0, 5)}{" "}
                                            {event.hora_fim !== "00:00:00" ? "- " + event.hora_fim.slice(0, 5) : ""}
                                        </span>
                                        <span className="nome">
                                            {`${event.usuario_nome
                                                .toLowerCase()
                                                .replace(/\b\w/g, (l) => l.toUpperCase())} - ${
                                                event.local === "SEDS"
                                                    ? event.departamento_descricao
                                                    : `DRADS ${event.drads_descricao} ${
                                                          event.drads_descricao_secundaria || ""
                                                      }`
                                            }`}
                                        </span>
                                        <span className="local">
                                            {event.local_evento > 65
                                                ? `${event.local_evento.slice(0, 65)}...`
                                                : event.local_evento}
                                        </span>
                                    </DetailsBlock>
                                </EventContainer>
                                <hr style={{ margin: "0" }} />
                            </div>
                        );
                    })
                ) : (
                    <>
                        <NoEventsDiv>
                            <p>Nenhum evento cadastrado nesse período</p>
                        </NoEventsDiv>
                        <hr style={{ margin: "0" }} />
                    </>
                )}
            </EventsBlock>
            <ModalAg event={eventoView} view={modalView} setView={setModalView} />
        </>
    );
};

export default Agenda;
