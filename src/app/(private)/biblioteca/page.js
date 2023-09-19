import CardIntranet from "@/components/Card/Card";

const Biblioteca = () => {
    return (
        <CardIntranet cardTitle="Sobre a Biblioteca SEDS/EDESP" bigTitle>
            <p>
                <b>RECONSTRUINDO A SUA HISTÓRIA</b>
            </p>
            <p>
                Histórico da Biblioteca SEDS / EDESP, denominada Biblioteca ¨MARIA KIEHL¨ a sua fundação e constituição.
            </p>
            <p>
                Quando da criação do então Departamento de Assistência Social do Estado, pelo Decreto nº7.078, de 06 de
                abril de 1935, possuía apenas volumes esparsos, predominando os de legislação federal e estadual e os
                diários oficiais.
            </p>
            <p>
                Em 1937, por portaria foram constituídas as Seções de Biblioteca e Divulgação, e transformadas em 1938
                com a denominação de Seção de Biblioteca e Publicidade, no ano de 1971 Seção de Biblioteca e
                Documentação e atualmente Centro de Documentação, Biblioteca e Arquivo.
            </p>
            <p>
                <b>1)</b> Atualmente o acervo da Biblioteca inclui ampla tipologia de materiais. Destacamos os livros de
                áreas como Serviço Social, Psicologia, Direito e Administração Pública, além de periódicos, audiovisuais
                (CD-ROM e DVD), documentos técnicos de arquivo, legislações e publicações da Secretaria.
            </p>
            <p>
                <b>2)</b> Os documentos técnicos de arquivo mais antigos do acervo datam de 1935, sendo oriundos do
                Serviço Social do Estado. A cronologia dos documentos acompanha a história da Assistência Social no
                Estado de São Paulo.
            </p>
            <p>
                Temos diversos materiais bibliográficos da Secretaria da Promoção Social (1967), Secretaria do Menor
                (1987), Secretaria da Criança, Família e Bem-Estar Social (1993), Secretaria de Assistência e
                Desenvolvimento Social (1998) até chegar à nomenclatura atual, Secretaria de Desenvolvimento Social
                (2011).
            </p>
            <p>
                Ou seja, trata-se de material histórico relevante de referência, objeto de consulta e pesquisa para
                estudantes acadêmicos das áreas de Serviço Social e Políticas Públicas.
            </p>
            <p>
                <b>3)</b> Destacamos o trabalho permanente de compilação da legislação específica da Secretaria
                (resoluções, portarias, deliberações, etc.). Embora leis e decretos possam ser facilmente consultados em
                sites como os da Assembleia Legislativa e Imprensa Oficial, a organização sistemática dos atos
                normativos da Secretaria (com as indicações de revogações e alterações) é atribuição desta Biblioteca e
                não está disponível em outra fonte.
            </p>
            <p>
                <b>4)</b> A base para as atividades desenvolvidas pela Biblioteca está expressa no artigo 31 do Decreto
                49.688/2005 que reestruturou a Secretaria.
            </p>
            <p>
                <b>NOS TEMPOS ATUAIS:</b>
            </p>
            <p>
                Em 2012 é dado um novo formato para a biblioteca, a qual tem um destaque ainda maior no âmbito de
                formação e capacitação para o servidor.
            </p>
            <p>
                Raquel Nader, do Centro de Formalização de Convênios, participou ativamente da arrecadação, colaborando
                com cerca de 60 títulos, entre livros, revistas e outras publicações para esse novo momento da expansão
                da biblioteca. Hoje somos a principal plataforma de pesquisa dentro da SEDS.
            </p>
            <p>
                A EDESP abriga um rico acervo da sua produção (objetos de aprendizagem de capacitações, estudos,
                revistas etc.) e uma biblioteca com exemplares das áreas de Assistência Social e correlatas.
            </p>
            <p>
                Há outros materiais, incluindo os produzidos pela SEDS, os quais são requisitados para pesquisas sobre
                legislações relativas à política de Assistência e Desenvolvimento Social, e logo, logo estaremos
                reproduzindo livros em áudio e e-books de matérias criadas pela própria EDESP.
            </p>
            <p>
                Outra campanha para doação deve ocorrer a partir da nossa reinauguração, nossa intenção é realizar novas
                campanhas semestralmente. Estamos pensando em fazer as próximas arrecadações com algum direcionamento
                temático ou técnico” com a participação direta dos servidores da SEDS, completou Odair Borges – Diretor
                Técnico 2 da EDESP.
            </p>
            <p>
                A relação com todos os títulos arrecadados está disponível no link:{" "}
                <a href="http://10.22.0.15:8080/Biblivre4/" target="_blank" rel="noopener noreferrer">
                    Biblivre
                </a>
                .
            </p>
            <p>
                A Biblioteca da SEDS está localizada no 2° andar (ao lado da Sala Quadrada de Reunião da SEDS e fica
                aberta das 9h às 18h. Mais informações pelos ramais 8154 / 8156 ou pelo e-mail:{" "}
                <a href="mailto:biblioteca@desenvolvimentosocial.sp.gov.br">
                    biblioteca@desenvolvimentosocial.sp.gov.br
                </a>
            </p>
            <hr />
            <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "19px" }}>
                    <a target="_blank" rel="noreferrer" href="/documents/biblioteca/BiblioSeds.docx">
                        Faça seu cadastramento!
                    </a>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <img width={"200px"} src="/img/logos/edesp.png" alt="..." />
                <div>
                    <img width={"300px"} src="/img/logos/sp.png" alt="..." />
                </div>
            </div>
        </CardIntranet>
    );
};

export default Biblioteca;
