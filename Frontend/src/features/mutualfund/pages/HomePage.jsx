import LoadingState from "@/components/LoadingState";
import {
  selectActiveTabIndex,
  setActiveTabIndex,
} from "@/store/slices/mutualFundSlice";
import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { HashNavigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const InvestmentsTab = lazy(() => import("../components/InvestmentsTab"));
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
      onSlideChange={(swiper) =>
        dispatch(setActiveTabIndex(swiper.activeIndex))
      }
      breakpoints={{
        640: {
          allowTouchMove: false,
        },
      }}
    >
      <SwiperSlide data-hash="explore" className="min-h-svh">
        <Suspense fallback={<LoadingState isLoading={true} />}>
          <ExploreTab />
        </Suspense>
      </SwiperSlide>

      <SwiperSlide data-hash="investments" className="min-h-svh">
        {activeTabIndex === 1 && (
          <Suspense fallback={<LoadingState isLoading={true} />}>
            <InvestmentsTab />
          </Suspense>
        )}
      </SwiperSlide>

      <SwiperSlide data-hash="sip" className="min-h-svh">
        {activeTabIndex === 2 && (
          <Suspense fallback={<LoadingState isLoading={true} />}>
            <SipTab />
          </Suspense>
        )}
      </SwiperSlide>

      <SwiperSlide data-hash="watchlist" className="min-h-svh">
        {activeTabIndex === 3 && (
          <Suspense fallback={<LoadingState isLoading={true} />}>
            <WatchlistTab />
          </Suspense>
        )}
      </SwiperSlide>
    </Swiper>
  );
}

export default HomePage;
