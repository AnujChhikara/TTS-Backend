/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('BEHAVIORAL', 'TECHNICAL_CODING', 'TECHNICAL_SYSTEM_DESIGN', 'PRODUCT_MANAGEMENT', 'GENERAL');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "googleId" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "InterviewType" NOT NULL DEFAULT 'GENERAL',
    "jobRole" TEXT,
    "jobLevel" TEXT,
    "focusArea" TEXT,
    "overallScore" DOUBLE PRECISION,
    "overallFeedback" TEXT,
    "keyStrengths" TEXT,
    "keyWeaknesses" TEXT,
    "clarityScore" DOUBLE PRECISION,
    "concisenessScore" DOUBLE PRECISION,
    "relevanceScore" DOUBLE PRECISION,
    "confidenceScore" DOUBLE PRECISION,
    "pacingFeedback" TEXT,
    "analysisComplete" BOOLEAN NOT NULL DEFAULT false,
    "sessionName" TEXT,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversationEntry" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "answerText" TEXT NOT NULL,
    "audioUrl" TEXT,
    "answerScore" DOUBLE PRECISION,
    "answerFeedback" TEXT,
    "answerWordCount" INTEGER,
    "answerDurationSeconds" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversationEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerSkillFeedback" (
    "id" TEXT NOT NULL,
    "conversationEntryId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "feedbackText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnswerSkillFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewSkillSummary" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "summaryText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewSkillSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Interview_userId_idx" ON "Interview"("userId");

-- CreateIndex
CREATE INDEX "Interview_createdAt_idx" ON "Interview"("createdAt");

-- CreateIndex
CREATE INDEX "ConversationEntry_interviewId_sequence_idx" ON "ConversationEntry"("interviewId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE INDEX "AnswerSkillFeedback_conversationEntryId_idx" ON "AnswerSkillFeedback"("conversationEntryId");

-- CreateIndex
CREATE INDEX "AnswerSkillFeedback_skillId_idx" ON "AnswerSkillFeedback"("skillId");

-- CreateIndex
CREATE UNIQUE INDEX "AnswerSkillFeedback_conversationEntryId_skillId_key" ON "AnswerSkillFeedback"("conversationEntryId", "skillId");

-- CreateIndex
CREATE INDEX "InterviewSkillSummary_interviewId_idx" ON "InterviewSkillSummary"("interviewId");

-- CreateIndex
CREATE INDEX "InterviewSkillSummary_skillId_idx" ON "InterviewSkillSummary"("skillId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewSkillSummary_interviewId_skillId_key" ON "InterviewSkillSummary"("interviewId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationEntry" ADD CONSTRAINT "ConversationEntry_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerSkillFeedback" ADD CONSTRAINT "AnswerSkillFeedback_conversationEntryId_fkey" FOREIGN KEY ("conversationEntryId") REFERENCES "ConversationEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerSkillFeedback" ADD CONSTRAINT "AnswerSkillFeedback_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSkillSummary" ADD CONSTRAINT "InterviewSkillSummary_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSkillSummary" ADD CONSTRAINT "InterviewSkillSummary_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
