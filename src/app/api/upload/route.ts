import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { errno: 1, message: '没有找到上传的文件' },
        { status: 400 }
      );
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { errno: 1, message: '不支持的文件类型，仅支持 JPG、PNG、GIF、WebP' },
        { status: 400 }
      );
    }

    // 验证文件大小 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { errno: 1, message: '文件大小不能超过 10MB' },
        { status: 400 }
      );
    }

    // 读取文件内容
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    // 生成数据URL (用于演示/测试)
    const dataUrl = `data:${file.type};base64,${base64}`;

    // 返回成功响应
    // wangEditor 期望的响应格式
    return NextResponse.json({
      errno: 0,
      data: {
        url: dataUrl,
        alt: file.name,
        href: dataUrl
      }
    });

  } catch (error) {
    console.error('上传错误:', error);
    return NextResponse.json(
      { errno: 1, message: '上传失败，请重试' },
      { status: 500 }
    );
  }
}
