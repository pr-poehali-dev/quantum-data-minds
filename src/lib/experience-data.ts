export interface Experience {
  id: string
  title: string
  company: string
  location: {
    city: string
    country: string
    lat: number
    lng: number
    isRemote: boolean
  }
  startDate: string
  endDate: string
  color: "pink" | "yellow" | "green" | "blue"
}

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Место проведения",
    company: "Основная площадка вечера",
    location: {
      city: "Москва",
      country: "Россия",
      lat: 55.7558,
      lng: 37.6173,
      isRemote: false,
    },
    startDate: "2025-06-15",
    endDate: "2025-06-15",
    color: "pink",
  },
  {
    id: "2",
    title: "Гости из Питера",
    company: "Добираются специально",
    location: {
      city: "Санкт-Петербург",
      country: "Россия",
      lat: 59.9343,
      lng: 30.3351,
      isRemote: false,
    },
    startDate: "2025-06-15",
    endDate: "2025-06-15",
    color: "yellow",
  },
  {
    id: "3",
    title: "Гости из Казани",
    company: "Едут отмечать!",
    location: {
      city: "Казань",
      country: "Россия",
      lat: 55.8304,
      lng: 49.0661,
      isRemote: false,
    },
    startDate: "2025-06-15",
    endDate: "2025-06-15",
    color: "blue",
  },
  {
    id: "4",
    title: "Гости из Екатеринбурга",
    company: "Не пропустят праздник",
    location: {
      city: "Екатеринбург",
      country: "Россия",
      lat: 56.8389,
      lng: 60.6057,
      isRemote: false,
    },
    startDate: "2025-06-15",
    endDate: "2025-06-15",
    color: "green",
  },
  {
    id: "5",
    title: "Онлайн-гости",
    company: "Присоединятся по видео",
    location: {
      city: "Новосибирск",
      country: "Россия",
      lat: 54.9885,
      lng: 82.9207,
      isRemote: true,
    },
    startDate: "2025-06-15",
    endDate: "2025-06-15",
    color: "pink",
  },
]
