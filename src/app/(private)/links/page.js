"use client";

import CardIntranet from "@/components/Card/Card";
import { List, ListItem } from "@/components/List/List";

const Links = () => {
    return (
        <CardIntranet cardTitle="Links" bigTitle={true}>
            <List>
                <ListItem href="http://10.200.10.19/spdoc/Privado/Default.aspx">- SPDOC</ListItem>
                <ListItem href="http://www.saopaulo.sp.gov.br/">- PORTAL DO GOVERNO</ListItem>
                <ListItem href="http://www.fazenda.sp.gov.br/">- CONSULTE SEU SALÁRIO</ListItem>
                <ListItem href="http://www.desenvolvimentosocial.sp.gov.br/">
                    - SECRETARIA DE DESENVOLVIMENTO SOCIAL - SEDS
                </ListItem>
                <ListItem href="http://translate.google.com/">- TRADUTOR INGLÊS/PORTUGUÊS</ListItem>
                <ListItem href="http://www.edesp.sp.gov.br/">
                    - ESCOLA DE DESENVOLVIMENTO SOCIAL DE SÃO PAULO - EDESP
                </ListItem>
                <ListItem href="http://www.receita.fazenda.gov.br/">- RECEITA FEDERAL</ListItem>
                <ListItem href="http://www.dicionariodoaurelio.com/">- DICIONÁRIO ONLINE</ListItem>
                <ListItem href="http://www.maplink.com.br/">- MAPLINK - TRAÇADOR DE ROTA</ListItem>
                <ListItem href="http://www.mds.gov.br/">- MINISTÉRIO DE DESENVOLVIMENTO SOCIAL</ListItem>
                <ListItem href="http://www.agorainvest.com.br/">- COTAÇÃO DO DÓLAR</ListItem>
                <ListItem href="http://www.iamspe.sp.gov.br/">- HOSPITAL DO SERVIDOR PÚBLICO ESTADUAL</ListItem>
                <ListItem href="http://bit.ly/9YjzIh">- DIÁRIO OFICIAL</ListItem>
                <ListItem href="https://www.doe.sp.gov.br/">- NOVO DIÁRIO OFICIAL</ListItem>
                <ListItem href="http://www.bioleo.org.br/">- PROGRAMA BIÓLEO</ListItem>
                <ListItem href="http://www.e-agendamento.poupatempo.sp.gov.br/agenda/home.seam">
                    - E-POUPATEMPO
                </ListItem>
                <ListItem
                    href="/downloads/IRPF2023Win64v1.0.rar"
                    extraText=" - A declaração e o envio são feitos em um único programa na versão 2023">
                    - DOWNLOAD DO PROGRAMA IRPF
                </ListItem>
                <ListItem href="http://intranet/usr/file/programas/java_virtual_machine_7.zip">
                    - JAVA (MÁQUINA VIRTUAL)
                </ListItem>
            </List>
        </CardIntranet>
    );
};

export default Links;
