import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const conversations = [
    {
      name: t('t1Name'),
      role: t('t1Role'),
      initials: 'JR',
      avatarStyle: { background: 'linear-gradient(135deg, #000447, #6d11ad)' },
      question: t('t1Q'),
      answer: t('t1'),
    },
    {
      name: t('t2Name'),
      role: t('t2Role'),
      initials: 'SC',
      avatarStyle: { background: 'linear-gradient(135deg, #6d11ad, #3d00b5)' },
      question: t('t2Q'),
      answer: t('t2'),
    },
    {
      name: t('t3Name'),
      role: t('t3Role'),
      initials: 'MK',
      avatarStyle: { background: 'linear-gradient(135deg, #5c6dff, #6d11ad)' },
      question: t('t3Q'),
      answer: t('t3'),
    },
  ];

  return (
    <section id="testimonials" className="py-28 px-8 section-snap relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header — zelfde stijl als Portfolio */}
        <div className="text-center mb-12 fade-up">
          <span
            className="text-[#bdc2ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {t('label')}
          </span>
          <h2
            className="font-bold text-5xl text-[#e1e2e7]"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Chat grid — 3 kolommen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conversations.map((convo, i) => (
            <div
              key={i}
              className="fade-up rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Chat header bar */}
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={convo.avatarStyle}
                >
                  {convo.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#e1e2e7] leading-tight truncate">{convo.name}</p>
                  <p
                    className="text-[10px] text-[rgba(189,194,255,0.5)] uppercase tracking-widest leading-tight mt-0.5 truncate"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    {convo.role}
                  </p>
                </div>
                <div className="ml-auto text-[#e0b6ff] text-xs tracking-wide flex-shrink-0">★★★★★</div>
              </div>

              {/* Messages */}
              <div className="p-5 flex flex-col gap-3">
                {/* AKIN vraag — rechts */}
                <div className="flex flex-col items-end gap-1">
                  <div
                    className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-sm text-sm text-white leading-relaxed"
                    style={{ background: 'linear-gradient(135deg, #5c6dff, #6d11ad)' }}
                  >
                    {convo.question}
                  </div>
                  <span
                    className="text-[10px] text-[rgba(225,226,231,0.2)] pr-1"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    AKIN Visuals
                  </span>
                </div>

                {/* Klant antwoord — links */}
                <div className="flex flex-col items-start gap-1">
                  <div
                    className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(225,226,231,0.8)' }}
                  >
                    {convo.answer}
                  </div>
                  <span
                    className="text-[10px] text-[rgba(225,226,231,0.2)] pl-1"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    {convo.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
