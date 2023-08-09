import { Navbar, NavDropdown } from "react-bootstrap";
import { styled } from "styled-components";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";

export const NavbarIntranet = styled(Navbar)`
    width: 100%;
    display: block !important;
    position: relative;
    background-color: #eee;
    padding: 0 !important;
    transition: 0.3s;
    border: solid;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 5px;
`;

export const NavItem = styled(Nav.Item)`
    margin: 0;
    text-align: center;
    display: block;
    text-decoration: none;
    color: black;
    cursor: pointer;
    line-height: 35px;
    font-size: 16px;
    flex-grow: 1;

    &:hover {
        transition: 0.3s;
        background-color: #cccccc;
        cursor: pointer;
    }
`;

export const NavDropdownHeader = styled(NavDropdown)`
    flex-grow: 1;
    text-align: center;
    .dropdown-toggle {
        color: black;
        line-height: 35px;
        padding: 0 !important;
    }
    .dropdown-toggle::after {
        content: none;
    }
    &:hover {
        transition: 0.3s;
        background-color: #cccccc;
        cursor: pointer;
    }

    &:hover > .dropdown-menu {
        margin-top: -0.5px;
        display: block;
    }
`;

export const RouterLink = styled(Link)`
    display: block;
    color: #000;
    text-decoration: none;
`;

export const RouterLinkDropdown = styled(Link)`
    display: block;
    width: 100%;
    padding: var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);
    clear: both;
    font-weight: 400;
    color: var(--bs-dropdown-link-color);
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    border-radius: var(--bs-dropdown-item-border-radius, 0);

    &:hover {
        background-color: #f3f3f3;
    }
    &:active {
        color: #fff;
        background-color: var(--primary-color);
    }
`;
