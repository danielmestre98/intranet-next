"use client";

import CardIntranet from "@/components/Card/Card";
import { List, ListItemDropdown, ListItemDropdownLink } from "@/components/List/List";

const SalaSituacao = () => {
    return (
        <CardIntranet cardTitle="Sala de Situação" bigTitle>
            <List>
                <ListItemDropdown buttonName="GS - Gabinete da Secretária">
                    <ListItemDropdownLink toBlank href="/documents/situacao/gs/Gabinete.pdf">
                        Gabinete
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="Relatórios Temáticos">
                    <ListItemDropdownLink toBlank href="/documents/situacao/relatorios/Fortalecimento da Gestao.pdf">
                        Fortalecimento da Gestão
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/relatorios/Seguranca Alimentar.pdf">
                        Segurança Alimentar
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/relatorios/Programas Estrategicos.pdf">
                        Programas Estratégicos
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/situacao/relatorios/Vigilancia Socioassistencial.pdf">
                        Vigilância Socioassistincial
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/relatorios/Protecao Social.pdf">
                        Proteção Social
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/situacao/relatorios/Transferencia de Renda e Beneficios.pdf">
                        Transferência de Renda e Benefícios
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="CAFC - Fundos e Convênios">
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/situacao/csfc/Administracao de Fundos e Convenios.pdf">
                        Administração de Fundos e Convênios
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="CAS - Ação Social">
                    <ListItemDropdownLink toBlank href="/documents/situacao/cas/Protecao Social - Acoes diversas.pdf">
                        Proteção Social - Ações diversas
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cas/Protecao Social Basica.pdf">
                        Proteção Social Básica
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cas/Protecao Social Especial.pdf">
                        Proteção Social Especial
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cas/SP Amigo do Idoso.pdf">
                        SP Amigo do Idoso
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="CDS - Desenvolvimento Social">
                    <ListItemDropdownLink toBlank href="/documents/situacao/cds/Acao Jovem.pdf">
                        Ação Jovem
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cds/Renda Cidada.pdf">
                        Renda Cidadã
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cds/Bolsa Familia.pdf">
                        Bolsa Família
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cds/SP Amigo do Idoso.pdf">
                        SP Amigo do Idoso
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cds/BPC.pdf">
                        BPC
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cds/Familia Paulista.pdf">
                        Família Paulista
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cds/PETI.pdf">
                        PETI
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="CGE - Gestão Estratégica">
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/situacao/cge/Nucleo de Vigilancia Socioassistencial.pdf">
                        Núcleo de Vigilância Socioassistincial
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cge/Monitoramento e Avaliacao.pdf">
                        Monitoramento e Avaliação
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cge/Gestao SUAS.pdf">
                        Gestão SUAS
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cge/Gestao de Cadastro.pdf">
                        Gestão de Cadastro
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="COED - Coordenação de Políticas sobre Drogas">
                    <ListItemDropdownLink toBlank href="/documents/situacao/coed/Recomeco.pdf">
                        Recomeço
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="COSAN - Coordenadoria de Segurança Alimentar e Nutricional">
                    <ListItemDropdownLink toBlank href="/documents/situacao/cosan/Bom Prato.pdf">
                        Bom Prato
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/situacao/cosan/Vivaleite.pdf">
                        Vivaleite
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="EDESP - Escola de  Desenvolvimento Social">
                    <ListItemDropdownLink toBlank href="/documents/situacao/edesp/Educacao Permanente.pdf">
                        Eduacação Permanente
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="RH - Recursos Humanos">
                    <ListItemDropdownLink toBlank href="/documents/situacao/rh/Gestao do Trabalho.pdf">
                        Gestão de Trabalho
                    </ListItemDropdownLink>
                </ListItemDropdown>
            </List>
        </CardIntranet>
    );
};

export default SalaSituacao;
