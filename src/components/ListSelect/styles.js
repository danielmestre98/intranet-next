import { ListGroup } from "react-bootstrap";
import { styled } from "styled-components";

export const ListSelectUl = styled(ListGroup)`
    .list-group-item {
        cursor: pointer;
    }

    .list-group-item:hover {
        background-color: #eee;
    }

    .list-group-item:active {
        background-color: #034ea2;
        color: #fff;
    }
`;
