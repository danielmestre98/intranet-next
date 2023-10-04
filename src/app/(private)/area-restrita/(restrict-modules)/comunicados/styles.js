import { Table } from "react-bootstrap";
import { styled } from "styled-components";

export const TableStyled = styled(Table)`
    tr.accordion-toggle {
        cursor: pointer;
    }
    tr.accordion-toggle td {
        vertical-align: middle;
    }

    td.expandable {
        padding: 0;

        div {
            padding: 15px;
            background-color: #eee;
        }
    }

    td .hiddenRow {
        display: none;
    }
`;
export const TableControls = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;
