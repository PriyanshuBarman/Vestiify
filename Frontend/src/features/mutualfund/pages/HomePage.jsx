import { selectActiveTabIndex, setActiveTabIndex } from "@/store/slices/mutualFundSlice";
import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { HashNavigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const InvestmentsTab = lazy(() => import("../components/dashboard/InvestmentsTab"));
const SipTab = lazy(() => import("../components/SipTab"));
const WatchlistTab = lazy(() => import("../components/WatchlistTab"));
const ExploreTab = lazy(() => import("../components/ExploreTab"));

function HomePage() {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const dispatch = useDispatch();

  return (
    <Swiper
      modules={[HashNavigation]}
      spaceBetween={50}
      slidesPerView={1}
      hashNavigation={{
        watchState: true,
        replaceState: true,
      }}
      onSlideChange={(swiper) => dispatch(setActiveTabIndex(swiper.activeIndex))}
      breakpoints={{
        640: {
          allowTouchMove: false,
        },
      }}
    >
      <SwiperSlide data-hash="explore" className="min-h-svh">
        <Suspense fallback={<TabLoader />}>
          <ExploreTab />
        </Suspense>
      </SwiperSlide>

      <SwiperSlide data-hash="investments" className="min-h-svh">
        {activeTabIndex === 0 && (
          <Suspense fallback={<TabLoader />}>
            <InvestmentsTab />
          </Suspense>
        )}
      </SwiperSlide>

      <SwiperSlide data-hash="sip" className="min-h-svh">
        {activeTabIndex === 1 && (
          <Suspense fallback={<TabLoader />}>
            <SipTab />
          </Suspense>
        )}
      </SwiperSlide>

      <SwiperSlide data-hash="watchlist" className="min-h-svh">
        {activeTabIndex === 2 && (
          <Suspense fallback={<TabLoader />}>
            <WatchlistTab />
          </Suspense>
        )}
      </SwiperSlide>
    </Swiper>
  );
}

export default HomePage;

function TabLoader() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="Spinner border-primary size-5 animate-spin rounded-full border-2 border-t-transparent sm:size-6"></div>
      <span className="text-sm italic sm:text-base">Processing...</span>
    </div>
  );
}
