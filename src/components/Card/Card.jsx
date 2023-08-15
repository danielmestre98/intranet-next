"use client";

import { Card } from "react-bootstrap";
import { CardHeader, CardOuter } from "./styles";

const CardIntranet = ({ children, cardTitle, style, cardBodyStyle, cardHeaderStyle }) => {
    return (
        <CardOuter style={style}>
            {cardTitle ? <CardHeader style={cardHeaderStyle}> {cardTitle}</CardHeader> : null}
            <Card.Body style={cardBodyStyle}>{children}</Card.Body>
        </CardOuter>
    );
};

export default CardIntranet;
