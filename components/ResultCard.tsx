import React, { useState } from 'react';
import Button from './Button';

interface ResultCardProps {
  content: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: content,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for desktop or unsupported browsers: Copy content
      handleCopy();
      alert('공유하기 기능은 모바일에서 최적화되어 있습니다.\n텍스트가 복사되었습니다!');
    }
  };

  if (!content) return null;

  return (
    <div className="animate-fade-in-up mt-8 mb-12">
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-rose-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-300 to-rose-500"></div>

        <h3 className="text-center text-rose-500 font-bold mb-4 flex items-center justify-center gap-2">
          <span>💌</span>
          <span>생성된 주접멘트</span>
        </h3>

        <div className="bg-rose-50/50 rounded-xl p-5 mb-6">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium text-lg break-keep">
            {content}
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleCopy} className="flex-1">
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  복사됨!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  복사
                </>
              )}
          </Button>

          <Button onClick={handleShare} className="flex-1 bg-gray-900 hover:bg-gray-800 shadow-gray-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            공유하기
          </Button>
        </div>

        {/* Creator Promo Section */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                재밌으셨다면 친구나 SNS에 공유해주세요! 💕<br/>
                <span className="text-xs text-gray-500 font-normal">많은 분들이 사용하실 수 있도록 홍보해주시면 정말 감사하겠습니다 🙏</span>
            </p>
            <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-700 font-bold mb-3">
                    제작자 팔로우하고 더 재밌는 거 보기 👇
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                    <a
                        href="https://www.instagram.com/lsh678902?igsh=MXRyMnd1b2UydGg3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white rounded-xl shadow-sm hover:shadow-md transition-all group"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span className="font-semibold text-sm">인스타</span>
                    </a>
                    <a
                        href="https://www.threads.net/@lsh678902"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl shadow-sm hover:shadow-md hover:bg-gray-800 transition-all group"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142l-.126.742a12.998 12.998 0 0 0-2.84-.133c-1.235.07-2.24.437-2.989 1.092-.689.604-1.01 1.385-.958 2.33.05.954.533 1.706 1.364 2.153.702.378 1.59.549 2.498.481 1.31-.075 2.297-.562 2.937-1.449.744-.927 1.13-2.297 1.156-4.112l.014-.268v-.057c.012-.978-.244-1.655-.75-2.125-.512-.476-1.312-.715-2.374-.715a8.185 8.185 0 0 0-.695.031l-.126-.742a9.097 9.097 0 0 1 .82-.035c1.34 0 2.364.315 3.042.936.724.663 1.09 1.644 1.09 2.912v.057c-.027 2.073-.473 3.694-1.326 4.82-.854 1.124-2.132 1.768-3.8 1.916-1.225.108-2.405-.15-3.32-.705-1.085-.656-1.716-1.644-1.773-2.773-.058-1.1.408-2.095 1.324-2.836.854-.692 1.953-1.042 3.266-1.042.366 0 .739.02 1.108.061l-.126.742c-.354-.04-.71-.06-1.06-.06-1.185 0-2.177.302-2.948.9-.756.587-1.154 1.376-1.104 2.327.049.956.5 1.744 1.305 2.276.686.454 1.593.668 2.549.598 1.464-.106 2.497-.633 3.072-1.567.646-.978.958-2.394.928-4.21-.03-1.81-.606-3.11-1.724-3.868-.992-.678-2.403-.953-4.186-.816-3.367.27-5.625 1.884-6.707 4.8l-.126-.742c1.177-3.19 3.596-4.95 7.195-5.241 1.935-.156 3.524.128 4.722.846 1.333.796 2.02 2.267 2.05 4.374.03 1.974-.337 3.569-1.088 4.737-.751 1.167-1.875 1.798-3.35 1.908-1.035.075-1.998-.15-2.71-.63-.87-.585-1.405-1.472-1.508-2.5-.1-1.02.368-1.947 1.32-2.616.916-.645 2.088-.968 3.477-.968.38 0 .764.02 1.145.061l-.126.742a13.853 13.853 0 0 0-1.02-.053c-1.235 0-2.24.302-2.989.9-.689.587-1.01 1.376-.958 2.327.05.954.533 1.706 1.364 2.153.702.378 1.59.549 2.498.481 1.31-.075 2.297-.562 2.937-1.449.744-.927 1.13-2.297 1.156-4.112v-.057c.012-.978-.244-1.655-.75-2.125-.512-.476-1.312-.715-2.374-.715-.234 0-.467.01-.695.031l-.126-.742a9.097 9.097 0 0 1 .82-.035c1.34 0 2.364.315 3.042.936.724.663 1.09 1.644 1.09 2.912-.027 2.073-.473 3.694-1.326 4.82-.854 1.124-2.132 1.768-3.8 1.916-1.225.108-2.405-.15-3.32-.705-1.085-.656-1.716-1.644-1.773-2.773-.058-1.1.408-2.095 1.324-2.836.854-.692 1.953-1.042 3.266-1.042.366 0 .739.02 1.108.061l-.126.742c-.354-.04-.71-.06-1.06-.06-1.185 0-2.177.302-2.948.9-.756.587-1.154 1.376-1.104 2.327.049.956.5 1.744 1.305 2.276.686.454 1.593.668 2.549.598 1.464-.106 2.497-.633 3.072-1.567.646-.978.958-2.394.928-4.21z"/>
                        </svg>
                        <span className="font-semibold text-sm">스레드</span>
                    </a>
                    <a
                        href="https://lshsprotfolio.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-600 text-white rounded-xl shadow-sm hover:shadow-md hover:bg-gray-700 transition-all group"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <span className="font-semibold text-sm">포트폴리오</span>
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
