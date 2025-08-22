import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedHTMLLessons() {
  // HTML 初級レッスン
  const htmlBeginnerLesson = await prisma.lesson.create({
    data: {
      title: 'HTML 初級',
      description: 'HTMLの基本的な構造とタグの使い方を学びます。文書構造、テキスト、リンク、画像などの基礎的な要素を習得できます。',
      language: 'html',
      difficulty: 'BEGINNER',
      exercises: {
        create: [
          {
            title: 'HTML文書の基本構造',
            description: 'HTML文書の基本的な構造（DOCTYPE、html、head、body）を学習します。',
            starterCode: `<!-- HTML文書の基本構造を作成してください -->
<!-- DOCTYPE宣言、html、head、bodyタグを含む完全な構造 -->

<!-- ここにコードを書いてください: -->`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>私の最初のHTMLページ</title>
    <meta name="description" content="HTML学習のための基本ページです">
</head>
<body>
    <h1>HTMLへようこそ</h1>
    <p>これは私が作成した最初のHTMLページです。</p>
    <p>HTMLはウェブページを作成するための言語です。</p>
</body>
</html>`,
            order: 1,
            hints: {
              create: [
                { content: '<!DOCTYPE html>で文書型を宣言します' },
                { content: '<html lang="ja">で日本語ページを指定します' },
                { content: '<head>内にメタデータ、<body>内に表示内容を書きます' },
                { content: '<meta charset="UTF-8">で文字エンコーディングを設定します' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'HTMLへようこそ\nこれは私が作成した最初のHTMLページです。\nHTMLはウェブページを作成するための言語です。',
                  description: 'HTML基本構造が正しく作成される'
                }
              ]
            }
          },
          {
            title: '見出しと段落',
            description: 'h1-h6の見出しタグとpタグを使った文章構造を学習します。',
            starterCode: `<!-- 見出しと段落を使って文章を構造化してください -->
<!-- h1: メインタイトル, h2: セクション, h3: サブセクション, p: 段落 -->

<!-- ここにコードを書いてください: -->`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>プログラミング学習ガイド</title>
</head>
<body>
    <h1>プログラミング学習ガイド</h1>
    
    <h2>学習を始める前に</h2>
    <p>プログラミングは論理的思考力を養う素晴らしいスキルです。</p>
    <p>継続的な学習と実践が成功の鍵となります。</p>
    
    <h2>推奨学習言語</h2>
    
    <h3>初心者向け</h3>
    <p>PythonやJavaScriptは初心者にとって理解しやすい言語です。</p>
    <p>文法がシンプルで、多くのリソースが利用可能です。</p>
    
    <h3>ウェブ開発</h3>
    <p>HTML、CSS、JavaScriptの組み合わせがウェブ開発の基礎となります。</p>
    
    <h2>学習のコツ</h2>
    <p>毎日少しずつでも継続することが重要です。</p>
    <p>実際にコードを書いて動かすことで理解が深まります。</p>
</body>
</html>`,
            order: 2,
            hints: {
              create: [
                { content: 'h1は最も重要な見出し、h6が最も小さい見出しです' },
                { content: '見出しは階層的に使用します（h1 > h2 > h3...）' },
                { content: 'pタグで段落を作成します' },
                { content: '適切な見出し構造でSEOも向上します' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'プログラミング学習ガイド\n学習を始める前に\nプログラミングは論理的思考力を養う素晴らしいスキルです。\n継続的な学習と実践が成功の鍵となります。\n推奨学習言語\n初心者向け\nPythonやJavaScriptは初心者にとって理解しやすい言語です。\n文法がシンプルで、多くのリソースが利用可能です。\nウェブ開発\nHTML、CSS、JavaScriptの組み合わせがウェブ開発の基礎となります。\n学習のコツ\n毎日少しずつでも継続することが重要です。\n実際にコードを書いて動かすことで理解が深まります。',
                  description: '見出しと段落が正しい構造で作成される'
                }
              ]
            }
          },
          {
            title: 'リンクと画像',
            description: 'aタグでリンクを作成し、imgタグで画像を表示する方法を学習します。',
            starterCode: `<!-- リンクと画像を含むページを作成してください -->
<!-- 外部リンク、内部リンク、メールリンク、画像を含める -->

<!-- ここにコードを書いてください: -->`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>リンクと画像のサンプル</title>
</head>
<body>
    <h1>リンクと画像の使用例</h1>
    
    <h2>外部リンク</h2>
    <p><a href="https://developer.mozilla.org/ja/" target="_blank">MDN Web Docs（新しいタブで開く）</a></p>
    <p><a href="https://www.w3schools.com/">W3Schools</a></p>
    
    <h2>内部リンク（ページ内）</h2>
    <p><a href="#section1">セクション1へジャンプ</a></p>
    <p><a href="#section2">セクション2へジャンプ</a></p>
    
    <h2>連絡先</h2>
    <p><a href="mailto:info@example.com">メールで連絡</a></p>
    <p><a href="tel:03-1234-5678">電話をかける</a></p>
    
    <h2>画像の表示</h2>
    <img src="https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Sample+Image" 
         alt="サンプル画像" 
         width="300" 
         height="200">
    
    <p>画像にもリンクを設定できます：</p>
    <a href="https://placeholder.com/">
        <img src="https://via.placeholder.com/150x100/2196F3/FFFFFF?text=Click+Me" 
             alt="クリック可能な画像" 
             width="150" 
             height="100">
    </a>
    
    <h2 id="section1">セクション1</h2>
    <p>ここはセクション1の内容です。上のリンクから飛んできました。</p>
    
    <h2 id="section2">セクション2</h2>
    <p>ここはセクション2の内容です。</p>
    
    <p><a href="#top">ページの最上部に戻る</a></p>
</body>
</html>`,
            order: 3,
            hints: {
              create: [
                { content: '<a href="URL">リンクテキスト</a>でリンクを作成します' },
                { content: 'target="_blank"で新しいタブで開きます' },
                { content: '<img src="URL" alt="説明">で画像を表示します' },
                { content: 'alt属性は画像の説明文で、アクセシビリティに重要です' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'リンクと画像の使用例\n外部リンク\nMDN Web Docs（新しいタブで開く）\nW3Schools\n内部リンク（ページ内）\nセクション1へジャンプ\nセクション2へジャンプ\n連絡先\nメールで連絡\n電話をかける\n画像の表示\n[サンプル画像]\n画像にもリンクを設定できます：\n[クリック可能な画像]\nセクション1\nここはセクション1の内容です。上のリンクから飛んできました。\nセクション2\nここはセクション2の内容です。\nページの最上部に戻る',
                  description: 'リンクと画像が正しく配置される'
                }
              ]
            }
          },
          {
            title: 'リストと表',
            description: 'ul/ol/liでリストを作成し、table要素で表を作成する方法を学習します。',
            starterCode: `<!-- リストと表を使ってデータを整理してください -->
<!-- 順序なしリスト、順序付きリスト、ネストしたリスト、基本的な表を作成 -->

<!-- ここにコードを書いてください: -->`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>リストと表のサンプル</title>
</head>
<body>
    <h1>リストと表の使用例</h1>
    
    <h2>順序なしリスト（箇条書き）</h2>
    <p>プログラミング言語の例：</p>
    <ul>
        <li>JavaScript</li>
        <li>Python</li>
        <li>Java</li>
        <li>C++</li>
        <li>Ruby</li>
    </ul>
    
    <h2>順序付きリスト（番号付き）</h2>
    <p>学習ステップ：</p>
    <ol>
        <li>基本文法を学ぶ</li>
        <li>小さなプログラムを作る</li>
        <li>プロジェクトに挑戦する</li>
        <li>コードレビューを受ける</li>
        <li>継続的に改善する</li>
    </ol>
    
    <h2>ネストしたリスト</h2>
    <p>ウェブ技術の分類：</p>
    <ul>
        <li>フロントエンド
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
            </ul>
        </li>
        <li>バックエンド
            <ul>
                <li>Node.js</li>
                <li>Python</li>
                <li>PHP</li>
            </ul>
        </li>
        <li>データベース
            <ol>
                <li>MySQL</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
            </ol>
        </li>
    </ul>
    
    <h2>基本的な表</h2>
    <p>プログラミング言語の比較：</p>
    <table border="1">
        <thead>
            <tr>
                <th>言語</th>
                <th>難易度</th>
                <th>主な用途</th>
                <th>学習期間</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>HTML</td>
                <td>初級</td>
                <td>ウェブページ構造</td>
                <td>1週間</td>
            </tr>
            <tr>
                <td>CSS</td>
                <td>初級</td>
                <td>ウェブページ装飾</td>
                <td>2週間</td>
            </tr>
            <tr>
                <td>JavaScript</td>
                <td>中級</td>
                <td>ウェブ動的機能</td>
                <td>1ヶ月</td>
            </tr>
            <tr>
                <td>Python</td>
                <td>初級</td>
                <td>データ分析・AI</td>
                <td>3週間</td>
            </tr>
            <tr>
                <td>Java</td>
                <td>中級</td>
                <td>エンタープライズ開発</td>
                <td>2ヶ月</td>
            </tr>
        </tbody>
    </table>
    
    <h2>説明リスト</h2>
    <p>専門用語の説明：</p>
    <dl>
        <dt>HTML</dt>
        <dd>HyperText Markup Language - ウェブページの構造を定義するマークアップ言語</dd>
        
        <dt>CSS</dt>
        <dd>Cascading Style Sheets - ウェブページの見た目やレイアウトを定義するスタイルシート言語</dd>
        
        <dt>JavaScript</dt>
        <dd>ウェブページに動的な機能を追加するプログラミング言語</dd>
    </dl>
</body>
</html>`,
            order: 4,
            hints: {
              create: [
                { content: '<ul>で順序なしリスト、<ol>で順序付きリストを作成します' },
                { content: '<li>でリストの各項目を定義します' },
                { content: '<table><tr><td>で表を作成します' },
                { content: '<thead>, <tbody>で表のヘッダーと本体を構造化できます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'リストと表の使用例\n順序なしリスト（箇条書き）\nプログラミング言語の例：\n• JavaScript\n• Python\n• Java\n• C++\n• Ruby\n順序付きリスト（番号付き）\n学習ステップ：\n1. 基本文法を学ぶ\n2. 小さなプログラムを作る\n3. プロジェクトに挑戦する\n4. コードレビューを受ける\n5. 継続的に改善する\nネストしたリスト\nウェブ技術の分類：\n• フロントエンド\n  • HTML\n  • CSS\n  • JavaScript\n• バックエンド\n  • Node.js\n  • Python\n  • PHP\n• データベース\n  1. MySQL\n  2. PostgreSQL\n  3. MongoDB\n基本的な表\nプログラミング言語の比較：\n[表: 言語、難易度、主な用途、学習期間の比較表]\n説明リスト\n専門用語の説明：\nHTML: HyperText Markup Language - ウェブページの構造を定義するマークアップ言語\nCSS: Cascading Style Sheets - ウェブページの見た目やレイアウトを定義するスタイルシート言語\nJavaScript: ウェブページに動的な機能を追加するプログラミング言語',
                  description: 'リストと表が正しく構造化される'
                }
              ]
            }
          }
        ]
      }
    }
  })

  // HTML 中級レッスン
  const htmlIntermediateLesson = await prisma.lesson.create({
    data: {
      title: 'HTML 中級',
      description: 'フォーム、セマンティック要素、メディア要素などHTMLの中級概念を学習します。',
      language: 'html',
      difficulty: 'INTERMEDIATE',
      exercises: {
        create: [
          {
            title: 'フォームの作成',
            description: 'input、select、textareaなどを使った様々な入力フォームの作成方法を学習します。',
            starterCode: `<!-- 会員登録フォームを作成してください -->
<!-- 名前、メール、パスワード、性別、趣味、自己紹介、送信ボタンを含む -->

<!-- ここにコードを書いてください: -->`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>会員登録フォーム</title>
    <style>
        form { max-width: 600px; margin: 20px; }
        label { display: block; margin-top: 15px; font-weight: bold; }
        input, select, textarea { 
            width: 100%; 
            padding: 8px; 
            margin-top: 5px; 
            box-sizing: border-box; 
        }
        .checkbox-group { margin-top: 10px; }
        .checkbox-group input { width: auto; margin-right: 5px; }
        .button-group { margin-top: 20px; }
        button { 
            padding: 10px 20px; 
            margin-right: 10px; 
            font-size: 16px; 
        }
    </style>
</head>
<body>
    <h1>会員登録フォーム</h1>
    
    <form action="/register" method="post">
        <fieldset>
            <legend>基本情報</legend>
            
            <label for="firstName">名前（姓）*</label>
            <input type="text" id="firstName" name="firstName" required>
            
            <label for="lastName">名前（名）*</label>
            <input type="text" id="lastName" name="lastName" required>
            
            <label for="email">メールアドレス*</label>
            <input type="email" id="email" name="email" required>
            
            <label for="password">パスワード*</label>
            <input type="password" id="password" name="password" 
                   minlength="8" required>
            
            <label for="confirmPassword">パスワード確認*</label>
            <input type="password" id="confirmPassword" name="confirmPassword" 
                   minlength="8" required>
        </fieldset>
        
        <fieldset>
            <legend>個人情報</legend>
            
            <label for="birthdate">生年月日</label>
            <input type="date" id="birthdate" name="birthdate">
            
            <label for="gender">性別</label>
            <select id="gender" name="gender">
                <option value="">選択してください</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
                <option value="other">その他</option>
                <option value="no-answer">回答しない</option>
            </select>
            
            <label for="phone">電話番号</label>
            <input type="tel" id="phone" name="phone" 
                   pattern="[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}">
        </fieldset>
        
        <fieldset>
            <legend>趣味・関心</legend>
            
            <div class="checkbox-group">
                <input type="checkbox" id="reading" name="hobbies[]" value="reading">
                <label for="reading">読書</label>
            </div>
            
            <div class="checkbox-group">
                <input type="checkbox" id="sports" name="hobbies[]" value="sports">
                <label for="sports">スポーツ</label>
            </div>
            
            <div class="checkbox-group">
                <input type="checkbox" id="music" name="hobbies[]" value="music">
                <label for="music">音楽</label>
            </div>
            
            <div class="checkbox-group">
                <input type="checkbox" id="programming" name="hobbies[]" value="programming">
                <label for="programming">プログラミング</label>
            </div>
            
            <div class="checkbox-group">
                <input type="checkbox" id="travel" name="hobbies[]" value="travel">
                <label for="travel">旅行</label>
            </div>
        </fieldset>
        
        <fieldset>
            <legend>その他</legend>
            
            <label for="bio">自己紹介</label>
            <textarea id="bio" name="bio" rows="5" 
                      placeholder="ご自身について簡単に教えてください..."></textarea>
            
            <div class="checkbox-group">
                <input type="checkbox" id="newsletter" name="newsletter" value="yes">
                <label for="newsletter">メールマガジンを受信する</label>
            </div>
            
            <div class="checkbox-group">
                <input type="checkbox" id="terms" name="terms" value="accepted" required>
                <label for="terms">利用規約に同意する*</label>
            </div>
        </fieldset>
        
        <div class="button-group">
            <button type="submit">登録する</button>
            <button type="reset">リセット</button>
        </div>
    </form>
    
    <p><small>*印は必須項目です</small></p>
</body>
</html>`,
            order: 1,
            hints: {
              create: [
                { content: '<form action="URL" method="post">でフォームを作成します' },
                { content: '<label for="id">とinputのid属性を対応させます' },
                { content: 'required属性で必須項目を指定できます' },
                { content: '<fieldset>と<legend>でフォームをグループ化できます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '会員登録フォーム\n基本情報\n名前（姓）*\n名前（名）*\nメールアドレス*\nパスワード*\nパスワード確認*\n個人情報\n生年月日\n性別\n電話番号\n趣味・関心\n読書\nスポーツ\n音楽\nプログラミング\n旅行\nその他\n自己紹介\nメールマガジンを受信する\n利用規約に同意する*\n登録する リセット\n*印は必須項目です',
                  description: '包括的なフォームが正しく作成される'
                }
              ]
            }
          },
          {
            title: 'セマンティック要素',
            description: 'header、nav、main、section、article、aside、footerなどのセマンティック要素を学習します。',
            starterCode: `<!-- セマンティック要素を使ってブログページを作成してください -->
<!-- header, nav, main, article, section, aside, footer を使用 -->

<!-- ここにコードを書いてください: -->`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>テックブログ - 最新のプログラミング情報</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; line-height: 1.6; }
        header { background: #333; color: white; padding: 1rem; }
        nav ul { list-style: none; padding: 0; margin: 0; }
        nav li { display: inline; margin-right: 20px; }
        nav a { color: white; text-decoration: none; }
        .container { max-width: 1200px; margin: 0 auto; display: flex; gap: 20px; }
        main { flex: 2; padding: 20px; }
        aside { flex: 1; background: #f4f4f4; padding: 20px; }
        article { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; }
        footer { background: #333; color: white; text-align: center; padding: 20px; }
        .meta { color: #666; font-size: 0.9em; margin-bottom: 10px; }
        h1, h2, h3 { color: #333; }
    </style>
</head>
<body>
    <header>
        <h1>テックブログ</h1>
        <p>最新のプログラミング技術とトレンドをお届け</p>
        
        <nav>
            <ul>
                <li><a href="#home">ホーム</a></li>
                <li><a href="#tutorials">チュートリアル</a></li>
                <li><a href="#news">ニュース</a></li>
                <li><a href="#reviews">レビュー</a></li>
                <li><a href="#about">概要</a></li>
            </ul>
        </nav>
    </header>
    
    <div class="container">
        <main>
            <section id="featured-posts">
                <h2>注目記事</h2>
                
                <article>
                    <header>
                        <h3>React 18の新機能解説</h3>
                        <div class="meta">
                            <time datetime="2024-01-15">2024年1月15日</time> | 
                            著者: <span>山田太郎</span> | 
                            カテゴリー: <span>JavaScript</span>
                        </div>
                    </header>
                    
                    <section class="content">
                        <p>React 18では多くの新機能が追加されました。特にConcurrent Featuresは...</p>
                        <p>自動バッチングにより、パフォーマンスが大幅に向上しています。</p>
                    </section>
                    
                    <footer>
                        <p>タグ: <span>React, JavaScript, フロントエンド</span></p>
                        <p><a href="#react-18-article">続きを読む</a></p>
                    </footer>
                </article>
                
                <article>
                    <header>
                        <h3>Python 3.12で始める機械学習</h3>
                        <div class="meta">
                            <time datetime="2024-01-10">2024年1月10日</time> | 
                            著者: <span>佐藤花子</span> | 
                            カテゴリー: <span>Python</span>
                        </div>
                    </header>
                    
                    <section class="content">
                        <p>最新のPython 3.12を使用した機械学習の始め方を解説します。</p>
                        <p>scikit-learnとpandasを使った基本的なデータ分析から始めましょう。</p>
                    </section>
                    
                    <footer>
                        <p>タグ: <span>Python, 機械学習, データサイエンス</span></p>
                        <p><a href="#python-ml-article">続きを読む</a></p>
                    </footer>
                </article>
            </section>
            
            <section id="recent-posts">
                <h2>最近の投稿</h2>
                
                <article>
                    <header>
                        <h3>TypeScriptでのエラーハンドリングベストプラクティス</h3>
                        <div class="meta">
                            <time datetime="2024-01-08">2024年1月8日</time> | 
                            著者: <span>田中次郎</span>
                        </div>
                    </header>
                    
                    <section class="summary">
                        <p>TypeScriptにおける効果的なエラーハンドリングの方法について...</p>
                        <p><a href="#typescript-errors">続きを読む</a></p>
                    </section>
                </article>
            </section>
        </main>
        
        <aside>
            <section id="popular-posts">
                <h3>人気記事</h3>
                <ul>
                    <li><a href="#post1">JavaScript非同期処理完全ガイド</a></li>
                    <li><a href="#post2">CSS GridとFlexboxの使い分け</a></li>
                    <li><a href="#post3">Git branching戦略の比較</a></li>
                </ul>
            </section>
            
            <section id="categories">
                <h3>カテゴリー</h3>
                <ul>
                    <li><a href="#javascript">JavaScript (25)</a></li>
                    <li><a href="#python">Python (18)</a></li>
                    <li><a href="#react">React (15)</a></li>
                    <li><a href="#css">CSS (12)</a></li>
                    <li><a href="#nodejs">Node.js (10)</a></li>
                </ul>
            </section>
            
            <section id="newsletter">
                <h3>ニュースレター購読</h3>
                <p>最新記事をメールで受け取りませんか？</p>
                <form>
                    <input type="email" placeholder="メールアドレス" required>
                    <button type="submit">購読する</button>
                </form>
            </section>
        </aside>
    </div>
    
    <footer>
        <section id="footer-content">
            <p>&copy; 2024 テックブログ. All rights reserved.</p>
            <p>
                <a href="#privacy">プライバシーポリシー</a> | 
                <a href="#terms">利用規約</a> | 
                <a href="#contact">お問い合わせ</a>
            </p>
        </section>
    </footer>
</body>
</html>`,
            order: 2,
            hints: {
              create: [
                { content: '<header>でページヘッダー、<nav>でナビゲーションを作成します' },
                { content: '<main>でメインコンテンツ、<aside>でサイドバーを作成します' },
                { content: '<article>で独立した記事、<section>で内容の区分を作成します' },
                { content: '<time datetime="YYYY-MM-DD">で日時を意味的にマークアップします' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'テックブログ\n最新のプログラミング技術とトレンドをお届け\n• ホーム\n• チュートリアル\n• ニュース\n• レビュー\n• 概要\n注目記事\nReact 18の新機能解説\n2024年1月15日 | 著者: 山田太郎 | カテゴリー: JavaScript\nReact 18では多くの新機能が追加されました。特にConcurrent Featuresは...\n自動バッチングにより、パフォーマンスが大幅に向上しています。\nタグ: React, JavaScript, フロントエンド\n続きを読む\nPython 3.12で始める機械学習\n2024年1月10日 | 著者: 佐藤花子 | カテゴリー: Python\n最新のPython 3.12を使用した機械学習の始め方を解説します。\nscikit-learnとpandasを使った基本的なデータ分析から始めましょう。\nタグ: Python, 機械学習, データサイエンス\n続きを読む\n最近の投稿\nTypeScriptでのエラーハンドリングベストプラクティス\n2024年1月8日 | 著者: 田中次郎\nTypeScriptにおける効果的なエラーハンドリングの方法について...\n続きを読む\n人気記事\n• JavaScript非同期処理完全ガイド\n• CSS GridとFlexboxの使い分け\n• Git branching戦略の比較\nカテゴリー\n• JavaScript (25)\n• Python (18)\n• React (15)\n• CSS (12)\n• Node.js (10)\nニュースレター購読\n最新記事をメールで受け取りませんか？\n[メール入力フィールド] [購読するボタン]\n© 2024 テックブログ. All rights reserved.\nプライバシーポリシー | 利用規約 | お問い合わせ',
                  description: 'セマンティック要素を使ったブログページが正しく作成される'
                }
              ]
            }
          },
          {
            title: 'メディア要素の埋め込み',
            description: 'audio、video、iframe、embedなどのメディア要素の使用方法を学習します。',
            starterCode: `<!-- メディア要素を使ったコンテンツページを作成してください -->
<!-- 動画、音声、YouTube埋め込み、PDFなどを含む -->

<!-- ここにコードを書いてください: -->`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>メディアコンテンツ - 動画と音声の学習</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1000px; margin: 0 auto; padding: 20px; }
        .media-container { margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        video, audio { width: 100%; max-width: 600px; }
        iframe { width: 100%; height: 315px; border: none; border-radius: 8px; }
        .video-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .controls-info { background: #f0f0f0; padding: 10px; margin-top: 10px; border-radius: 4px; }
        h2 { color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 5px; }
    </style>
</head>
<body>
    <header>
        <h1>メディアコンテンツ学習ページ</h1>
        <p>HTML5のメディア要素を使用した様々なコンテンツ埋め込みの例</p>
    </header>
    
    <main>
        <section class="media-container">
            <h2>HTML5 Video要素</h2>
            <p>ブラウザネイティブの動画プレーヤー：</p>
            
            <video controls poster="https://via.placeholder.com/640x360/FF6B6B/FFFFFF?text=Video+Thumbnail">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
                <track kind="subtitles" src="subtitles_ja.vtt" srclang="ja" label="日本語">
                <track kind="captions" src="captions_en.vtt" srclang="en" label="English">
                お使いのブラウザは動画の再生に対応していません。
                <a href="https://www.w3schools.com/html/mov_bbb.mp4">動画をダウンロード</a>してご覧ください。
            </video>
            
            <div class="controls-info">
                <p><strong>動画の機能：</strong></p>
                <ul>
                    <li>controls属性：再生コントロールの表示</li>
                    <li>poster属性：動画読み込み前のサムネイル</li>
                    <li>複数のソース形式でブラウザ互換性を向上</li>
                    <li>字幕・キャプションのサポート</li>
                </ul>
            </div>
        </section>
        
        <section class="media-container">
            <h2>HTML5 Audio要素</h2>
            <p>音声ファイルの再生：</p>
            
            <audio controls preload="metadata">
                <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
                <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">
                お使いのブラウザは音声の再生に対応していません。
                <a href="https://www.w3schools.com/html/horse.mp3">音声ファイルをダウンロード</a>してお聞きください。
            </audio>
            
            <div class="controls-info">
                <p><strong>音声オプション：</strong></p>
                <ul>
                    <li>autoplay：自動再生（注意：ユーザー体験を損なう可能性）</li>
                    <li>loop：ループ再生</li>
                    <li>muted：消音状態で開始</li>
                    <li>preload：読み込み方法の制御</li>
                </ul>
                
                <p><strong>追加の音声コントロール例：</strong></p>
                <audio controls loop>
                    <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav">
                    ループ再生する効果音
                </audio>
            </div>
        </section>
        
        <section class="media-container">
            <h2>YouTube動画の埋め込み</h2>
            <p>YouTubeからの動画埋め込み：</p>
            
            <div class="video-grid">
                <div>
                    <h3>プログラミング学習動画</h3>
                    <iframe 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1" 
                        title="プログラミング基礎講座"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                
                <div>
                    <h3>ウェブ開発チュートリアル</h3>
                    <iframe 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?start=30&end=120" 
                        title="HTML CSS JavaScript チュートリアル"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
            
            <div class="controls-info">
                <p><strong>YouTube埋め込みオプション：</strong></p>
                <ul>
                    <li>?rel=0：関連動画を非表示</li>
                    <li>?start=30：30秒から開始</li>
                    <li>?autoplay=1：自動再生（音声は通常ミュート）</li>
                    <li>?modestbranding=1：YouTubeロゴを小さく表示</li>
                </ul>
            </div>
        </section>
        
        <section class="media-container">
            <h2>その他の埋め込みコンテンツ</h2>
            
            <h3>Google マップ</h3>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280649644086!2d139.69170731525385!3d35.68950518019435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b5c3e55ab13%3A0x1b5b6ad5b4b1b5b6!2z5p2x5Lqs6aeF!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp" 
                width="100%" 
                height="250" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                title="東京駅の地図">
            </iframe>
            
            <h3>CodePen埋め込み</h3>
            <p>インタラクティブなコード例：</p>
            <iframe 
                height="265" 
                style="width: 100%;" 
                scrolling="no" 
                title="CSS Animation Example" 
                src="https://codepen.io/team/codepen/embed/PNaGbb?height=265&theme-id=light&default-tab=result" 
                frameborder="no" 
                loading="lazy" 
                allowtransparency="true" 
                allowfullscreen="true">
            </iframe>
        </section>
        
        <section class="media-container">
            <h2>レスポンシブメディア</h2>
            <p>様々な画面サイズに対応した画像：</p>
            
            <picture>
                <source media="(max-width: 799px)" srcset="https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Mobile+Image">
                <source media="(min-width: 800px)" srcset="https://via.placeholder.com/800x400/4ECDC4/FFFFFF?text=Desktop+Image">
                <img src="https://via.placeholder.com/800x400/45B7D1/FFFFFF?text=Default+Image" alt="レスポンシブ画像の例">
            </picture>
            
            <div class="controls-info">
                <p><strong>picture要素の利点：</strong></p>
                <ul>
                    <li>画面サイズに応じて最適な画像を配信</li>
                    <li>帯域幅の節約</li>
                    <li>ユーザー体験の向上</li>
                    <li>WebP等の新しい画像形式への対応</li>
                </ul>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 メディアコンテンツ学習. ブラウザサポートについては<a href="https://caniuse.com/">Can I Use</a>をご確認ください。</p>
    </footer>
</body>
</html>`,
            order: 3,
            hints: {
              create: [
                { content: '<video controls>で動画、<audio controls>で音声を埋め込めます' },
                { content: '<iframe>で外部コンテンツを埋め込めます' },
                { content: 'multiple <source>要素でブラウザ互換性を向上できます' },
                { content: 'allowfullscreen属性でフルスクリーン表示を許可できます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'メディアコンテンツ学習ページ\nHTML5のメディア要素を使用した様々なコンテンツ埋め込みの例\nHTML5 Video要素\nブラウザネイティブの動画プレーヤー：\n[動画プレーヤー]\n動画の機能：\n• controls属性：再生コントロールの表示\n• poster属性：動画読み込み前のサムネイル\n• 複数のソース形式でブラウザ互換性を向上\n• 字幕・キャプションのサポート\nHTML5 Audio要素\n音声ファイルの再生：\n[音声プレーヤー]\n音声オプション：\n• autoplay：自動再生（注意：ユーザー体験を損なう可能性）\n• loop：ループ再生\n• muted：消音状態で開始\n• preload：読み込み方法の制御\n追加の音声コントロール例：\n[ループ音声プレーヤー]\nYouTube動画の埋め込み\nYouTubeからの動画埋め込み：\nプログラミング学習動画\n[YouTube埋め込み動画]\nウェブ開発チュートリアル\n[YouTube埋め込み動画]\nYouTube埋め込みオプション：\n• ?rel=0：関連動画を非表示\n• ?start=30：30秒から開始\n• ?autoplay=1：自動再生（音声は通常ミュート）\n• ?modestbranding=1：YouTubeロゴを小さく表示\nその他の埋め込みコンテンツ\nGoogle マップ\n[Google マップ埋め込み]\nCodePen埋め込み\nインタラクティブなコード例：\n[CodePen埋め込み]\nレスポンシブメディア\n様々な画面サイズに対応した画像：\n[レスポンシブ画像]\npicture要素の利点：\n• 画面サイズに応じて最適な画像を配信\n• 帯域幅の節約\n• ユーザー体験の向上\n• WebP等の新しい画像形式への対応\n© 2024 メディアコンテンツ学習. ブラウザサポートについてはCan I Useをご確認ください。',
                  description: 'メディア要素を使った包括的なコンテンツページが正しく作成される'
                }
              ]
            }
          }
        ]
      }
    }
  })

  // HTML 上級レッスン
  const htmlAdvancedLesson = await prisma.lesson.create({
    data: {
      title: 'HTML 上級',
      description: 'Web Components、アクセシビリティ、SEO最適化などHTMLの上級概念を学習します。',
      language: 'html',
      difficulty: 'ADVANCED',
      exercises: {
        create: [
          {
            title: 'アクセシビリティの実装',
            description: 'ARIA属性、セマンティクス、キーボードナビゲーションなどアクセシビリティを考慮したHTML作成を学習します。',
            starterCode: `<!-- アクセシビリティに配慮したウェブアプリケーションを作成してください -->
<!-- ARIA属性、ランドマーク、フォーカス管理、スクリーンリーダー対応 -->

<!-- ここにコードを書いてください: -->`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>アクセシブルなタスク管理アプリ</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; background: #f5f5f5; }
        .skip-link { 
            position: absolute; top: -40px; left: 6px; background: #000; color: #fff; 
            padding: 8px; z-index: 1000; text-decoration: none;
        }
        .skip-link:focus { top: 6px; }
        header { background: #2c3e50; color: white; padding: 1rem; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; 
                   overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
        input, textarea, select, button { 
            padding: 0.5rem; border: 2px solid #ddd; border-radius: 4px; font-size: 1rem;
        }
        input:focus, textarea:focus, select:focus, button:focus {
            outline: 3px solid #4CAF50; outline-offset: 2px;
        }
        .error { color: #d32f2f; font-size: 0.9rem; }
        .success { color: #388e3c; font-size: 0.9rem; }
        .task-list { list-style: none; padding: 0; }
        .task-item { 
            background: white; margin: 0.5rem 0; padding: 1rem; border-radius: 4px; 
            border-left: 4px solid #2196F3; display: flex; align-items: center; gap: 1rem;
        }
        .task-item.completed { border-left-color: #4CAF50; opacity: 0.7; }
        .task-item.high-priority { border-left-color: #f44336; }
        .btn { background: #2196F3; color: white; border: none; padding: 0.5rem 1rem; 
               border-radius: 4px; cursor: pointer; }
        .btn:hover { background: #1976D2; }
        .btn-danger { background: #f44336; }
        .btn-danger:hover { background: #d32f2f; }
        .status-indicator { width: 12px; height: 12px; border-radius: 50%; margin-right: 0.5rem; }
        .status-todo { background: #ff9800; }
        .status-progress { background: #2196F3; }
        .status-done { background: #4CAF50; }
        .progress-bar { width: 100%; height: 20px; background: #e0e0e0; border-radius: 10px; overflow: hidden; }
        .progress-fill { height: 100%; background: #4CAF50; transition: width 0.3s; }
    </style>
</head>
<body>
    <!-- スキップリンク -->
    <a href="#main-content" class="skip-link">メインコンテンツにスキップ</a>
    
    <header role="banner">
        <div class="container">
            <h1>アクセシブルタスク管理</h1>
            <p>すべての人が使いやすいタスク管理アプリケーション</p>
            
            <nav role="navigation" aria-label="メインナビゲーション">
                <ul style="display: flex; list-style: none; gap: 20px; margin: 0; padding: 0;">
                    <li><a href="#dashboard" style="color: white;">ダッシュボード</a></li>
                    <li><a href="#tasks" style="color: white;">タスク一覧</a></li>
                    <li><a href="#settings" style="color: white;">設定</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main id="main-content" role="main" class="container">
        <section aria-labelledby="add-task-heading">
            <h2 id="add-task-heading">新しいタスクの追加</h2>
            
            <form role="form" aria-labelledby="add-task-heading" novalidate>
                <div class="form-group">
                    <label for="task-title">
                        タスクタイトル
                        <span aria-label="必須項目">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="task-title" 
                        name="title" 
                        required 
                        aria-required="true"
                        aria-describedby="title-error title-help"
                        maxlength="100">
                    <div id="title-help" class="sr-only">
                        タスクのタイトルを100文字以内で入力してください
                    </div>
                    <div id="title-error" class="error" role="alert" aria-live="polite"></div>
                </div>
                
                <div class="form-group">
                    <label for="task-description">タスクの詳細</label>
                    <textarea 
                        id="task-description" 
                        name="description" 
                        rows="3"
                        aria-describedby="description-help"
                        maxlength="500"></textarea>
                    <div id="description-help" class="sr-only">
                        タスクの詳細を500文字以内で入力してください（任意）
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="task-priority">優先度</label>
                    <select id="task-priority" name="priority" aria-describedby="priority-help">
                        <option value="low">低</option>
                        <option value="medium" selected>中</option>
                        <option value="high">高</option>
                    </select>
                    <div id="priority-help" class="sr-only">
                        タスクの優先度を選択してください
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="task-due-date">期限日</label>
                    <input 
                        type="date" 
                        id="task-due-date" 
                        name="dueDate"
                        aria-describedby="due-date-help"
                        min="">
                    <div id="due-date-help" class="sr-only">
                        タスクの期限日を選択してください（任意）
                    </div>
                </div>
                
                <button type="submit" class="btn" aria-describedby="submit-help">
                    <span aria-hidden="true">+</span> タスクを追加
                </button>
                <div id="submit-help" class="sr-only">
                    フォームの内容を確認してタスクを追加します
                </div>
            </form>
        </section>
        
        <section aria-labelledby="task-list-heading" style="margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2 id="task-list-heading">
                    タスク一覧
                    <span class="sr-only">（合計3件）</span>
                </h2>
                
                <div role="group" aria-labelledby="filter-heading">
                    <h3 id="filter-heading" class="sr-only">フィルター</h3>
                    <label for="status-filter" class="sr-only">ステータスでフィルター</label>
                    <select id="status-filter" aria-describedby="filter-help">
                        <option value="all">すべて表示</option>
                        <option value="todo">未完了のみ</option>
                        <option value="completed">完了のみ</option>
                    </select>
                    <div id="filter-help" class="sr-only">
                        表示するタスクのステータスを選択できます
                    </div>
                </div>
            </div>
            
            <!-- プログレスバー -->
            <div role="progressbar" 
                 aria-valuenow="33" 
                 aria-valuemin="0" 
                 aria-valuemax="100"
                 aria-label="完了率"
                 class="progress-bar"
                 style="margin-bottom: 1rem;">
                <div class="progress-fill" style="width: 33%;">
                    <span class="sr-only">33%完了</span>
                </div>
            </div>
            
            <ul class="task-list" role="list" aria-live="polite" aria-label="タスク一覧">
                <li class="task-item high-priority" role="listitem">
                    <input 
                        type="checkbox" 
                        id="task-1" 
                        aria-describedby="task-1-desc"
                        aria-label="プレゼン準備を完了とする">
                    
                    <div style="flex: 1;">
                        <h3 style="margin: 0; font-size: 1.1rem;">
                            <label for="task-1">プレゼン準備</label>
                        </h3>
                        <p id="task-1-desc" style="margin: 0.5rem 0 0 0; color: #666;">
                            来週の会議用のスライド作成
                        </p>
                        <div style="font-size: 0.9rem; color: #888;">
                            <span class="status-indicator status-todo" aria-hidden="true"></span>
                            優先度: 高 | 期限: 2024年1月20日
                        </div>
                    </div>
                    
                    <div role="group" aria-label="タスクアクション">
                        <button 
                            class="btn" 
                            aria-label="プレゼン準備タスクを編集"
                            title="編集">
                            <span aria-hidden="true">✎</span>
                            <span class="sr-only">編集</span>
                        </button>
                        <button 
                            class="btn btn-danger" 
                            aria-label="プレゼン準備タスクを削除"
                            title="削除">
                            <span aria-hidden="true">🗑</span>
                            <span class="sr-only">削除</span>
                        </button>
                    </div>
                </li>
                
                <li class="task-item completed" role="listitem">
                    <input 
                        type="checkbox" 
                        id="task-2" 
                        checked
                        aria-describedby="task-2-desc"
                        aria-label="メールチェックは完了済み">
                    
                    <div style="flex: 1;">
                        <h3 style="margin: 0; font-size: 1.1rem;">
                            <label for="task-2">メールチェック</label>
                        </h3>
                        <p id="task-2-desc" style="margin: 0.5rem 0 0 0; color: #666;">
                            重要メールの返信と整理
                        </p>
                        <div style="font-size: 0.9rem; color: #888;">
                            <span class="status-indicator status-done" aria-hidden="true"></span>
                            優先度: 中 | 完了済み
                        </div>
                    </div>
                    
                    <div role="group" aria-label="タスクアクション">
                        <button 
                            class="btn btn-danger" 
                            aria-label="メールチェックタスクを削除"
                            title="削除">
                            <span aria-hidden="true">🗑</span>
                            <span class="sr-only">削除</span>
                        </button>
                    </div>
                </li>
                
                <li class="task-item" role="listitem">
                    <input 
                        type="checkbox" 
                        id="task-3" 
                        aria-describedby="task-3-desc"
                        aria-label="コードレビューを完了とする">
                    
                    <div style="flex: 1;">
                        <h3 style="margin: 0; font-size: 1.1rem;">
                            <label for="task-3">コードレビュー</label>
                        </h3>
                        <p id="task-3-desc" style="margin: 0.5rem 0 0 0; color: #666;">
                            新機能のプルリクエストをレビュー
                        </p>
                        <div style="font-size: 0.9rem; color: #888;">
                            <span class="status-indicator status-progress" aria-hidden="true"></span>
                            優先度: 中 | 進行中
                        </div>
                    </div>
                    
                    <div role="group" aria-label="タスクアクション">
                        <button 
                            class="btn" 
                            aria-label="コードレビュータスクを編集"
                            title="編集">
                            <span aria-hidden="true">✎</span>
                            <span class="sr-only">編集</span>
                        </button>
                        <button 
                            class="btn btn-danger" 
                            aria-label="コードレビュータスクを削除"
                            title="削除">
                            <span aria-hidden="true">🗑</span>
                            <span class="sr-only">削除</span>
                        </button>
                    </div>
                </li>
            </ul>
        </section>
        
        <!-- ライブリージョン -->
        <div 
            id="status-announcements" 
            aria-live="assertive" 
            aria-atomic="true" 
            class="sr-only">
        </div>
    </main>
    
    <footer role="contentinfo" style="background: #2c3e50; color: white; text-align: center; padding: 1rem; margin-top: 2rem;">
        <p>&copy; 2024 アクセシブルタスク管理アプリ</p>
        <p>
            <a href="#accessibility-statement" style="color: #4CAF50;">アクセシビリティ声明</a> |
            <a href="#feedback" style="color: #4CAF50;">フィードバック</a>
        </p>
    </footer>
    
    <script>
        // アクセシビリティを向上させるJavaScript例
        document.addEventListener('DOMContentLoaded', function() {
            // 今日の日付を最小値として設定
            const dateInput = document.getElementById('task-due-date');
            dateInput.min = new Date().toISOString().split('T')[0];
            
            // フォーカス管理
            const skipLink = document.querySelector('.skip-link');
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById('main-content');
                target.focus();
                target.scrollIntoView();
            });
            
            // ライブリージョンでの通知例
            function announceToScreenReader(message) {
                const announcements = document.getElementById('status-announcements');
                announcements.textContent = message;
                setTimeout(() => {
                    announcements.textContent = '';
                }, 1000);
            }
            
            // タスク完了時の通知例
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const label = this.nextElementSibling.querySelector('label').textContent;
                    const message = this.checked 
                        ? \`\${label}を完了しました\`
                        : \`\${label}を未完了に戻しました\`;
                    announceToScreenReader(message);
                });
            });
        });
    </script>
</body>
</html>`,
            order: 1,
            hints: {
              create: [
                { content: 'role属性でランドマークを定義します（banner, main, navigation等）' },
                { content: 'aria-label, aria-labelledby, aria-describedbyで要素を説明します' },
                { content: 'aria-live="polite"で動的コンテンツの変更を通知できます' },
                { content: '.sr-onlyクラスでスクリーンリーダー専用テキストを作成します' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'アクセシブルタスク管理\nすべての人が使いやすいタスク管理アプリケーション\n• ダッシュボード\n• タスク一覧\n• 設定\n新しいタスクの追加\nタスクタイトル*\n[入力フィールド]\nタスクの詳細\n[テキストエリア]\n優先度\n[選択フィールド: 低/中/高]\n期限日\n[日付フィールド]\n+ タスクを追加\nタスク一覧（合計3件）\n[フィルター: すべて表示/未完了のみ/完了のみ]\n[プログレスバー: 33%完了]\n□ プレゼン準備\n来週の会議用のスライド作成\n優先度: 高 | 期限: 2024年1月20日\n[編集] [削除]\n☑ メールチェック\n重要メールの返信と整理\n優先度: 中 | 完了済み\n[削除]\n□ コードレビュー\n新機能のプルリクエストをレビュー\n優先度: 中 | 進行中\n[編集] [削除]\n© 2024 アクセシブルタスク管理アプリ\nアクセシビリティ声明 | フィードバック',
                  description: 'アクセシビリティに配慮したタスク管理アプリが正しく作成される'
                }
              ]
            }
          },
          {
            title: 'SEO最適化とメタデータ',
            description: 'SEO対策のためのメタタグ、構造化データ、Open Graph、Twitter Cardsの実装を学習します。',
            starterCode: `<!-- SEO最適化されたブログ記事ページを作成してください -->
<!-- メタタグ、構造化データ、OGP、Twitter Cards を含む -->

<!-- ここにコードを書いてください: -->`,
            solution: `<!DOCTYPE html>
<html lang="ja" prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article#">
<head>
    <!-- 基本的なメタデータ -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO基本タグ -->
    <title>React 18の新機能完全ガイド｜最新フロントエンド技術 - Tech Blog 2024</title>
    <meta name="description" content="React 18で追加された革新的な新機能を詳しく解説。Concurrent Features、Suspense、自動バッチング等の実装方法と活用テクニックを実例付きで紹介します。">
    <meta name="keywords" content="React 18, JavaScript, フロントエンド, Web開発, Concurrent Features, Suspense, 自動バッチング">
    <meta name="author" content="山田太郎">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    
    <!-- 正規化URL -->
    <link rel="canonical" href="https://techblog.example.com/articles/react-18-complete-guide">
    
    <!-- 言語・地域設定 -->
    <link rel="alternate" hreflang="ja" href="https://techblog.example.com/articles/react-18-complete-guide">
    <link rel="alternate" hreflang="en" href="https://techblog.example.com/en/articles/react-18-complete-guide">
    <link rel="alternate" hreflang="x-default" href="https://techblog.example.com/articles/react-18-complete-guide">
    
    <!-- Open Graph Protocol (Facebook, LinkedIn等) -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="React 18の新機能完全ガイド - 最新フロントエンド技術">
    <meta property="og:description" content="React 18で追加された革新的な新機能を詳しく解説。Concurrent Features、Suspense、自動バッチング等の実装方法と活用テクニックを実例付きで紹介します。">
    <meta property="og:url" content="https://techblog.example.com/articles/react-18-complete-guide">
    <meta property="og:site_name" content="Tech Blog">
    <meta property="og:image" content="https://techblog.example.com/images/react-18-guide-og.jpg">
    <meta property="og:image:alt" content="React 18新機能の概要図">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="ja_JP">
    
    <!-- 記事固有のOpen Graph -->
    <meta property="article:author" content="https://techblog.example.com/authors/yamada-taro">
    <meta property="article:published_time" content="2024-01-15T09:00:00+09:00">
    <meta property="article:modified_time" content="2024-01-16T14:30:00+09:00">
    <meta property="article:section" content="フロントエンド開発">
    <meta property="article:tag" content="React">
    <meta property="article:tag" content="JavaScript">
    <meta property="article:tag" content="Web開発">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@techblog_jp">
    <meta name="twitter:creator" content="@yamada_dev">
    <meta name="twitter:title" content="React 18の新機能完全ガイド - 最新フロントエンド技術">
    <meta name="twitter:description" content="React 18で追加された革新的な新機能を詳しく解説。Concurrent Features、Suspense、自動バッチング等の実装方法を実例付きで紹介。">
    <meta name="twitter:image" content="https://techblog.example.com/images/react-18-guide-twitter.jpg">
    <meta name="twitter:image:alt" content="React 18新機能の概要図">
    
    <!-- アプリケーション・ブランディング -->
    <meta name="application-name" content="Tech Blog">
    <meta name="theme-color" content="#2196F3">
    <meta name="msapplication-TileColor" content="#2196F3">
    <meta name="msapplication-config" content="/browserconfig.xml">
    
    <!-- ファビコンとアプリアイコン -->
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    
    <!-- RSS・Atom フィード -->
    <link rel="alternate" type="application/rss+xml" title="Tech Blog RSS" href="https://techblog.example.com/feed.xml">
    <link rel="alternate" type="application/atom+xml" title="Tech Blog Atom" href="https://techblog.example.com/feed.atom">
    
    <!-- DNSプリフェッチとプリコネクト -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    
    <!-- 構造化データ (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://techblog.example.com/articles/react-18-complete-guide"
      },
      "headline": "React 18の新機能完全ガイド",
      "description": "React 18で追加された革新的な新機能を詳しく解説。Concurrent Features、Suspense、自動バッチング等の実装方法と活用テクニックを実例付きで紹介します。",
      "image": {
        "@type": "ImageObject",
        "url": "https://techblog.example.com/images/react-18-guide-main.jpg",
        "width": 1200,
        "height": 800
      },
      "author": {
        "@type": "Person",
        "name": "山田太郎",
        "url": "https://techblog.example.com/authors/yamada-taro",
        "sameAs": [
          "https://twitter.com/yamada_dev",
          "https://github.com/yamada-dev"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Tech Blog",
        "logo": {
          "@type": "ImageObject",
          "url": "https://techblog.example.com/images/logo.png",
          "width": 300,
          "height": 100
        }
      },
      "datePublished": "2024-01-15T09:00:00+09:00",
      "dateModified": "2024-01-16T14:30:00+09:00",
      "articleSection": "フロントエンド開発",
      "keywords": ["React 18", "JavaScript", "フロントエンド", "Web開発"],
      "wordCount": 2500,
      "timeRequired": "PT15M",
      "inLanguage": "ja-JP"
    }
    </script>
    
    <!-- パンくずリスト構造化データ -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "ホーム",
          "item": "https://techblog.example.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "フロントエンド",
          "item": "https://techblog.example.com/categories/frontend"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "React",
          "item": "https://techblog.example.com/categories/react"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "React 18の新機能完全ガイド"
        }
      ]
    }
    </script>
    
    <!-- Webサイト構造化データ -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Tech Blog",
      "url": "https://techblog.example.com/",
      "description": "最新のプログラミング技術とウェブ開発のトレンドを発信するテクニカルブログ",
      "publisher": {
        "@type": "Organization",
        "name": "Tech Blog"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://techblog.example.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.7; max-width: 800px; margin: 0 auto; padding: 20px;
            color: #333;
        }
        header { margin-bottom: 2rem; }
        .breadcrumb { font-size: 0.9rem; color: #666; margin-bottom: 1rem; }
        .breadcrumb a { color: #2196F3; text-decoration: none; }
        .meta { font-size: 0.9rem; color: #666; margin: 1rem 0; }
        .reading-time { background: #f0f0f0; padding: 0.5rem 1rem; border-radius: 4px; }
        .share-buttons { margin: 2rem 0; }
        .share-buttons a { 
            display: inline-block; margin-right: 10px; padding: 8px 16px; 
            background: #2196F3; color: white; text-decoration: none; border-radius: 4px;
        }
        .author-info { 
            background: #f9f9f9; padding: 1rem; border-radius: 8px; margin: 2rem 0;
            display: flex; gap: 1rem; align-items: center;
        }
        .author-avatar { width: 60px; height: 60px; border-radius: 50%; }
    </style>
</head>
<body>
    <header>
        <nav class="breadcrumb" aria-label="パンくずリスト">
            <a href="/">ホーム</a> &gt; 
            <a href="/categories/frontend">フロントエンド</a> &gt; 
            <a href="/categories/react">React</a> &gt; 
            React 18の新機能完全ガイド
        </nav>
        
        <h1>React 18の新機能完全ガイド</h1>
        
        <div class="meta">
            <time datetime="2024-01-15T09:00:00+09:00">2024年1月15日公開</time>
            <span> | </span>
            <time datetime="2024-01-16T14:30:00+09:00">2024年1月16日更新</time>
            <span> | </span>
            著者: <a href="/authors/yamada-taro" rel="author">山田太郎</a>
            <span> | </span>
            カテゴリー: <a href="/categories/frontend">フロントエンド</a>
        </div>
        
        <div class="reading-time">
            <strong>読了時間:</strong> 約15分
        </div>
    </header>
    
    <main>
        <article itemscope itemtype="https://schema.org/Article">
            <meta itemprop="headline" content="React 18の新機能完全ガイド">
            <meta itemprop="description" content="React 18で追加された革新的な新機能を詳しく解説。Concurrent Features、Suspense、自動バッチング等の実装方法と活用テクニックを実例付きで紹介します。">
            <meta itemprop="datePublished" content="2024-01-15T09:00:00+09:00">
            <meta itemprop="dateModified" content="2024-01-16T14:30:00+09:00">
            <meta itemprop="wordCount" content="2500">
            
            <div itemprop="author" itemscope itemtype="https://schema.org/Person">
                <meta itemprop="name" content="山田太郎">
                <meta itemprop="url" content="https://techblog.example.com/authors/yamada-taro">
            </div>
            
            <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
                <meta itemprop="name" content="Tech Blog">
                <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
                    <meta itemprop="url" content="https://techblog.example.com/images/logo.png">
                </div>
            </div>
            
            <img 
                src="https://via.placeholder.com/800x400/2196F3/FFFFFF?text=React+18+New+Features"
                alt="React 18の新機能を示すイラスト図"
                itemprop="image"
                style="width: 100%; height: auto; border-radius: 8px; margin: 1rem 0;">
            
            <section>
                <h2>はじめに</h2>
                <p>React 18は、Reactの歴史における重要なマイルストーンです。この記事では、新しく追加された機能とその実践的な使用方法について詳しく解説します。</p>
            </section>
            
            <section>
                <h2>主な新機能</h2>
                
                <h3>1. Concurrent Features</h3>
                <p>Concurrent Featuresは、React 18の最も革新的な機能の一つです。これにより、Reactアプリケーションの応答性が大幅に向上します。</p>
                
                <h3>2. 自動バッチング</h3>
                <p>React 18では、すべての状態更新が自動的にバッチ処理されるようになりました。これにより、パフォーマンスが向上します。</p>
                
                <h3>3. Suspenseの改良</h3>
                <p>SuspenseコンポーネントがServer-Side Renderingでもサポートされるようになりました。</p>
            </section>
            
            <section>
                <h2>実装例</h2>
                <p>以下は、React 18の新機能を活用したコード例です：</p>
                <pre><code>
import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';

const root = createRoot(document.getElementById('root'));
root.render(
  &lt;Suspense fallback={&lt;Loading /&gt;}&gt;
    &lt;App /&gt;
  &lt;/Suspense&gt;
);
                </code></pre>
            </section>
            
            <section>
                <h2>まとめ</h2>
                <p>React 18は、開発者にとって多くの新しい可能性を提供します。これらの機能を適切に活用することで、より高性能で使いやすいWebアプリケーションを作成できます。</p>
            </section>
        </article>
        
        <div class="share-buttons">
            <strong>この記事をシェア:</strong>
            <a href="https://twitter.com/intent/tweet?url=https%3A//techblog.example.com/articles/react-18-complete-guide&text=React%2018%E3%81%AE%E6%96%B0%E6%A9%9F%E8%83%BD%E5%AE%8C%E5%85%A8%E3%82%AC%E3%82%A4%E3%83%89" target="_blank" rel="noopener">Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//techblog.example.com/articles/react-18-complete-guide" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A//techblog.example.com/articles/react-18-complete-guide" target="_blank" rel="noopener">LinkedIn</a>
        </div>
        
        <div class="author-info" itemscope itemtype="https://schema.org/Person">
            <img 
                src="https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=YT" 
                alt="山田太郎のアバター" 
                class="author-avatar"
                itemprop="image">
            <div>
                <h3 itemprop="name">山田太郎</h3>
                <p itemprop="description">フロントエンド開発者。React、Vue.js、TypeScriptを専門とし、5年以上のWeb開発経験を持つ。最新技術の習得と知識共有に情熱を注いでいる。</p>
                <p>
                    <a href="https://twitter.com/yamada_dev" itemprop="sameAs" target="_blank" rel="noopener">Twitter</a> |
                    <a href="https://github.com/yamada-dev" itemprop="sameAs" target="_blank" rel="noopener">GitHub</a>
                </p>
            </div>
        </div>
    </main>
    
    <aside>
        <section>
            <h3>関連記事</h3>
            <ul>
                <li><a href="/articles/react-performance-optimization">React パフォーマンス最適化のベストプラクティス</a></li>
                <li><a href="/articles/react-hooks-advanced">React Hooks 上級テクニック</a></li>
                <li><a href="/articles/next-js-13-app-router">Next.js 13 App Router 完全ガイド</a></li>
            </ul>
        </section>
    </aside>
</body>
</html>`,
            order: 2,
            hints: {
              create: [
                { content: '<title>と<meta name="description">はSEOで最も重要な要素です' },
                { content: 'Open Graph (og:)とTwitter Cards (twitter:)でSNSでの見栄えを改善します' },
                { content: 'JSON-LD構造化データで検索エンジンにコンテンツ情報を提供します' },
                { content: '<link rel="canonical">で重複コンテンツ問題を回避します' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'ホーム > フロントエンド > React > React 18の新機能完全ガイド\nReact 18の新機能完全ガイド\n2024年1月15日公開 | 2024年1月16日更新 | 著者: 山田太郎 | カテゴリー: フロントエンド\n読了時間: 約15分\n[React 18新機能イメージ]\nはじめに\nReact 18は、Reactの歴史における重要なマイルストーンです。この記事では、新しく追加された機能とその実践的な使用方法について詳しく解説します。\n主な新機能\n1. Concurrent Features\nConcurrent Featuresは、React 18の最も革新的な機能の一つです。これにより、Reactアプリケーションの応答性が大幅に向上します。\n2. 自動バッチング\nReact 18では、すべての状態更新が自動的にバッチ処理されるようになりました。これにより、パフォーマンスが向上します。\n3. Suspenseの改良\nSuspenseコンポーネントがServer-Side Renderingでもサポートされるようになりました。\n実装例\n以下は、React 18の新機能を活用したコード例です：\n[コードブロック]\nまとめ\nReact 18は、開発者にとって多くの新しい可能性を提供します。これらの機能を適切に活用することで、より高性能で使いやすいWebアプリケーションを作成できます。\nこの記事をシェア:\nTwitter Facebook LinkedIn\n[山田太郎のアバター]\n山田太郎\nフロントエンド開発者。React、Vue.js、TypeScriptを専門とし、5年以上のWeb開発経験を持つ。最新技術の習得と知識共有に情熱を注いでいる。\nTwitter | GitHub\n関連記事\n• React パフォーマンス最適化のベストプラクティス\n• React Hooks 上級テクニック\n• Next.js 13 App Router 完全ガイド',
                  description: 'SEO最適化された包括的なブログ記事ページが正しく作成される'
                }
              ]
            }
          },
          {
            title: 'パフォーマンス最適化',
            description: 'リソースヒント、画像最適化、レイジーローディング、Service Workerなどのパフォーマンス最適化手法を学習します。',
            starterCode: `<!-- パフォーマンス最適化されたEコマースページを作成してください -->
<!-- リソースヒント、最適化された画像、レイジーローディング、PWA対応 -->

<!-- ここにコードを書いてください: -->`,
            solution: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>高速Eコマースストア - パフォーマンス最適化デモ</title>
    <meta name="description" content="パフォーマンス最適化技術を駆使した高速なEコマースサイトのデモンストレーション">
    
    <!-- クリティカルCSS（上記の内容表示に必要な最小限のCSS） -->
    <style>
        /* Critical CSS - Above the fold content */
        body { 
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0; line-height: 1.6; background: #fff; color: #333;
        }
        .header { 
            background: #2c3e50; color: white; padding: 1rem 0; 
            position: sticky; top: 0; z-index: 100; 
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .hero { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; text-align: center; padding: 4rem 0;
        }
        .loading { 
            display: inline-block; width: 20px; height: 20px;
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%; border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
    
    <!-- DNS Prefetch - 外部リソースの DNS 解決を事前実行 -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//images.unsplash.com">
    <link rel="dns-prefetch" href="//api.stripe.com">
    
    <!-- Preconnect - 重要な外部リソースへの接続を事前確立 -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Resource Hints - 重要なリソースの事前読み込み -->
    <link rel="preload" href="/fonts/primary-font.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/images/hero-bg.webp" as="image" type="image/webp">
    <link rel="preload" href="/css/main.css" as="style">
    
    <!-- Module Preload - JavaScriptモジュールの事前読み込み -->
    <link rel="modulepreload" href="/js/app.js">
    <link rel="modulepreload" href="/js/product-grid.js">
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#2c3e50">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Fast Store">
    
    <!-- アイコン（複数サイズ） -->
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
    
    <!-- 非同期でノンクリティカルCSSを読み込み -->
    <link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/css/main.css"></noscript>
    
    <!-- Web Fonts最適化 -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet"></noscript>
</head>
<body>
    <!-- Header with performance-optimized navigation -->
    <header class="header">
        <div class="container">
            <nav style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <!-- Optimized logo with WebP support -->
                    <picture>
                        <source srcset="/images/logo.webp" type="image/webp">
                        <source srcset="/images/logo.avif" type="image/avif">
                        <img src="/images/logo.png" alt="Fast Store Logo" width="120" height="40" style="height: 40px; width: auto;">
                    </picture>
                    <h1 style="margin: 0; font-size: 1.5rem;">Fast Store</h1>
                </div>
                
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <button id="search-btn" style="background: none; border: 1px solid white; color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                        検索
                    </button>
                    <button id="cart-btn" style="background: #e74c3c; border: none; color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                        カート (<span id="cart-count">0</span>)
                    </button>
                </div>
            </nav>
        </div>
    </header>
    
    <!-- Hero Section with optimized background -->
    <section class="hero">
        <div class="container">
            <h2 style="font-size: 3rem; margin: 0 0 1rem 0;">⚡ 超高速ストア</h2>
            <p style="font-size: 1.2rem; margin: 0 0 2rem 0;">パフォーマンス最適化技術で実現する快適なショッピング体験</p>
            <button style="background: #e74c3c; border: none; color: white; font-size: 1.1rem; padding: 1rem 2rem; border-radius: 8px; cursor: pointer;">
                今すぐ買い物を始める
            </button>
        </div>
    </section>
    
    <!-- Product Grid with Lazy Loading -->
    <main class="container" style="padding: 4rem 1rem;">
        <h2 style="text-align: center; margin-bottom: 3rem;">人気商品</h2>
        
        <!-- Progressive Enhancement: まず軽量なプレースホルダーを表示 -->
        <div id="product-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
            <!-- Product placeholders for immediate display -->
            <div class="product-placeholder" style="background: #f8f9fa; border-radius: 8px; overflow: hidden; aspect-ratio: 3/4;">
                <div style="height: 60%; background: #e9ecef; display: flex; align-items: center; justify-content: center;">
                    <div class="loading"></div>
                </div>
                <div style="padding: 1rem;">
                    <div style="height: 20px; background: #e9ecef; margin-bottom: 0.5rem; border-radius: 4px;"></div>
                    <div style="height: 16px; background: #e9ecef; width: 60%; border-radius: 4px;"></div>
                </div>
            </div>
            
            <div class="product-placeholder" style="background: #f8f9fa; border-radius: 8px; overflow: hidden; aspect-ratio: 3/4;">
                <div style="height: 60%; background: #e9ecef; display: flex; align-items: center; justify-content: center;">
                    <div class="loading"></div>
                </div>
                <div style="padding: 1rem;">
                    <div style="height: 20px; background: #e9ecef; margin-bottom: 0.5rem; border-radius: 4px;"></div>
                    <div style="height: 16px; background: #e9ecef; width: 60%; border-radius: 4px;"></div>
                </div>
            </div>
            
            <div class="product-placeholder" style="background: #f8f9fa; border-radius: 8px; overflow: hidden; aspect-ratio: 3/4;">
                <div style="height: 60%; background: #e9ecef; display: flex; align-items: center; justify-content: center;">
                    <div class="loading"></div>
                </div>
                <div style="padding: 1rem;">
                    <div style="height: 20px; background: #e9ecef; margin-bottom: 0.5rem; border-radius: 4px;"></div>
                    <div style="height: 16px; background: #e9ecef; width: 60%; border-radius: 4px;"></div>
                </div>
            </div>
        </div>
        
        <!-- Intersection Observer で遅延読み込みされる追加コンテンツ -->
        <div id="lazy-content" style="margin-top: 4rem;">
            <!-- This section will be loaded when it comes into view -->
        </div>
    </main>
    
    <!-- Footer (非クリティカル) -->
    <footer id="footer" style="background: #2c3e50; color: white; padding: 3rem 0; margin-top: 4rem;">
        <!-- Footer content will be lazy loaded -->
    </footer>
    
    <!-- Performance optimized JavaScript loading -->
    <script>
        // Critical JavaScript for immediate functionality
        
        // Service Worker registration for caching
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => console.log('SW registered'))
                    .catch(error => console.log('SW registration failed'));
            });
        }
        
        // Intersection Observer for lazy loading
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        lazyImageObserver.unobserve(img);
                    }
                }
            });
        }, observerOptions);
        
        // Lazy load non-critical content
        const contentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadLazyContent();
                    contentObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Initialize lazy loading
        document.addEventListener('DOMContentLoaded', () => {
            // Observe lazy content sections
            const lazyContent = document.getElementById('lazy-content');
            if (lazyContent) contentObserver.observe(lazyContent);
            
            // Load products with progressive enhancement
            loadProducts();
        });
        
        function loadProducts() {
            // Simulate product loading with performance optimization
            const products = [
                {
                    id: 1,
                    name: 'パフォーマンス・ウェア',
                    price: 12800,
                    image: 'https://via.placeholder.com/280x200/4CAF50/FFFFFF?text=Product+1'
                },
                {
                    id: 2,
                    name: 'スマート・デバイス',
                    price: 45600,
                    image: 'https://via.placeholder.com/280x200/2196F3/FFFFFF?text=Product+2'
                },
                {
                    id: 3,
                    name: 'エコ・ライフスタイル',
                    price: 8900,
                    image: 'https://via.placeholder.com/280x200/FF9800/FFFFFF?text=Product+3'
                }
            ];
            
            const grid = document.getElementById('product-grid');
            
            // Remove placeholders and add real products
            setTimeout(() => {
                grid.innerHTML = products.map(product => \`
                    <article class="product-card" style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s;">
                        <picture>
                            <source srcset="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 280 200'%3E%3Crect fill='%23f0f0f0'/%3E%3C/svg%3E" type="image/svg+xml">
                            <img 
                                class="lazy" 
                                data-src="\${product.image}"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 280 200'%3E%3Crect fill='%23f0f0f0'/%3E%3C/svg%3E"
                                alt="\${product.name}"
                                width="280"
                                height="200"
                                loading="lazy"
                                style="width: 100%; height: 200px; object-fit: cover;">
                        </picture>
                        <div style="padding: 1rem;">
                            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">\${product.name}</h3>
                            <p style="margin: 0; font-size: 1.2rem; font-weight: 600; color: #e74c3c;">
                                ¥\${product.price.toLocaleString()}
                            </p>
                            <button onclick="addToCart(\${product.id})" style="width: 100%; background: #27ae60; border: none; color: white; padding: 0.5rem; margin-top: 1rem; border-radius: 4px; cursor: pointer;">
                                カートに追加
                            </button>
                        </div>
                    </article>
                \`).join('');
                
                // Start observing lazy images
                document.querySelectorAll('img.lazy').forEach(img => {
                    lazyImageObserver.observe(img);
                });
                
            }, 800); // Simulate network delay
        }
        
        function loadLazyContent() {
            const lazyContent = document.getElementById('lazy-content');
            lazyContent.innerHTML = \`
                <section style="text-align: center; background: #f8f9fa; padding: 3rem; border-radius: 12px;">
                    <h2>💡 パフォーマンス最適化技術</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem;">
                        <div>
                            <h3>🚀 リソースヒント</h3>
                            <p>DNS Prefetch、Preconnect、Preloadで読み込み時間を短縮</p>
                        </div>
                        <div>
                            <h3>🖼️ 画像最適化</h3>
                            <p>WebP/AVIF形式、Lazy Loading、レスポンシブ画像</p>
                        </div>
                        <div>
                            <h3>⚡ JavaScript最適化</h3>
                            <p>コード分割、モジュール事前読み込み、非同期実行</p>
                        </div>
                        <div>
                            <h3>💾 キャッシング</h3>
                            <p>Service Worker、ブラウザキャッシュ活用</p>
                        </div>
                    </div>
                </section>
            \`;
        }
        
        // Simple cart functionality
        let cartItems = 0;
        function addToCart(productId) {
            cartItems++;
            document.getElementById('cart-count').textContent = cartItems;
            
            // Show visual feedback
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = '追加済み ✓';
            button.style.background = '#27ae60';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#27ae60';
            }, 1500);
        }
        
        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart + 'ms');
                    
                    // Report Core Web Vitals
                    if ('web-vitals' in window) {
                        // This would normally use the web-vitals library
                        console.log('Monitoring Core Web Vitals...');
                    }
                }, 0);
            });
        }
    </script>
    
    <!-- Non-critical JavaScript loaded asynchronously -->
    <script async defer src="/js/analytics.js"></script>
    <script type="module" src="/js/advanced-features.js"></script>
    
    <!-- Structured Data for SEO (non-render blocking) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Fast Store",
      "url": "https://faststore.example.com",
      "description": "パフォーマンス最適化技術を駆使した高速なEコマースサイト",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://faststore.example.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
</body>
</html>`,
            order: 3,
            hints: {
              create: [
                { content: 'dns-prefetch, preconnect, preloadでリソース読み込みを最適化します' },
                { content: 'loading="lazy"属性で画像の遅延読み込みが可能です' },
                { content: 'Intersection Observerでビューポートに入った時の処理を制御できます' },
                { content: 'Service Workerでオフライン対応とキャッシングを実現できます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'Fast Store\n⚡ 超高速ストア\nパフォーマンス最適化技術で実現する快適なショッピング体験\n今すぐ買い物を始める\n人気商品\n[商品読み込み中のプレースホルダー × 3]\n→ 読み込み完了後:\nパフォーマンス・ウェア ¥12,800 [カートに追加]\nスマート・デバイス ¥45,600 [カートに追加]\nエコ・ライフスタイル ¥8,900 [カートに追加]\n💡 パフォーマンス最適化技術\n🚀 リソースヒント: DNS Prefetch、Preconnect、Preloadで読み込み時間を短縮\n🖼️ 画像最適化: WebP/AVIF形式、Lazy Loading、レスポンシブ画像\n⚡ JavaScript最適化: コード分割、モジュール事前読み込み、非同期実行\n💾 キャッシング: Service Worker、ブラウザキャッシュ活用',
                  description: 'パフォーマンス最適化されたEコマースページが正しく作成される'
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('HTML lessons seeded successfully!')
}