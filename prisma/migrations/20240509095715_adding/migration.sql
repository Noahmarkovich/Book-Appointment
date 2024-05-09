-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_id_key" ON "Content"("id");
