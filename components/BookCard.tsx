import React from 'react'
import Link from "next/link";
import Image from "next/image";

import {BookCardProps} from "@/types";

const BookCard = ({title , author, coverURL, slug}: BookCardProps) => {
    return (
        <Link href={`/books/${slug}`}>
            <article className="book-card mt-10">
                <figure className="book-card-cover">
                    <div className="book-card-cover-wrapper">
                        <Image src={coverURL} alt={title} width={133} height={200} className="book-card-cover"/>
                    </div>
                </figure>
                <figcaption className="book-card-meta">
                    <h3 className="book-card-title mt-10">{title}</h3>
                    <p className="book-card-author mt-10">{author}</p>
                </figcaption>
            </article>
        </Link>
    )
}
export default BookCard
