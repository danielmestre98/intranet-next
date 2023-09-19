import { Card } from "react-bootstrap";
import { styled } from "styled-components";

export const GridButtons = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 200px); /* Three columns, each 200px wide */
    grid-gap: 20px 100px; /* Adjust gap as needed */
    justify-content: center;
    justify-items: center;
`;

export const Button = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    box-shadow: 0px 0px 5px #ccc;

    height: 187px;
    width: 227px;

    &:hover {
        cursor: pointer;
    }

    img {
        max-height: 119px;
    }

    p {
        font-weight: bold;
        margin: 0;
    }
`;

export const GridItems = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 175px); /* Three columns, each 200px wide */
    grid-gap: 20px 43.5px; /* Adjust gap as needed */
    justify-content: center;

    div {
        height: 146px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px 10px;
        text-align: center;
        cursor: pointer;
        p {
            font-weight: 500;
            margin: 0;
            margin-top: 5px;
            font-size: 15px;
        }

        &:hover {
            background-color: #eee;
        }
        &:active {
            background-color: #ccc;
        }
    }

    .fa-file-excel {
        color: #017a01;
    }
    .fa-file-pdf {
        color: #df3c3c;
    }
    .fa-file-powerpoint {
        color: #ff5700;
    }
    .fa-file-word {
        color: #3434be;
    }
`;

export const DivVideos = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 400px); /* Three columns, each 200px wide */
    grid-gap: 20px 100px; /* Adjust gap as needed */
    justify-content: center;

    div {
        text-align: center;
        font-size: 19px;
        font-weight: 500;
    }
`;
