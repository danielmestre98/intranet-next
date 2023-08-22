"use client";

import React from "react";

import Link from "next/link";
import { useState } from "react";
import { ListLinks, ListItemStyles, ListItemDropdownStyles, ListItemDropdownLinkStyles } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const List = ({ children }) => <ListLinks>{children}</ListLinks>;

const ListItem = ({ children, href, extraText, style, clickableRow }) => (
    <ListItemStyles style={style}>
        <Link
            style={clickableRow ? { textDecoration: "none", color: "black", display: "block" } : {}}
            target="_blank"
            href={href}>
            {children}
        </Link>
        {extraText}
    </ListItemStyles>
);

const ListItemDropdown = ({ children, buttonName, singleChild }) => {
    const [isOpen, setIsOpen] = useState(false);
    const childrenCount = React.Children.count(children);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <ListItemDropdownStyles className={`${isOpen ? "open" : ""}`}>
            <div className="toggle-div" onClick={toggleDropdown}>
                <span>{buttonName}</span>
                <span>
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                </span>
            </div>
            <div
                style={
                    isOpen
                        ? { maxHeight: `${singleChild ? "250" : 39 * childrenCount + 1 * childrenCount + 1}px` }
                        : { maxHeight: "0" }
                }
                className="dropdown-content">
                {children}
            </div>
        </ListItemDropdownStyles>
    );
};

const ListItemDropdownLink = ({ children, href, toBlank, red }) => {
    return (
        <ListItemDropdownLinkStyles>
            <Link className={red ? "red" : ""} target={toBlank ? "_blank" : ""} href={href}>
                {children}
            </Link>
        </ListItemDropdownLinkStyles>
    );
};

export { List, ListItem, ListItemDropdown, ListItemDropdownLink };
