
ALTER TABLE "profiles" ALTER COLUMN "onboarding_complete" SET NOT NULL;
ALTER TABLE "profiles" ALTER COLUMN "onboarding_complete" SET DEFAULT false;
ALTER TABLE "profiles" RENAME COLUMN "onboarding_complete" TO "onboarding_completed";