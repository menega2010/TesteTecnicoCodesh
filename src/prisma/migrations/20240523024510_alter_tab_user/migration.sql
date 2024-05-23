/*
  Warnings:

  - You are about to drop the column `hash` on the `tab_user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tab_user_hash_key";

-- AlterTable
ALTER TABLE "tab_user" DROP COLUMN "hash";
