import { styled } from "styled-components";

export const ListLinks = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const ListItemStyles = styled.li`
    margin-top: -1px;
    padding: 6px;
    border: 1px rgb(223, 223, 223) solid;
    font-size: 18px;

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    &:nth-child(even) {
        background: #fff;
    }

    &:nth-child(odd) {
        background: #eee;
    }
`;

export const ListItemDropdownStyles = styled.li`
    overflow: hidden;
    border: 1px rgb(223, 223, 223) solid;
    font-size: 18px;
    width: 100%;
    position: relative;
    display: inline-block;
    background-color: #eee;

    &:nth-child(even) {
        background: #fff;
    }

    &:nth-child(odd) {
        background: #eee;
    }

    &:nth-child(n + 2) {
        margin-top: -7px;
    }

    &:hover {
        background: #dadada;
    }

    &.open {
        background: #dadada;
    }

    .toggle-div {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        padding: 6px;
    }
    .dropdown-content {
        border-top: 1px solid #ccc;
        margin-bottom: -1px;
        background-color: #fff;
        max-height: 0;
        transition: max-height 0.3s ease-in-out;
        overflow: hidden;
    }

    .dropdown-content div {
        padding: 6px;
        border: 1px solid #ccc;
        padding-left: 25px;
        margin: -1px;
    }

    .dropdown-content > :last-child {
        margin-bottom: 0;
    }
`;

export const ListItemDropdownLinkStyles = styled.div`
    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    a.red {
        color: red;
    }
`;
