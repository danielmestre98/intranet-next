"use client";

import NoPermission from "@/components/NoPermission/NoPermission";
import { useSelector } from "react-redux";

const DrhModulesLayout = ({ children }) => {
    const { currentUser } = useSelector((reducer) => reducer.userReducer);

    const CheckDrh = ({ children }) => {
        if (
            currentUser?.departamento === "20" ||
            currentUser?.departamento === 20 ||
            currentUser?.departamento === "19" ||
            currentUser?.departamento === 19
        ) {
            return children;
        } else return <NoPermission />;
    };

    return <CheckDrh>{children}</CheckDrh>;
};

export default DrhModulesLayout;
