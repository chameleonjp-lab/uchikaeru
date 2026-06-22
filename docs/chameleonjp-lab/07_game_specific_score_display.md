# ゲーム別スコア表示仕様

## uchikaeru

`uchikaeru` はクリア波数を最優先し、同じ波数内では詳細スコアで並べる。

```text
RANK_BASE = 2000000
rankingScore = clearWave * 2000000 + min(1999999, detailScore)
```

- `detailScore` はゲーム中の `battleScore` をベースに、残り拠点 HP ボーナスと 60 波クリアボーナスを加えた補助点。
- ランキング送信時のみ `detailScore` を最大 `1,999,999` に丸める。
- 結果画面の自分の表示は、可能な限り丸め前の実 `detailScore` を優先する。
- ランキング TOP10 は保存済み `score` を `RANK_BASE = 2,000,000` で分解表示する。

## 表示例

### 59 波クリア、detailScore 1,070,642

```text
rankingScore = 59 * 2000000 + 1070642
             = 119070642
表示: 59波クリア / 1,070,642点
```

### 60 波クリア、detailScore 2,037,256

```text
detailScore は 1,999,999 に丸め
rankingScore = 60 * 2000000 + 1999999
             = 121999999
表示: 60波クリア / 1,999,999点
```

## 注意事項

`122,000,000` は `61波クリア / 0点` 相当になるため `uchikaeru` では仕様外。Supabase 側では `uchikaeru` の最大値を `121,999,999` にする。
