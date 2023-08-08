'use client'

import { HeaderIntranet, ContainerLogin, HeaderText, IntranetText, DesenvSocialText, SecretariaLogo } from "./styles.js";

const Header = () => {
    return (
        <>
            <HeaderIntranet>
                <ContainerLogin>
                    <HeaderText>
                        <IntranetText />
                        <DesenvSocialText />
                    </HeaderText>
                    <SecretariaLogo src="/img/logos/gov-sp-horizontal-b.png" alt="..." />
                </ContainerLogin>
            </HeaderIntranet>
        </>
    );
};

export default Header;
