"use client";

import { useRouter } from "next/navigation";
import CardIntranet from "../Card/Card";
import { HomeDiv, ImageBanner, Justify, YouTube } from "./styles";

function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch (error) {
        return false;
    }
}

const LeftColumn = () => {
    const router = useRouter();

    const handleBannerClick = (link, toBlank) => {
        if (isValidURL(link) || toBlank === true) {
            window.open(link);
        } else {
            router.push(link);
        }
    };

    return (
        <HomeDiv>
            <CardIntranet>
                <YouTube src="https://www.youtube.com/embed/?listType=user_uploads&list=socialsaopaulo&showinfo=1&theme=light" />
            </CardIntranet>
            <CardIntranet cardTitle="INFORME nº 01/2023">
                <Justify>
                    <b>Controle Interno</b>
                    <br />
                    <br />
                    Tendo em vista os relatórios, apontamentos, bem como as decisões proferidas pelos órgãos de
                    controle, que servem de relevante baliza para o aprimoramento da eficácia, efetividade, eficiência e
                    da transparência da Gestão, e ainda, da contínua melhoria de governança, planejamento e mitigação de
                    riscos, compartilhamos atuais orientações advindas do tribunal de contas do Estado para possíveis
                    adequações e ajustes das unidades internas desta Pasta, como seguem:
                    <br />
                    <br />
                    <ul>
                        <li>
                            A divulgação, nos meios eletrônicos da Secretaria de Desenvolvimento Social, das seguintes
                            informações das suas Unidades Gestoras Executoras (UGEs):
                            <ul>
                                <li>
                                    Execução orçamentária e financeira, conforme determinado no inciso II do § 1º do
                                    artigo 48 da LC nº 101/2000;
                                </li>
                                <li>
                                    Despesas realizadas, com indicação dos valores, fornecedores e, se for o caso, o
                                    tipo da licitação realizada, conforme determina o art. 48-A da LC nº 101/2000;
                                </li>
                                <li>
                                    Informações de interesse coletivo ou geral, nos termos e limites mínimos
                                    estabelecidos no artigo 8º, §1º, da Lei nº 12.527/2011.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </Justify>
            </CardIntranet>
            <CardIntranet>
                <ImageBanner onClick={() => handleBannerClick("/drh")}>
                    <img src="/img/home-banners/banner_rh.jpg" alt="..." />
                </ImageBanner>
                <ImageBanner onClick={() => handleBannerClick("/covid")}>
                    <img src="/img/home-banners/covid19.jpg" alt="..." />
                </ImageBanner>
                <ImageBanner onClick={() => handleBannerClick("/documents/home/Nota Técnica - Eleitoral.pdf", true)}>
                    <img src="/img/home-banners/condutas_vedadas.jpg" alt="..." />
                </ImageBanner>
            </CardIntranet>
        </HomeDiv>
    );
};

export default LeftColumn;
