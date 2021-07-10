export const getRSS = () => {
    return fetch('https://api.takurinton.com/blog/v1/rss')
    .then(res => {
        return res.json()
        .then(json => {    
            // content.contents.slice は邪悪なので早くサーバサイドを書き換えなさい。
            const response = `<?xml version="1.0" encoding="UTF-8"?>
            <rss version='2.0'  xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
            <atom:link href="https://blog.takurinton.com/feed" rel="self" type="application/rss+xml" />
            <title>たくりんとん</title>
            <link>https://blog.takurinton.com</link>
            <description>たくりんとんのブログです</description>
            <language>en</language>
            <managingEditor>takurinton@takurinton.com (takurinton)</managingEditor>
            <webMaster>takurinton@takurinton.com (takurinton)</webMaster>
            <image>
                <url>https://blog.takurinton.com/me.jpeg</url>
                <title>たくりんとん</title>
                <link>https://blog.takurinton.com</link>
                <width>32</width>
                <height>32</height>
            </image>
            ${json.map((content => {
                  return `
                <item>
                <title>${content.title} | たくりんとんのブログ</title>
                <link>https://blog.takurinton.com/post/${content.id}</link>
                <description>${content.contents.slice(0,300)}</description>
                <guid>https://blog.takurinton.com/post/${content.id}</guid>
                </item>
                    `;
                }
              ))
              .join("")}
            </channel>
            </rss>
          `;
          return response;
        })
    })
}

export const get = async () => {
  const feed = await getRSS();
  return {
    body: feed,
    headers: {
      'cache-control': 's-maxage=86400, stale-while-revalidate', 
      'content-type': 'text/xml;charset=UTF-8'
    }
  };
}
