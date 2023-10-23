import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
    <ContentLoader
        speed={1}
        width={930}
        height={400}
        viewBox="0 0 930 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#cccccc"
        {...props}>
        <rect x="11" y="3" rx="3" ry="3" width="990" height="32" />
        <rect x="10" y="39" rx="3" ry="3" width="990" height="32" />
        <rect x="10" y="75" rx="3" ry="3" width="990" height="32" />
        <rect x="10" y="111" rx="3" ry="3" width="990" height="32" />
        <rect x="10" y="147" rx="3" ry="3" width="990" height="32" />
        <rect x="11" y="183" rx="3" ry="3" width="990" height="32" />
        <rect x="10" y="219" rx="3" ry="3" width="990" height="32" />
        <rect x="10" y="255" rx="3" ry="3" width="990" height="32" />
        <rect x="10" y="291" rx="3" ry="3" width="990" height="32" />
        <rect x="10" y="327" rx="3" ry="3" width="990" height="32" />
    </ContentLoader>
);

export default MyLoader;
