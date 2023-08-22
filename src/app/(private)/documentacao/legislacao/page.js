"use client";

import CardIntranet from "@/components/Card/Card";
import { List, ListItemDropdown, ListItemDropdownLink } from "@/components/List/List";

const Legislacao = () => {
    return (
        <CardIntranet cardTitle="Legislação" bigTitle={true}>
            <List>
                <ListItemDropdown buttonName="Reorganização da SEDS">
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/reorganizacao/decreto reorganização seds nº 49.688.pdf">
                        Decreto Reorganização SEDS Nº 49.688
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/reorganizacao/Índice.pdf">
                        Índice
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/reorganizacao/Organograma SEADS.pdf">
                        Organograma SEDS
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/reorganizacao/Res.SEADS 1-2006-Divisões Regionais-formato Word-23 páginas.pdf">
                        Red.SEDS 1-2006-Divisões Regionais
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/reorganizacao/Sumário Item 1.pdf">
                        Sumário Item 1
                    </ListItemDropdownLink>
                    <ListItemDropdownLink red toBlank href="/documents/legislacao/reorganizacao/reorganiza_seds.zip">
                        Baixar Todos os Arquivos
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="Organograma SEDS">
                    <ListItemDropdownLink toBlank href="/documents/legislacao/organograma/Organograma_CAFC.jpg">
                        Coordenadoria de Administração de Fundos e Convênios
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/organograma/Organograma_CAS.jpg">
                        Coordenadoria de Ação Social
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/organograma/Organograma_CDS.jpg">
                        Coordenadoria de Desenvolvimento Social
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/organograma/Organograma_CGE.jpg">
                        Coordenadoria de Gestão Estratégica
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/organograma/Organograma_DA.jpg">
                        Departamento de Administração
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/organograma/Organograma_DCI.jpg">
                        Departamento de Comunicação Institucional
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/organograma/Organograma_DNI.jpg">
                        Departamento de Normatização e Informática
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/organograma/Organograma_DRH.jpg">
                        Departamento de Recursos Humanos
                    </ListItemDropdownLink>
                    <ListItemDropdownLink red toBlank href="/documents/legislacao/organograma/Organogramas.zip">
                        Baixar Todos os Arquivos
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="Adiantamento (CAFC)">
                    <ListItemDropdownLink toBlank href="/documents/legislacao/adiantamento/Adiantamento.pdf">
                        Adiantamento
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/adiantamento/Decreto Diárias Nº 48.292.pdf">
                        Decreto Diárias Nº 48.292
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/adiantamento/Decreto Diárias Nº 48.580.pdf">
                        Decreto Diárias Nº 48.580
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/adiantamento/Decreto Diárias Nº 49.878.pdf">
                        Decreto Diárias Nº 49.878
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/adiantamento/Diárias - Fundamento Legal 12-06-06.pdf">
                        Diárias - Fundamento Legal 12-06-06
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/adiantamento/Ofício Despacho +- 50.pdf">
                        Ofício Despacho +- 50%
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/adiantamento/Resolução SEP 01-2006.pdf">
                        Resolução SEP 01-2006
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/adiantamento/Resolução SEP - 10, de 18-11-2004..pdf">
                        Resolução SEP - 10, de 18-11-2004
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/adiantamento/ResoluçãoSEP-1,de 20-1-2004-scanner.pdf">
                        Resolução SEP-1, de 20-1-2004 - scanner
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/adiantamento/Sumário Item 2.pdf">
                        Sumário Item 2
                    </ListItemDropdownLink>
                    <ListItemDropdownLink red toBlank href="/documents/legislacao/adiantamento/adiantamento.zip">
                        Baixar Todos os Arquivos
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="Manuais e outros documentos">
                    <ListItemDropdownLink toBlank href="/documents/legislacao/manuais/Manual_SIAFEM_Net.pdf">
                        Manual_SIAGEM_Net
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Manual de Procedimentos da Área de Comunicação Administrativa.pdf">
                        Manual de Procedimentos da Área de Comunicação Administrativa
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Manual do Aplicativo de Gestão Documental.pdf">
                        Manual do Aplicativo de Gestão Documental
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Manual de Procedimentos do Transporte Interno.pdf">
                        Manual de Procedimentos do Transporte Interno
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Manual de Orientação ao Motorista e Usuário.pdf">
                        Manual de Orientação ao Motorista e Usuário
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Manual Procedimentos de Gestão do Material Permanente - Mobiliário.pdf">
                        Manual Procedimentos de Gestão do Material Permanente - Mobiliário
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 25.013, de 16 de abril de 1986.pdf">
                        Decreto Nº 25.013, de 16 de abril de 1986
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 25.353, de 10 de junho de 1986.pdf">
                        Decreto Nº 25.353, de 10 de junho de 1986
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 25.492, de 14 de julho de 1986.pdf">
                        Decreto Nº 25.492, de 14 de junho de 1986
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 29.439, de 28 de dezembro de 1988.pdff">
                        Decreto Nº 29.439, de 28 de dezembro de 1988
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 36.727, de 7 de maio de 1993.pdf">
                        Decreto Nº 36.727, de 7 de maio de 1993
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 37.743, de 27 de outubro de 1993.pdf">
                        Decreto Nº 37.743, de 27 de outubro de 1993
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 39.540, de 17 de novembro de 1994.pdf">
                        Decreto Nº 39.540, de 17 de novembro de 1994
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 39.907, de 3 de janeiro de 1995.pdf">
                        Decreto Nº 39.907, de 3 de janeiro de 1995
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 40.951, de 24 de junho de 1996.pdf">
                        Decreto Nº 40.951, de 24 de junho de 1996
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 41.915, de 2 de julho de 1997.pdf">
                        Decreto Nº 41.915, de 2 de julho de 1997
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 44.722, de 23 de fevereiro de 2000.pdf">
                        Decreto Nº 44.722, de 23 de fevereiro de 2000
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Decreto Nº 52.968, de 7 de julho de 1972.pdf">
                        Decreto Nº 52.968, de 7 de julho de 1972
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/DOE 12-09-1992 (Instrucao Conjunta CRHE-CAF.jpg">
                        DOE 12-09-1992 (Instrucao Conjunta CRHE-CAF)
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/manuais/DOE 16-09-1999.jpg">
                        DOE 16-09-1999
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/manuais/Formulário - Anexo VI.jpg">
                        Formulário - Anexo VI
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/manuais/Formulário - Anexo VII.jpg">
                        Formulário - Anexo VII
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Lei Complementar Nº 367, de 14 de dezembro de 1984.pdf">
                        Lei Complementar Nº 367, de 14 de dezembro de 1984
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Lei Complementar Nº 432, de 18 de dezembro de 1985.pdf">
                        Lei Complementar Nº 432, de 18 de dezembro de 1985
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Lei Complementar Nº 712, de 12 de abril de 1993.pdf">
                        Lei Complementar Nº 712, de 12 de abril de 1993
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Lei Complementar Nº 835, de 04 de novembro de 1997.pdf">
                        Lei Complementar Nº 835, de 04 de novembro de 1997
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Lei Complementar Nº 857, de 20 de maio de 1999.pdf">
                        Lei Complementar Nº 857, de 20 de maio de 1999
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Lei Complementar Nº 883, de 17 de outrubro de 2000.pdf">
                        Lei Complementar Nº 883, de 17 de outubro de 2000
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Lei Complementar Nº 924, de 16 de agosto de 2002.pdf">
                        Lei Complementar Nº 924, de 16 de agosto de 2002
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Lei Complementar Nº  813, de 16 de julho de 1996.pdf">
                        Lei Complementar Nº 813, de 16 de julho de 1996
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/manuais/Manual de Procedimentos da Área de Recursos Humanos.pdf">
                        Manual de Procedimentos da Área de Recursos Humanos
                    </ListItemDropdownLink>
                    <ListItemDropdownLink red toBlank href="/documents/legislacao/manuais/todos_manuais.zip">
                        Baixar Todos os Arquivos
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="D R H">
                    <ListItemDropdownLink href="https://www.al.sp.gov.br/legislacao/norma.do?id=1988">
                        Alterações introduzidas pela LC (nº 942/2003)
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="D N I">
                    <ListItemDropdownLink toBlank href="/documents/legislacao/dni/guia_nova_ortografia.pdf">
                        Guia da nova ortografia
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/dni/PROCEDIMENTOS_SEGURANCA.pdf">
                        Procedimentos de Segurança
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/dni/Manual para melhor desempenho do microcomputador.pdf">
                        Manual para melhor desempenho do microcomputador
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="D C I">
                    <ListItemDropdownLink toBlank href="/documents/legislacao/dci/Lei 13541 - antifumo.pdf">
                        Lei anti-fumo/2009
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/dci/Dec. 54.311 - antifumo.doc">
                        Decreto anti-fumo/2009
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="C A S">
                    <ListItemDropdownLink toBlank href="/documents/legislacao/cas/CapacitacaoCAS.pdf">
                        Capacitação CRAS
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/cas/Informativo CAS n14.pdf">
                        Informativo CAS n.º 14
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/cas/Informativo CAS n15.pdf">
                        Informativo CAS n.º 15
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/cas/Informativo CAS n16.pdf">
                        Informativo CAS n.º 16
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/cas/Informativo CAS n17.pdf">
                        Informativo CAS n.º 17
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/cas/Manual PMAS 2009.pdf">
                        Guia de Orientação - PMAS 2009
                    </ListItemDropdownLink>
                </ListItemDropdown>

                <ListItemDropdown buttonName="C D S">
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/cds/Instrumentais de Supervisão-Consolidado Ação Jovem.zip">
                        Instrumentais de Supervisão - Consolidado Ação Jovem
                    </ListItemDropdownLink>
                    <ListItemDropdownLink toBlank href="/documents/legislacao/cds/ManualOrientacaoAcaoJovem.pdf">
                        Manual de Orientação sobre o Programa Ação Jovem
                    </ListItemDropdownLink>
                    <ListItemDropdownLink
                        toBlank
                        href="/documents/legislacao/cds/Sao Paulo TI Plano Estadual 2008.doc.ppt">
                        São Paulo TI Plano Estadual 2008
                    </ListItemDropdownLink>
                </ListItemDropdown>
            </List>
        </CardIntranet>
    );
};

export default Legislacao;
