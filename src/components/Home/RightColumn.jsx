import CardIntranet from "../Card/Card";
import Agenda from "./Agenda/Agenda";
import { HomeDiv } from "./styles";

const RightColumn = () => {
    return (
        <HomeDiv>
            <CardIntranet cardBodyStyle={{ padding: "0px" }} style={{ height: "400px" }}>
                <Agenda />
            </CardIntranet>
        </HomeDiv>
    );
};

export default RightColumn;
