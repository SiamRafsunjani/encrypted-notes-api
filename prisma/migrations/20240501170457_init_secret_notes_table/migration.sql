-- CreateTable
CREATE TABLE "secret_notes" (
    "id" SERIAL NOT NULL,
    "note" TEXT,
    "createdAt" BOOLEAN DEFAULT false,

    CONSTRAINT "secret_notes_pkey" PRIMARY KEY ("id")
);
