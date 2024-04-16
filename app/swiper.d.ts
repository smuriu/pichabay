import { SwiperContainer, SwiperSlide } from 'swiper/element/bundle'

// augment JSX.IntrinsicElements with swiper `WebComponent`s
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.HTMLAttributes<SwiperContainer>
      'swiper-slide': React.HTMLAttributes<SwiperSlide>
    }
  }
}

export {}
