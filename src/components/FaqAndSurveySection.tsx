import { useState } from "react"
import { ChevronDown, Youtube, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const faqItems = [
  {
    question: "Можно прийти с парой или другом?",
    answer:
      "Конечно! Если хочешь взять кого-то с собой — укажи это в опросе или напиши мне лично, чтобы я знал(а) точное количество гостей.",
  },
  {
    question: "Нужно ли приносить подарок?",
    answer:
      "Твоё присутствие — уже лучший подарок! Но если очень хочется — буду рад(а) чему-нибудь приятному. Никаких обязательств.",
  },
  {
    question: "Где припарковаться?",
    answer:
      "Рядом с местом проведения есть платная парковка. Также удобно добираться на такси — это быстрее и проще, особенно если планируешь хорошо отметить.",
  },
  {
    question: "Будет ли возможность поесть?",
    answer:
      "Да! Планируется полноценный праздничный ужин. Если у тебя есть диетические ограничения или аллергии — обязательно укажи их в опросе.",
  },
  {
    question: "До какого времени будет праздник?",
    answer:
      "Планируем веселиться до позднего вечера — примерно до 23:00–00:00. Но никто не торопит — будем заканчивать, когда все будут готовы.",
  },
  {
    question: "Что делать, если не смогу прийти?",
    answer:
      "Очень жаль, но всё понимаю! Просто отметь в опросе, что не сможешь. Найдём способ отпраздновать вместе в другой раз.",
  },
]

const surveyQuestions = [
  {
    id: "attendance",
    question: "Придёшь на праздник?",
    options: ["Да, буду!", "Скорее всего да", "Пока не уверен(а)", "К сожалению, нет"],
  },
  {
    id: "food",
    question: "Предпочтения по еде?",
    options: ["Всеядный(ая)", "Вегетарианец/ка", "Веган(ка)", "Есть аллергии (укажу в коментарии)"],
  },
  {
    id: "music",
    question: "Какую музыку любишь?",
    options: ["Поп / Хиты 2000-х", "Рок / Электронная", "Хип-хоп / R&B", "Классика / Джаз"],
  },
]

function SurveySection() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="font-serif text-3xl md:text-4xl font-medium mb-4">Спасибо, {name || "друг"}!</h3>
        <p className="text-[#A7ABB3] text-base md:text-lg">Твои ответы получены. Ждём тебя на празднике!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div>
        <label className="block text-sm text-[#A7ABB3] mb-3 uppercase tracking-widest">Твоё имя</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Как тебя зовут?"
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-base text-white placeholder-[#A7ABB3] outline-none focus:border-pink-400/50 transition-colors"
        />
      </div>

      {surveyQuestions.map((q) => (
        <div key={q.id}>
          <label className="block text-base md:text-lg font-medium mb-4">{q.question}</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                className={`text-left px-5 py-4 rounded-xl border text-sm md:text-base transition-all duration-200 ${
                  answers[q.id] === opt
                    ? "border-pink-400/60 bg-pink-400/10 text-white"
                    : "border-white/10 bg-white/5 text-[#A7ABB3] hover:border-white/20 hover:text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div>
        <label className="block text-sm text-[#A7ABB3] mb-3 uppercase tracking-widest">Комментарий (необязательно)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Пожелания, аллергии, сюрпризы..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-base text-white placeholder-[#A7ABB3] outline-none focus:border-pink-400/50 transition-colors resize-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full glass-button px-8 py-6 text-base rounded-full bg-white/5 border border-white/10 hover:bg-pink-400/10 hover:border-pink-400/40 transition-all duration-300 text-white"
      >
        Отправить ответы 🎊
      </Button>
    </form>
  )
}

export function FaqAndSurveySection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  return (
    <>
      {/* FAQ */}
      <section id="faq" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[800px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              ЧАСТЫЕ ВОПРОСЫ
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Есть{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                вопросы
              </span>
              ?
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
              Всё, что нужно знать перед тем, как прийти на праздник.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base md:text-lg font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#A7ABB3] transition-transform duration-300 ${
                      openFaqIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-sm md:text-base text-[#A7ABB3] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОПРОС ГОСТЕЙ */}
      <section
        id="survey"
        className="relative py-24 md:py-40 px-4 animate-on-scroll overflow-hidden"
        style={{
          backgroundImage: `url('/earth-cta.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F] via-[#0B0C0F]/80 to-[#0B0C0F]/90 pointer-events-none" />
        <div className="max-w-[680px] w-full mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass-pill px-4 py-2 rounded-full mb-8 text-xs md:text-sm text-[#A7ABB3]">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              Опрос гостей
            </div>
            <h2 className="font-serif text-[40px] leading-[1.15] md:text-[64px] md:leading-[1.1] font-medium mb-6 text-balance">
              Ждём тебя на празднике!
            </h2>
            <p className="text-[#A7ABB3] text-base md:text-lg mb-10 leading-relaxed max-w-[560px] mx-auto">
              Заполни короткий опрос, чтобы мы подготовились к твоему визиту наилучшим образом.
            </p>
          </div>

          <SurveySection />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-4 border-t border-white/5 py-8">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold font-mono">🎂 День Рождения</div>
              <p className="text-xs text-[#A7ABB3] leading-relaxed">
                Праздничный вечер в кругу близких людей. Ждём тебя!
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a href="#" className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors" aria-label="X (Twitter)">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Вечер</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Программа</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Место</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Дресс-код</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Как добраться</a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Гостям</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Опрос</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">FAQ</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Связаться</a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Дата</div>
              <div className="flex flex-col gap-3">
                <span className="text-sm text-[#A7ABB3]">15 июня 2025</span>
                <span className="text-sm text-[#A7ABB3]">Начало в 19:00</span>
                <span className="text-sm text-[#A7ABB3]">Двери с 18:30</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#A7ABB3]">© 2025 · С любовью для тебя 🎂</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                Конфиденциальность
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
