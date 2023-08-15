import { styled } from "styled-components";

export const ImgBolo = styled.img`
    width: 25px;
    margin-bottom: 5px;
`;

export const RowBirthday = styled.div`
    align-items: center;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    border-radius: 10px;
    padding: 5px;
    justify-content: space-between;
    display: flex;

    &:hover {
        background-color: #97afff;
        cursor: default;
    }
`;

export const NameBirthday = styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
`;

export const ImgBirthday = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
`;

export const DateBirthday = styled.div`
    font-size: 13px;
`;
