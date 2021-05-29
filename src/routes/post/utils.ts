import marked from 'marked';
import highlightjs from 'highlight.js';

export const syntaxHighlight = () => {
    marked.setOptions({
        highlight: (code:string, lang:string) => {
            return highlightjs.highlightAuto(code, [lang]).value;
        },
    })
}

export const markdownStyle = () => {
    const r = new marked.Renderer()
        r.heading = (text:string, level:number) => {
            return (
                `<h${level} class="h${level}"">${text}</h${level}>`
            )
        }
        r.table = (header: string, body: string) => { 
            return (
                `<table class="table" border="1" width="100%">
                    ${header}
                    ${body}
                </table>`
            )
        }
        r.list = (body: string, ordered: boolean, start: number) => {
            return (
                `
                <ul>
                    ${body}
                </ul>
                `
            )
        }
        r.image = (href: string | null, title: string | null, text: string) => {
            return (
                `
                <img src=${href} class="content-img" />
                `
            )
        }
        r.paragraph = (text: string) => {
            return (
                `
                <p class="p">${text}</p>
                `
            )
        }
    return r
}