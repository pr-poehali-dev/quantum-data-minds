import { useEffect, useState } from "react"
import { Gift, Music, Utensils, Camera } from "lucide-react"

const features = [
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
]

export function ProgramSection() {
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [imageFade, setImageFade] = useState(true)
  const [autoRotationKey, setAutoRotationKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setImageFade(false)
      setTimeout(() => {
        setSelectedFeature((prev) => (prev + 1) % features.length)
        setImageFade(true)
      }, 300)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoRotationKey])

  return (
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

            {/* Mobile image */}
            <div className="md:hidden mb-8">
              <div className="rounded-[24px] p-1 w-full aspect-square overflow-hidden">
                <img
                  src={features[selectedFeature].image || "/placeholder.svg"}
                  alt="Программа"
                  className={`w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
                    imageFade ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-6">
              {features.map((feature, i) => (
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

          {/* Desktop stacked images */}
          <div className="hidden md:flex items-stretch justify-center">
            <div className="relative w-full h-full min-h-[500px]">
              {features.map((feature, i) => {
                const positionInStack = (i - selectedFeature + features.length) % features.length
                const isActive = positionInStack === 0

                return (
                  <div
                    key={i}
                    className="absolute inset-0 p-1 transition-all duration-600 ease-out"
                    style={{
                      zIndex: features.length - positionInStack,
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
  )
}
