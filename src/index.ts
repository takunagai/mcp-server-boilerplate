import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
	name: "mcp-server-boilerplate",
	version: "1.0.0",
});

/**
 * ツールの定義
 * nameとdescriptionを元に、実行するtoolが選択される
 * handlerはCallToolResult(非同期の場合はそのPromise)を返す
 * @param name - ツールの名前
 * @param description - ツールの説明
 * @param args - ツールの引数の定義
 * @param handler - ツールの実装
 */
server.tool(
	"double_number",
	"与えられた数値を2倍にする",
	{ num: z.number().describe("数値") },
	({ num }) => ({ content: [{ type: "text", text: (num * 2).toString() }] }),
);

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("mcp-server-boilerplate MCP Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
