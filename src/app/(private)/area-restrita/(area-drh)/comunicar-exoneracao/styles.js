import { styled } from "styled-components";
import Select from "react-select";

export const ButtonsDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const SelectValidation = styled(Select)`
    &.is-invalid {
        border-radius: 5px;
        border: 1px solid red;
    }
`;
