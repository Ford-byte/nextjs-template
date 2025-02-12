import Head from "next/head";

export default function Document() {
  return (
    <Head>
      <title>My Page Title</title>
      <meta name="description" content="This is a description of my page." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Preload CSS */}
      <link
        rel="preload"
        href="/styles.css"
        as="style"
        onLoad="this.onload=null;this.rel='stylesheet';"
      />
      <noscript>
        <link rel="stylesheet" href="/styles.css" />
      </noscript>
    </Head>
  );
}
