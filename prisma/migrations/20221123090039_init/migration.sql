-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('creditCard', 'bankAccount');

-- CreateEnum
CREATE TYPE "TransferType" AS ENUM ('income', 'costs');

-- CreateTable
CREATE TABLE "CategoryIcon" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "CategoryIcon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL DEFAULT '',
    "file" BYTEA NOT NULL,
    "categoryIconId" INTEGER NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "code" INTEGER NOT NULL,
    "codeS" CHAR(3) NOT NULL DEFAULT '',
    "name" VARCHAR(50) NOT NULL DEFAULT '',
    "default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL DEFAULT '',
    "iconId" INTEGER NOT NULL,
    "type" "TransferType" NOT NULL DEFAULT 'costs',
    "default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL DEFAULT '',
    "categoryId" INTEGER NOT NULL,
    "iconId" INTEGER NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" SERIAL NOT NULL,
    "type" "BankAccountType" NOT NULL,
    "name" VARCHAR(50) NOT NULL DEFAULT '',
    "expirationDate" DATE NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "hashPassword" VARCHAR(512) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCategory" (
    "accountId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UserSubCategory" (
    "accountId" INTEGER NOT NULL,
    "subCategoryId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "MoneyTransfer" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "type" "TransferType" NOT NULL DEFAULT 'costs',
    "accountId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "subCategoryId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MoneyTransfer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "ScheduleModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ScheduleModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "scheduleModelId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "subCategoryId" INTEGER NOT NULL,
    "defaultAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "schema" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCategory_accountId_categoryId_key" ON "UserCategory"("accountId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubCategory_accountId_subCategoryId_key" ON "UserSubCategory"("accountId", "subCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_accountId_categoryId_subCategoryId_key" ON "Schedule"("accountId", "categoryId", "subCategoryId");

-- AddForeignKey
ALTER TABLE "Icon" ADD CONSTRAINT "Icon_categoryIconId_fkey" FOREIGN KEY ("categoryIconId") REFERENCES "CategoryIcon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCategory" ADD CONSTRAINT "UserCategory_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCategory" ADD CONSTRAINT "UserCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubCategory" ADD CONSTRAINT "UserSubCategory_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubCategory" ADD CONSTRAINT "UserSubCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransfer" ADD CONSTRAINT "MoneyTransfer_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransfer" ADD CONSTRAINT "MoneyTransfer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransfer" ADD CONSTRAINT "MoneyTransfer_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_scheduleModelId_fkey" FOREIGN KEY ("scheduleModelId") REFERENCES "ScheduleModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
