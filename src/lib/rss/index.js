import { writeFileSync } from 'fs';
import Parser from 'rss-parser';
const parser = new Parser();

const rssFeed = {
	Zenn: {
		rss_url: 'https://zenn.dev/takurinton/feed'
	}
	// Qiita は記事全部消してもうたのでなし！
	// また機会があれば...
	// Qiita: {
	//     rss_url: 'https://qiita.com/nikaera/feed.atom',
	//     profile_url: 'https://qiita.com/nikaera',
	// }
};

const getRss = async () => {
	try {
		const feed = {};
		for (const [site, info] of Object.entries(rssFeed)) {
			const feed = await parser.parseURL(info.rss_url);

			const items = feed.items.map((i) => {
				return {
					title: i.title,
					url: i.link,
					date: i.pubDate
				};
			});

			// writeFileSync('../../routes/external/rss.json', JSON.stringify(feed));
		}
		console.log(feed);
	} catch (err) {
		console.error(err);
	}
};

getRss();
