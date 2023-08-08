import { Container } from "react-bootstrap";
import { styled } from "styled-components";

export const HeaderIntranet = styled.div`
    width: 100%;
    height: 100px;
    margin-bottom: 15px;
    background-color: #034ea2;
`;

export const ContainerLogin = styled(Container)`
    display: flex;
    justify-content: space-between;
`;

export const HeaderText = styled.div`
    line-height: 20px;
`;

export const IntranetText = styled.p`
    position: relative;
    padding-top: 35px;
    color: #cccccd;
    font-weight: 4000;
    font-size: 16px;
    line-height: 0;
    font-weight: bold;
    &::before {
        content: "Intranet";
    }
`;

export const DesenvSocialText = styled.p`
    color: #fff;
    font-size: 26px;
    font-weight: bold;
    &::before {
        content: "Secretaria de Desenvolvimento Social";
    }
`;

export const SecretariaLogo = styled.img`
    width: 200px;
    margin-top: 12px;
`;
