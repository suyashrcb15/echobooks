'use server';

import {StartSessionResult,EndSessionResult} from "@/types";
import {connectToDatabase} from "@/database/mongoose";
import VoiceSession from "@/database/models/voiceSession.model";
import {getCurrentBillingPeriodStart} from "@/lib/subscription-constants";

export const startVoiceSession= async (clerkId :string, bookId : string) : Promise<StartSessionResult> =>{

    try{
        await connectToDatabase();

        const session = await VoiceSession.create({
            clerkId, bookId, staredAt: new Date(),
            billingPeriodStart: getCurrentBillingPeriodStart(),
            durationSeconds:0,
        });
        return {
            success: true,
            sessionId: session._id.toString(),
        }


    } catch (e) {
        console.error('Error starting voice session',e);
        return { success: false , error: 'Failed to start voice session. Please try again later.'};
    }
}

export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {
    try {
        await connectToDatabase();

        const result = await VoiceSession.findByIdAndUpdate(sessionId, {
            endedAt: new Date(),
            durationSeconds,
        });

        if(!result) return { success: false, error: 'Voice session not found.' }

        return { success: true }
    } catch (e) {
        console.error('Error ending voice session', e);
        return { success: false, error: 'Failed to end voice session. Please try again later.' }
    }
}