import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Simple seeding...')

  // JavaScript lesson
  const jsLesson = await prisma.lesson.create({
    data: {
      title: 'JavaScript 基礎',
      description: 'JavaScriptの基本的な文法と概念を学びます。',
      language: 'javascript',
      difficulty: 'BEGINNER',
      isPublished: true,
      order: 1,
      exercises: {
        create: [
          {
            title: '変数とデータ型',
            description: 'JavaScriptの変数宣言について学習します。',
            starterCode: '// 変数を宣言してください\n// ここにコードを書いてください:',
            solution: 'let name = "田中太郎";\nconsole.log("名前:", name);',
            hints: ['letキーワードで変数を宣言', 'console.log()で出力'],
            order: 1,
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 田中太郎',
                  description: '変数を宣言して出力',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Python lesson
  const pythonLesson = await prisma.lesson.create({
    data: {
      title: 'Python 基礎',
      description: 'Pythonの基本的な文法と概念を学びます。',
      language: 'python',
      difficulty: 'BEGINNER',
      isPublished: true,
      order: 2,
      exercises: {
        create: [
          {
            title: '変数とデータ型',
            description: 'Pythonの変数について学習します。',
            starterCode: '# 変数を定義してください\n# ここにコードを書いてください:',
            solution: 'name = "田中太郎"\nprint("名前:", name)',
            hints: ['変数の型宣言は不要', 'print()で出力'],
            order: 1,
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 田中太郎',
                  description: '変数を定義して出力',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // HTML lesson
  const htmlLesson = await prisma.lesson.create({
    data: {
      title: 'HTML 基礎',
      description: 'HTMLの基本的な構造を学びます。',
      language: 'html',
      difficulty: 'BEGINNER',
      isPublished: true,
      order: 3,
      exercises: {
        create: [
          {
            title: 'HTML基本構造',
            description: 'HTMLの基本構造を作成します。',
            starterCode: '<!-- HTML基本構造を作成してください -->',
            solution: '<!DOCTYPE html>\n<html>\n<head><title>テスト</title></head>\n<body><h1>Hello</h1></body>\n</html>',
            hints: ['<!DOCTYPE html>で開始', '<html><head><body>を使用'],
            order: 1,
            testCases: {
              create: [
                {
                  expectedOutput: 'HTML基本構造',
                  description: 'HTML構造を作成',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Go lesson
  const goLesson = await prisma.lesson.create({
    data: {
      title: 'Go 基礎',
      description: 'Go言語の基本的な文法を学びます。',
      language: 'go',
      difficulty: 'BEGINNER',
      isPublished: true,
      order: 4,
      exercises: {
        create: [
          {
            title: '変数とデータ型',
            description: 'Goの変数宣言について学習します。',
            starterCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n\t// 変数を宣言してください\n}',
            solution: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar name string = "太郎"\n\tfmt.Println("名前:", name)\n}',
            hints: ['varキーワードで変数宣言', 'fmt.Printlnで出力'],
            order: 1,
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 太郎',
                  description: '変数を宣言して出力',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('✅ Simple seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })