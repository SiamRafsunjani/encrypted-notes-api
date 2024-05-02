-- CreateTable
CREATE TABLE "secret_notes" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "encryptionIv" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "secret_notes_pkey" PRIMARY KEY ("id")
);
