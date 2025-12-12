import { NextRequest, NextResponse } from 'next/server';

/**
 * Ping 接口
 * 用于测试 API 连接是否正常
 * 返回 { message: 'pong' }
 */
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      message: 'pong',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Ping 错误:', error);
    return NextResponse.json(
      { message: 'error', error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({
      message: 'pong',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Ping 错误:', error);
    return NextResponse.json(
      { message: 'error', error: 'Internal server error' },
      { status: 500 }
    );
  }
}
