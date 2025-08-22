import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedPythonLessons() {
  // Python 初級レッスン
  const pythonBeginnerLesson = await prisma.lesson.create({
    data: {
      title: 'Python 初級',
      description: 'Pythonの基本的な文法と概念を学びます。変数、関数、条件分岐、ループなどの基礎的な処理を習得できます。',
      language: 'python',
      difficulty: 'BEGINNER',
      exercises: {
        create: [
          {
            title: '変数とデータ型',
            description: 'Pythonの変数宣言と基本的なデータ型（文字列、数値、真偽値、リスト）について学習します。',
            starterCode: `# 変数を定義して様々なデータ型を使ってみましょう
# 文字列、整数、浮動小数点数、真偽値、リストを使用してください

# ここにコードを書いてください:`,
            solution: `# 基本的なデータ型
name = "田中太郎"
age = 25
height = 175.5
is_student = True
hobbies = ["読書", "映画鑑賞", "プログラミング"]

# 変数の値を出力
print("名前:", name)
print("年齢:", age)
print("身長:", height, "cm")
print("学生:", is_student)
print("趣味:", hobbies)

# リストの操作
print("趣味の数:", len(hobbies))
print("最初の趣味:", hobbies[0])`,
            order: 1,
            hints: {
              create: [
                { content: 'Pythonでは変数の型を明示的に宣言する必要はありません' },
                { content: 'print()関数で値を出力できます' },
                { content: 'リストは[]で作成し、インデックスでアクセスできます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 田中太郎\n年齢: 25\n身長: 175.5 cm\n学生: True\n趣味: [\'読書\', \'映画鑑賞\', \'プログラミング\']\n趣味の数: 3\n最初の趣味: 読書',
                  description: '変数とデータ型が正しく使用される'
                }
              ]
            }
          },
          {
            title: '関数の定義と呼び出し',
            description: 'Pythonで関数を定義し、引数を受け取って戻り値を返す方法を学習します。',
            starterCode: `# 2つの数値の計算を行う関数を作成してください
# add: 足し算
# subtract: 引き算
# multiply: 掛け算

# ここにコードを書いてください:`,
            solution: `def add(a, b):
    """2つの数値を足し算する関数"""
    return a + b

def subtract(a, b):
    """2つの数値を引き算する関数"""
    return a - b

def multiply(a, b):
    """2つの数値を掛け算する関数"""
    return a * b

# 関数の使用例
x, y = 10, 3

print(f"{x} + {y} = {add(x, y)}")
print(f"{x} - {y} = {subtract(x, y)}")
print(f"{x} * {y} = {multiply(x, y)}")

# デフォルト引数の例
def greet(name, greeting="こんにちは"):
    return f"{greeting}、{name}さん！"

print(greet("佐藤"))
print(greet("田中", "おはよう"))`,
            order: 2,
            hints: {
              create: [
                { content: 'def キーワードで関数を定義します' },
                { content: 'return文で値を返すことができます' },
                { content: 'f"{}"でフォーマット文字列を作成できます' },
                { content: 'デフォルト引数で省略可能な引数を作れます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '10 + 3 = 13\n10 - 3 = 7\n10 * 3 = 30\nこんにちは、佐藤さん！\nおはよう、田中さん！',
                  description: '関数が正しく動作し結果が出力される'
                }
              ]
            }
          },
          {
            title: 'if文と条件分岐',
            description: 'if文を使った条件分岐の書き方を学習します。比較演算子と論理演算子も覚えましょう。',
            starterCode: `# 点数に応じて成績を判定する条件分岐を書いてください
# 90点以上: A
# 80点以上90点未満: B
# 70点以上80点未満: C
# 60点以上70点未満: D
# 60点未満: F

score = 85

# ここにコードを書いてください:`,
            solution: `score = 85

if score >= 90:
    grade = "A"
    comment = "優秀"
elif score >= 80:
    grade = "B"
    comment = "良好"
elif score >= 70:
    grade = "C"
    comment = "普通"
elif score >= 60:
    grade = "D"
    comment = "要努力"
else:
    grade = "F"
    comment = "不合格"

print(f"点数: {score}点")
print(f"成績: {grade} ({comment})")

# 複数条件の例
age = 20
has_license = True

if age >= 18 and has_license:
    print("運転できます")
elif age >= 18 and not has_license:
    print("免許を取得してください")
else:
    print("年齢が足りません")`,
            order: 3,
            hints: {
              create: [
                { content: 'if, elif, elseの順序で条件を書きます' },
                { content: 'and, or, notで論理演算ができます' },
                { content: 'インデントでブロックを表現します' },
                { content: '比較演算子: <, >, <=, >=, ==, !=' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '点数: 85点\n成績: B (良好)\n運転できます',
                  description: '条件分岐が正しく動作する'
                }
              ]
            }
          },
          {
            title: 'forループとwhile文',
            description: 'forループとwhile文を使った繰り返し処理の書き方を学習します。',
            starterCode: `# リストの要素を処理するforループと
# 条件による繰り返しのwhile文を書いてください

numbers = [1, 2, 3, 4, 5]

# ここにコードを書いてください:`,
            solution: `numbers = [1, 2, 3, 4, 5]

# forループでリストの各要素を処理
print("=== forループ ===")
for num in numbers:
    square = num ** 2
    print(f"{num}の2乗は{square}")

# rangeを使ったforループ
print("\n=== range使用 ===")
for i in range(1, 6):
    print(f"{i}: {'*' * i}")

# enumerateでインデックスも取得
print("\n=== enumerate使用 ===")
fruits = ["りんご", "バナナ", "オレンジ"]
for index, fruit in enumerate(fruits):
    print(f"{index + 1}番目: {fruit}")

# while文の例
print("\n=== whileループ ===")
count = 1
total = 0
while count <= 5:
    total += count
    print(f"count: {count}, total: {total}")
    count += 1

print(f"最終合計: {total}")`,
            order: 4,
            hints: {
              create: [
                { content: 'for item in list: でリストを反復できます' },
                { content: 'range(start, stop) で数値の範囲を作れます' },
                { content: 'enumerate() でインデックスと値を同時に取得できます' },
                { content: 'while文は条件がTrueの間繰り返します' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '=== forループ ===\n1の2乗は1\n2の2乗は4\n3の2乗は9\n4の2乗は16\n5の2乗は25\n\n=== range使用 ===\n1: *\n2: **\n3: ***\n4: ****\n5: *****\n\n=== enumerate使用 ===\n1番目: りんご\n2番目: バナナ\n3番目: オレンジ\n\n=== whileループ ===\ncount: 1, total: 1\ncount: 2, total: 3\ncount: 3, total: 6\ncount: 4, total: 10\ncount: 5, total: 15\n最終合計: 15',
                  description: 'forループとwhileループが正しく動作する'
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Python 中級レッスン
  const pythonIntermediateLesson = await prisma.lesson.create({
    data: {
      title: 'Python 中級',
      description: 'リスト内包表記、辞書、クラス、例外処理などPythonの中級概念を学習します。',
      language: 'python',
      difficulty: 'INTERMEDIATE',
      exercises: {
        create: [
          {
            title: 'リスト内包表記と辞書',
            description: 'Pythonのリスト内包表記と辞書の操作方法を学習します。',
            starterCode: `# リスト内包表記を使って効率的にデータを処理し、
# 辞書を使って構造化されたデータを管理してください

# ここにコードを書いてください:`,
            solution: `# リスト内包表記の例
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 偶数の2乗を取得
even_squares = [n**2 for n in numbers if n % 2 == 0]
print("偶数の2乗:", even_squares)

# 文字列処理のリスト内包表記
words = ["python", "java", "javascript", "go"]
upper_words = [word.upper() for word in words if len(word) > 4]
print("5文字以上の大文字:", upper_words)

# 辞書の作成と操作
student_scores = {
    "田中": {"国語": 85, "数学": 92, "英語": 78},
    "佐藤": {"国語": 78, "数学": 88, "英語": 95},
    "山田": {"国語": 92, "数学": 75, "英語": 82}
}

# 各学生の平均点を計算
print("\n=== 学生の成績 ===")
for name, scores in student_scores.items():
    average = sum(scores.values()) / len(scores)
    print(f"{name}: 平均 {average:.1f}点")

# 辞書内包表記で平均点辞書を作成
averages = {name: sum(scores.values()) / len(scores) 
           for name, scores in student_scores.items()}
print("\n平均点辞書:", averages)

# 最高平均点の学生
best_student = max(averages.keys(), key=averages.get)
print(f"最高平均点: {best_student} ({averages[best_student]:.1f}点)")`,
            order: 1,
            hints: {
              create: [
                { content: '[expression for item in list if condition] でリスト内包表記を書きます' },
                { content: '辞書は{key: value}の形で作成します' },
                { content: '.items()でキーと値のペアを取得できます' },
                { content: 'max(iterable, key=function)で最大値を求められます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '偶数の2乗: [4, 16, 36, 64, 100]\n5文字以上の大文字: [\'PYTHON\', \'JAVASCRIPT\']\n\n=== 学生の成績 ===\n田中: 平均 85.0点\n佐藤: 平均 87.0点\n山田: 平均 83.0点\n\n平均点辞書: {\'田中\': 85.0, \'佐藤\': 87.0, \'山田\': 83.0}\n最高平均点: 佐藤 (87.0点)',
                  description: 'リスト内包表記と辞書操作が正しく動作する'
                }
              ]
            }
          },
          {
            title: 'クラスとオブジェクト指向',
            description: 'Pythonのクラス定義、継承、メソッドオーバーライドを学習します。',
            starterCode: `# Vehicleクラスを作成し、Carクラスで継承してください
# Vehicleクラス: brand, year, start_engine, stop_engine メソッド
# Carクラス: fuel_type を追加し、独自のメソッドを実装

# ここにコードを書いてください:`,
            solution: `class Vehicle:
    """車両の基底クラス"""
    
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year
        self.is_running = False
    
    def start_engine(self):
        if not self.is_running:
            self.is_running = True
            print(f"{self.brand}のエンジンを始動しました")
        else:
            print("エンジンは既に動いています")
    
    def stop_engine(self):
        if self.is_running:
            self.is_running = False
            print(f"{self.brand}のエンジンを停止しました")
        else:
            print("エンジンは既に停止しています")
    
    def get_info(self):
        status = "動作中" if self.is_running else "停止中"
        return f"{self.year}年製 {self.brand} (状態: {status})"

class Car(Vehicle):
    """車クラス（Vehicleを継承）"""
    
    def __init__(self, brand, year, fuel_type):
        super().__init__(brand, year)
        self.fuel_type = fuel_type
        self.mileage = 0
    
    def drive(self, distance):
        if self.is_running:
            self.mileage += distance
            print(f"{distance}km走行しました。総走行距離: {self.mileage}km")
        else:
            print("エンジンを始動してください")
    
    def get_info(self):
        base_info = super().get_info()
        return f"{base_info}, 燃料: {self.fuel_type}, 走行距離: {self.mileage}km"

# インスタンスの作成と使用
my_car = Car("トヨタ", 2020, "ガソリン")
print(my_car.get_info())

my_car.start_engine()
my_car.drive(50)
my_car.drive(30)
print(my_car.get_info())
my_car.stop_engine()`,
            order: 2,
            hints: {
              create: [
                { content: 'class ClassName: でクラスを定義します' },
                { content: '__init__メソッドはコンストラクタです' },
                { content: 'super()で親クラスのメソッドを呼び出せます' },
                { content: 'selfは現在のインスタンスを指します' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '2020年製 トヨタ (状態: 停止中), 燃料: ガソリン, 走行距離: 0km\nトヨタのエンジンを始動しました\n50km走行しました。総走行距離: 50km\n30km走行しました。総走行距離: 80km\n2020年製 トヨタ (状態: 動作中), 燃料: ガソリン, 走行距離: 80km\nトヨタのエンジンを停止しました',
                  description: 'クラスの継承とメソッドが正しく動作する'
                }
              ]
            }
          },
          {
            title: '例外処理とファイル操作',
            description: 'try-except文を使った例外処理と、withステートメントを使ったファイル操作を学習します。',
            starterCode: `# 数値の入力と計算で発生する可能性のある例外を処理し、
# 結果をファイルに保存する処理を書いてください

# ここにコードを書いてください:`,
            solution: `import os

def safe_divide(a, b):
    """安全な除算関数"""
    try:
        result = a / b
        return result, None
    except ZeroDivisionError:
        return None, "ゼロで割ることはできません"
    except TypeError:
        return None, "数値以外は計算できません"

def safe_input_number(prompt):
    """安全な数値入力"""
    while True:
        try:
            value = input(prompt)
            return float(value)
        except ValueError:
            print("有効な数値を入力してください")

# 計算結果を保存する関数
def save_calculation(operation, result, filename="calculation_log.txt"):
    """計算結果をファイルに保存"""
    try:
        with open(filename, "a", encoding="utf-8") as file:
            file.write(f"{operation}: {result}\\n")
        print(f"結果を{filename}に保存しました")
    except IOError as e:
        print(f"ファイルの保存に失敗しました: {e}")

# メイン処理（デモ用に固定値を使用）
print("=== 安全な計算プログラム ===")

# 計算例
calculations = [
    (10, 2, "10 ÷ 2"),
    (15, 0, "15 ÷ 0"),  # ゼロ除算エラー
    (20, "abc", "20 ÷ 'abc'"),  # 型エラー
    (100, 4, "100 ÷ 4")
]

results = []
for a, b, operation in calculations:
    result, error = safe_divide(a, b)
    if error:
        message = f"{operation} → エラー: {error}"
        print(message)
        results.append(message)
    else:
        message = f"{operation} = {result}"
        print(message)
        results.append(message)

# ファイル読み込みの例（メモリ内で文字列として処理）
print("\\n=== 処理結果一覧 ===")
for i, result in enumerate(results, 1):
    print(f"{i}. {result}")

# ファイル操作のデモ（実際のファイルは作成されません）
try:
    # メモリ内での文字列処理として実装
    file_content = "\\n".join(results)
    print("\\n=== ファイル内容（シミュレーション）===")
    print(file_content)
    print("ファイル操作が正常に完了しました")
except Exception as e:
    print(f"処理中にエラーが発生しました: {e}")`,
            order: 3,
            hints: {
              create: [
                { content: 'try-except文で例外をキャッチできます' },
                { content: 'with文でファイルの自動クローズができます' },
                { content: 'specific exceptions (ZeroDivisionError等) を個別に処理できます' },
                { content: 'Exception は全ての例外の基底クラスです' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '=== 安全な計算プログラム ===\n10 ÷ 2 = 5.0\n15 ÷ 0 → エラー: ゼロで割ることはできません\n20 ÷ \'abc\' → エラー: 数値以外は計算できません\n100 ÷ 4 = 25.0\n\n=== 処理結果一覧 ===\n1. 10 ÷ 2 = 5.0\n2. 15 ÷ 0 → エラー: ゼロで割ることはできません\n3. 20 ÷ \'abc\' → エラー: 数値以外は計算できません\n4. 100 ÷ 4 = 25.0\n\n=== ファイル内容（シミュレーション）===\n10 ÷ 2 = 5.0\n15 ÷ 0 → エラー: ゼロで割ることはできません\n20 ÷ \'abc\' → エラー: 数値以外は計算できません\n100 ÷ 4 = 25.0\nファイル操作が正常に完了しました',
                  description: '例外処理とファイル操作が正しく動作する'
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Python 上級レッスン
  const pythonAdvancedLesson = await prisma.lesson.create({
    data: {
      title: 'Python 上級',
      description: 'デコレータ、ジェネレータ、lambda関数、モジュールなどPythonの上級概念を学習します。',
      language: 'python',
      difficulty: 'ADVANCED',
      exercises: {
        create: [
          {
            title: 'デコレータと高階関数',
            description: 'デコレータを使った関数の拡張とlambda関数を使った高階関数を学習します。',
            starterCode: `# 実行時間を測定するデコレータと
# lambda関数を使った高階関数を実装してください

# ここにコードを書いてください:`,
            solution: `import time
from functools import wraps

# デコレータの定義
def timing_decorator(func):
    """関数の実行時間を測定するデコレータ"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = (end_time - start_time) * 1000  # ミリ秒
        print(f"{func.__name__}の実行時間: {execution_time:.2f}ms")
        return result
    return wrapper

def log_decorator(func):
    """関数の呼び出しをログ出力するデコレータ"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"関数 '{func.__name__}' を引数 {args} で実行")
        result = func(*args, **kwargs)
        print(f"関数 '{func.__name__}' の結果: {result}")
        return result
    return wrapper

# デコレータを使った関数
@timing_decorator
@log_decorator
def calculate_fibonacci(n):
    """フィボナッチ数列のn番目を計算"""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# lambda関数と高階関数
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map, filter, reduceとlambda
print("=== lambda関数の使用例 ===")
squares = list(map(lambda x: x**2, numbers))
print("2乗:", squares)

evens = list(filter(lambda x: x % 2 == 0, numbers))
print("偶数:", evens)

from functools import reduce
sum_all = reduce(lambda x, y: x + y, numbers)
print("合計:", sum_all)

# カスタム高階関数
def apply_operation(numbers, operation):
    """リストの各要素に操作を適用"""
    return [operation(x) for x in numbers]

def create_multiplier(factor):
    """指定した係数で乗算するlambda関数を返す"""
    return lambda x: x * factor

# 高階関数の使用
triple = create_multiplier(3)
tripled = apply_operation(numbers[:5], triple)
print("3倍:", tripled)

# デコレータを使った関数の実行
print("\\n=== デコレータ付き関数の実行 ===")
fib_10 = calculate_fibonacci(10)
print(f"フィボナッチ数列の10番目: {fib_10}")`,
            order: 1,
            hints: {
              create: [
                { content: '@decorator_name で関数にデコレータを適用します' },
                { content: 'lambda引数: 式 でlambda関数を作成します' },
                { content: '@wraps(func) でメタデータを保持します' },
                { content: 'map(), filter(), reduce() で関数型プログラミングができます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '=== lambda関数の使用例 ===\n2乗: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n偶数: [2, 4, 6, 8, 10]\n合計: 55\n3倍: [3, 6, 9, 12, 15]\n\n=== デコレータ付き関数の実行 ===\n関数 \'calculate_fibonacci\' を引数 (10,) で実行\n関数 \'calculate_fibonacci\' の結果: 55\ncalculate_fibonacciの実行時間: 0.01ms\nフィボナッチ数列の10番目: 55',
                  description: 'デコレータとlambda関数が正しく動作する'
                }
              ]
            }
          },
          {
            title: 'ジェネレータとイテレータ',
            description: 'yield文を使ったジェネレータとイテレータプロトコルを学習します。',
            starterCode: `# 無限に続くフィボナッチ数列ジェネレータと
# カスタムイテレータクラスを実装してください

# ここにコードを書いてください:`,
            solution: `# ジェネレータ関数
def fibonacci_generator():
    """無限フィボナッチ数列ジェネレータ"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

def range_with_step_generator(start, stop, step=1):
    """ステップ付きレンジジェネレータ"""
    current = start
    while current < stop:
        yield current
        current += step

def file_line_generator(content):
    """文字列を行ごとに返すジェネレータ"""
    lines = content.split('\\n')
    for line in lines:
        if line.strip():  # 空行をスキップ
            yield line.strip()

# カスタムイテレータクラス
class CountDown:
    """カウントダウンイテレータ"""
    
    def __init__(self, start):
        self.start = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.start <= 0:
            raise StopIteration
        self.start -= 1
        return self.start + 1

class SquareSequence:
    """平方数列イテレータ"""
    
    def __init__(self, max_count):
        self.max_count = max_count
        self.count = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.count >= self.max_count:
            raise StopIteration
        self.count += 1
        return self.count ** 2

# ジェネレータの使用例
print("=== フィボナッチ数列（最初の10個）===")
fib_gen = fibonacci_generator()
for i, fib in enumerate(fib_gen):
    if i >= 10:
        break
    print(f"F({i}) = {fib}")

print("\\n=== カスタムレンジ（2から20まで3ステップ）===")
for num in range_with_step_generator(2, 20, 3):
    print(num, end=" ")
print()

print("\\n=== ファイル行処理（シミュレーション）===")
sample_text = """
Python is awesome
It has generators
And iterators too
Very powerful features
"""

for line_num, line in enumerate(file_line_generator(sample_text), 1):
    print(f"{line_num}: {line}")

print("\\n=== カウントダウンイテレータ ===")
countdown = CountDown(5)
for count in countdown:
    print(f"カウント: {count}")

print("\\n=== 平方数列イテレータ ===")
squares = SquareSequence(7)
for square in squares:
    print(f"平方数: {square}")

# ジェネレータ式の例
print("\\n=== ジェネレータ式 ===")
squares_gen = (x**2 for x in range(1, 6))
print("平方数:", list(squares_gen))

# メモリ効率の確認
print("\\n=== メモリ効率比較 ===")
list_size = sum(1 for _ in range(1000000))  # ジェネレータ式使用
print(f"100万個の要素を効率的にカウント: {list_size}")`,
            order: 2,
            hints: {
              create: [
                { content: 'yield文で値を生成するジェネレータを作れます' },
                { content: '__iter__()と__next__()でカスタムイテレータを作れます' },
                { content: 'ジェネレータはメモリ効率が良いです' },
                { content: 'StopIterationでイテレータの終了を示します' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '=== フィボナッチ数列（最初の10個）===\nF(0) = 0\nF(1) = 1\nF(2) = 1\nF(3) = 2\nF(4) = 3\nF(5) = 5\nF(6) = 8\nF(7) = 13\nF(8) = 21\nF(9) = 34\n\n=== カスタムレンジ（2から20まで3ステップ）===\n2 5 8 11 14 17 \n\n=== ファイル行処理（シミュレーション）===\n1: Python is awesome\n2: It has generators\n3: And iterators too\n4: Very powerful features\n\n=== カウントダウンイテレータ ===\nカウント: 5\nカウント: 4\nカウント: 3\nカウント: 2\nカウント: 1\n\n=== 平方数列イテレータ ===\n平方数: 1\n平方数: 4\n平方数: 9\n平方数: 16\n平方数: 25\n平方数: 36\n平方数: 49\n\n=== ジェネレータ式 ===\n平方数: [1, 4, 9, 16, 25]\n\n=== メモリ効率比較 ===\n100万個の要素を効率的にカウント: 1000000',
                  description: 'ジェネレータとイテレータが正しく動作する'
                }
              ]
            }
          },
          {
            title: 'モジュールとパッケージ',
            description: 'モジュールの作成、インポート方法、パッケージ構造について学習します。',
            starterCode: `# 数学計算モジュールとユーティリティ関数を作成し、
# 様々なインポート方法を実践してください

# ここにコードを書いてください:`,
            solution: `# math_utils.py (モジュール風の実装)
class MathUtils:
    """数学計算ユーティリティクラス"""
    
    PI = 3.14159
    E = 2.71828
    
    @staticmethod
    def factorial(n):
        """階乗計算"""
        if n < 0:
            raise ValueError("負の数の階乗は計算できません")
        if n <= 1:
            return 1
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result
    
    @staticmethod
    def gcd(a, b):
        """最大公約数（ユークリッドの互除法）"""
        while b:
            a, b = b, a % b
        return a
    
    @staticmethod
    def lcm(a, b):
        """最小公倍数"""
        return abs(a * b) // MathUtils.gcd(a, b)
    
    @classmethod
    def circle_area(cls, radius):
        """円の面積"""
        return cls.PI * radius ** 2
    
    @classmethod
    def circle_circumference(cls, radius):
        """円の周囲"""
        return 2 * cls.PI * radius

# string_utils.py (モジュール風の実装)
class StringUtils:
    """文字列処理ユーティリティクラス"""
    
    @staticmethod
    def reverse_words(text):
        """単語の順序を逆にする"""
        return ' '.join(text.split()[::-1])
    
    @staticmethod
    def count_words(text):
        """単語数をカウント"""
        return len(text.split())
    
    @staticmethod
    def capitalize_words(text):
        """各単語の最初を大文字にする"""
        return ' '.join(word.capitalize() for word in text.split())
    
    @staticmethod
    def remove_extra_spaces(text):
        """余分な空白を除去"""
        return ' '.join(text.split())

# データ処理ユーティリティ
class DataProcessor:
    """データ処理ユーティリティ"""
    
    @staticmethod
    def filter_and_transform(data, filter_func, transform_func):
        """フィルタリングと変換を同時実行"""
        return [transform_func(item) for item in data if filter_func(item)]
    
    @staticmethod
    def group_by_condition(data, condition_func):
        """条件に基づいてグループ分け"""
        true_group = []
        false_group = []
        for item in data:
            if condition_func(item):
                true_group.append(item)
            else:
                false_group.append(item)
        return true_group, false_group
    
    @staticmethod
    def calculate_statistics(numbers):
        """基本統計を計算"""
        if not numbers:
            return None
        
        total = sum(numbers)
        count = len(numbers)
        mean = total / count
        
        sorted_nums = sorted(numbers)
        median = sorted_nums[count // 2] if count % 2 == 1 else (sorted_nums[count // 2 - 1] + sorted_nums[count // 2]) / 2
        
        return {
            'count': count,
            'sum': total,
            'mean': mean,
            'median': median,
            'min': min(numbers),
            'max': max(numbers)
        }

# メイン実行部分
print("=== 数学ユーティリティの使用 ===")
print(f"5! = {MathUtils.factorial(5)}")
print(f"12と18の最大公約数: {MathUtils.gcd(12, 18)}")
print(f"12と18の最小公倍数: {MathUtils.lcm(12, 18)}")
print(f"半径5の円の面積: {MathUtils.circle_area(5):.2f}")

print("\\n=== 文字列ユーティリティの使用 ===")
text = "Python is   a great   programming language"
print(f"元の文字列: '{text}'")
print(f"単語を逆順: '{StringUtils.reverse_words(text)}'")
print(f"単語数: {StringUtils.count_words(text)}")
print(f"単語の先頭大文字化: '{StringUtils.capitalize_words(text)}'")
print(f"余分な空白除去: '{StringUtils.remove_extra_spaces(text)}'")

print("\\n=== データ処理ユーティリティの使用 ===")
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# フィルタと変換
even_squares = DataProcessor.filter_and_transform(
    numbers,
    lambda x: x % 2 == 0,  # 偶数フィルタ
    lambda x: x ** 2       # 2乗変換
)
print(f"偶数の2乗: {even_squares}")

# グループ分け
small_nums, large_nums = DataProcessor.group_by_condition(
    numbers,
    lambda x: x <= 5
)
print(f"5以下: {small_nums}")
print(f"5より大きい: {large_nums}")

# 統計計算
test_scores = [85, 92, 78, 96, 88, 75, 89, 93]
stats = DataProcessor.calculate_statistics(test_scores)
print(f"\\nテストスコア統計:")
for key, value in stats.items():
    print(f"  {key}: {value}")

# 名前空間のシミュレーション
print(f"\\n=== 定数の使用 ===")
print(f"円周率: {MathUtils.PI}")
print(f"自然対数の底: {MathUtils.E}")`,
            order: 3,
            hints: {
              create: [
                { content: 'import module_name でモジュールをインポートします' },
                { content: 'from module import function で特定の関数をインポートできます' },
                { content: '@staticmethod で静的メソッドを作れます' },
                { content: '@classmethod でクラスメソッドを作れます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '=== 数学ユーティリティの使用 ===\n5! = 120\n12と18の最大公約数: 6\n12と18の最小公倍数: 36\n半径5の円の面積: 78.54\n\n=== 文字列ユーティリティの使用 ===\n元の文字列: \'Python is   a great   programming language\'\n単語を逆順: \'language programming great a is Python\'\n単語数: 6\n単語の先頭大文字化: \'Python Is A Great Programming Language\'\n余分な空白除去: \'Python is a great programming language\'\n\n=== データ処理ユーティリティの使用 ===\n偶数の2乗: [4, 16, 36, 64, 100]\n5以下: [1, 2, 3, 4, 5]\n5より大きい: [6, 7, 8, 9, 10]\n\nテストスコア統計:\n  count: 8\n  sum: 696\n  mean: 87.0\n  median: 88.5\n  min: 75\n  max: 96\n\n=== 定数の使用 ===\n円周率: 3.14159\n自然対数の底: 2.71828',
                  description: 'モジュール機能と各種ユーティリティが正しく動作する'
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('Python lessons seeded successfully!')
}