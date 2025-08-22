export type Language = 'en' | 'ja'

export interface Translation {
  // Navigation
  'nav.home': string
  'nav.lessons': string
  'nav.editor': string
  'nav.dashboard': string
  'nav.signIn': string
  'nav.getStarted': string
  'nav.welcome': string

  // Home page
  'home.title': string
  'home.subtitle': string
  'home.description': string
  'home.startLearning': string
  'home.tryEditor': string
  'home.feature1.title': string
  'home.feature1.description': string
  'home.feature2.title': string
  'home.feature2.description': string
  'home.feature3.title': string
  'home.feature3.description': string

  // Lessons
  'lessons.title': string
  'lessons.description': string
  'lessons.filter.all': string
  'lessons.filter.javascript': string
  'lessons.filter.python': string
  'lessons.filter.html': string
  'lessons.filter.typescript': string
  'lessons.moreComing': string
  'lessons.requestLesson': string
  'lessons.difficulty.beginner': string
  'lessons.difficulty.intermediate': string
  'lessons.difficulty.advanced': string
  'lessons.exerciseCount': string

  // Lesson Content
  'lesson.exercise': string
  'lesson.completed': string
  'lesson.loadStarterCode': string
  'lesson.showHints': string
  'lesson.hideHints': string
  'lesson.showSolution': string
  'lesson.hints': string
  'lesson.previous': string
  'lesson.next': string
  'lesson.codeEditor': string
  'lesson.solutionLoaded': string
  'lesson.markCompleted': string
  'lesson.progress': string
  'lesson.exercisesCompleted': string

  // Code Editor
  'editor.output': string
  'editor.preview': string
  'editor.code': string
  'editor.runCode': string
  'editor.running': string
  'editor.clear': string
  'editor.executingCode': string
  'editor.error': string
  'editor.executionTime': string
  'editor.clickToRun': string
  'editor.htmlCode': string

  // Test Runner
  'test.testCases': string
  'test.runTests': string
  'test.runningTests': string
  'test.testsPassed': string
  'test.pass': string
  'test.fail': string
  'test.input': string
  'test.expectedOutput': string
  'test.yourOutput': string
  'test.error': string
  'test.noOutput': string
  'test.testSummary': string
  'test.allTestsPassed': string
  'test.testsFailedMessage': string
  'test.test': string

  // Dashboard
  'dashboard.welcome': string
  'dashboard.description': string
  'dashboard.stats.title': string
  'dashboard.stats.enrolledLessons': string
  'dashboard.stats.completedExercises': string
  'dashboard.stats.totalExercises': string
  'dashboard.stats.progress': string
  'dashboard.stats.overallProgress': string
  'dashboard.lessonProgress.title': string
  'dashboard.lessonProgress.noLessons': string
  'dashboard.lessonProgress.noLessonsDesc': string
  'dashboard.lessonProgress.browseLessons': string
  'dashboard.lessonProgress.continue': string
  'dashboard.lessonProgress.progress': string
  'dashboard.activity.title': string
  'dashboard.activity.noActivity': string
  'dashboard.activity.noActivityDesc': string
  'dashboard.activity.completed': string
  'dashboard.activity.attempts': string
  'dashboard.activity.attempt': string
  'dashboard.activity.viewAll': string

  // Time formatting
  'time.justNow': string
  'time.minutesAgo': string
  'time.hoursAgo': string
  'time.daysAgo': string
  'time.minutes': string
  'time.hours': string
  'time.days': string

  // Common
  'common.loading': string
  'common.error': string
  'common.success': string
  'common.cancel': string
  'common.save': string
  'common.edit': string
  'common.delete': string
  'common.user': string
}

