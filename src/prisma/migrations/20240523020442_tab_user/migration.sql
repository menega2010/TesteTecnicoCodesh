-- CreateTable
CREATE TABLE "tab_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "created_at" VARCHAR(32) NOT NULL,
    "updated_at" VARCHAR(32),

    CONSTRAINT "tab_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tab_user_phone_key" ON "tab_user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "tab_user_hash_key" ON "tab_user"("hash");
