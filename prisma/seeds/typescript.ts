import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedTypeScriptLessons() {
  // TypeScript 初級レッスン
  const tsBeginnerLesson = await prisma.lesson.create({
    data: {
      title: 'TypeScript 初級',
      description: 'TypeScriptの基本的な型システム、インターフェース、型注釈の使い方を学びます。JavaScriptに型安全性を追加する方法を習得できます。',
      language: 'typescript',
      difficulty: 'BEGINNER',
      exercises: {
        create: [
          {
            title: '基本的な型注釈',
            description: 'TypeScriptの基本的な型（string、number、boolean、array）の注釈方法を学習します。',
            starterCode: `// TypeScriptの基本的な型注釈を追加してください
// 各変数と関数に適切な型を指定してください

// ここにコードを書いてください:
let userName;
let userAge;
let isActive;
let hobbies;

function greetUser(name, age) {
    return \`こんにちは、\${name}さん！年齢は\${age}歳ですね。\`;
}

function calculateTotal(prices) {
    return prices.reduce((sum, price) => sum + price, 0);
}

// 使用例
userName = "田中太郎";
userAge = 25;
isActive = true;
hobbies = ["読書", "映画鑑賞", "プログラミング"];

console.log(greetUser(userName, userAge));
console.log("趣味の数:", hobbies.length);
console.log("合計金額:", calculateTotal([100, 200, 300]));`,
            solution: `// TypeScriptの基本的な型注釈
let userName: string;
let userAge: number;
let isActive: boolean;
let hobbies: string[];

// 関数の引数と戻り値に型注釈を追加
function greetUser(name: string, age: number): string {
    return \`こんにちは、\${name}さん！年齢は\${age}歳ですね。\`;
}

function calculateTotal(prices: number[]): number {
    return prices.reduce((sum, price) => sum + price, 0);
}

// より詳細な型定義の例
function processUserData(
    name: string, 
    age: number, 
    isActive: boolean, 
    hobbies: string[]
): { message: string; summary: string } {
    const message = greetUser(name, age);
    const summary = \`ステータス: \${isActive ? 'アクティブ' : '非アクティブ'}, 趣味数: \${hobbies.length}\`;
    
    return { message, summary };
}

// Union型の例
type Status = 'active' | 'inactive' | 'pending';
let userStatus: Status = 'active';

// 配列の複数の型定義方法
let scores1: number[] = [85, 92, 78];
let scores2: Array<number> = [85, 92, 78];

// 使用例
userName = "田中太郎";
userAge = 25;
isActive = true;
hobbies = ["読書", "映画鑑賞", "プログラミング"];

console.log(greetUser(userName, userAge));
console.log("趣味の数:", hobbies.length);
console.log("合計金額:", calculateTotal([100, 200, 300]));

const userData = processUserData(userName, userAge, isActive, hobbies);
console.log(userData.message);
console.log(userData.summary);
console.log("ステータス:", userStatus);`,
            order: 1,
            hints: {
              create: [
                { content: '変数名: 型名 で型注釈を追加します' },
                { content: 'function name(param: type): returnType の形で関数に型を指定' },
                { content: 'string[], number[] で配列の型を指定' },
                { content: '"value1" | "value2" でUnion型を作成' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'こんにちは、田中太郎さん！年齢は25歳ですね。\n趣味の数: 3\n合計金額: 600\nこんにちは、田中太郎さん！年齢は25歳ですね。\nステータス: アクティブ, 趣味数: 3\nステータス: active',
                  description: '基本的な型注釈が正しく適用される'
                }
              ]
            }
          },
          {
            title: 'インターフェースとオブジェクト型',
            description: 'TypeScriptのインターフェースを使ったオブジェクト型の定義方法を学習します。',
            starterCode: `// インターフェースを使ってオブジェクト型を定義してください
// User、Product、Order のインターフェースを作成

// ここにコードを書いてください:

// ユーザー情報を処理する関数
function displayUserInfo(user) {
    console.log(\`ユーザー: \${user.name} (\${user.email})\`);
    console.log(\`年齢: \${user.age}歳\`);
    if (user.address) {
        console.log(\`住所: \${user.address.city}, \${user.address.country}\`);
    }
}

// 商品情報を処理する関数
function displayProduct(product) {
    console.log(\`商品: \${product.name}\`);
    console.log(\`価格: ¥\${product.price}\`);
    console.log(\`在庫: \${product.inStock ? 'あり' : 'なし'}\`);
    if (product.category) {
        console.log(\`カテゴリー: \${product.category}\`);
    }
}

// 注文を処理する関数
function processOrder(order) {
    console.log(\`注文ID: \${order.id}\`);
    console.log(\`顧客: \${order.customer.name}\`);
    console.log(\`商品数: \${order.items.length}\`);
    
    const total = order.items.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0
    );
    console.log(\`合計金額: ¥\${total}\`);
}`,
            solution: `// インターフェースの定義
interface Address {
    street: string;
    city: string;
    zipCode: string;
    country: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    address?: Address; // オプショナルプロパティ
    isActive: boolean;
}

interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    category?: string; // オプショナルプロパティ
    description?: string;
}

interface OrderItem {
    product: Product;
    quantity: number;
}

interface Order {
    id: string;
    customer: User;
    items: OrderItem[];
    orderDate: Date;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

// ユーザー情報を処理する関数
function displayUserInfo(user: User): void {
    console.log(\`ユーザー: \${user.name} (\${user.email})\`);
    console.log(\`年齢: \${user.age}歳\`);
    if (user.address) {
        console.log(\`住所: \${user.address.city}, \${user.address.country}\`);
    }
}

// 商品情報を処理する関数
function displayProduct(product: Product): void {
    console.log(\`商品: \${product.name}\`);
    console.log(\`価格: ¥\${product.price}\`);
    console.log(\`在庫: \${product.inStock ? 'あり' : 'なし'}\`);
    if (product.category) {
        console.log(\`カテゴリー: \${product.category}\`);
    }
}

// 注文を処理する関数
function processOrder(order: Order): void {
    console.log(\`注文ID: \${order.id}\`);
    console.log(\`顧客: \${order.customer.name}\`);
    console.log(\`商品数: \${order.items.length}\`);
    
    const total = order.items.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0
    );
    console.log(\`合計金額: ¥\${total}\`);
}

// 使用例
const sampleUser: User = {
    id: 1,
    name: "田中太郎",
    email: "tanaka@example.com",
    age: 30,
    address: {
        street: "1-2-3 番地",
        city: "東京",
        zipCode: "100-0001",
        country: "日本"
    },
    isActive: true
};

const sampleProduct: Product = {
    id: 1,
    name: "TypeScript学習本",
    price: 3200,
    inStock: true,
    category: "書籍"
};

const sampleOrder: Order = {
    id: "ORD-001",
    customer: sampleUser,
    items: [
        {
            product: sampleProduct,
            quantity: 2
        }
    ],
    orderDate: new Date(),
    status: 'pending'
};

displayUserInfo(sampleUser);
console.log("---");
displayProduct(sampleProduct);
console.log("---");
processOrder(sampleOrder);`,
            order: 2,
            hints: {
              create: [
                { content: 'interface Name { property: type } でインターフェースを定義' },
                { content: 'property?: type でオプショナルプロパティを作成' },
                { content: 'ネストしたオブジェクト型も定義可能' },
                { content: '"value1" | "value2" でリテラル型を組み合わせ' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'ユーザー: 田中太郎 (tanaka@example.com)\n年齢: 30歳\n住所: 東京, 日本\n---\n商品: TypeScript学習本\n価格: ¥3200\n在庫: あり\nカテゴリー: 書籍\n---\n注文ID: ORD-001\n顧客: 田中太郎\n商品数: 1\n合計金額: ¥6400',
                  description: 'インターフェースを使ったオブジェクト型が正しく動作する'
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('TypeScript beginner lesson seeded successfully!')
}