import { Table } from "react-bootstrap";
import { styled } from "styled-components";

export const ButtonsRow = styled.div`
    display: flex;
    gap: 10px;
`;

export const TableChamados = styled(Table)`
    border-top: 1px SOLID #ccc;
    margin-top: 15px;
    tbody {
        tr {
            cursor: pointer;
        }
        .status-1 {
            // aguardando delegação
            color: #f00;

            &:hover {
                background-color: #eee;
            }
        }

        .status-2 {
            // aguardando atendimento
            background-color: #bdd7ee;

            &:hover {
                background-color: #8ec3f1;
            }
        }
        .status-3 {
            // em andamento
            background-color: #c6efce;

            &:hover {
                background-color: #a1f1b1;
            }
        }
        .status-4 {
            // pausado
            background-color: #a5a5a5;

            &:hover {
                background-color: #858585;
            }
        }
        .status-7 {
            // aguardando retorno do usuario
            background-color: #ffc7ce;

            &:hover {
                background-color: #ffb1ba;
            }
        }
        .status-8 {
            // em testes
            background-color: #ffeb9c;

            &:hover {
                background-color: #fde378;
            }
        }
        .status-9 {
            // atendimento agendado
            background-color: #8ea9db;

            &:hover {
                background-color: #789ada;
            }
        }
        .status-10 {
            // finalizado

            &:hover {
                background-color: #eee;
            }
        }
        .status-11 {
            // pendente terceiro
            background-color: #ffcc99;

            &:hover {
                background-color: #ffbc79;
            }
        }
        .status-12 {
            // aguardando aprovação
            background-color: #dd6ce6;

            &:hover {
                background-color: #db49e6;
            }
        }
    }
`;
