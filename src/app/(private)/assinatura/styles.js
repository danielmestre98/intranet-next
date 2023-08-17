import Link from "next/link";
import { styled } from "styled-components";

export const IconContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const Icon = styled.div`
    text-align: center;

    img {
        width: 50px;
    }
`;

export const LinkFile = styled(Link)`
    text-decoration: none;
    color: #000;

    &:hover {
        text-decoration: underline;
    }
`;
