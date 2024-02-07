import React from "react";
import ContentLoader from "react-content-loader";

const SearchLoad = (props) => (
    <ContentLoader
        speed={1}
        width={1238}
        height={70}
        viewBox="0 0 1238 70"
        backgroundColor="#f3f3f3"
        foregroundColor="#cccccc"
        {...props}>
        <rect x="3" y="14" rx="3" ry="3" width="200" height="10" />
        <rect x="4" y="33" rx="3" ry="3" width="500" height="9" />
        <rect x="4" y="50" rx="3" ry="3" width="250" height="8" />
    </ContentLoader>
);

export default SearchLoad;
