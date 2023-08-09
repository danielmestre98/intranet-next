import { Card } from "react-bootstrap";
import { CardHeader, CardOuter } from "./styles";

const CardIntranet = ({ children, cardTitle, style, cardBodyStyle, cardHeaderStyle, className }) => {
    return (
        <CardOuter style={style} className={className}>
            {cardTitle ? (
                <CardHeader style={cardHeaderStyle} dangerouslySetInnerHTML={{ __html: cardTitle }}></CardHeader>
            ) : null}
            <Card.Body style={cardBodyStyle}>{children}</Card.Body>
        </CardOuter>
    );
};

export default CardIntranet;
