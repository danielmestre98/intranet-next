"use client";

import CardIntranet from "@/components/Card/Card";
import { List, ListItem } from "@/components/List/List";

const Formularios = () => {
    return (
        <CardIntranet cardTitle="Formulários" bigTitle={true}>
            <List>
                <ListItem href="/documents/formularios/form_autorizacao.pdf">
                    - Autorização de Solicitação de Material
                </ListItem>
                <ListItem href="/documents/formularios/form_requisicao_cartucho.pdf">- Requisição de cartucho</ListItem>
                <ListItem href="/documents/formularios/form_requisicao_material.pdf">
                    - Requisição de materiais diversos
                </ListItem>
                <ListItem href="/documents/formularios/form_requisicao_xerox.pdf">- Requisição de xerox</ListItem>
                <ListItem href="/documents/formularios/form_pedido_ferias.pdf">- Pedido de férias</ListItem>
                <ListItem
                    href={`https://portal.seds.sp.gov.br/formularios/carros/${localStorage.getItem("userToken")}`}>
                    - Requisição de Veículo
                </ListItem>
                <ListItem href="/documents/formularios/form_concessao_aposentadoria.pdf">
                    - Concessão de aposentadoria
                </ListItem>
                <ListItem href="/documents/formularios/form_contagem_tempo_aposentadoria.pdf">
                    - Contagem de tempo para aposentadoria
                </ListItem>
                <ListItem href="/documents/formularios/form_horario_estudante.pdf">- Horário de estudante</ListItem>
                <ListItem href="/documents/formularios/form_licenca_premio.doc">- Licença prêmio</ListItem>
                <ListItem
                    href={`https://portal.seds.sp.gov.br/formularios/diarias/${localStorage.getItem("userToken")}`}>
                    - Solicitação de Pagamento de Diárias
                </ListItem>
                <ListItem href="/documents/formularios/PLANILHA 7 e 9 UFESPs 2023.xls">
                    - PLANILHA 7 e 9 UFESPs - 2023
                </ListItem>
                <ListItem href="/documents/formularios/SOLICITAÇÃO DE ACESSO A PORTA USB_MÁQUINA_V1_2021.pdf">
                    - Solicitação de acesso à porta USB - DNI
                </ListItem>
                <ListItem href="/documents/formularios/TI_Acesso Externo_V01_25-08.xlsx">
                    - Solicitação de liberação de acesso externo - DNI
                </ListItem>
            </List>
        </CardIntranet>
    );
};

export default Formularios;
