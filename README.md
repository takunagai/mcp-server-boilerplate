# MCP Example

シンプルなModel Context Protocol (MCP) サーバーの実装例です。

## 概要

このプロジェクトは、Model Context Protocol (MCP) サーバーの基本的な実装を示すサンプルです。MCPはAIモデルとアプリケーション間の標準化されたインターフェースを提供し、AIモデルの能力を拡張するためのプロトコルです。

このサンプルでは、数値を2倍にする単純なツールを提供しています。MCPサーバーの構築方法と、カスタムツールの実装方法を示すリファレンス実装となっています。

## MCPの概念

MCP (Model Context Protocol) は、AIモデルとアプリケーション間の標準化されたインターフェースを提供するプロトコルです。MCPを使用することで、AIモデルをより簡単に統合し、拡張することができます。

## 前提条件

- Node.js (v23.11.0以上)
- npm または yarn

## インストール方法

```bash
# リポジトリのクローン
git clone [リポジトリURL]
cd mcp-example

# 依存パッケージのインストール
npm install

# ビルド
npm run build
```

## 使用方法

```bash
# ビルド後に実行
node build/index.js
```

または、パッケージをグローバルにインストールして使用：

```bash
npm install -g .
mcp-example
```

## 提供するツール

### double_number

与えられた数値を2倍にします。

#### パラメータ

- `num` (number): 2倍にする数値

#### 戻り値

- 入力された数値の2倍の値

## 開発方法

### プロジェクト構造

```text
mcp-example/
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
├── package.json             # 依存関係と設定
├── README.md                # READMEファイル
└── tsconfig.json            # TypeScript設定
```

### 使用している主な依存パッケージ

- `@modelcontextprotocol/sdk`: ^1.9.0 - MCPサーバーの実装に必要なSDK
- `zod`: ^3.24.2 - 型検証とスキーマ定義のためのライブラリ

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

### MCP対応クライアント

このMCPサーバーは以下のクライアントと互換性があります：

- Claude Code
- VSCode
- Windsurf
- Cursor
- AWS Bedrock (未確認)

## ライセンス

MIT
