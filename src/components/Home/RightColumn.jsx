import CardIntranet from "../Card/Card";
import Agenda from "./Agenda/Agenda";
import Note from "./Note/Note";
import { HomeDiv } from "./styles";

const RightColumn = () => {
    return (
        <HomeDiv>
            <CardIntranet cardBodyStyle={{ padding: "0px" }} style={{ height: "400px" }}>
                <Agenda />
            </CardIntranet>
            <CardIntranet cardTitle="Recados Importantes" style={{ height: "674.5px" }}>
                <Note />
            </CardIntranet>
        </HomeDiv>
    );
};

export default RightColumn;
