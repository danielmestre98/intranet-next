import CardIntranet from "@/components/Card/Card";
import { List, ListItem } from "@/components/List/List";

const GruposTrabalho = () => {
    return (
        <CardIntranet bigTitle={true} cardTitle="Grupos de Trabalho">
            <List>
                <ListItem href="/documents/grupos-trabalho/Projeto Backlog Pro-Social ver1 seds 07-08-2015.docx">
                    - Projeto Backlog Pro-social
                </ListItem>
                <ListItem href="/documents/grupos-trabalho/Cronograma MSE - 18012016.pdf">
                    - Projeto MSE - Medidas Socioeducativas
                </ListItem>
                <ListItem href="/documents/grupos-trabalho/ProjetoSistemaSIGEAS15092015.pdf">
                    - Projeto Sistema SIGEAS
                </ListItem>
                <ListItem href="/documents/grupos-trabalho/ProjetoSistemaPMAS201615092015.pdf">
                    - Projeto Sistema PMAS 2016
                </ListItem>
                <ListItem href="/documents/grupos-trabalho/informativoMunicipal.pdf">- Informativo Municipal</ListItem>
                <ListItem href="/documents/grupos-trabalho/CronogramasedsPNUDProjetoBI15092015.pdf">
                    - SEDS/PNUD - Projeto BI
                </ListItem>
                <ListItem href="/documents/grupos-trabalho/1306.pdf">
                    - GT Supervisão - Orientação às práticas de acompanhamento técnico
                </ListItem>
            </List>
        </CardIntranet>
    );
};

export default GruposTrabalho;
