"use client";

import CardIntranet from "@/components/Card/Card";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "../../../hooks/axiosInstance";
import { DateBirthday, ImgBirthday, ImgBolo, NameBirthday, RowBirthday } from "./styles";

const Birthdays = () => {
    const [birthdays, setBirthdays] = useState([]);

    useEffect(() => {
        axios.get("/birthdays").then(({ data }) => {
            setBirthdays(data);
        });
    }, []);

    const formatDate = (date) => {
        const format = new Date(date);
        return ("00" + format.getUTCDate()).slice(-2) + "/" + ("00" + (format.getUTCMonth() + 1)).slice(-2);
    };

    return (
        <CardIntranet
            cardTitle={
                <>
                    <ImgBolo src="/img/assets/bolo.png" /> Aniversariantes da semana
                </>
            }
            style={{ marginTop: "10px" }}
            cardBodyStyle={{ padding: "5px", maxHeight: "400px", overflow: "auto" }}>
            {birthdays.length > 0
                ? birthdays.map((element) => {
                      var description;
                      if (element.drads_descricao_secundaria) {
                          description = "DRADS " + element.drads_descricao + " " + element.drads_descricao_secundaria;
                      } else {
                          description = "DRADS " + element.drads_descricao;
                      }
                      return (
                          <OverlayTrigger
                              key={element.usuario_id}
                              placement="top"
                              overlay={
                                  <Tooltip id="tooltip-top">
                                      {element.local === "DRADS" ? description : element.departamento_descricao}
                                  </Tooltip>
                              }>
                              <RowBirthday>
                                  <NameBirthday>
                                      <ImgBirthday
                                          src={
                                              element.usuario_img == 1
                                                  ? `/uploads/userimg/${element.usuario_id}.jpg`
                                                  : "/uploads/userimg/default-user-image.png"
                                          }
                                          alt="..."
                                      />
                                      {element.usuario_nome.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                                  </NameBirthday>
                                  <DateBirthday>{formatDate(element.usuario_aniversario)}</DateBirthday>
                              </RowBirthday>
                          </OverlayTrigger>
                      );
                  })
                : ""}
        </CardIntranet>
    );
};

export default Birthdays;
