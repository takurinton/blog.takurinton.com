import Parser from 'rss-parser';
const parser = new Parser();

export type jsonType = {
    [key: string]: {
        title: string;
        url: string;
        date: string;
    }[];
};

// 外部サービスに記事 ZennZenn 書いてない
// Qiita 消したの後悔して Qiita
const rssLinks = {
    zenn: 'https://zenn.dev/takurinton/feed',
};

const parseRss = async () => {
    let json: jsonType = {};
    for (const [media, link] of Object.entries(rssLinks)) {
        const feed = await parser.parseURL(link);
        const items = feed.items.map((i) => {
            return {
                title: i.title,
                url: i.link,
                date: i.pubDate
            }
                
        });
        
        json[media] = items;
    };
    return json;
};

export const get = async () => {
    return {
        body: await parseRss()
    };
};