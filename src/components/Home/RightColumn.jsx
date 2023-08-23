"use client";

import { useRouter } from "next/navigation";
import CardIntranet from "../Card/Card";
import Agenda from "./Agenda/Agenda";
import Note from "./Note/Note";
import { HomeDiv, ImageBanner } from "./styles";

function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch (error) {
        return false;
    }
}

const RightColumn = () => {
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
            <CardIntranet cardBodyStyle={{ padding: "0px" }} style={{ height: "400px" }}>
                <Agenda />
            </CardIntranet>
            <CardIntranet cardTitle="Recados Importantes" style={{ height: "674.5px" }}>
                <Note />
            </CardIntranet>
            <CardIntranet>
                <ImageBanner onClick={() => handleBannerClick("https://treinamentos.spsempapel.sp.gov.br/")}>
                    <img src="/img/home-banners/banner_sp_sem_papel.jpg" alt="..." />
                </ImageBanner>
                <ImageBanner
                    onClick={() =>
                        handleBannerClick("/documents/home/CARTILHA VOLTA AO TRABALHO PRESENCIAL.pdf", true)
                    }>
                    <img src="/img/home-banners/banner_cartilha.png" alt="..." />
                </ImageBanner>
                <ImageBanner onClick={() => handleBannerClick("/edesp")}>
                    <img src="/img/home-banners/banner_edesp.png" alt="..." />
                </ImageBanner>
            </CardIntranet>
        </HomeDiv>
    );
};

export default RightColumn;
