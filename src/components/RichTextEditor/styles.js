import { styled } from "styled-components";

export const EditorDiv = styled.div`
    .text-box {
        cursor: text;
        padding-left: 5px;
        border: 1px solid #ccc;
        min-height: 300px;
        max-height: 300px;
    }

    .toolbar-box {
        border: 1px solid #ccc;
    }

    .rdw-option-wrapper {
        border: 1px solid #ccc;
        height: 30px;
        width: 30px;
    }

    .rdw-link-modal {
        height: 250px;
    }

    .rdw-dropdown-wrapper {
        border: 1px solid #ccc;
    }

    .rdw-dropdown-selectedtext {
        text-decoration: none;
        color: black;
    }

    .rdw-dropdown-selectedtext:hover {
        text-decoration: none;
        color: black;
    }

    .rdw-colorpicker-modal {
        height: 300px;
        width: 300px;
    }

    .rdw-colorpicker-modal-options {
        overflow: hidden;
    }

    .card.retracted {
        max-height: 140px;
    }
`;
