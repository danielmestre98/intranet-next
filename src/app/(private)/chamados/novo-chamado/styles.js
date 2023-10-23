import { styled } from "styled-components";

export const FilesDiv = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .file {
        display: flex;
        align-items: center;
        border-radius: 4px;
        gap: 10px;
        background-color: #eee;
        overflow: hidden;

        .file-name {
            padding: 5px 10px;
            padding-right: 0;
        }

        .remove {
            padding: 5px 10px;

            &:hover {
                cursor: pointer;
                background-color: #ccc;
            }
        }
    }
`;
