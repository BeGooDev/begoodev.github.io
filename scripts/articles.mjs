// Turns the blog articles written in Markdown (content/articles/<slug>.md, with a front matter)
// into src/app/data/articles.generated.ts, read by the app. Runs before build and dev;
// `node scripts/articles.mjs --watch` regenerates on every change while ng serve runs.
import { existsSync, readdirSync, readFileSync, watch, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'content', 'articles');
const outFile = join(root, 'src', 'app', 'data', 'articles.generated.ts');

/** French typography: non-breaking space before « : ; ! ? » and inside « guillemets ». */
const typo = (text) =>
    text
        .replace(/ ([:;!?»])/g, ' $1')
        .replace(/« /g, '« ')
        .replace(/(\d) (min|ans?|minutes|semaines?)\b/g, '$1 $2');

const marked = new Marked({
    walkTokens(token) {
        if (token.type === 'heading' && token.depth === 1) {
            throw new Error(`titre de niveau 1 (« # ${token.text} ») : la page a déjà un h1, utiliser ## et plus`);
        }
        // Only plain text: link URLs and code are left untouched
        if (token.type === 'text' && !token.tokens) {
            token.text = typo(token.text);
        }
    },
});

/** Minimal front matter: one `key: value` per line, optional quotes. */
function parseFrontMatter(source) {
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) throw new Error('front matter --- … --- manquant en tête de fichier');
    const data = {};
    for (const line of match[1].split(/\r?\n/).filter((line) => line.trim())) {
        const [, key, value] = line.match(/^(\w+):\s*(.*)$/) ?? [];
        if (!key) throw new Error(`ligne de front matter invalide : « ${line} »`);
        data[key] = value.replace(/^(["'])(.*)\1$/, '$2');
    }
    return { data, body: match[2] };
}

function check(condition, message) {
    if (!condition) throw new Error(message);
}

function readArticle(file) {
    const slug = file.replace(/\.md$/, '');
    const { data, body } = parseFrontMatter(readFileSync(join(contentDir, file), 'utf8'));
    check(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug), 'nom de fichier : minuscules, chiffres et tirets uniquement');
    for (const key of ['title', 'metaTitle', 'description', 'category', 'date']) {
        check(data[key], `champ « ${key} » manquant`);
    }
    check(data.metaTitle.length >= 20 && data.metaTitle.length <= 65, `metaTitle : 20 à 65 caractères (${data.metaTitle.length})`);
    check(data.description.length >= 70 && data.description.length <= 160, `description : 70 à 160 caractères (${data.description.length})`);
    check(/^\d{4}-\d{2}-\d{2}$/.test(data.date) && !isNaN(Date.parse(data.date)), `date au format AAAA-MM-JJ (${data.date})`);
    check(['true', 'false', undefined].includes(data.draft), `draft : true ou false (${data.draft})`);

    const html = marked.parse(body);
    return {
        slug,
        title: typo(data.title),
        metaTitle: data.metaTitle,
        description: typo(data.description),
        category: data.category,
        date: data.date,
        ...(data.draft === 'true' && { draft: true }),
        html,
    };
}

function generate() {
    const files = existsSync(contentDir) ? readdirSync(contentDir).filter((file) => file.endsWith('.md') && file !== 'README.md').sort() : [];
    const articles = files
        .map((file) => {
            try {
                return readArticle(file);
            } catch (error) {
                throw new Error(`content/articles/${file} : ${error.message}`);
            }
        })
        // Most recent first
        .sort((a, b) => b.date.localeCompare(a.date));

    writeFileSync(
        outFile,
        `// Généré par scripts/articles.mjs à partir de content/articles/*.md : ne pas modifier à la main.\n` +
            `import type { Article } from './articles';\n\n` +
            `export const generatedArticles: Article[] = ${JSON.stringify(articles, null, 4)};\n`,
    );
    console.log(`✅ ${articles.length} articles générés depuis content/articles`);
}

generate();

if (process.argv.includes('--watch')) {
    let timer;
    watch(contentDir, () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            try {
                generate();
            } catch (error) {
                console.error(`❌ ${error.message}`);
            }
        }, 100);
    });
}
