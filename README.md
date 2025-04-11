# MCP Server Boilerplate

Model Context Protocol(MCP) サーバーのボイラープレートとなるシンプルな実装です。

## 概要

このプロジェクトは、Model Context Protocol (MCP) サーバーの基本的な実装です。このボイラープレートを使用することで、独自のMCPサーバーを素早く構築し、カスタムツールを実装できます。

[簡易な自作MCPサーバーをお試しで実装する方法 - Zenn](https://zenn.dev/smartround_dev/articles/02af1058e9f80f) の記事をベースに、実用的な補足や補助ツールを加えることで、MCPサーバーの構築と拡張方法をより分かりやすく示しています。

### v1 ブランチ

数値を2倍にする単純なツール。MCPサーバーの構築方法と、カスタムツールの実装方法を示す最小限のリファレンス実装です。

## 前提条件

- Node.js (v23.11.0以上)
- npm または yarn

### 対応MCPクライアント

- Claude Code
- VSCode
- Windsurf
- Cursor
- AWS Bedrock (未確認)

## インストール方法

```bash
# リポジトリのクローン
git clone [リポジトリURL]
cd mcp-server-boilerplate

# 依存パッケージのインストール
npm install

# ビルド
npm run build
```

## 使用方法

MCPクライアントのMCP設定ファイルに、以下の設定を追加してください。  
絶対パスで指定してください。
(※ホームディレクトリに `~` は使用できません。)

```json
{
  "mcpServers": {
    "mcp-server-boilerplate": {
      "command": "node",
      "args": [
          "/absolute/path/to/mcp-server-boilerplate/build/index.js"
      ]
    }
  }
}
```

設定の変更を適用するために、MCPクライアントを再起動してください。
エージェントモードで以下の指示を実行して、ツールが正しく動作するか確認してください。(ツール名の指定は必須ではないが、確実にツールを使用させるために指定しています。)

- `double_numberを使って3を2倍した結果を表示して`
- `テスト用の文字列データを取得して、内容の説明をして`

## 提供するツール

### double_number

与えられた数値を2倍にします。

#### パラメータ

- `num` (number): 2倍にする数値

#### 戻り値

- 入力された数値の2倍の値

### get_test_text

ダミーサーバーから文字列データを取得します。

#### パラメータ

- なし

#### 戻り値

- 取得した文字列データ

## 開発方法

### プロジェクト構造

```text
mcp-server-boilerplate/
├── .vscode/                 # VSCode設定
├── build/                   # ビルド出力先
├── node_modules/            # 依存パッケージ
├── src/                     # ソースコード
│   ├── index.ts             # エントリーポイント
│   └── {types}/             # 型定義（追加予定）
├── {tests/}                 # テスト
├── .env                     # 環境変数
├── {.env.example}           # 環境変数の例
├── .gitignore               # Gitの除外設定
├── .windsurfrules           # Windsurf設定
├── biome.json               # Biome設定
├── package.json             # 依存関係と設定
├── README.md                # READMEファイル
└── tsconfig.json            # TypeScript設定
```

### 新しいツールの追加方法

`src/index.ts` ファイルを編集し、以下のパターンに従ってツールを追加します：

```typescript
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
  "ツールの名前",
  "ツールの説明",
  {パラメータ名: z.型().describe("パラメータの説明")},
  ({パラメータ名}) => ({content: [{type: "text", text: 結果}]}),
);
```

### 主な依存パッケージ

- `@modelcontextprotocol/sdk`: ^1.9.0 - MCPサーバーの実装に必要なSDK
- `zod`: ^3.24.2 - 型検証とスキーマ定義のためのライブラリ

### 開発ツール

#### Biome

[Biome](https://biomejs.dev)は、JavaScriptとTypeScriptのための高速なリンター兼フォーマッターです。このプロジェクトでは、コードの品質と一貫性を保つために使用しています。  
`biome.json`ファイルに、プロジェクト固有のルールと設定が定義されています。

以下のnpmスクリプトが利用可能です：

```bash
# コードをチェック
npm run lint

# コードをチェックして問題を自動修正
npm run lint:fix

# フォーマットをチェック
npm run format

# フォーマットを自動修正
npm run format:fix
```
