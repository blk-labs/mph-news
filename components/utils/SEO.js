import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

function SEO({ description, lang, meta, image: metaImage, title, pathname }) {
  const [loaded, setLoaded] = React.useState(false);
  
  const metaDescription = description || ""
  const image =
    metaImage && metaImage.src
      ? `https://news.mypoliticalhub.com/${metaImage.src}`
      : null
  const canonical = pathname ? `https://news.mypoliticalhub.com/${pathname}` : null

  React.useEffect(() => {
    if (loaded) return;
    if (description) {
      setLoaded(true)
    }
    let meta = [
      {
        name: `description`,
        content: metaDescription,
      },
      {
        name: "keywords",
        content: [],
      },
      {
        property: `og:title`,
        content: title,
      },
      {
        property: `og:description`,
        content: metaDescription,
      },
      {
        property: `og:type`,
        content: `website`,
      },
      {
        name: `twitter:creator`,
        content: "BLK",
      },
      {
        name: `twitter:title`,
        content: title,
      },
      {
        name: `twitter:description`,
        content: metaDescription,
      },
    ]
      .concat(
        metaImage
          ? [
            {
              property: "og:image",
              content: image,
            },
            {
              property: "og:image:width",
              content: metaImage.width,
            },
            {
              property: "og:image:height",
              content: metaImage.height,
            },
            {
              name: "twitter:card",
              content: "summary_large_image",
            },
          ]
          : [
            {
              name: "twitter:card",
              content: "summary",
            },
          ]
      )
      .concat(meta)

    console.log(meta);

    let headNodes = document.head.childNodes;
    for (let i = 0; i < headNodes.length; i++) {
      let node = headNodes[i];
      if (node.attributes['0'])
        switch (node.attributes['0'].nodeValue) {
          case 'description':
          case 'keyword':
          case 'og:title':
          case 'og:description':
          case 'og:type':
          case 'twiter:creator':
          case 'twitter:title':
          case 'twitter:description':
            document.head.removeChild(node)
            break;
        }
    }

    meta.forEach((e) => {
      if (e) {
        let el = document.createElement("meta");
        if (e.name) el.setAttribute("name", e.name);
        if (e.property) el.setAttribute("property", e.property)
        el.setAttribute("content", e.content);
        document.head.prepend(el);
      }
    })
  }, [description])

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}

      title={title}
      titleTemplate={`%s | My Political Hub`}
      link={
        canonical
          ? [
            {
              rel: "canonical",
              href: canonical,
            },
          ]
          : []
      }

    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  pathname: PropTypes.string,
}

export default SEO