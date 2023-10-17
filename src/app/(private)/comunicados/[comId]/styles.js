import { styled } from "styled-components";

export const ComunicadosItem = styled.div`
    .header {
        padding: 10px 15px;
        background-color: rgb(216, 216, 216);
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px;
        border-bottom-left-radius: 0px !important; /* Adjust the value to control the curve of the bottom-left corner */
        border-bottom-right-radius: 0px !important;

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
        border-top: none !important;
        border: 1px solid #ccc;
        padding: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;