export const translations: Record<Language, Translation> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.lessons': 'Lessons',
    'nav.editor': 'Code Editor',
    'nav.dashboard': 'Dashboard',
    'nav.signIn': 'Sign In',
    'nav.getStarted': 'Get Started',
    'nav.welcome': 'Welcome, {name}!',

    // Home page
    'home.title': 'Learn to Code',
    'home.subtitle': 'Interactively',
    'home.description': 'Master programming with hands-on exercises, real-time code execution, and step-by-step guidance. Just like Progate, but better.',
    'home.startLearning': 'Start Learning →',
    'home.tryEditor': 'Try Code Editor',
    'home.feature1.title': 'Interactive Editor',
    'home.feature1.description': 'VS Code-powered editor with real-time execution and instant feedback',
    'home.feature2.title': 'Guided Lessons',
    'home.feature2.description': 'Step-by-step tutorials with hints and solutions to guide your learning',
    'home.feature3.title': 'Progress Tracking',
    'home.feature3.description': 'Track your progress and unlock new challenges as you advance',

    // Lessons
    'lessons.title': 'Programming Lessons',
    'lessons.description': 'Interactive programming tutorials with hands-on coding exercises',
    'lessons.filter.all': 'All',
    'lessons.filter.javascript': 'JavaScript',
    'lessons.filter.python': 'Python',
    'lessons.filter.html': 'HTML/CSS',
    'lessons.filter.typescript': 'TypeScript',
    'lessons.moreComing': 'More lessons coming soon!',
    'lessons.requestLesson': 'Request a Lesson',
    'lessons.difficulty.beginner': 'Beginner',
    'lessons.difficulty.intermediate': 'Intermediate',
    'lessons.difficulty.advanced': 'Advanced',
    'lessons.exerciseCount': '{count} exercises',

    // Lesson Content
    'lesson.exercise': 'Exercise',
    'lesson.completed': 'Completed',
    'lesson.loadStarterCode': 'Load Starter Code',
    'lesson.showHints': 'Show Hints',
    'lesson.hideHints': 'Hide Hints',
    'lesson.showSolution': 'Show Solution',
    'lesson.hints': 'Hints:',
    'lesson.previous': '← Previous',
    'lesson.next': 'Next →',
    'lesson.codeEditor': 'Code Editor',
    'lesson.solutionLoaded': '✅ Solution Loaded',
    'lesson.markCompleted': 'Mark as Completed',
    'lesson.progress': 'Progress:',
    'lesson.exercisesCompleted': 'exercises completed',

    // Code Editor
    'editor.output': 'Output',
    'editor.preview': 'Preview',
    'editor.code': 'Code',
    'editor.runCode': '▶️ Run Code',
    'editor.running': 'Running...',
    'editor.clear': 'Clear',
    'editor.executingCode': 'Executing code...',
    'editor.error': 'Error:',
    'editor.executionTime': 'Execution time: {time}ms',
    'editor.clickToRun': 'Click "Run Code" to execute your code and see the output here...',
    'editor.htmlCode': 'HTML Code:',

    // Test Runner
    'test.testCases': 'Test Cases',
    'test.runTests': '🧪 Run Tests',
    'test.runningTests': 'Running Tests...',
    'test.testsPassed': '{passed}/{total} Tests Passed',
    'test.pass': '✅ PASS',
    'test.fail': '❌ FAIL',
    'test.input': 'Input:',
    'test.expectedOutput': 'Expected Output:',
    'test.yourOutput': 'Your Output:',
    'test.error': 'Error: {error}',
    'test.noOutput': '(no output)',
    'test.testSummary': 'Test Summary:',
    'test.allTestsPassed': '🎉 All tests passed! Great job!',
    'test.testsFailedMessage': '{count} test(s) failed. Review the output above and try again.',
    'test.test': 'Test',

    // Dashboard
    'dashboard.welcome': 'Welcome back, {name}!',
    'dashboard.description': 'Track your learning progress and continue your coding journey.',
    'dashboard.stats.title': 'Learning Statistics',
    'dashboard.stats.enrolledLessons': 'Enrolled Lessons',
    'dashboard.stats.completedExercises': 'Completed Exercises',
    'dashboard.stats.totalExercises': 'Total Exercises',
    'dashboard.stats.progress': 'Progress',
    'dashboard.stats.overallProgress': 'Overall Progress',
    'dashboard.lessonProgress.title': 'Lesson Progress',
    'dashboard.lessonProgress.noLessons': 'No lessons enrolled yet',
    'dashboard.lessonProgress.noLessonsDesc': 'Start your learning journey by enrolling in a lesson.',
    'dashboard.lessonProgress.browseLessons': 'Browse Lessons',
    'dashboard.lessonProgress.continue': 'Continue',
    'dashboard.lessonProgress.progress': 'Progress: {completed} / {total} exercises',
    'dashboard.activity.title': 'Recent Activity',
    'dashboard.activity.noActivity': 'No recent activity. Start coding to see your progress here!',
    'dashboard.activity.noActivityDesc': 'No recent activity. Start coding to see your progress here!',
    'dashboard.activity.completed': 'Completed',
    'dashboard.activity.attempts': '{count} attempts',
    'dashboard.activity.attempt': '{count} attempt',
    'dashboard.activity.viewAll': 'View All Activity',

    // Time formatting
    'time.justNow': 'Just now',
    'time.minutesAgo': '{count}m ago',
    'time.hoursAgo': '{count}h ago',
    'time.daysAgo': '{count}d ago',
    'time.minutes': 'minutes',
    'time.hours': 'hours',
    'time.days': 'days',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.user': 'User',
  },
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.lessons': 'レッスン',
    'nav.editor': 'コードエディタ',
    'nav.dashboard': 'ダッシュボード',
    'nav.signIn': 'ログイン',
    'nav.getStarted': '始める',
    'nav.welcome': 'おかえりなさい、{name}さん！',

    // Home page
    'home.title': 'プログラミングを学ぼう',
    'home.subtitle': 'インタラクティブに',
    'home.description': 'ハンズオン演習、リアルタイムコード実行、ステップバイステップガイダンスでプログラミングをマスターしましょう。Progateのような体験を、さらに良く。',
    'home.startLearning': '学習を始める →',
    'home.tryEditor': 'エディタを試す',
    'home.feature1.title': 'インタラクティブエディタ',
    'home.feature1.description': 'VS Codeエディタによるリアルタイム実行と即座のフィードバック',
    'home.feature2.title': 'ガイド付きレッスン',
    'home.feature2.description': 'ヒントと解答付きのステップバイステップチュートリアル',
    'home.feature3.title': '進捗追跡',
    'home.feature3.description': '進捗を追跡し、上達に応じて新しいチャレンジをアンロック',

    // Lessons
    'lessons.title': 'プログラミングレッスン',
    'lessons.description': 'ハンズオンコーディング演習付きのインタラクティブプログラミングチュートリアル',
    'lessons.filter.all': 'すべて',
    'lessons.filter.javascript': 'JavaScript',
    'lessons.filter.python': 'Python',
    'lessons.filter.html': 'HTML/CSS',
    'lessons.filter.typescript': 'TypeScript',
    'lessons.moreComing': 'さらなるレッスンを準備中！',
    'lessons.requestLesson': 'レッスンをリクエスト',
    'lessons.difficulty.beginner': '初級',
    'lessons.difficulty.intermediate': '中級',
    'lessons.difficulty.advanced': '上級',
    'lessons.exerciseCount': '{count}個の演習',

    // Lesson Content
    'lesson.exercise': '演習',
    'lesson.completed': '完了',
    'lesson.loadStarterCode': 'スターターコードを読み込み',
    'lesson.showHints': 'ヒントを表示',
    'lesson.hideHints': 'ヒントを非表示',
    'lesson.showSolution': '解答を表示',
    'lesson.hints': '💡 ヒント:',
    'lesson.previous': '← 前へ',
    'lesson.next': '次へ →',
    'lesson.codeEditor': 'コードエディタ',
    'lesson.solutionLoaded': '✅ 解答を読み込み済み',
    'lesson.markCompleted': '完了にする',
    'lesson.progress': '進捗:',
    'lesson.exercisesCompleted': '個の演習を完了',

    // Code Editor
    'editor.output': '出力',
    'editor.preview': 'プレビュー',
    'editor.code': 'コード',
    'editor.runCode': '▶️ コードを実行',
    'editor.running': '実行中...',
    'editor.clear': 'クリア',
    'editor.executingCode': 'コードを実行中...',
    'editor.error': 'エラー:',
    'editor.executionTime': '実行時間: {time}ms',
    'editor.clickToRun': '「コードを実行」をクリックしてコードを実行し、結果をここで確認しましょう...',
    'editor.htmlCode': 'HTMLコード:',

    // Test Runner
    'test.testCases': 'テストケース',
    'test.runTests': '🧪 テストを実行',
    'test.runningTests': 'テスト実行中...',
    'test.testsPassed': '{passed}/{total} テスト通過',
    'test.pass': '✅ 合格',
    'test.fail': '❌ 不合格',
    'test.input': '入力:',
    'test.expectedOutput': '期待される出力:',
    'test.yourOutput': 'あなたの出力:',
    'test.error': 'エラー: {error}',
    'test.noOutput': '(出力なし)',
    'test.testSummary': 'テスト結果:',
    'test.allTestsPassed': '🎉 すべてのテストに合格しました！素晴らしいです！',
    'test.testsFailedMessage': '{count}個のテストが失敗しました。上記の出力を確認して再度お試しください。',
    'test.test': 'テスト',

    // Dashboard
    'dashboard.welcome': 'おかえりなさい、{name}さん！',
    'dashboard.description': '学習の進捗を追跡し、コーディングの旅を続けましょう。',
    'dashboard.stats.title': '学習統計',
    'dashboard.stats.enrolledLessons': '受講中のレッスン',
    'dashboard.stats.completedExercises': '完了した演習',
    'dashboard.stats.totalExercises': '総演習数',
    'dashboard.stats.progress': '進捗',
    'dashboard.stats.overallProgress': '全体の進捗',
    'dashboard.lessonProgress.title': 'レッスンの進捗',
    'dashboard.lessonProgress.noLessons': 'まだレッスンに登録されていません',
    'dashboard.lessonProgress.noLessonsDesc': 'レッスンに登録して学習を始めましょう。',
    'dashboard.lessonProgress.browseLessons': 'レッスンを見る',
    'dashboard.lessonProgress.continue': '続ける',
    'dashboard.lessonProgress.progress': '進捗: {completed} / {total} 演習',
    'dashboard.activity.title': '最近のアクティビティ',
    'dashboard.activity.noActivity': '最近のアクティビティがありません。コーディングを始めて進捗を確認しましょう！',
    'dashboard.activity.noActivityDesc': '最近のアクティビティがありません。コーディングを始めて進捗を確認しましょう！',
    'dashboard.activity.completed': '完了',
    'dashboard.activity.attempts': '{count}回の試行',
    'dashboard.activity.attempt': '{count}回の試行',
    'dashboard.activity.viewAll': 'すべてのアクティビティを見る',

    // Time formatting
    'time.justNow': 'たった今',
    'time.minutesAgo': '{count}分前',
    'time.hoursAgo': '{count}時間前',
    'time.daysAgo': '{count}日前',
    'time.minutes': '分',
    'time.hours': '時間',
    'time.days': '日',

    // Common
    'common.loading': '読み込み中...',
    'common.error': 'エラー',
    'common.success': '成功',
    'common.cancel': 'キャンセル',
    'common.save': '保存',
    'common.edit': '編集',
    'common.delete': '削除',
    'common.user': 'ユーザー',
  }
}