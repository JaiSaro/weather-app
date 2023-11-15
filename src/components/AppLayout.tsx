import MapSection from "./MapSection";

export default function AppLayout() {
    return (
        <div>
            <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
                {/* Google Map Section */}
                <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
                    <MapSection />
                </div>
                {/* Weather Info */}
                <div className='mt-4 lg:row-span-3 lg:mt-0'>
                    Weather Info section
                </div>
            </div>
        </div>
    );
}
