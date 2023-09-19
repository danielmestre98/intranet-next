import { styled } from "styled-components";

export const GridItems = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 175px); /* Three columns, each 200px wide */
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
