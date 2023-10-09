import { styled } from "styled-components";

export const UserDataDisplay = styled.div`
    display: flex;

    .user-image {
        max-width: 200px;
        margin-right: 25px;

        img {
            border-radius: 100%;
            width: 200px;
        }
    }

    .data-form {
        width: 99%;
    }

    .row > * {
        padding-left: 0px;
    }
`;

export const ButtonsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;
