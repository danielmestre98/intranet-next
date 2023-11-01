import { Card } from "react-bootstrap";
import { styled } from "styled-components";

export const RamaisDiv = styled.div`
    display: flex;
    min-height: 200px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const RamalCard = styled(Card)`
    min-height: 190px;
    width: 468px;
    margin-bottom: 15px;
    box-shadow: 0px 0px 4px #ccc;
    padding: 20px;
    display: flex;
    flex-direction: row;

    .user-img img {
        width: 160px;
        height: 160px;
        border-radius: 100%;
        margin-right: 15px;
    }

    .infos {
        min-height: 150px;
        .nome {
            font-size: 19px;
            margin-bottom: 5px;
        }

        p {
            word-wrap: wrap;
            margin: 0;
        }

        .sub-infos {
            p {
                font-size: 13px;
                color: #858585;
                margin-bottom: 3px;
            }
        }
    }
`;
