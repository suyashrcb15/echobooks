'use server';

import {CreateBook, TextSegment} from "@/types";
import {connectToDatabase} from "@/database/mongoose";
import {generateSlug, serializeData} from "@/lib/utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/bookSegment.model";


export const getAllBooks = async (query?: string) => {
    try {
        await connectToDatabase()

        let books

        if (query) {
            books = await Book.find({
                title: { $regex: query, $options: "i" }
            }).sort({ createdAt: -1 }).lean()
        } else {
            books = await Book.find().sort({ createdAt: -1 }).lean()
        }

        return {
            success: true,
            data: serializeData(books)
        }

    } catch (e) {
        console.error("Error connecting to database", e)

        return {
            success: false,
            data: []
        }
    }
}


export const checkBookExists= async(title: string) => {
    try{
        await connectToDatabase();
        const slug = generateSlug(title);
        const existingBook = await Book.findOne({slug}).lean();

        if(existingBook){
            return {
                exists: true, data: serializeData(existingBook)
            }
        }

    } catch (e){
        console.error('Error checking book exists', e);
        return{
            exists: false, error: e
        }
    }
}


export const createBook = async(data:  CreateBook) => {
    try{
        await connectToDatabase();
        const slug= generateSlug(data.title);
        const existingBook= await Book.findOne({slug}).lean();

        if(existingBook){
            return {
                success: true,
                data: JSON.parse(JSON.stringify(book))
            };
        }

        const book = await Book.create({ ...data, slug, totalSegments: 0});
        return {
            success: true,
            data: serializeData(book),
        }
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e.message : "Unknown error"
        }
    }
}


export const saveBookSegments= async (bookId: string, clerkId: string, segments: TextSegment[])=>{
    try{
        await connectToDatabase();
        console.log('Saving book segments...');
        const segmentsToInsert= segments.map(({text, segmentIndex, pageNumber, wordCount})=>({
            clerkId, bookId, content:text, segmentIndex, pageNumber, wordCount
        }));

        await BookSegment.insertMany(segmentsToInsert);
        await Book.findByIdAndUpdate(bookId, {totalSegments: segments.length});

        console.log('Book segments saved successfully.');

        return{
            success : true,
            data: { segmentsCreated: segments.length}
        }

    } catch(e){
        console.error('Error saving book segments', e);

        await BookSegment.deleteMany({ bookId});
        await Book.findByIdAndDelete(bookId);
        console.log('Delection book segments and book due to failure to save segments.');
    }

}