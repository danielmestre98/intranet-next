import ContentLoader from "react-content-loader";

const RestrictedAreaLoad = (props) => (
    <ContentLoader
        speed={1}
        width={960}
        height={200}
        viewBox="0 0 960 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#cccccc"
        {...props}>
        <rect x="7" y="1" rx="3" ry="3" width="945" height="39" />
        <rect x="6" y="49" rx="3" ry="3" width="945" height="39" />
        <rect x="7" y="96" rx="3" ry="3" width="945" height="39" />
        <rect x="7" y="143" rx="3" ry="3" width="945" height="39" />
    </ContentLoader>
);

export default RestrictedAreaLoad;
