"use client";

import { useAuth } from "@clerk/nextjs";
import {
    PLAN_SLUGS,
    PLAN_LIMITS,
    type PlanSlug,
    type PlanLimits,
} from "@/lib/subscription-constants";

/**
 * Client-side hook to get the current user's plan slug and limits.
 * Use this in Client Components for conditional UI rendering.
 */
export function useSubscription(): {
    planSlug:  PlanSlug;
    limits:    PlanLimits;
    isFree:    boolean;
    isStandard: boolean;
    isPro:     boolean;
} {
    const { has } = useAuth();

    let planSlug: PlanSlug = PLAN_SLUGS.FREE;
    if (has?.({ plan: PLAN_SLUGS.PRO }))      planSlug = PLAN_SLUGS.PRO;
    else if (has?.({ plan: PLAN_SLUGS.STANDARD })) planSlug = PLAN_SLUGS.STANDARD;

    return {
        planSlug,
        limits:     PLAN_LIMITS[planSlug],
        isFree:     planSlug === PLAN_SLUGS.FREE,
        isStandard: planSlug === PLAN_SLUGS.STANDARD,
        isPro:      planSlug === PLAN_SLUGS.PRO,
    };
}