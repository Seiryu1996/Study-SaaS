import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Complete seeding for all 8 languages...')

  // CSS lesson
  const cssLesson = await prisma.lesson.create({
    data: {
      title: 'CSS 基礎',
      description: 'CSSの基本的なセレクタとスタイリングを学びます。',
      language: 'css',
      difficulty: 'BEGINNER',
      isPublished: true,
      order: 5,
      exercises: {
        create: [
          {
            title: 'セレクタと基本プロパティ',
            description: 'CSSの基本的なセレクタとプロパティを学習します。',
            starterCode: '/* 基本的なスタイリングを追加してください */\nh1 { /* ここにスタイルを書いてください */ }',
            solution: 'h1 {\n  color: blue;\n  font-size: 2rem;\n}\n\np {\n  color: #666;\n  font-size: 14px;\n}',
            hints: ['要素名でセレクト', 'colorで文字色を指定', 'font-sizeでサイズ指定'],
            order: 1,
            testCases: {
              create: [
                {
                  expectedOutput: 'CSSスタイル適用',
                  description: 'スタイルが正しく適用される',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // TypeScript lesson
  const tsLesson = await prisma.lesson.create({
    data: {
      title: 'TypeScript 基礎',
      description: 'TypeScriptの型システムと基本的な使い方を学びます。',
      language: 'typescript',
      difficulty: 'BEGINNER',
      isPublished: true,
      order: 6,
      exercises: {
        create: [
          {
            title: '基本的な型注釈',
            description: 'TypeScriptの型注釈の使い方を学習します。',
            starterCode: '// 型注釈を追加してください\nlet userName;\nlet userAge;\n\nfunction greet(name, age) {\n  return `こんにちは、${name}さん！`;\n}',
            solution: 'let userName: string;\nlet userAge: number;\n\nfunction greet(name: string, age: number): string {\n  return `こんにちは、${name}さん！`;\n}\n\nuserName = "田中太郎";\nuserAge = 25;\nconsole.log(greet(userName, userAge));',
            hints: ['変数名: 型名 で型注釈', 'function name(param: type): returnType', 'string, number, boolean が基本型'],
            order: 1,
            testCases: {
              create: [
                {
                  expectedOutput: 'こんにちは、田中太郎さん！',
                  description: '型注釈が正しく適用される',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // C# lesson
  const csharpLesson = await prisma.lesson.create({
    data: {
      title: 'C# 基礎',
      description: 'C#の基本的な構文とクラスを学びます。',
      language: 'csharp',
      difficulty: 'BEGINNER',
      isPublished: true,
      order: 7,
      exercises: {
        create: [
          {
            title: '変数とデータ型',
            description: 'C#の変数とデータ型の使い方を学習します。',
            starterCode: 'using System;\n\nclass Program \n{\n    static void Main() \n    {\n        // 変数を宣言してください\n        \n        Console.WriteLine($"名前: {name}");\n    }\n}',
            solution: 'using System;\n\nclass Program \n{\n    static void Main() \n    {\n        string name = "田中太郎";\n        int age = 25;\n        \n        Console.WriteLine($"名前: {name}");\n        Console.WriteLine($"年齢: {age}");\n    }\n}',
            hints: ['型名 変数名 = 値; で変数宣言', '$"{変数}"で文字列補間', 'Console.WriteLine()で出力'],
            order: 1,
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 田中太郎\n年齢: 25',
                  description: '変数が正しく宣言される',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Ruby lesson
  const rubyLesson = await prisma.lesson.create({
    data: {
      title: 'Ruby 基礎',
      description: 'Rubyの基本的な構文とオブジェクト指向を学びます。',
      language: 'ruby',
      difficulty: 'BEGINNER',
      isPublished: true,
      order: 8,
      exercises: {
        create: [
          {
            title: '変数とデータ型',
            description: 'Rubyの変数とデータ型の使い方を学習します。',
            starterCode: '# 変数を定義してください\n# name, age, hobbies を作成\n\n# ここにコードを書いてください:\n\nputs "名前: #{name}"\nputs "年齢: #{age}"',
            solution: 'name = "田中太郎"\nage = 25\nhobbies = ["読書", "映画"]\n\nputs "名前: #{name}"\nputs "年齢: #{age}"\nputs "趣味: #{hobbies.join(\', \')}"',
            hints: ['変数名 = 値 で変数作成', '#{変数}で文字列内埋め込み', 'puts で出力'],
            order: 1,
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 田中太郎\n年齢: 25\n趣味: 読書, 映画',
                  description: '変数が正しく使用される',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // PHP lesson
  const phpLesson = await prisma.lesson.create({
    data: {
      title: 'PHP 基礎',
      description: 'PHPの基本的な構文とWeb開発を学びます。',
      language: 'php',
      difficulty: 'BEGINNER',
      isPublished: true,
      order: 9,
      exercises: {
        create: [
          {
            title: '変数とデータ型',
            description: 'PHPの変数とデータ型の使い方を学習します。',
            starterCode: '<?php\n// 変数を定義してください\n// $name, $age を作成\n\n// ここにコードを書いてください:\n\necho "名前: " . $name . "\\n";\necho "年齢: " . $age . "\\n";\n?>',
            solution: '<?php\n$name = "田中太郎";\n$age = 25;\n$hobbies = ["読書", "映画"];\n\necho "名前: " . $name . "\\n";\necho "年齢: " . $age . "\\n";\necho "趣味: " . implode(\', \', $hobbies) . "\\n";\n?>',
            hints: ['$変数名 で変数作成', '. で文字列連結', 'echo で出力'],
            order: 1,
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 田中太郎\n年齢: 25\n趣味: 読書, 映画',
                  description: '変数が正しく使用される',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('✅ All 8 languages seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })