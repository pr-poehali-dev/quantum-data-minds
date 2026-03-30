import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Youtube, Instagram, ChevronDown, Gift, Music, Utensils, Camera } from "lucide-react"
import { AnimatedText } from "@/components/animated-text"
import { WorldMap } from "@/components/world-map"
import { experiences } from "@/lib/experience-data"
import type { Experience } from "@/lib/experience-data"
import Icon from "@/components/ui/icon"

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numericStr = value.replace(/[^0-9.]/g, "")
          const targetNum = Number.parseFloat(numericStr)
          const unit = value.replace(/[0-9.]/g, "")

          let current = 0
          const increment = targetNum / 60
          const interval = setInterval(() => {
            current += increment
            if (current >= targetNum) {
              setDisplayValue(`${targetNum}${unit}`)
              clearInterval(interval)
            } else {
              setDisplayValue(`${current.toFixed(1)}${unit}`.replace(".0", ""))
            }
          }, 16)

          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="text-8xl" ref={ref}>
      {displayValue}
    </div>
  )
}

// Опрос гостей
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

export default function VerdantPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [imageFade, setImageFade] = useState(true)
  const [autoRotationKey, setAutoRotationKey] = useState(0)
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0)
  const [wordFade, setWordFade] = useState(true)
  const [dashboardScrollOffset, setDashboardScrollOffset] = useState(0)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const dynamicWords = ["смеяться", "танцевать", "отмечать", "веселиться", "праздновать", "радоваться", "гулять"]

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordFade(false)
      setTimeout(() => {
        setDynamicWordIndex((prev) => (prev + 1) % dynamicWords.length)
        setWordFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(wordInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (dashboardRef.current) {
        const dashboardRect = dashboardRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        const rotationStart = viewportHeight * 0.8
        const rotationEnd = viewportHeight * 0.2

        if (dashboardRect.top >= rotationStart) {
          setDashboardScrollOffset(0)
        } else if (dashboardRect.top <= rotationEnd) {
          setDashboardScrollOffset(15)
        } else {
          const scrollRange = rotationStart - rotationEnd
          const currentProgress = rotationStart - dashboardRect.top
          const rotationProgress = currentProgress / scrollRange
          const tiltAngle = rotationProgress * 15
          setDashboardScrollOffset(tiltAngle)
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const featuresCount = 4

    const interval = setInterval(() => {
      setImageFade(false)
      setTimeout(() => {
        setSelectedFeature((prev) => (prev + 1) % featuresCount)
        setImageFade(true)
      }, 300)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoRotationKey])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-[#0B0C0F] text-[#F2F3F5] overflow-x-hidden">
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-white/10 backdrop-blur-md bg-[#0B0C0F]/80 rounded-[16px]">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg md:text-xl font-semibold font-mono hover:text-pink-400 transition-colors duration-300"
            >
              🎂 День Рождения
            </button>

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("details")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Детали
              </button>
              <button
                onClick={() => scrollToSection("map")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Место
              </button>
              <button
                onClick={() => scrollToSection("program")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Программа
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Вопросы
              </button>
              <button
                onClick={() => scrollToSection("survey")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Опрос
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0B0C0F]/95 backdrop-blur-md z-50 flex flex-col items-start justify-end pb-20 pt-20 px-6">
          <div className="flex flex-col gap-8 items-start text-left w-full">
            <button
              onClick={() => scrollToSection("details")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              Детали
            </button>
            <button
              onClick={() => scrollToSection("map")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              Место
            </button>
            <button
              onClick={() => scrollToSection("program")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              Программа
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              Вопросы
            </button>
            <button
              onClick={() => scrollToSection("survey")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-pink-400 transition-colors duration-300"
            >
              Опрос
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section
        ref={heroRef}
        className={`relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isLoaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
        style={{
          backgroundImage: `url('/hero-landscape.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `url('/hero-landscape.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-[#0B0C0F]/70 to-transparent pointer-events-none" />

        <div
          className="max-w-[1120px] w-full mx-auto relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-serif text-[44px] leading-[1.1] md:text-[72px] md:leading-[1.05] font-medium mb-6 text-balance">
              <span
                className={`block stagger-reveal text-7xl font-light transition-all duration-500 md:text-8xl ${
                  wordFade ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                }`}
              >
                Время <AnimatedText key={dynamicWordIndex} text={dynamicWords[dynamicWordIndex]} delay={0} />
              </span>
              <span className="block stagger-reveal text-7xl font-light md:text-8xl" style={{ animationDelay: "90ms" }}>
                вместе!
              </span>
            </h1>
            <p
              className="text-[#A7ABB3] text-base md:text-lg max-w-[520px] mx-auto mb-8 leading-relaxed stagger-reveal text-white"
              style={{ animationDelay: "180ms" }}
            >
              Приглашаю тебя на мой день рождения — вечер, который запомнится надолго. Живая музыка, вкусная еда и самые близкие люди рядом.
            </p>
            <div className="stagger-reveal" style={{ animationDelay: "270ms" }}>
              <Button
                onClick={() => scrollToSection("survey")}
                className="glass-button px-8 py-6 text-base rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white"
              >
                Подтвердить участие 🎉
              </Button>
            </div>
          </div>

          <div className="mt-12 md:mt-20 stagger-reveal" style={{ animationDelay: "360ms" }} ref={dashboardRef}>
            <div style={{ perspective: "1200px" }}>
              <div
                className="relative aspect-[16/10] md:aspect-[16/9] rounded-[24px] overflow-hidden"
                style={{
                  transform: `rotateX(${dashboardScrollOffset}deg)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.05s linear",
                }}
              >
                <img
                  src="/dashboard-screenshot.png"
                  alt="Вечеринка"
                  className="object-cover dashboard-image w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative py-12 border-y border-white/5 bg-[#0B0C0F] overflow-hidden md:py-8 md:pt-8 md:pb-4">
        <div className="w-full">
          <p className="text-center text-xs md:text-sm uppercase tracking-[0.2em] text-[#A7ABB3] mb-8">
            Нас уже ждут весёлые вечера
          </p>
          <div className="logo-marquee">
            <div className="logo-marquee-content">
              {[
                "/logos/frame-11.png",
                "/logos/frame-55.png",
                "/logos/frame-4.png",
                "/logos/frame-6.png",
                "/logos/frame-8.png",
                "/logos/frame-2.png",
                "/logos/frame-3.png",
                "/logos/frame-7.png",
                "/logos/frame-11.png",
                "/logos/frame-55.png",
                "/logos/frame-4.png",
                "/logos/frame-6.png",
                "/logos/frame-8.png",
                "/logos/frame-2.png",
                "/logos/frame-3.png",
                "/logos/frame-7.png",
              ].map((logo, i) => (
                <div key={i} className="px-8 md:px-12 flex items-center justify-center flex-shrink-0">
                  <img
                    src={logo || "/placeholder.svg"}
                    alt={`Фото ${i + 1}`}
                    className="h-32 md:h-24 w-auto object-contain opacity-60 hover:opacity-60 transition-all duration-300 brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ДЕТАЛИ ПРАЗДНИКА */}
      <section id="details" className="relative py-20 md:py-32 px-4 animate-on-scroll md:pt-24 md:pb-20">
        <div className="max-w-[1120px] w-full mx-auto">
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 md:mb-8 text-center text-balance">
            Важные{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              детали
            </span>{" "}
            вечера
          </h2>

          <p className="text-[#A7ABB3] text-sm md:text-base mb-12 md:mb-16 text-center max-w-[600px] mx-auto leading-relaxed">
            Всё, что нужно знать, чтобы подготовиться к празднику.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[800px] mx-auto">
            {[
              { label: "ДАТА", value: "15", desc: "июня 2025 года", color: "pink" },
              { label: "НАЧАЛО", value: "19:00", desc: "двери открыты с 18:30", color: "purple" },
              { label: "ГОСТЕЙ", value: "30+", desc: "близких людей", color: "pink" },
              { label: "ДРЕСС-КОД", value: "Smart", desc: "casual — нарядно и удобно", color: "purple" },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-6 md:p-10 text-center border border-white/10 border-t-0 border-b border-l-0 border-r-0 md:py-10 md:pb-20"
              >
                <div
                  className={`text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-4 flex items-center justify-center gap-2`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${metric.color === "pink" ? "bg-pink-400/60" : "bg-purple-400/60"}`}
                  />
                  {metric.label}
                </div>
                <div className="font-serif text-[48px] md:text-[72px] leading-none font-medium">
                  {metric.value}
                </div>
                <div className="text-[11px] md:text-xs text-[#A7ABB3] mt-3">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАРТА МЕСТА */}
      <section id="map" className="relative py-20 md:py-32 animate-on-scroll bg-[#0B0C0F]">
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            МЕСТО ПРОВЕДЕНИЯ
          </div>
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
            Где будет праздник
          </h2>
          <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
            Нажми на точку на карте, чтобы увидеть детали площадки
          </p>
        </div>

        <WorldMap
          experiences={experiences}
          selectedExperience={selectedExperience}
          onSelectExperience={setSelectedExperience}
        />
      </section>

      {/* ПРОГРАММА ВЕЧЕРА */}
      <section id="program" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            <div className="max-w-[720px]">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                ПРОГРАММА ВЕЧЕРА
              </div>
              <h2 className="font-serif text-[36px] leading-[1.15] md:text-[56px] md:leading-[1.1] font-medium mb-8 text-balance">
                Каждый момент{" "}
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  особенный
                </span>
              </h2>
              <p className="text-[#A7ABB3] text-base md:text-lg leading-relaxed mb-12">
                Тёплая атмосфера, живая музыка, вкусный стол и много поводов для улыбок — вечер, который мы будем вспоминать ещё долго.
              </p>

              <div className="md:hidden mb-8">
                <div className="rounded-[24px] p-1 w-full aspect-square overflow-hidden">
                  <img
                    src={
                      [
                        "/drone.png",
                        "/real-time-satellite.png",
                        "/biodiversity-tracking.png",
                        "/deforestation-detect.png",
                      ][selectedFeature] || "/placeholder.svg"
                    }
                    alt="Программа"
                    className={`w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
                      imageFade ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Встреча гостей",
                    desc: "Приветственные напитки и знакомство, 18:30–19:00",
                    icon: Gift,
                    image: "/drone.png",
                  },
                  {
                    title: "Живая музыка",
                    desc: "Выступление и любимые хиты весь вечер",
                    icon: Music,
                    image: "/real-time-satellite.png",
                  },
                  {
                    title: "Праздничный стол",
                    desc: "Ужин, торт и тосты за именинника",
                    icon: Utensils,
                    image: "/biodiversity-tracking.png",
                  },
                  {
                    title: "Фото и танцы",
                    desc: "Фотозона, дискотека и тёплое прощание",
                    icon: Camera,
                    image: "/deforestation-detect.png",
                  },
                ].map((feature, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setImageFade(false)
                      setTimeout(() => {
                        setSelectedFeature(i)
                        setImageFade(true)
                        setAutoRotationKey((prev) => prev + 1)
                      }, 300)
                    }}
                    className={`relative w-full text-left flex gap-4 items-start p-5 transition-all duration-300 rounded-xs py-4 overflow-hidden ${
                      selectedFeature === i ? "border border-white/20" : "border border-white/10"
                    }`}
                  >
                    <feature.icon
                      className={`w-6 h-6 flex-shrink-0 mt-1 transition-colors ${
                        selectedFeature === i ? "text-pink-400" : "text-pink-500/60"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm md:text-base text-[#A7ABB3]">{feature.desc}</p>
                    </div>
                    {selectedFeature === i && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                        <div className="h-full bg-white progress-bar" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-stretch justify-center">
              <div className="relative w-full h-full min-h-[500px]">
                {[
                  { title: "Встреча гостей", image: "/drone.png" },
                  { title: "Живая музыка", image: "/real-time-satellite.png" },
                  { title: "Праздничный стол", image: "/biodiversity-tracking.png" },
                  { title: "Фото и танцы", image: "/deforestation-detect.png" },
                ].map((feature, i) => {
                  const positionInStack = (i - selectedFeature + 4) % 4
                  const isActive = positionInStack === 0

                  return (
                    <div
                      key={i}
                      className="absolute inset-0 p-1 transition-all duration-600 ease-out"
                      style={{
                        zIndex: 4 - positionInStack,
                        transform: `translateX(${positionInStack * 16}px) scale(${1 - positionInStack * 0.02})`,
                        opacity: isActive ? (imageFade ? 1 : 1) : 0.6 - positionInStack * 0.15,
                      }}
                    >
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        className="w-full h-full object-cover rounded-[20px]"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

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
            {[
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
            ].map((faq, i) => (
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
    </div>
  )
}
