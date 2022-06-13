import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    address: string
}