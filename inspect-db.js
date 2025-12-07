const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function inspect() {
    try {
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
            body: JSON.stringify({ page_size: 1 }),
        });

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            console.log("Page Properties:", JSON.stringify(data.results[0].properties, null, 2));
        } else {
            console.log("Database is empty or error:", JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error(e);
    }
}

inspect();
