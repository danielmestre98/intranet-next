import CardIntranet from "@/components/Card/Card";
import { List, ListItemDropdown, ListItemDropdownLink } from "@/components/List/List";

const Peas = () => {
    return (
        <CardIntranet cardTitle="Plano Estadual de Assistência Social - PEAS" bigTitle>
            <List>
                <ListItemDropdown buttonName="PEAS 2016-2019">
                    <ListItemDropdownLink toBlank href="/documents/peas/SEDS PEAS 2016 2019.pdf">
                        SEDS PEAS 2016 2019
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="Deliberações das Conferências Estaduais de 2015">
                    <ListItemDropdownLink toBlank href="/documents/peas/14 Conferência Estadual do Idoso.pdf">
                        14 Conferência Estadual do Idoso
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/peas/Apresentação Conferência Estadual de Assistencia Social 2015.pdf">
                        Apresentação Conferência Estadual de Assistência Social 2015
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/peas/Conferência Estadual da Criança e do Adolescente - Propostas Crianças.pdf">
                        Conferência Estadual da Criança e do Adolecente - Propostas Crianças
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/peas/Conferências ECA Lúdicas Nov15.pdf">
                        Conferências ECA Lúdicas Nov15
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/peas/VI CONFERÊNCIA LÚDICA ESTADUAL DOS DIREITOS HUMANOS DA CRIANÇA E DO ADOLESCENTE - Propostas.pdf">
                        VI CONFERÊNCIA LÚDICA ESTADUAL DOS DIREITOS HUMANOS DA CRIANÇA E DO ADOLECENTE - Propostas
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="Objetivos de Desenvolvimento Sustentável - PNUD">
                    <ListItemDropdownLink toBlank href="/documents/peas/CGDES-ODS-port.pdf">
                        CGDES-ODS-port
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/peas/ODS-posição-brasileira-itamaraty.pdf">
                        ODS Posição Brasileira Itamaraty
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/peas/TransformandoNossoMundo- AGENDA2030.pdf">
                        Transformando Nosso Mundo - AGENDA 2030
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="Pacto de Aprimoramento">
                    <ListItemDropdownLink toBlank href="/documents/peas/Pacto de Aprimoramento 2011-2014.pdf">
                        Pacto de Aprimoramento 2011-2014
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/peas/PROPOSTA DE PLANO ESTADUAL DE ACOMPANHAMENTO DO PACTO DE APRIMORAMENTO DA GESTÃO MUNICIPAL DO SUAS.pdf">
                        Proposta de Plano Estadual de Acmpanhamento de Pacto de Aprimoramento da Gestão Municipal do
                        SUAS
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/peas/Resolução n°13, de 4 de Julho de 2013.pdf">
                        Resolução nº13 de 4 de julho de 2013
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/peas/RESOLUÇÃO Nº 16, DE 3 DE OUTUBRO DE 2013.pdf">
                        Resolução nº16 de 3 de outubro 2013
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="PEAS">
                    <ListItemDropdownLink toBlank href="/documents/peas/PEAS 2006 CIB APROVAÇAO.pdf">
                        PEAS 2006 CIB Aprovação
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/peas/PEAS 2008.pdf">
                        PEAS 2008
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/peas/PEAS 2009.pdf">
                        PEAS 2009
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/peas/PEAS 2010.pdf">
                        PEAS 2010
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/peas/PEAS 2011.pdf">
                        PEAS 2011
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/peas/PEAS 2015.pdf">
                        PEAS 2015
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/peas/Plano Plurianual de Desenvolvimento Social 2012-2015.pdf">
                        Plano Plurianual de Desenvolvimento Social 2012-2015
                    </ListItemDropdownLink>
                </ListItemDropdown>
            </List>
        </CardIntranet>
    );
};

export default Peas;
