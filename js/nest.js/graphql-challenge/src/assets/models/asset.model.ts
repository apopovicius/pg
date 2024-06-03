import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssetPrice } from './asset-price.model';

@ObjectType({ description: 'asset' })
@Entity()
export class Asset {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  symbol: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  lastPrice?: AssetPrice;

  @OneToMany(() => AssetPrice, (price) => price.asset, {
    cascade: ['insert', 'update'],
  })
  prices: AssetPrice[];
}
