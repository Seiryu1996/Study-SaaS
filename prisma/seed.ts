import { PrismaClient } from '@prisma/client'
import { seedJavaScriptLessons } from './seeds/javascript'
import { seedPythonLessons } from './seeds/python'
import { seedHTMLLessons } from './seeds/html'
import { seedCSSLessons } from './seeds/css'
import { seedTypeScriptLessons } from './seeds/typescript'
import { seedCSharpLessons } from './seeds/csharp'
import { seedRubyLessons } from './seeds/ruby'
import { seedPHPLessons } from './seeds/php'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with all language lessons...')

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
    
    console.log('✅ All 8 languages seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding lessons:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })