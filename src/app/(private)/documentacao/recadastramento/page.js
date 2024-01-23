"use client";

import CardIntranet from "@/components/Card/Card";
import { List, ListItemDropdown, ListItemDropdownLink } from "@/components/List/List";
import Link from "next/link";

const Recadastramento = () => {
    return (
        <CardIntranet cardTitle="Recadastramento Anual" bigTitle={true}>
            <List>
                <ListItemDropdown buttonName="O que é o recadastramento?">
                    <div>
                        É atualização anual dos dados cadastrais de todos os servidores da ativa do Governo do Estado de
                        São Paulo.
                    </div>
                </ListItemDropdown>
                <ListItemDropdown singleChild buttonName="Quem precisa se recastrar?">
                    <div>
                        Todos os servidores e empregados públicos civis e militares da ativa da Administração Direta,
                        Autarquias, inclusive as de regime especial, e Fundações. O Recadastramento também é obrigatório
                        para funcionários afastados ou licenciados.
                    </div>
                </ListItemDropdown>
                <ListItemDropdown singleChild buttonName="Quando deve ser feito o recadastramento?">
                    <div>
                        No exercício de 2024, o recadastramento deverá ser realizado no período de 17/01/2024 a
                        17/03/2024, por todos os servidores, empregados públicos e militares.
                    </div>
                </ListItemDropdown>
                <ListItemDropdown singleChild buttonName="Qual o objetivo do recadastramento?">
                    <div>
                        O objetivo do recadastramento é manter os dados dos servidores atualizados para: <br />
                        - Uniformizar cadastros; <br />
                        - Realizar um estudo atuarial anual; <br />
                        - Preparar cadastro de pessoas para unificação do sistema de gestão de Recursos Humanos do
                        Estado; <br />
                        - Traçar políticas de valorização e capacitação dos servidores e empregados públicos e implantar
                        o banco de talentos; <br />
                        - Estudar a realocação de servidores e empregados públicos para que haja melhor distribuição de
                        recursos humanos no âmbito do Estado. <br />
                    </div>
                </ListItemDropdown>
                <ListItemDropdown buttonName="Legislação">
                    <ListItemDropdownLink
                        toBlank
                        href="https://www.doe.sp.gov.br/executivo/decretos/decreto-n-68306-de-16-de-janeiro-de-2024-20240117116691121">
                        Decreto nº 68.306, de 16 de janeiro de 2024
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="http://vclipping.planejamento.sp.gov.br/Vclipping1/images/b/be/P%C3%A1ginas_de_Resolucao_SGP_004_AnexoI.pdf">
                        Resolução SGP nº 04 de 10 de março de 2008
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="https://www.doe.sp.gov.br/executivo/secretaria-de-gestao-e-governo-digital/resolucao-sggd-01-de-18-01-2024-20240119112611094038">
                        Resolução SGGD nº 1, de 18 de janeiro de 2024
                    </ListItemDropdownLink>
                </ListItemDropdown>
                <ListItemDropdown singleChild buttonName="Canais para realizar o Recadastramento">
                    <div>
                        I - Portal Web{" "}
                        <Link target="_blank" href="https://recad.sp.gov.br">
                            https://recad.sp.gov.br
                        </Link>
                        <br />
                        II - Aplicativo SOU.SP.GOV.BR, disponível nas lojas de aplicativos para Android e iOS.
                    </div>
                </ListItemDropdown>
            </List>
        </CardIntranet>
    );
};

export default Recadastramento;
