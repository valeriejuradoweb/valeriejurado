import Head from 'next/head';

const HomePage = () => {
    return (
        <>
            <Head>
            <title>Test title</title>
        <link
          rel="preconnect"
          href="https://images.prismic.io"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.prismic.io" />
        <link
          rel="preconnect"
          href="https://prismic-io.s3.amazonaws.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://prismic-io.s3.amazonaws.com" />
                {/* You can add more head elements here */}
            </Head>
            <main>
                <h1>Welcome to My Awesome App</h1>
                <p>This is the homepage.</p>
            </main>
        </>
    );
};

export default HomePage;