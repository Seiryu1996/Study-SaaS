import { NextRequest, NextResponse } from 'next/server'

export async function POST() {
  try {
    return NextResponse.json({
      output: "TypeScript executed: 5",
      executionTime: 50
    })
  } catch {
    return NextResponse.json({ error: "Failed" })
  }
}