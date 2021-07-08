import marked from 'marked';
import highlightjs from 'highlight.js';
import openGraphScraper, {
	OpenGraphImage,
	OpenGraphProperties,
} from 'open-graph-scraper';

export const syntaxHighlight = () => {
	marked.setOptions({
		highlight: (code: string, lang: string) => {
			return highlightjs.highlightAuto(code, [lang]).value;
		}
	});
};

export const markdownStyle = () => {
	const r = new marked.Renderer();
	r.heading = (text: string, level: number) => {
		return `<h${level} class="h${level}"">${text}</h${level}>`;
	};
	r.table = (header: string, body: string) => {
		return `<table class="table" border="1" width="100%">
                    ${header}
                    ${body}
                </table>`;
	};
	r.list = (body: string, ordered: boolean, start: number) => {
		return `
                <ul>
                    ${body}
                </ul>
                `;
	};
	r.image = (href: string | null, title: string | null, text: string) => {
		return `
                <img src=${href} class="content-img" />
                `;
	};
	r.paragraph = (text: string) => {
		return `
                <p class="p">${text}</p>
                `;
	};
	return r;
};

export type OgpData = OpenGraphProperties & {
	ogImage?: OpenGraphImage | OpenGraphImage[] | undefined;
};

export const getOgp = async (floatingUrls: string[]): Promise<OgpData[]> => {
	const ogpDatas: OgpData[] = [];
	if (floatingUrls.length === 0) return ogpDatas;
	await Promise.all(
		floatingUrls.map(async (url) => {
		const options = { url, onlyGetOpenGraphInfo: true };
		return openGraphScraper(options)
			.then((data) => {
			if (!data.result.success) {
				return;
			}
			ogpDatas.push(data.result);
			})
		})
	);
	return ogpDatas;
};

export const getBetabetaLink = (md: string): string[] => {
	const reg = /(?<!\()https?:\/\/[-_.!~*\\'()a-zA-Z0-9;\\/?:\\@&=+\\$,%#]+/g;
	const res = md.match(reg)
	return res ?? [];
};

export const getDomainFromUrl = (link: string | undefined): string | undefined => {
	if (!link) return undefined;
	let res;
	let match;
	match = link.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im);
	if (match) {
	  res = match[1];
	  match = res.match(/^[^.]+\.(.+\..+)$/);
	  if (match) {
		res = match[1];
	  }
	}
	return res;
};
  
