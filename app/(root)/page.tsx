import React from 'react'
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";

const Page = async ({
                        searchParams,
                    }: {
    searchParams: Promise<{ query?: string }>;
}) => {

    const params = await searchParams;
    const query = params?.query || "";

    const bookResults = await getAllBooks(query);
    const books = bookResults?.success ? bookResults.data ?? [] : [];

    return (
        <main className="wrapper container">
            <HeroSection />

            <div className="library-books-grid">
                {books.map((book: any) => (
                    <BookCard
                        key={book._id}
                        title={book.title}
                        author={book.author}
                        coverURL={book.coverURL}
                        slug={book.slug}
                    />
                ))}
            </div>
        </main>
    );
};

export default Page;