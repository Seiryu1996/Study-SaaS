import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedCSharpLessons() {
  // C# 初級レッスン
  const csharpBeginnerLesson = await prisma.lesson.create({
    data: {
      title: 'C# 初級',
      description: 'C#の基本的な構文、変数、メソッド、クラスを学びます。.NETプラットフォームでの開発の基礎を習得できます。',
      language: 'csharp',
      difficulty: 'BEGINNER',
      exercises: {
        create: [
          {
            title: '変数とデータ型',
            description: 'C#の基本的なデータ型と変数の宣言方法を学習します。',
            starterCode: `using System;

class Program 
{
    static void Main() 
    {
        // string型の変数nameを宣言し、あなたの名前を代入してください
        // int型の変数ageを宣言し、あなたの年齢を代入してください  
        // bool型の変数isStudentを宣言し、trueまたはfalseを代入してください
        
        // ここにコードを書いてください:
        
        // 変数を出力してください
        Console.WriteLine($"名前: {name}");
        Console.WriteLine($"年齢: {age}");
        Console.WriteLine($"学生: {isStudent}");
    }
}`,
            solution: `using System;

class Program 
{
    static void Main() 
    {
        // string型の変数nameを宣言し、あなたの名前を代入してください
        string name = "田中太郎";
        // int型の変数ageを宣言し、あなたの年齢を代入してください  
        int age = 25;
        // bool型の変数isStudentを宣言し、trueまたはfalseを代入してください
        bool isStudent = true;
        
        // 変数を出力してください
        Console.WriteLine($"名前: {name}");
        Console.WriteLine($"年齢: {age}");
        Console.WriteLine($"学生: {isStudent}");
    }
}`,
            order: 1,
            hints: {
              create: [
                { content: 'C#では型名 変数名 = 値; の形で変数を宣言します' },
                { content: 'string, int, bool が基本的なデータ型です' },
                { content: '$"{変数名}" で文字列補間が使えます' },
                { content: 'Console.WriteLine()で出力できます' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '名前: 田中太郎\n年齢: 25\n学生: True',
                  description: '変数が正しく宣言され出力される'
                }
              ]
            }
          },
          {
            title: 'メソッドの定義',
            description: 'C#でメソッドを定義し、呼び出す方法を学習します。',
            starterCode: `using System;

class Program 
{
    // Greetメソッドを定義してください
    // 引数: name (string型)
    // 戻り値: string型の挨拶メッセージ
    // ここにメソッドを書いてください:
    
    static void Main() 
    {
        string message = Greet("世界");
        Console.WriteLine(message);
        
        // より具体的な例
        Console.WriteLine(Greet("C#プログラマー"));
    }
}`,
            solution: `using System;

class Program 
{
    // Greetメソッドを定義してください
    static string Greet(string name)
    {
        return $"こんにちは、{name}さん！";
    }
    
    static void Main() 
    {
        string message = Greet("世界");
        Console.WriteLine(message);
        
        // より具体的な例
        Console.WriteLine(Greet("C#プログラマー"));
    }
}`,
            order: 2,
            hints: {
              create: [
                { content: 'static 戻り値型 メソッド名(引数型 引数名) の形で定義します' },
                { content: 'return文で値を返します' },
                { content: 'string型の戻り値を持つメソッドを作成してください' },
                { content: 'Main()内からメソッドを呼び出します' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: 'こんにちは、世界さん！\nこんにちは、C#プログラマーさん！',
                  description: 'メソッドが正しく動作し結果が出力される'
                }
              ]
            }
          },
          {
            title: 'クラスとオブジェクト',
            description: 'C#のクラス定義とオブジェクトの作成方法を学習します。',
            starterCode: `using System;

// Personクラスを定義してください
// プロパティ: Name (string), Age (int)
// メソッド: Introduce() - 自己紹介を返す
// ここにクラスを書いてください:

class Program 
{
    static void Main() 
    {
        Person person = new Person();
        person.Name = "山田花子";
        person.Age = 30;
        
        Console.WriteLine(person.Introduce());
    }
}`,
            solution: `using System;

// Personクラスを定義してください
class Person
{
    // プロパティ: Name (string), Age (int)
    public string Name { get; set; }
    public int Age { get; set; }
    
    // メソッド: Introduce() - 自己紹介を返す
    public string Introduce()
    {
        return $"私の名前は{Name}で、{Age}歳です。";
    }
}

class Program 
{
    static void Main() 
    {
        Person person = new Person();
        person.Name = "山田花子";
        person.Age = 30;
        
        Console.WriteLine(person.Introduce());
    }
}`,
            order: 3,
            hints: {
              create: [
                { content: 'class クラス名 { } でクラスを定義します' },
                { content: 'public string Name { get; set; } で自動プロパティを作成' },
                { content: 'publicメソッドは外部から呼び出し可能です' },
                { content: 'new クラス名() でオブジェクトを作成します' }
              ]
            },
            testCases: {
              create: [
                {
                  expectedOutput: '私の名前は山田花子で、30歳です。',
                  description: 'クラスとオブジェクトが正しく動作する'
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