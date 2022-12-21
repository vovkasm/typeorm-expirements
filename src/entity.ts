import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, OneToOne, ManyToOne, JoinTable } from "typeorm"

@Entity()
export class Stocks {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'ticker' })
  ticker: string

  @Column({ name: 'name' })
  name: string

  @CreateDateColumn({name: 'date_create'})
  dateCreate: Date

  @UpdateDateColumn({name: 'date_update'})
  dateUpdate: Date

  @OneToMany(() => Prices, price => price.stock)
  @JoinTable()
  prices: Promise<Prices[]>
}

@Entity()
export class Prices {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'price' })
  price: number

  @CreateDateColumn({ name: 'date_create'})
  dateCreate: Date

  @UpdateDateColumn({ name: 'date_update'})
  dateUpdate: Date

  @ManyToOne(() => Stocks, (stock) => stock.prices)
  stock: Stocks
}
