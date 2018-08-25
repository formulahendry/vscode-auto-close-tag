const TAG_RE = /<(\/?[a-zA-Z][a-zA-Z0-9:_.-]*)(?![\s\S]*<\/?[a-zA-Z])/;

// we could also reverse the string and use /([a-zA-Z0-9:_.-]*[a-zA-Z]\/?)</; https://repl.it/@caub/regex-start-vs-end

export default function getCloseTag(str: string, excludedTags: string[]): string {

    const s = str[str.length - 1] === '/' && str[str.length - 2] === '<' ? str.slice(0, -2) : str[str.length - 1] === '<' ? str.slice(0, -1) : str;

    let m = s.match(TAG_RE);
    // while we catch a closing tag, we jump directly to the matching opening tag
    while (m && m[1][0] === '/') {
        const s2 = s.slice(0, m.index);
        const m2 = s2.match(RegExp(`<${m[1].slice(1)}.*$`, 'm'));
        if (!m2) return '';
        m = s.slice(0, m2.index).match(TAG_RE);
    }

    if (!m) return null;

    return (str[str.length - 1] === '/' && str[str.length - 2] === '<' ? m[1] : str[str.length - 1] === '<' ? '/' + m[1] : '</' + m[1]) + '>';
}
