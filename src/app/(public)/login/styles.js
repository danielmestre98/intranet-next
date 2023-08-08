import { Card } from "react-bootstrap";
import { styled } from "styled-components";

export const LoginCardOuter = styled.div`
    text-align: center;
    margin-top: 200px;
`;

export const LoginCardInner = styled.div`
    position: absolute;
    left: 0;
    justify-content: center;
    display: flex;
    width: 100%;
`;

export const LoginCard = styled(Card)`
    width: 350px;
    box-shadow: 0px 0px 5px #ccc;
`;

export const LoginCardHeader = styled.div`
    padding-top: 15px;
`;
