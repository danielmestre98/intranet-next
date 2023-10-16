import React from "react";
import ContentLoader from "react-content-loader";

const ComunicadosLoad = (props) => (
    <ContentLoader
        speed={1}
        width={1000}
        height={500}
        viewBox="0 0 1000 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#cccccc"
        {...props}>
        <rect x="10" y="3" rx="3" ry="3" width="935" height="70" />
        <rect x="10" y="83" rx="3" ry="3" width="935" height="70" />
        <rect x="10" y="163" rx="3" ry="3" width="935" height="70" />
        <rect x="10" y="243" rx="3" ry="3" width="935" height="70" />
        <rect x="10" y="323" rx="3" ry="3" width="935" height="70" />
        <rect x="10" y="403" rx="3" ry="3" width="935" height="70" />
    </ContentLoader>
);

export default ComunicadosLoad;
