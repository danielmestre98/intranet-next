import React from "react";
import ContentLoader from "react-content-loader";

const RamaisLoad = (props) => (
    <ContentLoader
        speed={1}
        width={989}
        height={1000}
        viewBox="0 0 989 1000"
        backgroundColor="#f3f3f3"
        foregroundColor="#cccccc"
        {...props}>
        <rect x="3" y="16" rx="3" ry="3" width="454" height="190" />
        <rect x="3" y="220" rx="3" ry="3" width="454" height="190" />
        <rect x="3" y="425" rx="3" ry="3" width="454" height="190" />
        <rect x="3" y="632" rx="3" ry="3" width="454" height="190" />
        <rect x="495" y="16" rx="3" ry="3" width="454" height="190" />
        <rect x="495" y="220" rx="3" ry="3" width="454" height="190" />
        <rect x="495" y="425" rx="3" ry="3" width="454" height="190" />
        <rect x="495" y="632" rx="3" ry="3" width="454" height="190" />
    </ContentLoader>
);

export default RamaisLoad;
