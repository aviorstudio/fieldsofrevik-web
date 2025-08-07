/** @jsxImportSource @builder.io/qwik */
import { component$, useSignal, $ } from '@builder.io/qwik';

export interface CarouselItem {
  src: string;
  name: string;
}

export interface CarouselProps {
  items: CarouselItem[];
}

export const Carousel = component$<CarouselProps>(({ items }) => {
  const currentIndex = useSignal(0);
  const isTransitioning = useSignal(false);

  const goToPrevious = $(() => {
    if (isTransitioning.value) return;
    isTransitioning.value = true;
    currentIndex.value = (currentIndex.value - 1 + items.length) % items.length;
    
    setTimeout(() => {
      isTransitioning.value = false;
    }, 300);
  });

  const goToNext = $(() => {
    if (isTransitioning.value) return;
    isTransitioning.value = true;
    currentIndex.value = (currentIndex.value + 1) % items.length;
    
    setTimeout(() => {
      isTransitioning.value = false;
    }, 300);
  });

  return (
    <div class="carousel-container relative w-full max-w-md mx-auto aspect-square overflow-hidden rounded-2xl min-h-[300px]">
      {items.map((item, index) => (
        <div 
          key={index}
          class="carousel-item absolute inset-0 transition-transform duration-300 ease-in-out z-0"
          style={{
            transform: index === currentIndex.value 
              ? 'translateX(0)' 
              : index < currentIndex.value 
                ? 'translateX(-100%)' 
                : 'translateX(100%)'
          }}
        >
          <img 
            src={item.src} 
            alt={item.name} 
            width={512}
            height={512}
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
      
      {/* Bottom overlay with Coming Soon and navigation buttons */}
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4 rounded-b-2xl z-10">
        <div class="flex items-center justify-between gap-2">
          <button 
            class="bg-black/50 text-[#d4af37] border-none w-8 h-8 sm:w-10 sm:h-10 cursor-pointer text-lg sm:text-xl rounded-full hover:bg-black/70 transition-colors flex items-center justify-center flex-shrink-0" 
            aria-label="Previous"
            onClick$={goToPrevious}
            disabled={isTransitioning.value}
          >
            &lt;
          </button>
          
          <h2 class="font-['Cinzel'] text-center m-0 text-[#d4af37] text-sm sm:text-lg md:text-xl [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
            <span class="tracking-[0.2em] uppercase text-xs font-semibold">
              Coming Soon
            </span>
          </h2>
          
          <button 
            class="bg-black/50 text-[#d4af37] border-none w-8 h-8 sm:w-10 sm:h-10 cursor-pointer text-lg sm:text-xl rounded-full hover:bg-black/70 transition-colors flex items-center justify-center flex-shrink-0" 
            aria-label="Next"
            onClick$={goToNext}
            disabled={isTransitioning.value}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
});
