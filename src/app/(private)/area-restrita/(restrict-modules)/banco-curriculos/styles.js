import { styled } from "styled-components";
import { Table as TableB } from "react-bootstrap";

export const TableControls = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

export const PdfImage = styled.img`
    width: 40px;
`;

export const Table = styled(TableB)`
    tbody td {
        vertical-align: middle;
        cursor: pointer;
    }
`;

export const NoRegistryFound = styled.td`
    text-align: center;
    color: #ccc;
`;
