"use client";

import { Card } from "react-bootstrap";
import { CardHeader, CardOuter } from "./styles";

const CardIntranet = ({ children, cardTitle, style, cardBodyStyle, cardHeaderStyle, bigTitle }) => {
    return (
        <CardOuter style={style}>
            {cardTitle ? (
                <CardHeader className={bigTitle ? "display-4" : ""} style={cardHeaderStyle}>
                    <div>{cardTitle}</div>
                </CardHeader>
            ) : null}
            <Card.Body style={cardBodyStyle}>{children}</Card.Body>
        </CardOuter>
    );
};

export default CardIntranet;
