import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedJavaScriptLessons() {
  // JavaScript 初級レッスン
  const jsBeginnerLesson = await prisma.lesson.create({
    data: {
      title: 'JavaScript 初級',
      description: 'JavaScriptの基本的な文法と概念を学びます。変数、関数、条件分岐、ループなどの基礎的な処理を習得できます。',
      language: 'javascript',
      difficulty: 'BEGINNER',
      exercises: {
        create: [
          {
            title: '変数と基本データ型',
            description: 'JavaScriptの変数宣言（let, const）と基本的なデータ型（文字列、数値、真偽値）について学習します。',
            starterCode: `// 変数を宣言して値を代入してください
// let と const の違いを理解しましょう

// ここにコードを書いてください:`,
            solution: `// 変数の宣言と代入
let name = "田中太郎";
const age = 25;
let isStudent = true;

console.log("名前:", name);
console.log("年齢:", age);
console.log("学生:", isStudent);`,
            order: 1,
            hints: [
              'letは再代入可能、constは再代入不可能な変数です',
              'console.log()を使って変数の値を出力できます'
            ],
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 田中太郎\n年齢: 25\n学生: true',
                  description: '変数が正しく宣言され出力される'
                }
              ]
            }
          },
          {
            title: '関数の定義と呼び出し',
            description: 'JavaScriptで関数を定義し、引数を受け取って戻り値を返す方法を学習します。',
            starterCode: `// 2つの数値を足し算する関数を作成してください
// 関数名: add
// 引数: a, b (数値)
// 戻り値: a + b

// ここにコードを書いてください:`,
            solution: `function add(a, b) {
  return a + b;
}

// 関数の呼び出し
let result = add(5, 3);
console.log("5 + 3 =", result);

// アロー関数の書き方
const multiply = (a, b) => a * b;
console.log("5 * 3 =", multiply(5, 3));`,
            order: 2,
            hints: {
              create: [
                { content: 'function キーワードを使って関数を定義します' },
                { content: 'return文で値を返すことができます' },
                { content: 'アロー関数(=>)でも関数を定義できます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '5 + 3 = 8\n5 * 3 = 15',
                  description: '関数が正しく動作し結果が出力される'
                }
              ]
            }
          },
          {
            title: 'if文と条件分岐',
            description: 'if文を使った条件分岐の書き方を学習します。比較演算子と論理演算子も覚えましょう。',
            starterCode: `// 年齢に応じてメッセージを表示する条件分岐を書いてください
// 18歳未満: "未成年です"
// 18歳以上65歳未満: "成人です"
// 65歳以上: "シニアです"

let age = 25;

// ここにコードを書いてください:`,
            solution: `let age = 25;

if (age < 18) {
  console.log("未成年です");
} else if (age >= 18 && age < 65) {
  console.log("成人です");
} else {
  console.log("シニアです");
}

// 別の例
let score = 85;
if (score >= 90) {
  console.log("優秀");
} else if (score >= 70) {
  console.log("良好");
} else {
  console.log("要努力");
}`,
            order: 3,
            hints: {
              create: [
                { content: 'if, else if, elseの順序で条件を書きます' },
                { content: '&&は論理AND、||は論理ORです' },
                { content: '比較演算子: <, >, <=, >=, ===, !==' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '成人です\n良好',
                  description: '条件分岐が正しく動作する'
                }
              ]
            }
          },
          {
            title: 'forループと配列の操作',
            description: 'forループを使った繰り返し処理と配列の基本的な操作方法を学習します。',
            starterCode: `// 配列の要素を順番に表示するforループを書いてください
let fruits = ["りんご", "バナナ", "オレンジ", "ぶどう"];

// ここにコードを書いてください:`,
            solution: `let fruits = ["りんご", "バナナ", "オレンジ", "ぶどう"];

// 通常のforループ
for (let i = 0; i < fruits.length; i++) {
  console.log((i + 1) + ": " + fruits[i]);
}

console.log("---");

// for...of ループ
for (let fruit of fruits) {
  console.log("好きな果物: " + fruit);
}

// 配列の要素数を表示
console.log("果物の種類: " + fruits.length + "個");`,
            order: 4,
            hints: {
              create: [
                { content: 'for (let i = 0; i < array.length; i++)の形でループします' },
                { content: 'for...of文でも配列を反復できます' },
                { content: 'array.lengthで配列の要素数を取得できます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '1: りんご\n2: バナナ\n3: オレンジ\n4: ぶどう\n---\n好きな果物: りんご\n好きな果物: バナナ\n好きな果物: オレンジ\n好きな果物: ぶどう\n果物の種類: 4個',
                  description: 'forループで配列の要素が正しく表示される'
                }
              ]
            }
          }
        ]
      }
    }
  })

  // JavaScript 中級レッスン
  const jsIntermediateLesson = await prisma.lesson.create({
    data: {
      title: 'JavaScript 中級',
      description: 'オブジェクト、配列メソッド、非同期処理などJavaScriptの中級概念を学習します。',
      language: 'javascript',
      difficulty: 'INTERMEDIATE',
      exercises: {
        create: [
          {
            title: 'オブジェクトとメソッド',
            description: 'JavaScriptのオブジェクト作成、プロパティの操作、メソッドの定義方法を学習します。',
            starterCode: `// 人物を表すオブジェクトを作成してください
// プロパティ: name, age, city
// メソッド: introduce() - 自己紹介を表示

// ここにコードを書いてください:`,
            solution: `// オブジェクトの作成
const person = {
  name: "佐藤花子",
  age: 28,
  city: "東京",
  introduce: function() {
    console.log("こんにちは、" + this.name + "です。");
    console.log("年齢は" + this.age + "歳で、" + this.city + "に住んでいます。");
  }
};

// メソッドの呼び出し
person.introduce();

// プロパティの追加と変更
person.hobby = "読書";
console.log("趣味: " + person.hobby);`,
            order: 1,
            hints: {
              create: [
                { content: 'オブジェクトは{}で作成し、key: valueの形でプロパティを定義します' },
                { content: 'thisキーワードでオブジェクト自身を参照できます' },
                { content: 'ドット記法(object.property)でプロパティにアクセスします' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'こんにちは、佐藤花子です。\n年齢は28歳で、東京に住んでいます。\n趣味: 読書',
                  description: 'オブジェクトとメソッドが正しく動作する'
                }
              ]
            }
          },
          {
            title: '配列メソッドの活用',
            description: 'map、filter、reduce等の配列メソッドを使ったデータ処理を学習します。',
            starterCode: `// 数値の配列から偶数のみを抽出し、2倍にして合計を求めてください
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ここにコードを書いてください:`,
            solution: `let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 偶数のみを抽出
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("偶数:", evenNumbers);

// 偶数を2倍にする
const doubledEvens = evenNumbers.map(num => num * 2);
console.log("2倍にした偶数:", doubledEvens);

// 合計を計算
const sum = doubledEvens.reduce((total, num) => total + num, 0);
console.log("合計:", sum);

// 一行で書くとこうなります
const result = numbers
  .filter(num => num % 2 === 0)
  .map(num => num * 2)
  .reduce((total, num) => total + num, 0);
console.log("ワンライナーの結果:", result);`,
            order: 2,
            hints: {
              create: [
                { content: 'filter()で条件に合う要素のみを抽出できます' },
                { content: 'map()で各要素を変換できます' },
                { content: 'reduce()で配列を一つの値にまとめられます' },
                { content: 'メソッドチェーンで複数の処理を連続して実行できます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '偶数: 2,4,6,8,10\n2倍にした偶数: 4,8,12,16,20\n合計: 60\nワンライナーの結果: 60',
                  description: '配列メソッドが正しく連携して動作する'
                }
              ]
            }
          },
          {
            title: 'Promise と async/await',
            description: '非同期処理の基本的な書き方と、PromiseとAsync/Awaitの使い方を学習します。',
            starterCode: `// 3秒後にメッセージを表示する非同期関数を作成してください
// Promise版とasync/await版の両方を実装してみましょう

// ここにコードを書いてください:`,
            solution: `// Promise版
function delayMessage(message, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
}

// Promise使用例
delayMessage("Promise: 3秒経過しました", 1000)
  .then(message => console.log(message));

// async/await版
async function showDelayedMessage() {
  console.log("処理開始");
  
  try {
    const message = await delayMessage("Async/Await: 処理完了", 1000);
    console.log(message);
    
    // 複数の非同期処理
    const message2 = await delayMessage("2回目の処理完了", 1000);
    console.log(message2);
    
  } catch (error) {
    console.log("エラー:", error);
  }
}

// 実行
showDelayedMessage();`,
            order: 3,
            hints: {
              create: [
                { content: 'Promiseはnew Promise((resolve, reject) => {})で作成します' },
                { content: 'async関数でawaitキーワードを使って非同期処理を同期的に書けます' },
                { content: 'try-catchでエラーハンドリングができます' },
                { content: 'setTimeout()で指定時間後に処理を実行できます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '処理開始\nPromise: 3秒経過しました\nAsync/Await: 処理完了\n2回目の処理完了',
                  description: '非同期処理が正しい順序で実行される'
                }
              ]
            }
          }
        ]
      }
    }
  })

  // JavaScript 上級レッスン
  const jsAdvancedLesson = await prisma.lesson.create({
    data: {
      title: 'JavaScript 上級',
      description: 'クラス、継承、モジュール、高階関数などJavaScriptの上級概念を学習します。',
      language: 'javascript',
      difficulty: 'ADVANCED',
      exercises: {
        create: [
          {
            title: 'クラスと継承',
            description: 'ES6クラス構文を使ったオブジェクト指向プログラミングと継承を学習します。',
            starterCode: `// Animalクラスを作成し、Dogクラスで継承してください
// Animalクラス: name, age プロパティと speak メソッド
// Dogクラス: breed プロパティを追加し、speak メソッドをオーバーライド

// ここにコードを書いてください:`,
            solution: `// 基底クラス
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  speak() {
    console.log(this.name + "が鳴いています");
  }
  
  introduce() {
    console.log("名前: " + this.name + ", 年齢: " + this.age + "歳");
  }
}

// 継承クラス
class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age); // 親クラスのコンストラクタを呼び出し
    this.breed = breed;
  }
  
  speak() {
    console.log(this.name + "がワンワン鳴いています");
  }
  
  showBreed() {
    console.log("犬種: " + this.breed);
  }
}

// インスタンスの作成と使用
const myDog = new Dog("ポチ", 3, "柴犬");
myDog.introduce();
myDog.speak();
myDog.showBreed();`,
            order: 1,
            hints: {
              create: [
                { content: 'class キーワードでクラスを定義します' },
                { content: 'extends キーワードで継承します' },
                { content: 'super() で親クラスのコンストラクタを呼び出します' },
                { content: 'メソッドオーバーライドで親の機能を上書きできます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '名前: ポチ, 年齢: 3歳\nポチがワンワン鳴いています\n犬種: 柴犬',
                  description: 'クラスの継承とオーバーライドが正しく動作する'
                }
              ]
            }
          },
          {
            title: '高階関数とクロージャ',
            description: '関数を引数として受け取る高階関数と、クロージャの概念を学習します。',
            starterCode: `// カウンターを作成する関数（クロージャ）と
// 配列処理のための高階関数を実装してください

// ここにコードを書いてください:`,
            solution: `// クロージャを使ったカウンター
function createCounter(initialValue = 0) {
  let count = initialValue;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
    reset: () => { count = initialValue; return count; }
  };
}

const counter = createCounter(5);
console.log("初期値:", counter.getValue());
console.log("increment:", counter.increment());
console.log("increment:", counter.increment());
console.log("decrement:", counter.decrement());

// 高階関数の例
function processArray(arr, processor) {
  const result = [];
  for (let item of arr) {
    result.push(processor(item));
  }
  return result;
}

// 様々な処理関数
const double = x => x * 2;
const square = x => x * x;
const addPrefix = x => "値: " + x;

const numbers = [1, 2, 3, 4, 5];
console.log("元の配列:", numbers);
console.log("2倍:", processArray(numbers, double));
console.log("2乗:", processArray(numbers, square));
console.log("接頭辞付き:", processArray(numbers, addPrefix));`,
            order: 2,
            hints: {
              create: [
                { content: 'クロージャは内部の変数を保持し続ける仕組みです' },
                { content: '高階関数は関数を引数として受け取る関数です' },
                { content: '関数を戻り値として返すこともできます' },
                { content: 'アロー関数でより簡潔に書けます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '初期値: 5\nincrement: 6\nincrement: 7\ndecrement: 6\n元の配列: 1,2,3,4,5\n2倍: 2,4,6,8,10\n2乗: 1,4,9,16,25\n接頭辞付き: 値: 1,値: 2,値: 3,値: 4,値: 5',
                  description: 'クロージャと高階関数が正しく動作する'
                }
              ]
            }
          },
          {
            title: 'モジュールとデストラクチャリング',
            description: 'ES6モジュールシステムとデストラクチャリング代入の使い方を学習します。',
            starterCode: `// デストラクチャリングを使って効率的にデータを抽出し、
// モジュール風の書き方でユーティリティ関数を整理してください

// ここにコードを書いてください:`,
            solution: `// ユーティリティモジュール（モジュール風の書き方）
const MathUtils = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b !== 0 ? a / b : null,
  
  // 統計計算
  stats: {
    average: (numbers) => numbers.reduce((sum, n) => sum + n, 0) / numbers.length,
    max: (numbers) => Math.max(...numbers),
    min: (numbers) => Math.min(...numbers)
  }
};

// デストラクチャリングでモジュールから関数を抽出
const { add, multiply, stats } = MathUtils;
const { average, max, min } = stats;

console.log("足し算:", add(10, 5));
console.log("掛け算:", multiply(3, 4));

// 配列のデストラクチャリング
const numbers = [85, 92, 78, 96, 88];
const [first, second, ...rest] = numbers;
console.log("最初の点数:", first);
console.log("2番目の点数:", second);
console.log("残りの点数:", rest);

// オブジェクトのデストラクチャリング
const student = {
  name: "山田太郎",
  age: 20,
  scores: { math: 85, english: 92, science: 78 },
  address: { city: "大阪", prefecture: "大阪府" }
};

const { 
  name, 
  age, 
  scores: { math, english },
  address: { city }
} = student;

console.log("学生:", name + "(" + age + "歳)");
console.log("数学:", math + "点, 英語:", english + "点");
console.log("住所:", city);

// 統計計算
console.log("平均点:", average(numbers));
console.log("最高点:", max(numbers));
console.log("最低点:", min(numbers));`,
            order: 3,
            hints: {
              create: [
                { content: 'const { prop1, prop2 } = object でプロパティを抽出できます' },
                { content: 'const [first, second, ...rest] = array で配列を分割できます' },
                { content: 'ネストしたオブジェクトもデストラクチャリングできます' },
                { content: 'スプレッド演算子(...)で残りの要素をまとめられます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '足し算: 15\n掛け算: 12\n最初の点数: 85\n2番目の点数: 92\n残りの点数: 78,96,88\n学生: 山田太郎(20歳)\n数学: 85点, 英語: 92点\n住所: 大阪\n平均点: 87.8\n最高点: 96\n最低点: 78',
                  description: 'デストラクチャリングとモジュールが正しく動作する'
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('JavaScript lessons seeded successfully!')
}