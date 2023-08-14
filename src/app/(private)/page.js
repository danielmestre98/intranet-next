"use client";

import LeftColumn from "@/components/Home/LeftColumn";
import RightColumn from "@/components/Home/RightColumn";
import { PagesHome } from "./styles";

export default function Home() {
    return (
        <PagesHome>
            <LeftColumn></LeftColumn>
            <RightColumn></RightColumn>
        </PagesHome>
    );
}
