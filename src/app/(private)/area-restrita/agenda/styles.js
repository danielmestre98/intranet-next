import { Table } from "react-bootstrap";
import { styled } from "styled-components";

export const AgendaContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const DatepickerContainer = styled.div`
    width: 26%;
    height: 271px;

    .react-datepicker__day--outside-month {
        color: #ccc !important;
    }
`;

export const AgendaListContainer = styled.div`
    width: 71%;
`;

export const TableAgenda = styled(Table)`
    td {
        line-height: 19px;
    }
    td.clickable {
        padding: 0;
        cursor: pointer;
    }
    td.clickable:hover {
        background-color: #9ec2eb;
    }
    .hora {
        width: 60px;
    }
    .passada {
        background-color: #ddd;
    }
    .agora {
        background-color: #034ea2;
        color: #fff;
    }
    tbody > tr > td {
        border: solid 1px #ccc;
        cursor: auto;
    }
    .flex-evento {
        display: flex;
        flex-wrap: wrap;
    }
    .evento-box {
        background-color: #f0c679;
        display: block;
        min-width: 130px;
        padding-inline: 5px;
        margin-right: 5px;
        line-height: 35px;
    }
    .evento-box:hover {
        background-color: #e7910f;
    }
`;
