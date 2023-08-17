"use client";

import CardIntranet from "@/components/Card/Card";
import { Red } from "../styles";
import { Icon, IconContainer, LinkFile } from "./styles";

const Assinatura = () => {
    return (
        <CardIntranet bigTitle={true} cardTitle="Assinatura Outlook">
            <h4 style={{ color: "red" }}>ATENÇÃO!</h4>
            <p>Antes de continuar, leia atentamente esta página.</p>
            <p>Existem algumas informações que podem ter ficado confusas e esperamos, assim, esclarecê-las.</p>
            <p>
                Você irá baixar um arquivo chamado "modelo". Ele estará em formato de arquivo PPTX. Este é o formato
                padrão de arquivos (de slides de apresentação) salvos no Power Point.
                <Red> Este formato pode ser aberto em qualquer versão do Power Point.</Red>
            </p>
            <p>
                Tenha em mente que o arquivo já obtém as proporções exatas seguindo a padronização, mas caso haja alguma
                alteração por engano, não se preocupe:{" "}
                <Red> Em cada passo existe uma linha em negrito antes da imagem</Red> informando o tamanho da fonte e
                sua característica/espessura, ou seja, se é negrito (bold) ou regular. O arquivo já possui as caixas de
                texto corretas para edição, a fonte do texto das caixas será sempre a “Verdana”.
            </p>
            <p>
                Insira seus dados conforme os passos e salve o arquivo. Após isso, você precisa selecionar com o mouse
                todo o conteúdo do arquivo no Power Point, apertar CTRL + C (copiar) e colar com CTRL + V (colar) no
                campo a ser inserida a assinatura. Você também pode selecionar todo o conteúdo, clicar com o botão
                direto do mouse em cima da seleção e escolher a opção “copiar”, clicar no campo a ser inserida a
                assinatura, clicar com o botão direito do mouse e escolher a opção “colar”.
            </p>
            <p>
                <Red>Você não deve salvar o arquivo como uma imagem.</Red> O que você deverá fazer é{" "}
                <Red>copiar o conteúdo de dentro do arquivo aberto no Power Point e colar no campo da assinatura.</Red>{" "}
                Você irá, literalmente, copiar e colar a assinatura.
            </p>
            <p>
                <Red>As assinaturas são padronizadas</Red>, por isso, tenha o cuidado de alterar apenas o conteúdo das
                caixas de texto e por favor,
                <Red> mantenha as mesmas formatações.</Red> Siga as instruções conforme os 5 passos do arquivo Passo a
                passo, a seguir:
            </p>
            <p style={{ color: "#900" }}>
                <b>
                    **Caso você já tenha a sua assinatura no Integra, a imagem da assinatura poderá ser copiada do corpo
                    do e-mail, de uma nova mensagem.**
                </b>
            </p>

            <IconContainer>
                <Icon>
                    <LinkFile target="_blank" href="/documents/assinatura/Modelo_assinatura_gabarito.pptx">
                        <img src="/img/assets/ppt.png" alt="..." />
                        <br />
                        Modelo
                    </LinkFile>
                </Icon>
            </IconContainer>
        </CardIntranet>
    );
};

export default Assinatura;
