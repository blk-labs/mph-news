import axios from "axios";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    let post;
    if (ctx.pathname == "/story/[sid]") {
      let res = await axios.get(`post/${ctx.query.sid}`);
      post = res.data;
    }
    return { ...initialProps, post };
  }

  render() {
    return (
      <Html>
        {/* {this.props.post ? (
          <Head>
            <meta
              property='og:url'
              content={`https://news.mypoliticalhub.com/story/${this.props.post.id}`}
            />
            <meta property='og:type' content='website' />
            {/* <meta property="fb:app_id" content="your fb app id" /> 
            <meta property='og:title' content={this.props.post.title} />
            <meta name='twitter:card' content='summary' />
            <meta
              property='og:description'
              content={
                (this.props.post.subtitle || this.props.post.body).substring(
                  0,
                  190
                ) + '...'
              }
            />
            <meta property='og:image' content={this.props.post.postImage} />
            <meta name='twitter:title' content={this.props.post.title} />
            <meta
              name='twitter:description'
              content={
                (this.props.post.subtitle || this.props.post.body).substring(
                  0,
                  190
                ) + '...'
              }
            />
            <script
              async
              src='https://www.googletagmanager.com/gtag/js?id=G-H1RJ9WJGML'
            ></script>
          </Head>
        ) : ( */}
        <Head>
          <meta name="application-name" content="MPH News" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="MPH News" />
          <meta name="description" content="My Political Hub News. Your number 1 stop for Nigerian political news" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#69409e" />

          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/touch-icon-ipad.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/touch-icon-ipad-retina.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />

          <meta name="twitter:card" content="My Political Hub News. The number 1 stop for all Nigerian politics news" />
          <meta name="twitter:url" content="https://news.mypoliticalhub.com" />
          <meta name="twitter:title" content="MPH News" />
          <meta
            name="twitter:description"
            content="Nigerian political news at your fingertips"
          />
          <meta
            name="twitter:image"
            content="https://news.mypoliticalhub.com/icons/icon-192x192.png"
          />
          <meta name="twitter:creator" content="@BLK_labs" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="MPH News" />
          <meta property="og:description" content="Nigerian political news at your fingertips" />
          <meta property="og:site_name" content="MPH News" />
          <meta property="og:url" content="https://news.mypoloiticalhub.com" />
          <meta
            property="og:image"
            content="https://news.mypoliticalhub.com/icons/apple-touch-icon.png"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-H1RJ9WJGML"
          ></script>
        </Head>
        <body>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=847932856093921&ev=PageView&noscript=1"
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
