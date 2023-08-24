"use client";

import RestrictedAreaRoute from "@/components/Routing/RestrictedAreaRoute";

const RestrictedModulesLayout = ({ children }) => {
    return <RestrictedAreaRoute>{children}</RestrictedAreaRoute>;
};

export default RestrictedModulesLayout;
