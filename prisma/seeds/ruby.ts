import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedRubyLessons() {
  // Ruby 初級レッスン
  const rubyBeginnerLesson = await prisma.lesson.create({
    data: {
      title: 'Ruby 初級',
      description: 'Rubyの基本的な構文、変数、メソッド、クラスを学びます。オブジェクト指向プログラミングの美しい書き方を習得できます。',
      language: 'ruby',
      difficulty: 'BEGINNER',
      exercises: {
        create: [
          {
            title: '変数とデータ型',
            description: 'Rubyの変数とデータ型の基本的な使い方を学習します。',
            starterCode: `# Rubyの基本的な変数とデータ型を使ってみましょう
# name（文字列）、age（数値）、is_student（真偽値）、hobbies（配列）を定義

# ここにコードを書いてください:

# 変数を出力してください
puts "名前: #{name}"
puts "年齢: #{age}"  
puts "学生: #{is_student}"
puts "趣味: #{hobbies.join(', ')}"`,
            solution: `# Rubyの基本的な変数とデータ型を使ってみましょう
name = "田中太郎"
age = 25
is_student = true
hobbies = ["読書", "映画鑑賞", "プログラミング"]

# 変数を出力してください
puts "名前: #{name}"
puts "年齢: #{age}"  
puts "学生: #{is_student}"
puts "趣味: #{hobbies.join(', ')}"

# 配列の操作例
puts "趣味の数: #{hobbies.length}"
puts "最初の趣味: #{hobbies.first}"
puts "最後の趣味: #{hobbies.last}"`,
            order: 1,
            hints: {
              create: [
                { content: 'Rubyでは変数の型宣言は不要です' },
                { content: '#{変数名} で文字列内に変数を埋め込めます' },
                { content: 'puts で値を出力できます' },
                { content: '配列は["要素1", "要素2"]の形で作成します' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 田中太郎\n年齢: 25\n学生: true\n趣味: 読書, 映画鑑賞, プログラミング\n趣味の数: 3\n最初の趣味: 読書\n最後の趣味: プログラミング',
                  description: '変数とデータ型が正しく使用される'
                }
              ]
            }
          },
          {
            title: 'メソッドの定義',
            description: 'Rubyでメソッドを定義し、使用する方法を学習します。',
            starterCode: `# greetメソッドを定義してください
# 引数: name
# 戻り値: 挨拶メッセージの文字列
# ここにメソッドを書いてください:

# メソッドの使用例
puts greet("Ruby")
puts greet("プログラマー")

# デフォルト引数を持つメソッドも作成してください
# introduce メソッド: name, age=20
# ここにメソッドを書いてください:

puts introduce("佐藤")
puts introduce("田中", 25)`,
            solution: `# greetメソッドを定義してください
def greet(name)
  "こんにちは、#{name}さん！"
end

# メソッドの使用例
puts greet("Ruby")
puts greet("プログラマー")

# デフォルト引数を持つメソッドも作成してください
def introduce(name, age = 20)
  "私は#{name}です。#{age}歳です。"
end

puts introduce("佐藤")
puts introduce("田中", 25)

# 複数戻り値のメソッド例
def get_name_and_age
  return "山田太郎", 28
end

name, age = get_name_and_age
puts "取得した情報: #{name}, #{age}歳"`,
            order: 2,
            hints: {
              create: [
                { content: 'def メソッド名(引数) ... end でメソッドを定義' },
                { content: 'Rubyでは最後の式が自動的に戻り値になります' },
                { content: 'デフォルト引数は引数名 = デフォルト値 で設定' },
                { content: 'return は省略可能（最後の式が戻り値）' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'こんにちは、Rubyさん！\nこんにちは、プログラマーさん！\n私は佐藤です。20歳です。\n私は田中です。25歳です。\n取得した情報: 山田太郎, 28歳',
                  description: 'メソッドが正しく動作し結果が出力される'
                }
              ]
            }
          },
          {
            title: 'クラスとオブジェクト指向',
            description: 'Rubyのクラス定義、初期化、継承の基本を学習します。',
            starterCode: `# Animalクラスを定義してください
# 属性: name, species  
# メソッド: initialize, speak, info
# ここにクラスを書いてください:

# Dogクラスを定義してください（Animalを継承）
# 属性: breed を追加
# メソッド: speak をオーバーライド
# ここにクラスを書いてください:

# クラスの使用例
dog = Dog.new("ポチ", "犬", "柴犬")
puts dog.info
puts dog.speak`,
            solution: `# Animalクラスを定義してください
class Animal
  attr_accessor :name, :species
  
  def initialize(name, species)
    @name = name
    @species = species
  end
  
  def speak
    "#{@name}が鳴いています"
  end
  
  def info
    "名前: #{@name}, 種類: #{@species}"
  end
end

# Dogクラスを定義してください（Animalを継承）
class Dog < Animal
  attr_accessor :breed
  
  def initialize(name, species, breed)
    super(name, species)
    @breed = breed
  end
  
  def speak
    "#{@name}がワンワン鳴いています"
  end
  
  def info
    "#{super}, 犬種: #{@breed}"
  end
end

# クラスの使用例
dog = Dog.new("ポチ", "犬", "柴犬")
puts dog.info
puts dog.speak

# より多くの例
cat = Animal.new("ミケ", "猫")
puts cat.info
puts cat.speak`,
            order: 3,
            hints: {
              create: [
                { content: 'class クラス名 ... end でクラスを定義' },
                { content: 'attr_accessor で読み書き可能な属性を作成' },
                { content: 'initialize メソッドはコンストラクタです' },
                { content: '< 親クラス名 で継承、super で親メソッド呼び出し' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '名前: ポチ, 種類: 犬, 犬種: 柴犬\nポチがワンワン鳴いています\n名前: ミケ, 種類: 猫\nミケが鳴いています',
                  description: 'クラスの継承とオーバーライドが正しく動作する'
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('C# lessons seeded successfully!')
}