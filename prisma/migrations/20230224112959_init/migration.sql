-- CreateTable
CREATE TABLE "characters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "nickname" TEXT,
    "japaneseName" TEXT,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "characteristics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL,
    "age" INTEGER,
    "dob" TEXT,
    "height" TEXT,
    "hairColor" TEXT,
    "eyeColor" TEXT,
    CONSTRAINT "characteristics_id_fkey" FOREIGN KEY ("id") REFERENCES "characters" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "professionalstatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" TEXT,
    "occupation" TEXT,
    "year" INTEGER,
    "grade" TEXT,
    "club" TEXT,
    "group" TEXT,
    CONSTRAINT "professionalstatus_id_fkey" FOREIGN KEY ("id") REFERENCES "characters" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "characters"("name");
