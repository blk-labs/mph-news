import axios from 'axios';
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        let post;
        if (ctx.pathname == '/story/[sid]') {
            let res = await axios.get(`post/${ctx.query.sid}`);
            post = res.data;
        }
        return { ...initialProps, post }
    }


    render() {
        return (
            <Html>
                {this.props.post ? (
                    <Head>
                        <meta property="og:url" content={`https://news.mypoliticalhub.com/story/${this.props.post.id}`} />
                        <meta property="og:type" content="website" />
                        {/* <meta property="fb:app_id" content="your fb app id" /> */}
                        <meta
                            property="og:title"
                            content={this.props.post.title}
                        />
                        <meta name="twitter:card" content="summary" />
                        <meta
                            property="og:description"
                            content={(this.props.post.subtitle || this.props.post.body).substring(0, 190) + "..."}
                        />
                        <meta property="og:image" content={this.props.post.postImage} />
                        <meta name="twitter:title" content={this.props.post.title} />
                        <meta name="twitter:description" content={(this.props.post.subtitle || this.props.post.body).substring(0, 190) + "..."} />
                    </Head>
                ) : (
                    <Head />
                )}
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument