import { styled } from "styled-components";

export const ComunicadosList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
`;

export const NenhumComunicado = styled.div`
    display: flex;
    justify-content: center;
`;

export const ComunicadosItem = styled.div`
    .header {
        padding: 10px 15px;
        background-color: rgb(157, 196, 240);
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px;
        transition-delay: 0.5s;
        transition-property: border-bottom-left-radius, border-bottom-right-radius;

        &.show {
            transition-delay: 0s;
            transition-property: border-bottom-left-radius, border-bottom-right-radius;
            border-bottom-left-radius: 0px !important; /* Adjust the value to control the curve of the bottom-left corner */
            border-bottom-right-radius: 0px !important;
        }

        &.read {
            background-color: rgb(216, 216, 216);
        }

        &.read.active {
            background-color: rgb(180, 180, 180);
        }
        &.read:hover {
            background-color: rgb(180, 180, 180);
        }

        &:hover {
            cursor: pointer;
            background-color: rgb(114, 174, 241);
        }

        .dados {
            display: flex;
            gap: 10px;
            align-items: center;

            & p {
                margin: 0;
            }
            & .info-group {
                min-width: 400px;
                display: flex;
                gap: 10px;
            }
        }

        .imagem img {
            width: 40px;
            border-radius: 100%;
        }

        .text {
            padding-right: 20px;
            & .name {
                font-weight: 600;
            }
        }

        .text .time {
            /* text-align: right; */
            font-size: 12px;
        }

        .text p {
            margin: 0px;
        }
    }

    .body {
        .body-content {
            border-top: none !important;
            border: 1px solid #ccc;
            padding: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
`;
