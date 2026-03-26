import { auth } from "@clerk/nextjs/server";
import {
    PLAN_SLUGS,
    PLAN_LIMITS,
    type PlanSlug,
    type PlanLimits,
} from "@/lib/subscription-constants";

/**
 * Resolve the current user's active plan slug using Clerk's has() method.
 * Falls back to "free" when the user has no active paid plan.
 */
export async function getUserPlanSlug(): Promise<PlanSlug> {
    const { has } = await auth();

    if (has({ plan: PLAN_SLUGS.PRO }))      return PLAN_SLUGS.PRO;
    if (has({ plan: PLAN_SLUGS.STANDARD })) return PLAN_SLUGS.STANDARD;
    return PLAN_SLUGS.FREE;
}

/**
 * Return the full PlanLimits object for the current user.
 */
export async function getUserPlanLimits(): Promise<PlanLimits> {
    const slug = await getUserPlanSlug();
    return PLAN_LIMITS[slug];
}

/**
 * Check whether the user can create another book given their current book count.
 * Returns { allowed: true } or { allowed: false, reason: string }.
 */
export async function canCreateBook(
    currentBookCount: number
): Promise<{ allowed: boolean; reason?: string }> {
    const limits = await getUserPlanLimits();

    if (limits.maxBooks === -1) return { allowed: true };

    if (currentBookCount >= limits.maxBooks) {
        return {
            allowed: false,
            reason: `Your ${limits.label} plan allows a maximum of ${limits.maxBooks} book${limits.maxBooks === 1 ? "" : "s"}. Upgrade to add more.`,
        };
    }

    return { allowed: true };
}

/**
 * Check whether the user can start a new session this billing period.
 * Returns { allowed: true } or { allowed: false, reason: string }.
 */
export async function canStartSession(
    sessionsThisPeriod: number
): Promise<{ allowed: boolean; reason?: string }> {
    const limits = await getUserPlanLimits();

    if (limits.maxSessionsMonth === -1) return { allowed: true };

    if (sessionsThisPeriod >= limits.maxSessionsMonth) {
        return {
            allowed: false,
            reason: `You've used all ${limits.maxSessionsMonth} sessions for this month on the ${limits.label} plan. Upgrade to continue.`,
        };
    }

    return { allowed: true };
}