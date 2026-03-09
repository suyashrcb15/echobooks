import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="w-full flex justify-center pt-32s px-6">
            {/* Beige Card */}
            <div className="max-w-6xl w-full bg-[#F5E6D3] rounded-3xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                {/* LEFT SECTION */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Your Library
                    </h1>

                    <p className="text-gray-700 text-lg">
                        Organize and explore your favorite books in one place.
                        Build your personal reading collection and manage it easily.
                    </p>

                    <Link
                        href="/books/new"
                        className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
                    >
                        Add New Book
                    </Link>
                </div>

                {/* CENTER ILLUSTRATION */}
                <div className="flex justify-center">
                    <Image
                        src="/assets/vedic.png"
                        alt="Vintage books and globe"
                        width={260}
                        height={260}
                        className="object-contain"
                    />
                </div>

                {/* RIGHT STEPS CARD */}
                <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">

                    <div className="flex items-start gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white font-semibold">
              1
            </span>
                        <p className="text-gray-700">
                            Add books to your personal library
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white font-semibold">
              2
            </span>
                        <p className="text-gray-700">
                            Organize and manage your collection
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white font-semibold">
              3
            </span>
                        <p className="text-gray-700">
                            Discover and revisit your favorite reads
                        </p>
                    </div>

                </div>

            </div>


        </section>
    );
}
export default HeroSection;