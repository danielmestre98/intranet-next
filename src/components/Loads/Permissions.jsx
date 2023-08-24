import React from "react";
import ContentLoader from "react-content-loader";

const PermissionsLoad = (props) => (
    <ContentLoader
        speed={1}
        width={461}
        height={180}
        viewBox="0 0 461 180"
        backgroundColor="#f3f3f3"
        foregroundColor="#cccccc"
        {...props}>
        <rect x="10" y="3" rx="3" ry="3" width="410" height="40" />
        <rect x="10" y="48" rx="3" ry="3" width="410" height="40" />
        <rect x="10" y="93" rx="3" ry="3" width="410" height="40" />
        <rect x="10" y="138" rx="3" ry="3" width="410" height="40" />
    </ContentLoader>
);

export default PermissionsLoad;
