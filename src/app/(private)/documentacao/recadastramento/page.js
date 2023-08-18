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
                <ListItemDropdown buttonName="Quando deve ser feito o recadastramento?">
                    <div>
                        Deve ser feito anualmente, no mês do aniversário dos servidores e empregados públicos civis e
                        militares.
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
                        href="https://recadastramentoanual.gestaopublica.sp.gov.br/recadastramentoanual/manuais/Decreto_52691.pdf">
                        Decreto nº 52.692/2008
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="https://recadastramentoanual.gestaopublica.sp.gov.br/recadastramentoanual/manuais/Resolucao_SGP_004.pdf">
                        Resolução SGP nº 004/2008
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="https://recadastramentoanual.gestaopublica.sp.gov.br/recadastramentoanual/manuais/Comunicado_DOE_20090603.pdf">
                        Comunicado D.O.E. de 03/06/2009 - Retificação da Resolução
                    </ListItemDropdownLink>
                </ListItemDropdown>
                <ListItemDropdown singleChild buttonName="Quando deve ser feito o recadastramento?">
                    <div>
                        Para fazer o recadastramento, clique no link abaixo: <br />
                        <Link
                            target="_blank"
                            href="https://recadastramentoanual.sp.gov.br/recadastramentoanual/noauth/LoginPrepare.do">
                            Recadastramento Anual
                        </Link>
                    </div>
                </ListItemDropdown>
            </List>
        </CardIntranet>
    );
};

export default Recadastramento;
