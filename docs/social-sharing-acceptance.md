# うちかえる：SNS紹介画像と共有受入（2026-11-02）

## 対象・変更

現main `3878f2b876c1c96917806077454967a738fc5c40` のゲームを維持し、固定紹介画像1200×630、OG/Twitterメタデータ、`#うちかえる #ゲーム制作` を追加する。runtimeのHTML/CSS/JSは単一indexのまま。追加配信はPNG1枚のみ。編集用SVG・生成コード・glyph原本は配信しない。

紹介画像は実canvasの暗緑グラデーション/線、通常カエルの円色 `#7CFC7C`、🐸、🏯、HPバー、弾を紹介用に配置し直したもの。プレイ画面のスクリーンショットや特定プレイヤーの成績ではない。60波・3枚から選ぶ武器/強化・自動防衛は現ルールを参照。名前・成績・架空の順位を含めない。

絵文字はゲームの描画文字と同じコードポイントを、既存インストールのNoto Color Emojiから出力したglyph。フォントは同梱しない。出力glyphを編集元SVG内へ埋め込み、レンダラー間の黒塗り誤表示を避ける。端末ごとの元ゲーム絵文字デザインとの差はあり得る。出典: Google/Arjen Nienhuis Noto Emoji、インストール済パッケージcopyrightのfonts/*はSIL Open Font License 1.1。フォントファイルの再配布はしていない。

## 公開先との区別

現在の正式URL/共有URL/canonical/og:urlは既存Codeberg URLを保持。新PNGの絶対URLは既存GitHub配信候補 `https://chameleonjp-lab.github.io/uchikaeru/assets/social-preview.png`。これはGithub版の配信準備であり、Codebergページ更新・実験場DB切替・Xカード公開確認を完了扱いにしない。移行の配信設定/動作確認/URL切替は別途本人操作待ち。

## 検査

- `scripts/social-preview.test.cjs`: PNG寸法/metadata/配信manifest、全15言語home/resultの正式2タグ・URL・長さ。
- `scripts/share-visual.cjs`: Chromium/WebKit、15言語、402×874/874×402、ホーム/結果の表示文言・黒白・44px・中心hit、fresh popup本文、失敗時だけコピーdialog、結果保持。
- 新共有受入は全HTTPをrouteで止め、localHTMLをGET/HEADで直接fulfill、Xとランキング取得だけ明示mock。未知通信abort、SW停止、WebSocketclose。匿名結果fixtureのみでscore送信試行0をassert。
- 既存ゲーム/採点/receipt/言語/音の検査は従来のまま追加実行。新受入で実戦のバランス全体を検証したとはしない。
- 全rectのviewport/overflow祖先内収容を検査。CSS非表示/親opacity0/overflow祖先による部分切れをnegative controlとして可視判定の誤PASSを防ぐ。
- 新作業branch限定push検証を追加。本番artifact/deployはmain pushだけ、concurrencyはbranch別で作業が本番runをcancelしない。

ローカルunit成功、PR/branch CI成功、PNG実見、公開確認、iPhone実機確認は別の証拠として記録する。実機未実施。今回の共有導線変更はタグのみで、既存のX失敗時コピーdialogは保持し独立コピーUIは追加しない。

## マージ後/復元

本人マージ後、配信commitとPNGのURL/Content-Type/全byte、ホームと結果のX文言/2タグを確認。iPhone Safariでは縦横・名前なし・Xから戻る・Xを開けない場合のコピーを試す。本番ランキングに試験記録を作らない。復元は今回差分を戻す別PR、スコア/設定消去不要。
