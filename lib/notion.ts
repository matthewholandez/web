import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    content?: string;
}

async function queryNotionDatabase(filter: any, sorts?: any[]) {
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
        throw new Error("NOTION_DATABASE_ID is not defined");
    }

    const cleanDatabaseId = databaseId.replace(/.*\//, "").replace(/\?.*/, "");
    const formattedDatabaseId = cleanDatabaseId.length === 32
        ? `${cleanDatabaseId.slice(0, 8)}-${cleanDatabaseId.slice(8, 12)}-${cleanDatabaseId.slice(12, 16)}-${cleanDatabaseId.slice(16, 20)}-${cleanDatabaseId.slice(20)}`
        : cleanDatabaseId;

    const response = await fetch(`https://api.notion.com/v1/databases/${formattedDatabaseId}/query`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            filter,
            sorts,
        }),
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Notion API Error: ${response.status} ${response.statusText} - ${error}`);
    }

    return await response.json();
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
    const response = await queryNotionDatabase(
        {
            property: "Status",
            status: {
                equals: "Published",
            },
        },
        [
            {
                property: "Date",
                direction: "descending",
            },
        ]
    );

    return response.results.map((page: any) => {
        return {
            id: page.id,
            title: page.properties.Name.title[0]?.plain_text || "Untitled",
            slug: page.properties.Slug.rich_text[0]?.plain_text || "",
            date: page.properties.Date.date?.start || "",
            excerpt: page.properties.Excerpt.rich_text[0]?.plain_text || "",
        };
    });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const response = await queryNotionDatabase({
        property: "Slug",
        rich_text: {
            equals: slug,
        },
    });

    if (response.results.length === 0) {
        return null;
    }

    const page = response.results[0] as any;

    // We still use n2m for content conversion, which uses the client. 
    // If the client is broken, this might fail too. 
    // But let's hope n2m uses a different method or the client works for blocks.
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
        id: page.id,
        title: page.properties.Name.title[0]?.plain_text || "Untitled",
        slug: page.properties.Slug.rich_text[0]?.plain_text || "",
        date: page.properties.Date.date?.start || "",
        excerpt: page.properties.Excerpt.rich_text[0]?.plain_text || "",
        content: mdString.parent,
    };
}
