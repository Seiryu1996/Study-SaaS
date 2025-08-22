import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedPHPLessons() {
  // PHP 初級レッスン
  const phpBeginnerLesson = await prisma.lesson.create({
    data: {
      title: 'PHP 初級',
      description: 'PHPの基本的な構文、変数、関数、クラスを学びます。Webアプリケーション開発の基礎を習得できます。',
      language: 'php',
      difficulty: 'BEGINNER',
      exercises: {
        create: [
          {
            title: '変数とデータ型',
            description: 'PHPの変数宣言と基本的なデータ型の使い方を学習します。',
            starterCode: `<?php
// PHPの基本的な変数とデータ型を使ってみましょう
// $name（文字列）、$age（数値）、$isStudent（真偽値）、$hobbies（配列）を定義

// ここにコードを書いてください:

// 変数を出力してください
echo "名前: " . $name . "\\n";
echo "年齢: " . $age . "\\n";
echo "学生: " . ($isStudent ? 'true' : 'false') . "\\n";
echo "趣味: " . implode(', ', $hobbies) . "\\n";
?>`,
            solution: `<?php
// PHPの基本的な変数とデータ型を使ってみましょう
$name = "田中太郎";
$age = 25;
$isStudent = true;
$hobbies = ["読書", "映画鑑賞", "プログラミング"];

// 変数を出力してください
echo "名前: " . $name . "\\n";
echo "年齢: " . $age . "\\n";
echo "学生: " . ($isStudent ? 'true' : 'false') . "\\n";
echo "趣味: " . implode(', ', $hobbies) . "\\n";

// 配列の操作例
echo "趣味の数: " . count($hobbies) . "\\n";
echo "最初の趣味: " . $hobbies[0] . "\\n";

// 変数の型を確認
echo "nameの型: " . gettype($name) . "\\n";
echo "ageの型: " . gettype($age) . "\\n";
?>`,
            order: 1,
            hints: {
              create: [
                { content: 'PHPでは変数名の前に$を付けます' },
                { content: '. 演算子で文字列を連結できます' },
                { content: 'echo で値を出力できます' },
                { content: '配列は["要素1", "要素2"]または array()で作成' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 田中太郎\n年齢: 25\n学生: true\n趣味: 読書, 映画鑑賞, プログラミング\n趣味の数: 3\n最初の趣味: 読書\nnameの型: string\nageの型: integer',
                  description: '変数とデータ型が正しく使用される'
                }
              ]
            }
          },
          {
            title: '関数の定義',
            description: 'PHPで関数を定義し、使用する方法を学習します。',
            starterCode: `<?php
// greet関数を定義してください
// 引数: $name
// 戻り値: 挨拶メッセージの文字列
// ここに関数を書いてください:

// 関数の使用例
echo greet("PHP") . "\\n";
echo greet("プログラマー") . "\\n";

// デフォルト引数を持つ関数も作成してください
// introduce関数: $name, $age = 20
// ここに関数を書いてください:

echo introduce("佐藤") . "\\n";
echo introduce("田中", 25) . "\\n";
?>`,
            solution: `<?php
// greet関数を定義してください
function greet($name) {
    return "こんにちは、" . $name . "さん！";
}

// 関数の使用例
echo greet("PHP") . "\\n";
echo greet("プログラマー") . "\\n";

// デフォルト引数を持つ関数も作成してください
function introduce($name, $age = 20) {
    return "私は" . $name . "です。" . $age . "歳です。";
}

echo introduce("佐藤") . "\\n";
echo introduce("田中", 25) . "\\n";

// 可変引数の関数例
function calculateSum(...$numbers) {
    $sum = 0;
    foreach ($numbers as $number) {
        $sum += $number;
    }
    return $sum;
}

echo "合計: " . calculateSum(1, 2, 3, 4, 5) . "\\n";

// 配列を返す関数
function getPersonInfo() {
    return [
        'name' => '山田花子',
        'age' => 30,
        'city' => '東京'
    ];
}

$person = getPersonInfo();
echo "人物情報: " . $person['name'] . ", " . $person['age'] . "歳, " . $person['city'] . "\\n";
?>`,
            order: 2,
            hints: {
              create: [
                { content: 'function 関数名($引数) { } で関数を定義' },
                { content: 'return文で値を返します' },
                { content: 'デフォルト引数は $引数名 = デフォルト値 で設定' },
                { content: '...$引数 で可変引数を定義できます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'こんにちは、PHPさん！\nこんにちは、プログラマーさん！\n私は佐藤です。20歳です。\n私は田中です。25歳です。\n合計: 15\n人物情報: 山田花子, 30歳, 東京',
                  description: '関数が正しく動作し結果が出力される'
                }
              ]
            }
          },
          {
            title: 'クラスとオブジェクト指向',
            description: 'PHPのクラス定義、プロパティ、メソッド、継承の基本を学習します。',
            starterCode: `<?php
// Vehicleクラスを定義してください
// プロパティ: $brand, $year
// メソッド: __construct, getInfo, start
// ここにクラスを書いてください:

// Carクラスを定義してください（Vehicleを継承）
// プロパティ: $doors を追加
// メソッド: getInfo をオーバーライド
// ここにクラスを書いてください:

// クラスの使用例
$car = new Car("トヨタ", 2020, 4);
echo $car->getInfo() . "\\n";
echo $car->start() . "\\n";
?>`,
            solution: `<?php
// Vehicleクラスを定義してください
class Vehicle {
    protected $brand;
    protected $year;
    
    public function __construct($brand, $year) {
        $this->brand = $brand;
        $this->year = $year;
    }
    
    public function getInfo() {
        return $this->year . "年製 " . $this->brand;
    }
    
    public function start() {
        return $this->brand . "のエンジンを始動しました";
    }
}

// Carクラスを定義してください（Vehicleを継承）
class Car extends Vehicle {
    private $doors;
    
    public function __construct($brand, $year, $doors) {
        parent::__construct($brand, $year);
        $this->doors = $doors;
    }
    
    public function getInfo() {
        return parent::getInfo() . ", " . $this->doors . "ドア";
    }
    
    public function getDoors() {
        return $this->doors;
    }
}

// クラスの使用例
$car = new Car("トヨタ", 2020, 4);
echo $car->getInfo() . "\\n";
echo $car->start() . "\\n";

// 追加の例
$bike = new Vehicle("ホンダ", 2019);
echo $bike->getInfo() . "\\n";
echo $bike->start() . "\\n";

echo "車のドア数: " . $car->getDoors() . "\\n";
?>`,
            order: 3,
            hints: {
              create: [
                { content: 'class クラス名 { } でクラスを定義' },
                { content: '__construct() はコンストラクタメソッド' },
                { content: '$this->プロパティ で自分のプロパティにアクセス' },
                { content: 'extends 親クラス名 で継承、parent:: で親メソッド呼び出し' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '2020年製 トヨタ, 4ドア\nトヨタのエンジンを始動しました\n2019年製 ホンダ\nホンダのエンジンを始動しました\n車のドア数: 4',
                  description: 'クラスの継承とオーバーライドが正しく動作する'
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('PHP lessons seeded successfully!')
}