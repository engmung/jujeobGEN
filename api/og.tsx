import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title') || '주접멘트 생성기';
    const description = searchParams.get('description') || '평소에 전하기 쑥스러운 마음을 유머러스하고 과장된 주접 멘트로';

    // Fetch Pretendard font
    const fontData = await fetch(
      new URL('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/woff2/Pretendard-Bold.woff2', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            backgroundImage: 'linear-gradient(to bottom right, #fdf2f8, #fce7f3)',
            fontFamily: 'Pretendard',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px',
            }}
          >
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                background: 'linear-gradient(to right, #f43f5e, #ec4899)',
                backgroundClip: 'text',
                color: 'transparent',
                marginBottom: 40,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              💕 {title}
            </div>
            <div
              style={{
                fontSize: 36,
                color: '#6b7280',
                textAlign: 'center',
                maxWidth: '800px',
                lineHeight: 1.5,
              }}
            >
              {description}
            </div>
            <div
              style={{
                marginTop: 60,
                fontSize: 28,
                color: '#f43f5e',
                fontWeight: 700,
              }}
            >
              사랑의 이름으로! ✨
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Pretendard',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
