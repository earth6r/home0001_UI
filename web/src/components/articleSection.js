import Figure from "./Figure";
import PortableText from "./portableText";

const ArticleSection = ({ mainImage, content }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex md:w-2/5 items-center">
        {mainImage ? (
          <div className="article-section-image">
            {mainImage.caption ? (
              <span className="article-image-caption">{mainImage.caption}</span>
            ) : null}
            <Figure node={mainImage} />
          </div>
        ) : null}
      </div>
      <div className="flex-1">
        <PortableText blocks={content} />
      </div>
    </div>
  );
};

export default ArticleSection;
