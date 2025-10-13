-- CreateTable
CREATE TABLE `tb_user` (
    `id_usr` INTEGER NOT NULL AUTO_INCREMENT,
    `id_role` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `tb_user_email_key`(`email`),
    PRIMARY KEY (`id_usr`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_role` (
    `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    `code_role` VARCHAR(191) NOT NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_user` ADD CONSTRAINT `tb_user_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `tb_role`(`id_role`) ON DELETE RESTRICT ON UPDATE CASCADE;
