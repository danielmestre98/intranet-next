import { Card } from "react-bootstrap";
import { styled } from "styled-components";

export const CardHeader = styled(Card.Header)`
    background-color: var(--primary-color);
    color: #fff;
    font-weight: bold;
    padding: 12px 20px;
`;

export const CardOuter = styled(Card)`
    box-shadow: 0px 1px 5px #ccc;
`;
