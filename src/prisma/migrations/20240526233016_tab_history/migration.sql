-- CreateTable
CREATE TABLE "tab_history" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "pronom" TEXT NOT NULL,
    "created_at" VARCHAR(32) NOT NULL,
    "updated_at" VARCHAR(32),

    CONSTRAINT "tab_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tab_history_user_id_idx" ON "tab_history"("user_id");

-- AddForeignKey
ALTER TABLE "tab_history" ADD CONSTRAINT "tab_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tab_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
