import {
    faFacebookSquare,
    faFlickr,
    faInstagramSquare,
    faTwitterSquare,
    faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import {
    Address,
    AddressLink,
    FooterContainer,
    FooterSecondColor,
    MarkerIcon,
    SocialLinkItem,
    SocialLinks,
} from "./styles";

const Footer = () => {
    return (
        <FooterContainer>
            <Container>
                <Address>
                    <div>
                        <MarkerIcon size="2x" icon={faMapMarkerAlt} />
                        <AddressLink target="_blank" href="https://goo.gl/maps/Pq76Bx95P2Qdc2xu7">
                            <p>Secretaria de Desenvolvimento Social do Estado de São Paulo</p>
                            <p>Rua Boa Vista, 170 - CEP 01014-000 - Centro - São Paulo - SP - Tel: +55 11 2763-8000</p>
                        </AddressLink>
                    </div>
                    <SocialLinks>
                        <SocialLinkItem target="_blank" href="https://www.facebook.com/desenvolvimentosocialsp">
                            <FontAwesomeIcon icon={faFacebookSquare} />
                        </SocialLinkItem>
                        <SocialLinkItem target="_blank" href="https://twitter.com/Social_SP">
                            <FontAwesomeIcon icon={faTwitterSquare} />
                        </SocialLinkItem>
                        <SocialLinkItem target="_blank" href="https://www.youtube.com/user/socialsaopaulo">
                            <FontAwesomeIcon icon={faYoutubeSquare} />
                        </SocialLinkItem>
                        <SocialLinkItem target="_blank" href="https://www.flickr.com/photos/social_sp">
                            <FontAwesomeIcon icon={faFlickr} />
                        </SocialLinkItem>
                        <SocialLinkItem
                            target="_blank"
                            href="https://www.instagram.com/desenvolvimentosocialsp/?modal=true">
                            <FontAwesomeIcon icon={faInstagramSquare} />
                        </SocialLinkItem>
                    </SocialLinks>
                </Address>
            </Container>
            <FooterSecondColor />
        </FooterContainer>
    );
};

export default Footer;
