import { FormControl, Navbar, NavDropdown } from "react-bootstrap";
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

export const SearchDiv = styled.div`
    width: 96.5%;
    height: 100%;
    position: absolute;
    background-color: #fff;
    left: 0;
    border-radius: 5px;
`;

export const SearchInput = styled(FormControl)`
    height: 100%;
    border-radius: 5px;
    border: none;
`;

export const SearchResults = styled.div`
    position: absolute;
    margin-bottom: -25px;
    bottom: 0;
    z-index: 99999;
    width: 100%;
    top: 100%;

    svg {
        background-color: #fff;
        box-shadow: 1px 1px 15px #ccc;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .results {
        box-shadow: 1px 1px 15px #ccc;
        overflow: auto;
        max-height: 500px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
        min-height: 80px;
        padding: 10px;
        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        &::-webkit-scrollbar-button {
            width: 0px;
            height: 0px;
        }

        &::-webkit-scrollbar-thumb {
            background: #034ea2;
            border: 0px none #ffffff;
            border-radius: 50px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #133654;
        }

        &::-webkit-scrollbar-thumb:active {
            background: #133654;
        }

        &::-webkit-scrollbar-track {
            background: #9c9c9c;
            border: 0px none #ffffff;
            border-radius: 50px;
        }

        &::-webkit-scrollbar-track:hover {
            background: #ccc;
        }

        &::-webkit-scrollbar-track:active {
            background: #aaa;
        }

        &::-webkit-scrollbar-corner {
            background: transparent;
        }
        &.no-results {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            color: #6b6b6b;
        }

        p {
            margin: 0;
        }

        .link-name {
            font-size: 19px;
        }
        .link-text {
            color: #7a7a7a;
            font-size: 15px;
        }
        .link-url {
            color: green;
            font-size: 13px;
        }
    }
`;

export const NavSearch = styled.div`
    margin: 0;
    text-align: center;
    display: block;
    text-decoration: none;
    color: black;
    cursor: pointer;
    line-height: 35px;
    font-size: 16px;
    padding-inline: 15px;

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
