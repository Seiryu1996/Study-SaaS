import { NextRequest, NextResponse } from 'next/server'

export async function POST() {
  try {
    return NextResponse.json({
      output: "<!DOCTYPE html><html><head><title>Preview</title></head><body><h1>Test</h1></body></html>",
      executionTime: 30,
      htmlPreview: true
    })
  } catch {
    return NextResponse.json({ error: "Failed" })
  }
}