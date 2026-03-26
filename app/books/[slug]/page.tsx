import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, Mic, MicOff} from "lucide-react";

import { getBookBySlug } from "@/lib/actions/book.actions";
import Transcript from "@/components/Transcript";
import VapiControls from "@/components/VapiControls";

export default async function BookDetailsPage({
                                                  params,
                                              }: {
    params: Promise<{ slug: string }>;
}) {

    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const { slug } = await params;

    const result = await getBookBySlug(slug);

    if (!result.success || !result.data) {
        redirect("/");
    }

    const book = result.data;

    return (
        <div className="wrapper flex flex-col gap-6">

            {/* Back Button */}

            <Link href="/" className="w-fit">
                <ArrowLeft className="size-6 text-[#212a3b]" />
            </Link>




            {/* Transcript Section */}

           <VapiControls book={book}/>

        </div>
    );
}