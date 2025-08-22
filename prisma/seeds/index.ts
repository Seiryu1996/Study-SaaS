import { PrismaClient } from '@prisma/client'
import { seedJavaScriptLessons } from './javascript'
import { seedPythonLessons } from './python'
import { seedHTMLLessons } from './html'
import { seedCSSLessons } from './css'
import { seedTypeScriptLessons } from './typescript'
import { seedCSharpLessons } from './csharp'
import { seedRubyLessons } from './ruby'
import { seedPHPLessons } from './php'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  
  // 既存のデータを削除（オプション - 開発時のみ）
  // await prisma.testCase.deleteMany()
  // await prisma.hint.deleteMany()
  // await prisma.exercise.deleteMany()
  // await prisma.lesson.deleteMany()
  
  try {
    // 各言語のレッスンをシード
    await seedJavaScriptLessons()
    await seedPythonLessons()
    await seedHTMLLessons()
    await seedCSSLessons()
    await seedTypeScriptLessons()
    await seedCSharpLessons()
    await seedRubyLessons()
    await seedPHPLessons()
    
    console.log('All lessons seeded successfully!')
  } catch (error) {
    console.error('Error seeding lessons:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })