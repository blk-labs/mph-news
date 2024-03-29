import axios from 'axios';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   let post;
  //   console.log("ctx: ", ctx.pathname);
  //   console.log("sid: ", ctx.query);
  //   let sid = ctx.query.sid;

  //   if(!sid) return { ...initialProps }

  //   if (ctx.pathname == '/story/[sid]') {
  //     let res = await axios.get(`post/${sid}`);
  //     post = res.data;
  //   }
  //   return { ...initialProps, post };
  // }

  render() {
    return (
      <Html>
        {this.props.post ? (
          <Head>
            <meta
              property='og:url'
              content={`https://news.mypoliticalhub.com/story/${this.props.post.id}`}
            />
            <meta property='og:type' content='website' />
            {/* <meta property="fb:app_id" content="your fb app id" /> */}
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
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Bebas+Neue&family=Cinzel:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
          </Head>
        ) : (
          <Head>
            <script
              async
              src='https://www.googletagmanager.com/gtag/js?id=G-H1RJ9WJGML'
            ></script>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Bebas+Neue&family=Cinzel:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
          </Head>
        )}
        <body>
          <noscript>
            <img
              height='1'
              width='1'
              style={{ display: 'none' }}
              src='https://www.facebook.com/tr?id=847932856093921&ev=PageView&noscript=1'
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
