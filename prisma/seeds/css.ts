import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedCSSLessons() {
  // CSS 初級レッスン
  const cssBeginnerLesson = await prisma.lesson.create({
    data: {
      title: 'CSS 初級',
      description: 'CSSの基本的なセレクタ、プロパティ、レイアウトを学びます。色、フォント、ボックスモデルなどの基礎概念を習得できます。',
      language: 'css',
      difficulty: 'BEGINNER',
      exercises: {
        create: [
          {
            title: 'セレクタと基本プロパティ',
            description: 'CSSの基本的なセレクタとテキスト・色のプロパティの使い方を学習します。',
            starterCode: `/* 基本的なスタイリングを追加してください */
/* h1を青色に、pを14pxのグレー文字に、.highlight クラスを黄色背景に */

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>CSS基本スタイル</title>
    <style>
        /* ここにCSSを書いてください */
        
    </style>
</head>
<body>
    <h1>CSSスタイリング入門</h1>
    <p>この段落をスタイリングしてください。</p>
    <p class="highlight">この段落はハイライト表示します。</p>
    <div id="special">このdivには特別なスタイルを適用します。</div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>CSS基本スタイル</title>
    <style>
        /* 要素セレクタ */
        h1 {
            color: blue;
            font-size: 2rem;
            text-align: center;
            margin-bottom: 1rem;
        }
        
        p {
            color: #666;
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        
        /* クラスセレクタ */
        .highlight {
            background-color: yellow;
            padding: 0.5rem;
            border-radius: 4px;
            font-weight: bold;
        }
        
        /* IDセレクタ */
        #special {
            background-color: #e8f4fd;
            border: 2px solid #2196F3;
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
        }
        
        /* body全体のスタイル */
        body {
            font-family: 'Arial', sans-serif;
            max-width: 600px;
            margin: 2rem auto;
            padding: 1rem;
            background-color: #f9f9f9;
        }
        
        /* 複数要素の同時指定 */
        h1, #special {
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <h1>CSSスタイリング入門</h1>
    <p>この段落をスタイリングしてください。</p>
    <p class="highlight">この段落はハイライト表示します。</p>
    <div id="special">このdivには特別なスタイルを適用します。</div>
</body>
</html>`,
            order: 1,
            hints: {
              create: [
                { content: '要素名でセレクト: h1 { color: blue; }' },
                { content: 'クラスは.class-name、IDは#id-nameでセレクト' },
                { content: 'colorで文字色、background-colorで背景色を指定' },
                { content: 'font-sizeでフォントサイズ、font-familyでフォントを指定' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '[青色の大きな見出し] CSSスタイリング入門\n[グレー14pxテキスト] この段落をスタイリングしてください。\n[黄色背景のハイライト] この段落はハイライト表示します。\n[青枠の特別なボックス] このdivには特別なスタイルを適用します。',
                  description: 'セレクタと基本プロパティが正しく適用される'
                }
              ]
            }
          },
          {
            title: 'ボックスモデルとレイアウト',
            description: 'margin、padding、border、widthとheightを使ったボックスモデルの概念を学習します。',
            starterCode: `/* ボックスモデルを使ったカードレイアウトを作成してください */

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ボックスモデル</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
        }
        
        /* ここにCSSを追加してください */
        
    </style>
</head>
<body>
    <div class="card">
        <h2>商品カード</h2>
        <p>このカードにボックスモデルを適用してデザインを改善してください。</p>
        <button class="btn">購入する</button>
    </div>
    
    <div class="card featured">
        <h2>おすすめ商品</h2>
        <p>こちらは特別なスタイルのカードです。</p>
        <button class="btn">詳細を見る</button>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ボックスモデル</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
        }
        
        /* カードの基本スタイル */
        .card {
            background-color: white;
            width: 300px;
            margin: 20px auto; /* 中央寄せ */
            padding: 20px; /* 内側の余白 */
            border: 1px solid #ddd; /* 境界線 */
            border-radius: 8px; /* 角丸 */
            box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 影 */
            box-sizing: border-box; /* paddingとborderを含むサイズ計算 */
        }
        
        /* 特別なカードのスタイル */
        .card.featured {
            border: 3px solid #4CAF50;
            border-left: 8px solid #4CAF50; /* 左側の強調線 */
            background-color: #f8fff8;
        }
        
        /* カード内の見出し */
        .card h2 {
            margin-top: 0; /* 上のマージンを削除 */
            margin-bottom: 15px;
            color: #333;
            font-size: 1.5rem;
        }
        
        /* カード内の段落 */
        .card p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        
        /* ボタンのスタイル */
        .btn {
            background-color: #2196F3;
            color: white;
            border: none;
            padding: 12px 24px; /* 内側の余白 */
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        
        /* ボタンのホバー効果 */
        .btn:hover {
            background-color: #1976D2;
        }
        
        /* 特別なカード内のボタン */
        .featured .btn {
            background-color: #4CAF50;
        }
        
        .featured .btn:hover {
            background-color: #45a049;
        }
        
        /* レスポンシブ対応 */
        @media (max-width: 360px) {
            .card {
                width: calc(100% - 40px); /* 画面幅から左右のmarginを引く */
                margin: 20px;
            }
        }
        
        /* ボックスサイズの可視化（デバッグ用） */
        /*
        .card {
            border: 2px dashed red;
        }
        .card * {
            border: 1px dashed blue;
        }
        */
    </style>
</head>
<body>
    <div class="card">
        <h2>商品カード</h2>
        <p>このカードにボックスモデルを適用してデザインを改善してください。</p>
        <button class="btn">購入する</button>
    </div>
    
    <div class="card featured">
        <h2>おすすめ商品</h2>
        <p>こちらは特別なスタイルのカードです。</p>
        <button class="btn">詳細を見る</button>
    </div>
</body>
</html>`,
            order: 2,
            hints: {
              create: [
                { content: 'margin: 外側の余白、padding: 内側の余白' },
                { content: 'border: 境界線、border-radius: 角丸' },
                { content: 'box-sizing: border-box でサイズ計算を簡単に' },
                { content: 'box-shadow: 水平 垂直 ぼかし 色 で影を追加' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '[白背景のカード、影付き、角丸]\n商品カード\nこのカードにボックスモデルを適用してデザインを改善してください。\n[青いボタン] 購入する\n\n[緑枠の特別なカード、薄緑背景]\nおすすめ商品\nこちらは特別なスタイルのカードです。\n[緑のボタン] 詳細を見る',
                  description: 'ボックスモデルを使ったカードレイアウトが正しく作成される'
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('CSS beginner lesson seeded successfully!')
}