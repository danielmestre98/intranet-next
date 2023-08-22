"use client";

import ContentLoader from "react-content-loader";

const NoteLoad = (props) => (
    <ContentLoader
        speed={1}
        width={485}
        height={589}
        viewBox="0 0 485 589"
        backgroundColor="#f3f3f3"
        foregroundColor="#cccccc"
        {...props}>
        <rect x="12" y="8" rx="3" ry="3" width="300" height="10" />

        <rect x="11" y="29" rx="3" ry="3" width="410" height="10" />
        <rect x="11" y="41" rx="3" ry="3" width="350" height="10" />
        <rect x="11" y="53" rx="3" ry="3" width="410" height="10" />
        <rect x="11" y="65" rx="3" ry="3" width="410" height="10" />
        <rect x="11" y="77" rx="3" ry="3" width="250" height="10" />
        <rect x="11" y="110" rx="3" ry="3" width="410" height="10" />
        <rect x="11" y="123" rx="3" ry="3" width="410" height="10" />
        <rect x="11" y="136" rx="3" ry="3" width="410" height="10" />
        <rect x="11" y="149" rx="3" ry="3" width="350" height="10" />

        <rect x="11" y="182" rx="3" ry="3" width="410" height="10" />
        <rect x="11" y="194" rx="3" ry="3" width="350" height="10" />
        <rect x="11" y="206" rx="3" ry="3" width="410" height="10" />
        <rect x="11" y="218" rx="3" ry="3" width="410" height="10" />
        <rect x="11" y="230" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
);

export default NoteLoad;
