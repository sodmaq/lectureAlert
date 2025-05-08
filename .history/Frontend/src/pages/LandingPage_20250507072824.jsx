/* eslint-disable */
function LandingPage() {
  return (
    <div class="grid md:grid-cols-2 items-center md:gap-4 gap-8 max-w-5xl max-md:max-w-md mx-auto">
      <div class="max-md:order-1 max-md:text-center">
        <h3 class="text-slate-900 font-medium md:text-3xl text-2xl md:leading-10">
          Prompt Delivery and Enjoyable Dining Experience.
        </h3>
        <p class="mt-4 text-sm text-slate-600 leading-relaxed">
          Laboris qui Lorem ad tempor ut reprehenderit. Nostrud anim nulla
          officia ea sit deserunt. Eu eu quis anim aute Laboris qui Lorem ad
          tempor ut reprehenderit.
        </p>
        <button
          type="button"
          class="px-5 py-2.5 mt-10 rounded text-[15px] font-medium outline-none tracking-wide bg-blue-600 text-white hover:bg-blue-700"
        >
          Explore
        </button>
      </div>
      <div class="md:h-[470px]">
        <img
          src="https://readymadeui.com/photo.webp"
          class="w-full h-full md:object-contain"
        />
      </div>
    </div>
  );
}

export default LandingPage;
